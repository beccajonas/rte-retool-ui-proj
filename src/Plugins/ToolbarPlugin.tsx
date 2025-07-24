import { Box, ButtonGroup, Flex, IconButton, Select } from "@chakra-ui/react";
import { LOW_PRIORIRTY, RICH_TEXT_OPTIONS, RichTextAction } from "../Constants/index";
import { Divider } from "../Components/DIvider";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
} from "lexical";
import { useState, useEffect } from "react";
import { mergeRegister } from "@lexical/utils";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [disableMap, setDisableMap] = useState({
    [RichTextAction.Undo]: true,
    [RichTextAction.Redo]: true,
  } as { [id: string]: boolean });

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payLoad) => {
          setDisableMap((prevDisableMap) => ({
            ...prevDisableMap,
            undo: !payLoad,
          }));
          return false; // Disable undo command
        },
        LOW_PRIORIRTY
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payLoad) => {
          setDisableMap((prevDisableMap) => ({
            ...prevDisableMap,
            redo: !payLoad,
          }));
          return false; // Disable redo command
        },
        LOW_PRIORIRTY
      )
    );
  }, []);

  const onAction = (id: RichTextAction) => {
    console.log("Action triggered:", id);
    switch (id) {
      case RichTextAction.Bold: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        break;
      }
      case RichTextAction.Italics: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        break;
      }
      case RichTextAction.Underline: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        break;
      }
      case RichTextAction.Strikethrough: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        break;
      }
      case RichTextAction.Superscript: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
        break;
      }
      case RichTextAction.Subscript: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
        break;
      }
      case RichTextAction.Highlight: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
        break;
      }
      case RichTextAction.Code: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
        break;
      }
      case RichTextAction.LeftAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        break;
      }
      case RichTextAction.RightAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        break;
      }
      case RichTextAction.CenterAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        break;
      }
      case RichTextAction.JustifyAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        break;
      }
      case RichTextAction.Undo: {
        editor.dispatchCommand(UNDO_COMMAND, undefined);
        break;
      }
      case RichTextAction.Redo: {
        editor.dispatchCommand(REDO_COMMAND, undefined);
        break;
      }
    }
  };

  return (
    <Box>
      <Flex gap={4}>
        <ButtonGroup size="xs" isAttached variant="ghost" color="#444">
          {RICH_TEXT_OPTIONS.map(({ id, label, icon, fontSize }) =>
            id === RichTextAction.Divider ? (
              <Divider />
            ) : (
              <IconButton
                key={id}
                aria-label={label ?? "Action"}
                icon={icon}
                fontSize={fontSize}
                onClick={() => onAction(id)}
                isDisabled={disableMap[id]}
              />
            )
          )}
        </ButtonGroup>
      </Flex>
    </Box>
  );
}
