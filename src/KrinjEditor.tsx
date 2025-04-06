import { EditorState } from "@codemirror/state";
import {
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
  ViewUpdate,
  highlightSpecialChars,
} from "@codemirror/view";
import { history, defaultKeymap, historyKeymap } from "@codemirror/commands";
import { useEffect, useRef, useState } from "react";
import { bracketMatching, foldKeymap } from "@codemirror/language";
import {
  closeBrackets,
  autocompletion,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import {
  highlightSelectionMatches,
  search,
  searchKeymap,
} from "@codemirror/search";
import { lintKeymap } from "@codemirror/lint";
import { javascript } from "@codemirror/lang-javascript";
import { LineFillers } from "./LineFillers";
import { useEditor } from "./stores/Editor/store";
import { defaultEditorTheme } from "./constants/Editor";

// TODO: working autocomplete at least fo js/ts

export const KrinjEditor = (params) => {
  const editorRef = useRef<HTMLElement>(null);
  const { updateLinesCount, updateLineLimit } = useEditor();
  const [editorState, _] = useState<EditorState>(
    EditorState.create({
      doc: `console.log("Hello World!")`,
      extensions: [
        // setup here
        defaultEditorTheme,
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          ...lintKeymap,
        ]),
        javascript({ typescript: true }),
        highlightSelectionMatches(),
        search(),
        autocompletion(),
        closeBrackets(),
        bracketMatching(),
        history(),
        highlightSpecialChars(),
        lineNumbers(),
        highlightActiveLine(),
        highlightActiveLineGutter(),
        EditorView.updateListener.of((v: ViewUpdate) => {
          if (v.startState.doc.lines !== v.state.doc.lines) {
            updateLinesCount(v.state.doc.lines);
          }
        }),
      ],
    }),
  );

  useEffect(() => {
    if (editorRef.current && editorRef.current.clientHeight) {
      updateLineLimit(Math.floor(editorRef.current.clientHeight / 33));
    }

    window.addEventListener("resize", () => {
      if (editorRef.current && editorRef.current.clientHeight) {
        updateLineLimit(Math.floor(editorRef.current.clientHeight / 33));
      }
    });

    const parent = document.getElementById("krinj-editor");

    if (parent && parent.children.length === 0) {
      updateLinesCount(editorState.doc.lines);
      new EditorView({
        state: editorState,
        parent,
      });
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex bg-base-200 max-w-[95%] h-[95%] mx-auto">
      <LineFillers />
      <section id="krinj-editor" className="w-full" ref={editorRef}></section>
    </div>
  );
};
