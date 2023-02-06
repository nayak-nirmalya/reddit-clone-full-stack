import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Divider,
  Text,
  Input,
  Stack,
  Checkbox
} from "@chakra-ui/react";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose
}) => {
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;

    setCommunityName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create a Community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500">
                Community names including capitalization can not be changed.
              </Text>
              <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                r/
              </Text>
              <Input
                position="relative"
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handleChange}
              />
              <Text
                mt={1}
                fontSize="9pt"
                color={charsRemaining === 0 ? "red" : "gray.500"}
              >
                {charsRemaining} Characters remaining
              </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15}>
                  Community Type
                </Text>
                <Stack spacing={2}>
                  <Checkbox>Public</Checkbox>
                  <Checkbox>Restricted</Checkbox>
                  <Checkbox>Private</Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button variant="ghost">Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;
