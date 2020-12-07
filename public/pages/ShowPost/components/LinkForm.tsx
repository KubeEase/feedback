import { Button, Form, Modal } from "@fider/components";
import Tab from "@fider/components/common/tabs/Tab";
import Tabs from "@fider/components/common/tabs/Tabs";
import { Post } from "@fider/models";
import { Failure } from "@fider/services";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { GrIntegration } from "react-icons/gr";

interface LinkFormProps {
  post: Post;
}

export default function LinkForm(props: LinkFormProps) {
  const [showModal, setShowModal] = useState(false);
  const [error] = useState<Failure | undefined>();
  const [t] = useTranslation();
  const handleSave = async () => {
    setShowModal(!showModal);
  };
  const closeModal = async () => {
    setShowModal(false);
  };

  const submit = async () => {
    // const result = await actions.respond(this.props.post.number, this.state);
    // if (result.ok) {
    //   location.reload();
    // } else {
    //   this.setState({
    //     error: result.error
    //   });
    // }
  };

  const modal = (
    <Modal.Window isOpen={showModal} onClose={closeModal} center={false} size="large">
      <Modal.Header>Gitlab Issue</Modal.Header>
      <Modal.Content>
        <Tabs>
          <Tab title="Create">Create Form</Tab>
          <Tab title="Link">Link Form</Tab>
        </Tabs>
        <Form error={error} className="c-response-form">
          {/* <Select
            field="status"
            label="Status"
            defaultValue={this.state.status}
            options={options}
            onChange={this.setStatus}
          />
          {this.state.status === PostStatus.Duplicate.value ? (
            <>
              <Field>
                <PostSearch exclude={[this.props.post.number]} onChanged={this.setOriginalNumber} />
              </Field>
              <DisplayError fields={["originalNumber"]} error={this.state.error} />
              <span className="info">{t("showPost.responseForm.mergedIntoOriginal")}</span>
            </>
          ) : (
            <TextArea
              field="text"
              onChange={this.setText}
              value={this.state.text}
              minRows={5}
              placeholder={t("showPost.responseForm.whatsGoingOn")}
            />
          )} */}
        </Form>
      </Modal.Content>

      <Modal.Footer>
        <Button color="positive" onClick={submit}>
          {t("common.button.submit")}
        </Button>
        <Button color="cancel" onClick={closeModal}>
          {t("common.button.cancel")}
        </Button>
      </Modal.Footer>
    </Modal.Window>
  );

  const button = (
    <Button className="respond" fluid={true} onClick={handleSave}>
      <GrIntegration /> Link Gitlab Issue
    </Button>
  );
  return (
    <>
      {button}
      {modal}
    </>
  );
}
