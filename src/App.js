import {useState} from 'react'
import {evaluate} from 'mathjs'
import './App.css';

function App() {
  // state that will contain the current input that the user enters until either
  // = or AC is pressed
  const [currentInput, setCurrentInput] = useState(["0"])
  // state that contains the previous input the user entered so we can perform
  // further calculations on it if needed
  const [previousInput, setPreviousInput] = useState([""])
  // state that contains a boolean stating whether or not the button the user is
  // pressing is the first in a new input sequence
  const [isFirstInput, setIsFirstInput] = useState(true)
  // array of objects that countains the info needed to create buttons in the
  // order that they should be rendered
  const buttons = [{"clear": "AC"}, {"divide": "/"}, {"multiply": "*"},
  {"seven": "7"}, {"eight": "8"}, {"nine": "9"}, {"subtract": "-"},
  {"four": "4"}, {"five": "5"}, {"six": "6"}, {"add": "+"}, {"one": "1"},
  {"two": "2"}, {"three": "3"}, {"zero": "0"}, {"decimal": "."},
  {"equals": "="}]

  return (
    <div id="calculator">
      <div id="display-wrapper">
        <div id="display-previous">{previousInput}</div>
        <div id="display">{currentInput}</div>
      </div>
      <div id="buttons">
        {buttons.map((element, index) =>
          <CalcButton key={index} buttonId={Object.keys(element)}
          buttonDisplay={Object.values(element)} currentInput={currentInput}
          setCurrentInput={setCurrentInput} previousInput={previousInput}
          setPreviousInput={setPreviousInput} isFirstInput={isFirstInput}
          setIsFirstInput={setIsFirstInput}/>
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
  // helper function that returns a new input array if operation is !possible
  const newInputArray = (value) => {
    let newArr = props.currentInput
    newArr[newArr.length - 1] = value
    if (isOperationPossible(newArr[newArr.length - 1], newArr[newArr.length - 2])) {
      return newArr
    } else {
      newArr.splice(-2, 1)
      return newArr
    }
  }
  // helper function that uses the mathjs library to handle string evaluation
  const calculatorLogic = (arr) => {
    let newArr = arr.join("")
    return evaluate(newArr)
  }
  // decision tree
  const decisionTree = (value) => {
    if (value === "AC") {
      props.setCurrentInput(["0"])
      props.setIsFirstInput(true)
    } else if (value === "=") {
      let answer = calculatorLogic(props.currentInput)
      props.setCurrentInput(answer)
      props.setIsFirstInput(true)
      // sets previous input as an array so we can concat in the future if
      // we need to
      props.setPreviousInput([answer])
    } else if (props.isFirstInput) {
      if (value === "0") {
        //
      } else if (isOperator(value)) {
        props.setCurrentInput(props.previousInput.concat([value]))
        props.setIsFirstInput(false)
      } else {
        props.setCurrentInput([value])
        props.setPreviousInput([""])
        props.setIsFirstInput(false)
      }
    } else if (value === "."
    && isDecimalPresent(props.currentInput, props.currentInput.length - 1)) {
      //
    } else if (isOperator(value) && !isOperationPossible(value, props.currentInput[props.currentInput.length - 1])) {
        let newArray = newInputArray(value)
        props.setCurrentInput(newArray)
    } else {
        props.setCurrentInput(props.currentInput.concat([value]))
    }
  }
  // event listener that handles keypresses
  window.addEventListener('keydown', (event) => {
    console.log(event.key)
    // console.log(props.value)
    // decisionTree(event.key)
  })
  // function that handles button clicks
  const clickHandler = (event) => {
    decisionTree(event.target.value)
  }

  return (
    <button id={props.buttonId} class="calcButton" value={props.buttonDisplay}
    onClick={clickHandler}>{props.buttonDisplay}</button>
  )
}

export default App;
