import {useState} from 'react'
import {evaluate} from 'mathjs'
import './App.css';

function App() {
  const [currentInput, setCurrentInput] = useState(["0"])
  const [previousInput, setPreviousInput] = useState([""])
  const [isFirstInput, setIsFirstInput] = useState(true)

  const numbers = [{"zero": "0"}, {"one": "1"}, {"two": "2"}, {"three": "3"},
  {"four": "4"}, {"five": "5"}, {"six": "6"}, {"seven": "7"}, {"eight": "8"},
  {"nine": "9"}, {"decimal": "."}]

  const operators = [{"add": "+"}, {"subtract": "-"}, {"multiply": "*"},
  {"divide": "/"}]

  const controls = [{"clear": "AC"}, {"equals": "="}]

  return (
    <div id="calculator">
      <div id="display">{currentInput}</div>
      <div id="controls">
        {controls.map((element, index) =>
          <CalcButton key={index} buttonId={Object.keys(element)}
          buttonDisplay={Object.values(element)} currentInput={currentInput}
          setCurrentInput={setCurrentInput} previousInput={previousInput}
          setPreviousInput={setPreviousInput} isFirstInput={isFirstInput}
          setIsFirstInput={setIsFirstInput}/>
        )}
      </div>
      <div id="numbers">
        {numbers.map((element, index) =>
          <CalcButton key={index} buttonId={Object.keys(element)}
          buttonDisplay={Object.values(element)} currentInput={currentInput}
          setCurrentInput={setCurrentInput} isFirstInput={isFirstInput}
          setIsFirstInput={setIsFirstInput}/>
        )}
      </div>
      <div id="operators">
        {operators.map((element, index) =>
          <CalcButton key={index} buttonId={Object.keys(element)}
          buttonDisplay={Object.values(element)} currentInput={currentInput}
          setCurrentInput={setCurrentInput} isFirstInput={isFirstInput}
          setIsFirstInput={setIsFirstInput} previousInput={previousInput}
          setPreviousInput={setPreviousInput}/>
        )}
      </div>
    </div>
  )
}
// component that handles button rendering and button functions
function CalcButton(props) {
  const isOperator = (char) =>
  (char === "+" || char === "-" || char === "*" || char === "/")
  ? true
  : false

  const isDecimalPresent = (element, i) => {
    if (isOperator(element[i])) {
      return false
    } else if (element[i] === ".") {
      return true
    } else if (element[i] === 0) {
      return false
    } else {
      isDecimalPresent(element, i - 1)
    }
  }

  const calculatorLogic = (arr) => {
    let newArr = arr.join("")
    return evaluate(newArr)
  }

  const clickHandler = (event) => {
    if (event.target.value === "AC") {
      props.setCurrentInput("0")
      props.setIsFirstInput(true)
    } else if (event.target.value === "=") {
      props.setCurrentInput(calculatorLogic(props.currentInput))
      props.setIsFirstInput(true)
      props.setPreviousInput([calculatorLogic(props.currentInput)])
    } else if (props.isFirstInput) {
      if (event.target.value === "0") {
        //
      } else if (isOperator(event.target.value)) {
        props.setCurrentInput(props.previousInput.concat([event.target.value]))
        props.setIsFirstInput(false)
      } else {
        props.setCurrentInput([event.target.value])
        props.setIsFirstInput(false)
      }
    } else if (event.target.value === "."
    && isDecimalPresent(props.currentInput, props.currentInput.length - 1) == false) {
      props.setCurrentInput(props.currentInput.concat([event.target.value]))
    } else {
        props.setCurrentInput(props.currentInput.concat([event.target.value]))
      }
    }

  return (
    <button id={props.buttonId} class="calcButton" value={props.buttonDisplay}
    onClick={clickHandler}>{props.buttonDisplay}</button>
  )
}

export default App;
