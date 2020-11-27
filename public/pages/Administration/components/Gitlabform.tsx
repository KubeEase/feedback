import React, { useState } from "react";
import { Failure } from "@fider/services";
import { Button, Field, Form, Heading, Input, Toggle } from "@fider/components";
import { useFider } from "@fider/hooks";

interface GitlabFormProps {
  //   config?: OAuthConfig;
  onCancel: () => void;
}

export const GitlabForm: React.FC<GitlabFormProps> = props => {
  const fider = useFider();
  const [error, setError] = useState<Failure | undefined>();
  const [url, setUrl] = useState<string>("");
  const [path, setPath] = useState<string>("");
  const [verifySSL, setVerifySSL] = useState(true);
  const [applicationID, setApplicationID] = useState("");
  const [applicationSecret, setApplicationSecret] = useState("");

  const handleCancel = async () => {
    props.onCancel();
  };
  const handleSave = async () => {
    setError(undefined);
  };
  return (
    <>
      <Heading title="Connect Feedback with your App" size="small" />
      <Form error={error}>
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
          field="applicationID"
          label="GitLab Application ID"
          maxLength={300}
          value={applicationID}
          disabled={!fider.session.user.isAdministrator}
          onChange={setApplicationID}
          placeholder="218b03cd02f078f28df02e3f6c4ae93d"
        />
        <Input
          field="applicationSecret"
          label="GitLab Application Secret"
          maxLength={300}
          value={applicationSecret}
          disabled={!fider.session.user.isAdministrator}
          onChange={setApplicationSecret}
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
