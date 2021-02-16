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
  // helper function that returns true if char that is passed is an operator
  const isOperator = (char) =>
  (char === "+" || char === "-" || char === "*" || char === "/")
  ? true
  : false
  // helper function that returns true if another decimal is already present in
  // the last number that was entered into the currentInput state
  const isDecimalPresent = (currentInputArray, i) => {
    if (isOperator(currentInputArray[i])) {
      return false
    } else if (currentInputArray[i] === ".") {
      return true
    } else if (i == 0) {
      return false
    } else {
      return isDecimalPresent(currentInputArray, i - 1)
    }
  }
  // helper function that returns true if the previous char in currentInput
  // state does not conflict with the char being entered
  const isOperationPossible = (currentChar, previousChar) => {
    return (isOperator(previousChar) && currentChar !== "-") ? false
    : true
  }
  // helper function that uses the mathjs library to handle string evaluation
  const calculatorLogic = (arr) => {
    let newArr = arr.join("")
    return evaluate(newArr)
  }
  // function that handles button clicks
  const clickHandler = (event) => {
    if (event.target.value === "AC") {
      props.setCurrentInput(["0"])
      props.setIsFirstInput(true)
    } else if (event.target.value === "=") {
      props.setCurrentInput(calculatorLogic(props.currentInput))
      props.setIsFirstInput(true)
      // sets previous input as an array so we can concat in the future if
      // we need to
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
    && isDecimalPresent(props.currentInput, props.currentInput.length - 1)) {
      //
    } else if (isOperator(event.target.value) && !isOperationPossible(event.target.value, props.currentInput[props.currentInput.length - 1])) {
        props.setCurrentInput(() => {
          let newArr = props.currentInput
          newArr[newArr.length - 1] = event.target.value
          if (isOperationPossible(newArr[newArr.length - 1], newArr[newArr.length - 2])) {
            return newArr
          } else {
            newArr.splice(-1, 1)
            return newArr
          }
        })
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
