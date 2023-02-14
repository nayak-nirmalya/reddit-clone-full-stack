import {
  DirectoryMenuItem,
  directoryMenuState
} from "@/atoms/directoryMenuAtom";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

const useDirectory = () => {
  const router = useRouter();
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem
    }));

    router.push(menuItem.link);
    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen
    }));
  };

  return {
    directoryState,
    toggleMenuOpen,
    onSelectMenuItem
  };
};
export default useDirectory;
