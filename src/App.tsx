import { useEffect } from "react";
import { KrinjEditor } from "./KrinjEditor";
import { themeChange } from "theme-change";

function App() {
  useEffect(() => themeChange(false), []);
  return (
    <section className="w-screen h-screen">
      <KrinjEditor />
    </section>
  );
}

export default App;
