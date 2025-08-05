import React, { useMemo } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import ToolBarPlugin from "./Plugins/ToolbarPlugin";
import { css } from "@emotion/css";
import { Box } from "@chakra-ui/react";
import CustomOnChangePlugin from "./Plugins/CustomOnChangePlugin";
import { ListNode, ListItemNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { theme } from "./theme";
import { ImageNode } from "./nodes/ImageNode";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = React.memo(
  function RichTextEditor({ value, onChange, placeholder, name }) {
    const initialConfig = useMemo(
      () => ({
        namespace: name,
        theme,
        onError: () => {},
        nodes: [
          HeadingNode,
          CodeHighlightNode,
          CodeNode,
          ListNode,
          ListItemNode,
          ImageNode,
        ],
      }),
      [name]
    );

    return (
      <div className="editor-container">
        <LexicalComposer initialConfig={initialConfig}>
          <ToolBarPlugin />
          <div
            className={css({
              position: "relative",
              height: "150px",
              border: "1px solid black",
              borderRadius: "4px",
              overflow: "hidden",
            })}
          >
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className={css({
                    height: "100%",
                    fontSize: 12,
                    padding: 8,
                    overflowY: "auto",
                    outline: "none",
                  })}
                />
              }
              placeholder={
                <Box
                  className={css({
                    position: "absolute",
                    pointerEvents: "none",
                    color: "#999",
                    top: 8,
                    left: 8,
                    fontSize: 12,
                  })}
                >
                  {placeholder}
                </Box>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
          <AutoFocusPlugin />
          <HistoryPlugin />
          <ListPlugin />
          <CustomOnChangePlugin value={value} onChange={onChange} />
        </LexicalComposer>
      </div>
    );
  }
);
