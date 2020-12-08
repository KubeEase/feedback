import { Button, Form, Input, Modal, Select, SelectOption, TextArea } from "@fider/components";
import Tab from "@fider/components/common/tabs/Tab";
import Tabs from "@fider/components/common/tabs/Tabs";
import { useFider } from "@fider/hooks";
import { GitlabProject, Post } from "@fider/models";
import { actions, Failure } from "@fider/services";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { GrIntegration } from "react-icons/gr";

interface LinkFormProps {
  post: Post;
  projects: GitlabProject[];
}

export default function LinkForm(props: LinkFormProps) {
  const fider = useFider();
  const [isCreate, setIsCreate] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(props.post.title);
  const [projectID, setProjectID] = useState(0);
  const [description, setDescription] = useState(`
  ${props.post.description}

  [Relate Post](${fider.settings.baseURL}/posts/${props.post.slug})`);
  const [searchText] = useState("");
  const [error, setError] = useState<Failure | undefined>();
  const [t] = useTranslation();

  const options = props.projects.map(s => ({
    value: s.id.toString(),
    label: s.path
  }));
  const handleSave = async () => {
    setShowModal(!showModal);
  };
  const closeModal = async () => {
    setShowModal(false);
  };
  const onSearch = async () => {
    // console.log("search...");
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
    if (isCreate) {
      const result = await actions.createIssue({
        projectID,
        title,
        description,
        postID: props.post.id
      });
      if (result.ok) {
        location.reload();
      } else {
        setError(result.error);
      }
    }
  };
  const onChange = (index: number) => {
    setIsCreate(index === 0);
  };
  const onProjectChange = (o: SelectOption | undefined) => {
    if (o !== undefined) {
      setProjectID(+o.value);
    }
  };

  const modal = (
    <Modal.Window isOpen={showModal} onClose={closeModal} center={false} size="large">
      <Modal.Header>Gitlab Issue</Modal.Header>
      <Modal.Content>
        <Tabs onChange={onChange}>
          <Tab title="Create">
            <Form error={error} className="c-response-form">
              <Select field="project" label="Gitlab Project" options={options} onChange={onProjectChange} />
              <Input field="title" label="Title" value={title} onChange={setTitle} />
              <TextArea
                field="description"
                label="Description"
                value={description}
                minRows={5}
                onChange={setDescription}
              />
            </Form>
          </Tab>
          <Tab title="Link">
            <Form error={error} className="c-response-form">
              <Select field="project" label="Gitlab Project" options={options} />
              <Input
                field="search"
                label="Issue"
                value={searchText}
                placeholder="Search..."
                onChange={onSearch}
                icon={FaSearch}
              />
            </Form>
          </Tab>
        </Tabs>
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
