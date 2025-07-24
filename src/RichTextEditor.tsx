import React from "react";
import "./index.css";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import ToolBarPlugin from "./Plugins/ToolbarPlugin";
import type { EditorThemeClasses } from "lexical";
import { css } from "@emotion/css";

interface RichTextEditorProps {}

const theme: EditorThemeClasses = {
  text: {
    bold: css({ fontWeight: "bold" }),
    underline: css({ textDecoration: "underline" }),
    strikethrough: css({ textDecoration: "line-through" }),
    underlineStrikethrough: css({ textDecoration: "underline line-through" }),
    italic: css({ fontStyle: "italic" }),
    code: css({
      color: "black",
      padding: 2,
      background: "#eee",
      border: "1px solid #ccc",
    }),
  },
};

const initialConfig = {
  namespace: "RichTextEditor-1",
  theme,
  onError: () => {},
  nodes: [HeadingNode, CodeHighlightNode, CodeNode],
};

export const RichTextEditor: React.FC<RichTextEditorProps> = React.memo(
  function RichTextEditor() {
    return (
      <div className="editor-container">
        <LexicalComposer initialConfig={initialConfig}>
          <ToolBarPlugin />
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<div className="editor-placeholder">Some text</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />

          <AutoFocusPlugin />
          <HistoryPlugin />
        </LexicalComposer>
      </div>
    );
  }
);
