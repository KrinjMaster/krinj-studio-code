import { CompletionContext } from "@codemirror/autocomplete";

export const myCompletions = (context: CompletionContext) => {
  const word = context.matchBefore(/\w*/);

  if (word) {
    if (word.from === word.to && !context.explicit) return null;

    return {
      from: word.from,
      options: [
        { label: "match", type: "keyword" },
        { label: "hello", type: "variable", info: "(World)" },
        { label: "magic", type: "text", apply: "??*.?.*??", detail: "macro" },
      ],
    };
  }
};
