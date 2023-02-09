import { Community } from "@/atoms/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    try {
      // get all posts for this community
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);

      // stores in post state
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      console.log("posts", posts);
    } catch (error: any) {
      console.error("getPostsError", error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return <div>Posts</div>;
};
export default Posts;
