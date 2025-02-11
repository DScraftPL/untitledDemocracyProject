import { useState, useCallback } from "react";


import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "./Components/Arrows";

type KeyState = {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
};

type ValidKey = keyof KeyState;

const isValidKey = (key: string): key is ValidKey => {
  return key === "w" || key === "a" || key === "s" || key === "d";
};

const generateNewPress = (num: number) => {
  const keys = ["w", "a", "s", "d"];
  const randomizedArray: string[] = [];

  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * keys.length);
    randomizedArray.push(keys[randomIndex]);
  }

  return randomizedArray;
};

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const HelldiverPanel = ({divRef}) => {
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

  const handleKeyChange = useCallback((key: ValidKey, isPressed: boolean) => {
    setKeyStates((prev) => ({ ...prev, [key]: isPressed }));
  }, []);

  const handlePress = () => {
    const newSetToPressState = toPressState.map(
      (state: boolean, index: number) => (index === currentIndex ? true : state)
    );
    setToPressState(newSetToPressState);
    if (newSetToPressState.every((state: boolean) => state === true)) {
      const rand = getRandomNumber(5, 10);
      setToPress(generateNewPress(rand));
      setToPressState(Array(rand).fill(false));
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
        if(key === toPress[currentIndex]){
          handlePress();
        } else {
          setCurrentIndex(0);
          setToPressState(Array(toPressState.length).fill(false));
        }
      }
    }
  };

  return (
    <div
      ref={divRef}
      className="p-8"
      tabIndex={0}
      onKeyDown={(e) => {
        handleKeyEvent(e, true);
      }}
      onKeyUp={(e) => {
        handleKeyEvent(e, false);
      }}
      onFocus={() => console.log("Controller focused")}
      onBlur={() => {
        setKeyStates({
          w: false,
          a: false,
          s: false,
          d: false,
        });
      }}
    >
      <div className="flex flex-row">
        {toPress.map((el, num) => {
          switch (el) {
            case "w":
              return <ArrowUp isActive={toPressState[num]} />;
              break;
            case "a":
              return <ArrowLeft isActive={toPressState[num]} />;
              break;
            case "s":
              return <ArrowDown isActive={toPressState[num]} />;
              break;
            case "d":
              return <ArrowRight isActive={toPressState[num]} />;
              break;
            default:
              break;
          }
        })}
      </div>
    </div>
  );
};

export default HelldiverPanel;
