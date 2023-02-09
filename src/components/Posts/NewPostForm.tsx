import { Flex, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from "./TabItem";
import TextInputs from "./PostForm/TextInputs";

type NewPostFormProps = {};

const formTabs: TabItemType[] = [
  {
    title: "Post",
    icon: IoDocumentText
  },
  {
    title: "Images & Video",
    icon: IoImageOutline
  },
  {
    title: "Link",
    icon: BsLink45Deg
  },
  {
    title: "Poll",
    icon: BiPoll
  },
  {
    title: "Talk",
    icon: BsMic
  }
];

export type TabItemType = {
  title: string;
  icon: typeof Icon.arguments;
};

const NewPostForm: React.FC<NewPostFormProps> = () => {
  const [selectedItem, setSelectedItem] = useState(formTabs[0].title);
  const [selectedFile, setSelectedFile] = useState<string>();
  const [textInput, setTextInput] = useState({
    title: "",
    body: ""
  });

  const handleCreatePost = async () => {};

  const onSelectImage = () => {};

  const onTextChange = () => {};

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item) => (
          <TabItem
            item={item}
            selected={item.title === selectedItem}
            setSelectedTab={setSelectedItem}
          />
        ))}
      </Flex>
      <Flex>
        <TextInputs />
      </Flex>
    </Flex>
  );
};
export default NewPostForm;
