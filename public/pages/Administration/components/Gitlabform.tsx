import React, { useState } from "react";
import { actions, Failure } from "@fider/services";
import { Button, Field, Form, Heading, Input, Password, Toggle } from "@fider/components";
import { useFider } from "@fider/hooks";
import { GitlabConfig } from "@fider/models";

interface GitlabFormProps {
  config: GitlabConfig | null;
  onCancel: () => void;
}

export const GitlabForm: React.FC<GitlabFormProps> = props => {
  const fider = useFider();
  const [error, setError] = useState<Failure | undefined>();
  const [id] = useState(props.config == null ? 0 : props.config.id);
  const [url, setUrl] = useState<string>(props.config == null ? "" : props.config.url);
  const [path, setPath] = useState<string>(props.config == null ? "" : props.config.path);
  const [verifySSL, setVerifySSL] = useState(props.config == null ? true : props.config.ssl);
  const [username, setUsername] = useState(props.config == null ? "" : props.config.username);
  const [token, setToken] = useState(props.config == null ? "" : props.config.token);

  const handleCancel = async () => {
    props.onCancel();
  };

  const handleSave = async () => {
    setError(undefined);
    const result = await actions.saveGitlabConfig({
      id,
      url,
      path,
      verifySSL,
      username,
      token
    });
    if (result.ok) {
      location.reload();
    } else {
      setError(result.error);
    }
  };
  return (
    <>
      <Heading title="Connect Feedback with your App" size="small" />
      <Form error={error}>
        <input type="hidden" value={id} name="id" />
        <Input
          field="url"
          label="GitLab URL"
          maxLength={500}
          value={url}
          disabled={!fider.session.user.isAdministrator}
          onChange={setUrl}
          placeholder="https://gitlab.example.com"
        >
          <p className="info">
            The base URL for your GitLab instance, including the host and protocol. Do not include group path. If using
            gitlab.com, enter https://gitlab.com/
          </p>
        </Input>
        <Input
          field="path"
          label="GitLab Project Path"
          maxLength={300}
          value={path}
          disabled={!fider.session.user.isAdministrator}
          onChange={setPath}
          placeholder="my-group/my-project"
        >
          <p className="info">
            This can be found in the URL of your project's GitLab page. For example, if your project can be found at
            https://gitlab.com/my-group/my-project, enter `my-group/my-project`.
          </p>
        </Input>
        <Field label="Verify SSL">
          <Toggle active={verifySSL} onToggle={setVerifySSL} />
          <span>{verifySSL ? "Enabled" : "Disabled"}</span>

          <p className="info">
            By default, we verify SSL certificates when delivering payloads to your GitLab instance, and request GitLab
            to verify SSL when it delivers webhooks to Feedback.
          </p>
        </Field>
        <Input
          field="username"
          label="GitLab Username"
          maxLength={300}
          value={username}
          disabled={!fider.session.user.isAdministrator}
          onChange={setUsername}
          placeholder="admin"
        />
        <Password
          field="token"
          label="GitLab Person Token"
          maxLength={300}
          value={token}
          disabled={!fider.session.user.isAdministrator}
          onChange={setToken}
          placeholder="XXXXXXXXXXXXXXXXXXXXXXXXXX"
        />
        <div className="c-form-field">
          <Button color="positive" onClick={handleSave}>
            Save
          </Button>
          <Button color="cancel" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </>
  );
};
