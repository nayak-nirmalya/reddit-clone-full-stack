import { Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <Flex>
      <Flex>
        {/* LHS */}
        <Flex>{children && children[0 as keyof typeof children]}</Flex>

        {/* RHS */}
        <Flex>{children && children[1 as keyof typeof children]}</Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
