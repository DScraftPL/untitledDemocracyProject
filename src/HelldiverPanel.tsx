import { useState, useCallback } from "react";

import STRATAGEMS from "./data/stratagems.json";

import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "./Components/Arrows";

type KeyState = {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
};

type ValidKey = keyof KeyState;

const decipherJson = (data: string) => {
  const temp = data.split(" ");
  return temp;
};

const isValidKey = (key: string): key is ValidKey => {
  return key === "w" || key === "a" || key === "s" || key === "d";
};

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const HelldiverPanel = () => {
  const [isFocus, setFocus] = useState<boolean>(true);
  const [randomize, setRandomize] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("test");
  const [icon, setIcon] = useState<string>(
    "HelldiversIcons/General Stratagems/SEAF Artillery.svg"
  );
  const [keyStates, setKeyStates] = useState<KeyState>({
    w: false,
    a: false,
    s: false,
    d: false,
  });
  const [toPress, setToPress] = useState<string[]>(["w", "a", "s", "d", "w"]);
  const [toPressState, setToPressState] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shake, setShake] = useState<boolean>(false);
  const [largen, setLargen] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleKeyChange = useCallback((key: ValidKey, isPressed: boolean) => {
    setKeyStates((prev) => ({ ...prev, [key]: isPressed }));
  }, []);

  const generateNewPress = () => {
    const keys = ["w", "a", "s", "d"];
    let arr: string[] = [];
    if (randomize) {
      const num = getRandomNumber(5, 10);
      for (let i = 0; i < num; i++) {
        const randomIndex = Math.floor(Math.random() * keys.length);
        arr.push(keys[randomIndex]);
      }
      setTitle("random" + num);
    } else {
      const num = getRandomNumber(0, STRATAGEMS.length);
      const toDisplay = STRATAGEMS[num];
      arr = decipherJson(toDisplay.code);
      setTitle(toDisplay.name);
      setIcon(toDisplay.icon);
    }
    return arr;
  };

  const handlePress = () => {
    const newSetToPressState = toPressState.map(
      (state: boolean, index: number) => (index === currentIndex ? true : state)
    );
    const newLargen = largen;
    newLargen[currentIndex] = true;
    setLargen(newLargen);
    setToPressState(newSetToPressState);
    if (newSetToPressState.every((state: boolean) => state === true)) {
      setTimeout(() => {
        const newToPress = generateNewPress();
        setToPress(newToPress);
        setToPressState(Array(newToPress.length).fill(false));
        setLargen(Array(newToPress.length).fill(false));
        setCurrentIndex(0);
      }, 200);
    } else {
      setCurrentIndex(currentIndex + 1);
      setTimeout(() => {
        setLargen(Array(newLargen.length).fill(false));
      }, 100);
    }
  };

  const handleKeyEvent = (e: React.KeyboardEvent, isPressed: boolean) => {
    e.preventDefault();

    const key = e.key.toLowerCase();
    console.log(key);
    console.log(keyStates);
    if (isValidKey(key)) {
      handleKeyChange(key, isPressed);
      if (isPressed && !keyStates[key]) {
        if (key === toPress[currentIndex]) {
          handlePress();
        } else {
          setCurrentIndex(0);
          setToPressState(Array(toPressState.length).fill(false));
          setShake(true);
          setTimeout(() => setShake(false), 200);
        }
      }
    }
  };

  return (
    <div
      className={`outline-none relative p-8 rounded-lg bg-gray-900 min-h-[400px] shadow-xl ${
        shake ? "animate-shake" : ""
      }`}
      tabIndex={0}
      onKeyDown={(e) => {
        handleKeyEvent(e, true);
      }}
      onKeyUp={(e) => {
        handleKeyEvent(e, false);
      }}
      onFocus={() => {
        console.log("Controller focused");
        setFocus(true);
      }}
      onBlur={() => {
        setKeyStates({
          w: false,
          a: false,
          s: false,
          d: false,
        });
        setFocus(false);
      }}
    >
      <div className="flex flex-row space-x-10 h-64">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-2xl font-bold text-blue-400">{title}</h1>
          <div className="bg-gray-800 p-4 rounded-lg">
            <img src={icon} className="w-16 h-16" alt="Stratagem icon" />
          </div>
          <div className="flex flex-col items-center space-y-4 bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <label className="text-gray-300">Randomize Mode</label>
              <input
                name="randomize"
                type="checkbox"
                checked={randomize}
                className="w-4 h-4 accent-blue-500"
              />
            </div>
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 font-medium"
              onClick={() => setRandomize((prev) => !prev)}
            >
              Toggle Randomize
            </button>
          </div>
        </div>

        <div
          className={`flex flex-row items-center h-full transition-opacity duration-300 ${
            !isFocus ? "opacity-30" : "opacity-100"
          }`}
        >
          {toPress.map((el, num) => (
            <div key={num} className="mx-2 w-16 h-16">
              {el === "w" && (
                <div
                  className={`transform transition-transform duration-100 w-16 h-16 ${
                    largen[num] ? "scale-110" : ""
                  }`}
                >
                  <ArrowUp isActive={toPressState[num]} shake={shake} />
                </div>
              )}
              {el === "a" && (
                <div
                  className={`transform transition-transform duration-100 w-16 h-16 ${
                    largen[num] ? "scale-110" : ""
                  }`}
                >
                  <ArrowLeft isActive={toPressState[num]} shake={shake} />
                </div>
              )}
              {el === "s" && (
                <div
                  className={`transform transition-transform duration-100 w-16 h-16 ${
                    largen[num] ? "scale-110" : ""
                  }`}
                >
                  <ArrowDown isActive={toPressState[num]} shake={shake} />
                </div>
              )}
              {el === "d" && (
                <div
                  className={`transform transition-transform duration-100 w-16 h-16 ${
                    largen[num] ? "scale-110" : ""
                  }`}
                >
                  <ArrowRight isActive={toPressState[num]} shake={shake} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {!isFocus && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-red-500 text-3xl font-bold animate-pulse bg-black bg-opacity-75 px-6 py-3 rounded-lg">
            Click here to focus
          </span>
        </div>
      )}
    </div>
  );
};

export default HelldiverPanel;
