import { postState } from "@/atoms/postAtom";
import { useRecoilState } from "recoil";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  return {
    postStateValue,
    setPostStateValue
  };
};
export default usePosts;
