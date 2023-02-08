import { Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {};

const PageContent: React.FC<PageContentProps> = ({ childrens }) => {
  return (
    <Flex justify="center" p="16px 0px" border="1px solid red">
      <Flex
        width="95%"
        justify="center"
        maxWidth="860px"
        border="1px solid green"
      >
        {/* LHS */}
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
          border="1px solid blue"
        >
          {childrens && childrens[0 as keyof typeof childrens]}
        </Flex>

        {/* RHS */}
        <Flex
          direction="column"
          display={{ base: "none", md: "flex" }}
          flexGrow={1}
          border="1px solid orange"
        >
          {childrens && childrens[1 as keyof typeof childrens]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
