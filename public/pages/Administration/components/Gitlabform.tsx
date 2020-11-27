import React from "react";
import { Button } from "@fider/components";

interface GitlabFormProps {
  //   config?: OAuthConfig;
  onCancel: () => void;
}

export const GitlabForm: React.FC<GitlabFormProps> = props => {
  const handleCancel = async () => {
    props.onCancel();
  };
  return (
    <>
      <Button color="cancel" onClick={handleCancel}>
        Cancel
      </Button>
    </>
  );
};
