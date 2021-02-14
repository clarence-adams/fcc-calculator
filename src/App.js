import {useState} from 'react'
import './App.css';

function App() {
  const [display, setDisplay] = useState("0")
  return (
    <div id="calculator">
      <div id="display">{display}</div>
      <button id="clear">AC</button>
      <button id="equals">=</button>
      <div id="numbers">
        <button id="zero">0</button>
        <button id="one">1</button>
        <button id="two">2</button>
        <button id="three">3</button>
        <button id="four">4</button>
        <button id="five">5</button>
        <button id="six">6</button>
        <button id="seven">7</button>
        <button id="eight">8</button>
        <button id="nine">9</button>
        <button id="decimal">.</button>
      </div>
      <div id="operators">
        <button id="add">+</button>
        <button id="subtract">-</button>
        <button id="multiply">X</button>
        <button id="divide">/</button>
      </div>
    </div>
  )
}

export default App;
