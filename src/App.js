import Die from "./components/die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti';
import "./App.css";

function App() {
  const [tenzies, setTenzies] = React.useState(false);
  const [dice, setDice] = React.useState(allNewDice());

  React.useEffect(() => {
    let equal = true;
    let held = true;
    for (let i = 0; i < dice.length; i++) {
      if (dice[i].value !== dice[0].value) equal = false;
      if (!dice[i].isHeld) held = false;
    }
    if (equal && held) {
      setTenzies(true);
      console.log("you won!");
    }
  }, [dice]);

  function allNewDice() {
    const dieArray = [];
    for (let i = 0; i < 10; i++) {
      dieArray[i] = {
        id: nanoid(),
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
      };
    }
    return dieArray;
  }

  const die = dice.map((die) => {
    return (
      <Die
        key={die.id}
        id={die.id}
        value={die.value}
        isheld={die.isHeld}
        hold={holdDice}
      />
    );
  });

  function handleClick() {
    if(!tenzies){
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld
          ? die
          : {
              id: nanoid(),
              value: Math.floor(Math.random() * 6) + 1,
              isHeld: false,
            };
      })
    );}
    else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <main>
      {tenzies&&<Confetti/>}
      <h1>Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{die}</div>
      <button className="roll" onClick={handleClick}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
