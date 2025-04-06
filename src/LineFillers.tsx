import { useEditor } from "./stores/Editor/store";

export const LineFillers = () => {
  const { linesCount, lineFillerLimit } = useEditor();
  console.log(lineFillerLimit);

  return (
    <div className="flex flex-col h-full bg-base-300 text-neutral pt-[4px]">
      {[...Array(lineFillerLimit)].map((_, i) => (
        <div className="w-[25px] h-[33px] text-center text-[22px]" key={i}>
          {i + 1 > linesCount ? "~" : ""}
        </div>
      ))}
    </div>
  );
};
