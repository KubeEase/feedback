import React from "react";
import { GrIntegration, GrConfigure } from "react-icons/gr";
import { AiFillGitlab } from "react-icons/ai";
import { AdminBasePage } from "../components/AdminBasePage";
import { Button, Heading, List, ListItem, Segment } from "@fider/components";

import "./ManageIntegration.page.scss";
import { GitlabForm } from "../components/Gitlabform";

interface ManageIntegrationPageProps {
  name: string;
}
interface ManageIntegrationPageState {
  editing: boolean;
  service: string;
}

export default class ManageIntegrationPage extends AdminBasePage<
  ManageIntegrationPageProps,
  ManageIntegrationPageState
> {
  public id = "p-admin-integration";
  public name = "integration";
  public icon = GrIntegration;
  public title = "Integration";
  public subtitle = "Manage your site integration";
  constructor(props: ManageIntegrationPageProps) {
    super(props);
    this.state = { editing: false, service: "" };
  }

  private configure = async (service: string) => {
    this.setState({ editing: true, service });
  };

  private cancel = async () => {
    this.setState({ editing: false });
  };

  public content() {
    if (this.state.editing) {
      return <GitlabForm onCancel={this.cancel} />;
    }
    return (
      <>
        <Heading
          title="Project services"
          subtitle="Project services allow you to integrate Feedback with other applications."
          size="small"
        />
        <Segment>
          <List divided={true}>
            <ListItem key="gitlab">
              <div className="l-service">
                <AiFillGitlab className="logo" />

                <strong>Gitlab</strong>
                <Button onClick={this.configure.bind(this, "gitlab")} size="mini" className="right">
                  <GrConfigure />
                  Configure
                </Button>
              </div>
            </ListItem>
          </List>
        </Segment>
      </>
    );
  }
}
