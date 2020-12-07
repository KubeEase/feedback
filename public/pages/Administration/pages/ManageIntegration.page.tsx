import React from "react";
import { GrIntegration, GrConfigure } from "react-icons/gr";
import { AiFillGitlab } from "react-icons/ai";
import { AdminBasePage } from "../components/AdminBasePage";
import { Button, Heading, List, ListItem, Segment } from "@fider/components";

import "./ManageIntegration.page.scss";
import { GitlabForm } from "../components/Gitlabform";
import { GitlabConfig } from "@fider/models";

interface ManageIntegrationPageProps {
  integrations: GitlabConfig[];
}
interface ManageIntegrationPageState {
  editing: boolean;
  config: GitlabConfig | null;
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
    this.state = { editing: false, config: null };
  }

  private configure = async (config: GitlabConfig | null) => {
    this.setState({ editing: true, config });
  };

  private cancel = async () => {
    this.setState({ editing: false });
  };

  public content() {
    if (this.state.editing) {
      return <GitlabForm onCancel={this.cancel} config={this.state.config} />;
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
            {this.props.integrations.map(o => (
              <ListItem key={o.id}>
                <div className="l-service">
                  <AiFillGitlab className="logo" />
                  <strong>Gitlab</strong>
                  <Button onClick={this.configure.bind(this, o)} size="mini" className="right">
                    <GrConfigure />
                    Configure
                  </Button>
                </div>
                <span className="info">
                  {o.url}
                  {o.path}
                </span>
              </ListItem>
            ))}
          </List>
        </Segment>
        <Button color="positive" onClick={this.configure.bind(this, null)}>
          Add new
        </Button>
      </>
    );
  }
}
