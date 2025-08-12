import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";
import { Button } from "@chakra-ui/react";

const SaveHtmlPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const saveHtml = () => {
    editor.getEditorState().read(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);
      console.log("Editor HTML:", htmlString);
    });
  };

  return (
    <Button colorScheme="blue" size="xs" onClick={saveHtml}>
      Save as HTML
    </Button>
  );
};

export default SaveHtmlPlugin;
