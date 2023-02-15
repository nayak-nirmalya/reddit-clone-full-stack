import { Post } from "@/atoms/postAtom";
import { firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import { Alert, AlertIcon, Flex, Icon, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import ImageUpload from "./PostForm/ImageUpload";
import TextInputs from "./PostForm/TextInputs";
import TabItem from "./TabItem";

type NewPostFormProps = {
  user: User;
  communityImageURL?: string;
};

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

const NewPostForm: React.FC<NewPostFormProps> = ({
  user,
  communityImageURL
}) => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState(formTabs[0].title);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [textInput, setTextInput] = useState({
    title: "",
    body: ""
  });

  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();

  const handleCreatePost = async () => {
    const communityId = router.query.communityId;

    // create new post object => type Post
    const newPost: Post = {
      communityId: communityId as string,
      communityImageURL: communityImageURL || "",
      creatorId: user?.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: textInput.title,
      body: textInput.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp
    };

    setLoading(true);
    try {
      // store the post in firestore db
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      // check for selected file
      if (selectedFile) {
        // store image in storage => getDownloadURL (return imageURL)
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);

        // update postDoc with uploaded URL
        await updateDoc(postDocRef, {
          imageURL: downloadURL
        });
      }

      // redirect user to community page (router)
      router.back();
    } catch (error: any) {
      console.error("handleCreatePostError", error.message);
      setError(true);
    }
    setLoading(false);
  };

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value }
    } = event;
    setTextInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item) => (
          <TabItem
            key={item.title}
            item={item}
            selected={item.title === selectedItem}
            setSelectedTab={setSelectedItem}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedItem === "Post" && (
          <TextInputs
            textInputs={textInput}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}
        {selectedItem === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectFile}
            setSelectedTab={setSelectedItem}
            setSelectedFile={setSelectedFile}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text mr={2}>Error Creating Post!</Text>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
