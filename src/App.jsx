import { useEffect, useState } from "react";
import { drumBlock } from "./constans";

function App() {
  const [text, setText] = useState("Press a key or click");
  const handleAudio = (key, name) => {
    const audio = document.getElementById(key);
    if (audio) {
      audio.play();
      setText(name);
    }
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      const matchItem = drumBlock.find(
        (item) => item.key === e.key.toUpperCase()
      );

      if (matchItem) {
        handleAudio(matchItem.key, matchItem.name);
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div id="drum-machine">
      <div className="flex justify-center flex-col items-center">
        <h2
          id="display"
          className="h-10 flex items-center bg-red-300 rounded-lg px-2 my-10 font-semibold"
        >
          {text}
        </h2>
        <div className="grid grid-cols-3 gap-1">
          {drumBlock.map((item) => (
            <div
              key={item.id}
              id={item.name}
              className="drum-pad flex justify-center items-center w-20 h-20 bg-green-500 cursor-pointer rounded-xl border-green-950 border font-bold"
              onClick={() => {
                handleAudio(item.key, item.name);
              }}
            >
              {item.key}
              <audio src={item.sound} id={item.key} className="clip hidden" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
