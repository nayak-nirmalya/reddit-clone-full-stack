import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React from "react";

type TextInputsProps = {};

const TextInputs: React.FC<TextInputsProps> = () => {
  return (
    <Stack spacing={3} width="100%">
      <Input />
      <Textarea />
      <Flex>
        <Button>Post</Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
