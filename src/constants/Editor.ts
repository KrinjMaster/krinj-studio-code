import { EditorView } from "codemirror";

export const defaultEditorTheme = EditorView.theme(
  {
    "&": {
      fontSize: "1.5rem",
      color: "oklch(var(--bc) / var(--tw-text-opacity)))",
      backgroundColor: "oklch(var(--b2))",
      caretColor: "oklch(var(--er))",
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "oklch(var(--p))",
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "oklch(var(--b3))",
    },
    ".cm-gutters": {
      backgroundColor: "oklch(var(--b3))",
      color: "oklch(var(--bc) / var(--tw-text-opacity)))",
      border: "none",
    },
    ".cm-gutterElement": {
      width: "2.5rem",
    },
    ".cm-foldGutter": {
      width: "0.5rem",
    },
    ".cm-activeLine": {
      backgroundColor: "oklch(var(--b1))",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "oklch(var(--n))",
    },
  },
  { dark: true },
);
