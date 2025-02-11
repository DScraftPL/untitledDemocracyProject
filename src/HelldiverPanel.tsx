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
  const [icon, setIcon] = useState<string>("HelldiversIcons/General Stratagems/SEAF Artillery.svg");
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
      setIcon(toDisplay.icon)
    }
    return arr;
  };

  const handlePress = () => {
    const newSetToPressState = toPressState.map(
      (state: boolean, index: number) => (index === currentIndex ? true : state)
    );
    setToPressState(newSetToPressState);
    if (newSetToPressState.every((state: boolean) => state === true)) {
      const newToPress = generateNewPress();
      setToPress(newToPress);
      setToPressState(Array(newToPress.length).fill(false));
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
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
      className={`outline-none relative p-4 text-white ${
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
      <h1>{title}</h1>
      <img src={icon} className="w-16 h-16"></img>
      {!isFocus && (
        <span className="absolute inset-0 flex items-start justify-center pt-4 text-red-800 text-3xl text-center">
          Click here to focus
        </span>
      )}

      <div className="flex flex-row space-x-10 py-10">
        {toPress.map((el, num) => {
          switch (el) {
            case "w":
              return <ArrowUp isActive={toPressState[num]} shake={shake} />;
              break;
            case "a":
              return <ArrowLeft isActive={toPressState[num]} shake={shake} />;
              break;
            case "s":
              return <ArrowDown isActive={toPressState[num]} shake={shake} />;
              break;
            case "d":
              return <ArrowRight isActive={toPressState[num]} shake={shake} />;
              break;
            default:
              break;
          }
        })}
      </div>
      <div className=" space-x-4 pt-10">
        <label className="">randomize?</label>
        <input name="randomize" type="checkbox" checked={randomize}></input>
        <button className="" onClick={() => setRandomize((prev) => !prev)}>
          Toggle Randomize
        </button>
      </div>
    </div>
  );
};

export default HelldiverPanel;
