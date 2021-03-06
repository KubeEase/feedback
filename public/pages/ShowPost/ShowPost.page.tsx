import "./ShowPost.page.scss";

import React from "react";

import { Comment, Post, Tag, Vote, ImageUpload, GitlabProject } from "@fider/models";
import { actions, Failure, Fider } from "@fider/services";

import {
  VoteCounter,
  ShowPostResponse,
  Button,
  UserName,
  Avatar,
  Moment,
  MultiLineText,
  List,
  ListItem,
  Input,
  Form,
  TextArea,
  MultiImageUploader,
  ImageViewer
} from "@fider/components";
import { FaSave, FaTimes, FaEdit } from "react-icons/fa";
import { ResponseForm } from "./components/ResponseForm";
import { TagsPanel } from "./components/TagsPanel";
import { NotificationsPanel } from "./components/NotificationsPanel";
import { ModerationPanel } from "./components/ModerationPanel";
import { DiscussionPanel } from "./components/DiscussionPanel";
import { VotesPanel } from "./components/VotesPanel";
import { WithTranslation, withTranslation } from "react-i18next";
import LinkForm from "./components/LinkForm";

interface ShowPostPageProps extends WithTranslation {
  post: Post;
  subscribed: boolean;
  comments: Comment[];
  tags: Tag[];
  votes: Vote[];
  attachments: string[];
  projects: GitlabProject[];
}

interface ShowPostPageState {
  editMode: boolean;
  newTitle: string;
  attachments: ImageUpload[];
  newDescription: string;
  error?: Failure;
}

class ShowPostPage extends React.Component<ShowPostPageProps, ShowPostPageState> {
  constructor(props: ShowPostPageProps) {
    super(props);

    this.state = {
      editMode: false,
      newTitle: this.props.post.title,
      newDescription: this.props.post.description,
      attachments: []
    };
  }

  private saveChanges = async () => {
    const result = await actions.updatePost(
      this.props.post.number,
      this.state.newTitle,
      this.state.newDescription,
      this.state.attachments
    );
    if (result.ok) {
      location.reload();
    } else {
      this.setState({
        error: result.error
      });
    }
  };

  private setNewTitle = (newTitle: string) => {
    this.setState({ newTitle });
  };

  private setNewDescription = (newDescription: string) => {
    this.setState({ newDescription });
  };

  private setAttachments = (attachments: ImageUpload[]) => {
    this.setState({ attachments });
  };

  private cancelEdit = async () => {
    this.setState({ error: undefined, editMode: false });
  };

  private startEdit = async () => {
    this.setState({ editMode: true });
  };

  public render() {
    const { t } = this.props;
    return (
      <div id="p-show-post" className="page container">
        <div className="header-col">
          <List>
            <ListItem>
              <VoteCounter post={this.props.post} />

              <div className="post-header">
                {this.state.editMode ? (
                  <Form error={this.state.error}>
                    <Input field="title" maxLength={100} value={this.state.newTitle} onChange={this.setNewTitle} />
                  </Form>
                ) : (
                  <h1>{this.props.post.title}</h1>
                )}

                <span className="info">
                  <Moment date={this.props.post.createdAt} /> &middot; <Avatar user={this.props.post.user} />{" "}
                  <UserName user={this.props.post.user} />
                </span>
              </div>
            </ListItem>
          </List>

          <span className="subtitle">{t("showPost.description")}</span>
          {this.state.editMode ? (
            <Form error={this.state.error}>
              <TextArea field="description" value={this.state.newDescription} onChange={this.setNewDescription} />
              <MultiImageUploader
                field="attachments"
                bkeys={this.props.attachments}
                maxUploads={3}
                previewMaxWidth={100}
                onChange={this.setAttachments}
              />
            </Form>
          ) : (
            <>
              <MultiLineText className="description" text={this.props.post.description} style="simple" />
              {this.props.attachments.map(x => (
                <ImageViewer key={x} bkey={x} />
              ))}
            </>
          )}
          <ShowPostResponse showUser={true} status={this.props.post.status} response={this.props.post.response} />
        </div>

        <div className="action-col">
          <VotesPanel post={this.props.post} votes={this.props.votes} />

          {Fider.session.isAuthenticated &&
            (Fider.session.user.id === this.props.post.user.id ||
              Fider.session.user.isAdministrator ||
              Fider.session.user.isCollaborator) && [
              <span key={0} className="subtitle">
                {t("showPost.actions")}
              </span>,
              this.state.editMode ? (
                <List key={1}>
                  <ListItem>
                    <Button className="save" color="positive" fluid={true} onClick={this.saveChanges}>
                      <FaSave /> {t("common.button.save")}
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button className="cancel" fluid={true} onClick={this.cancelEdit}>
                      <FaTimes /> {t("common.button.cancel")}
                    </Button>
                  </ListItem>
                </List>
              ) : (
                <List key={1}>
                  <ListItem>
                    <Button className="edit" fluid={true} onClick={this.startEdit}>
                      <FaEdit /> {t("common.button.edit")}
                    </Button>
                  </ListItem>
                  <ListItem>
                    <ResponseForm post={this.props.post} />
                  </ListItem>
                  {Fider.session.user.isAdministrator && (
                    <ListItem>
                      <LinkForm post={this.props.post} projects={this.props.projects} />
                    </ListItem>
                  )}
                </List>
              )
            ]}

          <TagsPanel post={this.props.post} tags={this.props.tags} />
          <NotificationsPanel post={this.props.post} subscribed={this.props.subscribed} />
          <ModerationPanel post={this.props.post} />
        </div>

        <DiscussionPanel post={this.props.post} comments={this.props.comments} />
      </div>
    );
  }
}

export default withTranslation()(ShowPostPage);
