import "./styles.css";
import { useState } from "react";
import symbols from "./Symbols.js";

export default function App() {
  const initialNewArrayState = () => {
    const tempArray = Array.from({ length: 16 }, () => null); // Initialize with null values

    const getRandom = () => {
      let generatedRandom = Math.floor(Math.random() * 16);
      if (tempArray[generatedRandom] !== null) {
        return getRandom(); // Ensure uniqueness
      }
      return generatedRandom;
    };

    symbols.forEach((icon) => {
      let indexOne = getRandom();
      tempArray[indexOne] = { icon: icon, clicked: false };

      let indexTwo = getRandom();
      tempArray[indexTwo] = { icon: icon, clicked: false };
    });

    return tempArray; // Populate and return the array
  };

  const [newArr, setNewArr] = useState(initialNewArrayState);

  const [countOpen, setCountOpen] = useState([]);
  const [clickCounter, setClickCounter] = useState(0);

  const onClickHandler = (el, index) => {
    if (el.clicked) {
      return;
    }
    setClickCounter((prev) => prev + 1);

    if (!countOpen.length) {
      //insert the index
      //change the value to true for click
      setCountOpen((prev) => [...prev, index]);
    } else {
      if (countOpen.length < 2) {
        let match = countOpen.filter((elem) => newArr[elem].icon === el.icon);
        if (match.length) {
          setNewArr((prev) => {
            let newArr = [...prev];
            newArr[index].clicked = true;
            newArr[match].clicked = true;
            return newArr;
          });
        } else {
          setCountOpen((prev) => [...prev, index]);
        }
      } else if (countOpen.length === 2) {
        setCountOpen([index]);
      }
    }
  };

  const onReset = () => {
    setClickCounter(0);
    setCountOpen([]);
    setNewArr(initialNewArrayState);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div className="container">
        {newArr.map((el, index) => (
          <div
            key={index}
            className={`item ${
              el.clicked || countOpen.includes(index) ? "clicked" : "unclicked"
            }`}
            style={{
              width: "50px",
              height: "50px",
              margin: "5px",
              visibility: el ? "visible" : "hidden", // Hide empty slots
            }}
            onClick={() => {
              onClickHandler(el, index);
            }}
          >
            <span>
              {el.clicked || countOpen.includes(index) ? el.icon : ""}
            </span>
          </div>
        ))}
      </div>
      <div className="attempts">
        <div> Attempts : {clickCounter} </div>
        <button onClick={onReset}>Reset</button>
        {newArr.every((el) => el.clicked === true) && <> Congradulations </>}
      </div>
    </div>
  );
}
