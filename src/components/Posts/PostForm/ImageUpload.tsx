import { Button, Flex } from "@chakra-ui/react";
import React, { useRef } from "react";

type ImageUploadProps = {
  selectedFile?: string;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  onSelectImage,
  setSelectedTab,
  setSelectedFile
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <Flex justify="center" align="center" width="100%">
      <Flex
        justify="center"
        align="center"
        p={20}
        border="1px dashed"
        borderColor="gray.200"
        width="100%"
        borderRadius={4}
      >
        <Button
          height="28px"
          variant="outline"
          onClick={() => selectedFileRef.current?.click()}
        >
          Upload
        </Button>
        <input
          ref={selectedFileRef}
          type="file"
          hidden
          onChange={onSelectImage}
        />
      </Flex>
    </Flex>
  );
};
export default ImageUpload;
