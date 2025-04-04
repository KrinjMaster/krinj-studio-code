import { EditorState } from "@codemirror/state";
import {
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
  ViewUpdate,
} from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { useEffect, useState } from "react";
// import { javascript } from "@codemirror/lang-javascript";
// import { basicSetup } from "codemirror";
import { LineFillers } from "./LineFillers";
import { useEditor } from "./stores/Editor/store";
import { defaultEditorTheme } from "./constants/Editor";

// - [the default command bindings](https://codemirror.net/6/docs/ref/#commands.defaultKeymap)
// - [line numbers](https://codemirror.net/6/docs/ref/#view.lineNumbers)
// - [special character highlighting](https://codemirror.net/6/docs/ref/#view.highlightSpecialChars)
// - [the undo history](https://codemirror.net/6/docs/ref/#commands.history)
// - [a fold gutter](https://codemirror.net/6/docs/ref/#language.foldGutter)
// - [custom selection drawing](https://codemirror.net/6/docs/ref/#view.drawSelection)
// - [drop cursor](https://codemirror.net/6/docs/ref/#view.dropCursor)
// - [multiple selections](https://codemirror.net/6/docs/ref/#state.EditorState^allowMultipleSelections)
// - [reindentation on input](https://codemirror.net/6/docs/ref/#language.indentOnInput)
// - [the default highlight style](https://codemirror.net/6/docs/ref/#language.defaultHighlightStyle) (as fallback)
// - [bracket matching](https://codemirror.net/6/docs/ref/#language.bracketMatching)
// - [bracket closing](https://codemirror.net/6/docs/ref/#autocomplete.closeBrackets)
// - [autocompletion](https://codemirror.net/6/docs/ref/#autocomplete.autocompletion)
// - [rectangular selection](https://codemirror.net/6/docs/ref/#view.rectangularSelection) and [crosshair cursor](https://codemirror.net/6/docs/ref/#view.crosshairCursor)
// - [active line highlighting](https://codemirror.net/6/docs/ref/#view.highlightActiveLine)
// - [active line gutter highlighting](https://codemirror.net/6/docs/ref/#view.highlightActiveLineGutter)
// - [selection match highlighting](https://codemirror.net/6/docs/ref/#search.highlightSelectionMatches)
// - [search](https://codemirror.net/6/docs/ref/#search.searchKeymap)
// - [linting](https://codemirror.net/6/docs/ref/#lint.lintKeymap)

export const KrinjEditor = (params) => {
  const { updateLinesCount } = useEditor();
  const [editorState, _] = useState<EditorState>(
    EditorState.create({
      doc: "Hello World",
      extensions: [
        // setup here
        defaultEditorTheme,
        keymap.of(defaultKeymap),
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
      <section id="krinj-editor" className="w-full"></section>
    </div>
  );
};
