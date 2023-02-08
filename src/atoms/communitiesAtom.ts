import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}

interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

interface CommunityState {
  mySnippet: CommunitySnippet[];
  // visitedCommunity
}

const defaultCommunityState: CommunityState = {
  mySnippet: []
};

export const communityState = atom<CommunityState>({
  key: "communityState",
  default: defaultCommunityState
});
