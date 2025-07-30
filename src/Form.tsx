import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { RichTextEditor } from "./RichTextEditor";

export default function Form() {
  const [value, setValue] = useState("");

  console.log(value);

  return (
    <Box p={2}>
      <RichTextEditor
        placeholder="Type here"
        name="text"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
      <Button colorScheme="blue" size="xs" mt="2">
        Save
      </Button>
    </Box>
  );
}
