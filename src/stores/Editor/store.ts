import { create } from "zustand";

type EditorStore = {
  linesCount: number;
  lineFillerLimit: number;
  updateLinesCount: (linesCount: number) => void;
  updateLineLimit: (lineLimit: number) => void;
};

export const useEditor = create<EditorStore>((set) => ({
  linesCount: 0,
  lineFillerLimit: 24,
  updateLinesCount: (linesCount: number) => set({ linesCount }),
  updateLineLimit: (lineLimit: number) => set({ lineFillerLimit: lineLimit }),
}));
