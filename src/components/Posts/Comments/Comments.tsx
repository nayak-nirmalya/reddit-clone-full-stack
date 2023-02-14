import { Post } from "@/atoms/postAtom";
import { User } from "@firebase/auth";
import React, { useEffect } from "react";

type CommentsProps = {
  user: User;
  selectedPost: Post;
  communityId: string;
};

const Comments: React.FC<CommentsProps> = ({
  user,
  selectedPost,
  communityId
}) => {
  const onCreateComment = async (commentText: string) => {};
  const onDeleteComment = async (comment: Comment) => {};
  const getPostComments = async () => {};

  useEffect(() => {
    getPostComments();
  }, []);

  return <div>Here Are the Comments.</div>;
};
export default Comments;
