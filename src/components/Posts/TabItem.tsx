import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { TabItemType } from "./NewPostForm";

type TabItemProps = {
  item: TabItemType;
  selected: boolean;
  setSelectedTab: (value: string) => void;
  key: string;
};

const TabItem: React.FC<TabItemProps> = ({
  item,
  selected,
  setSelectedTab
}) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      p="14px 0px"
      cursor="pointer"
      fontWeight={700}
      _hover={{ bg: "gray.50" }}
      color={selected ? "blue.500" : "gray.500"}
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={selected ? "blue.500" : "gray.200"}
      borderRightColor="gray.200"
      onClick={() => setSelectedTab(item.title)}
    >
      <Flex align="center" height="20px" mr={2}>
        <Icon as={item.icon} mr={2} />
        <Text fontSize="10pt">{item.title}</Text>
      </Flex>
    </Flex>
  );
};
export default TabItem;
