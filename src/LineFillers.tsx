import { useEditor } from "./stores/Editor/store";

export const LineFillers = () => {
  const { linesCount, lineFillerLimit } = useEditor();

  return (
    <div className="flex flex-col h-full bg-base-300 text-neutral">
      {[...Array(lineFillerLimit)].map((_, i) => (
        <div className="w-[40px] h-[33px] text-center" key={i}>
          {i + 1 > linesCount ? "~" : ""}
        </div>
      ))}
    </div>
  );
};
