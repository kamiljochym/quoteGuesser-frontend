import './App.css';
import React, {useState} from 'react'
import axios from 'axios'

function App() {

  const [ quoteInfo, setQuoteInfo ] = useState('')
  const [ choices, setChoices ] = useState([])

  const generateQuote = () => {
    document.getElementsByClassName('choice0')[0].style.backgroundColor = "";
    document.getElementsByClassName('choice1')[0].style.backgroundColor = "";
    document.getElementsByClassName('choice2')[0].style.backgroundColor = "";
    document.getElementsByClassName('choice3')[0].style.backgroundColor = "";

    const tempChoices = []
    axios
      .get('http://localhost:3001/quote')
      .then(response => {
        const data = response.data
        setQuoteInfo(data[0])
        tempChoices.push(data[0][2])    
        return axios.get('http://localhost:3001/quote')
      })
      .then(response => {
        tempChoices.push(response.data[0][2])    
        return axios.get('http://localhost:3001/quote')
      })
      .then(response => {
        tempChoices.push(response.data[0][2])    
        return axios.get('http://localhost:3001/quote')
      })
      .then(response => {
        tempChoices.push(response.data[0][2])   
        let shuffledtempChoices = tempChoices.sort(() => (Math.random() > .5) ? 1 : -1); 
        setChoices(shuffledtempChoices)
      })
  }

  const checkCorrect = (idx) => {
    const correctAnswer = quoteInfo[2]
    if (correctAnswer === choices[idx]) {
      console.log("correct");
      document.getElementsByClassName('choice'+idx)[0].style.backgroundColor = "green";

    }
    else {
      console.log("wrong");
      document.getElementsByClassName('choice'+idx)[0].style.backgroundColor = "red";
    }

  }
  

  return (
    <div className="wrapper">
      <button onClick={generateQuote}>next quote</button>
      <div className="quote">
        {quoteInfo[1]}
      </div>
      <div className="choices-wrapper">
          <div className="choice0" onClick={() => checkCorrect(0)}>{choices[0]}</div>
          <div className="choice1" onClick={() => checkCorrect(1)}>{choices[1]}</div>
          <div className="choice2" onClick={() => checkCorrect(2)}>{choices[2]}</div>
          <div className="choice3" onClick={() => checkCorrect(3)}>{choices[3]}</div>
      </div>
    </div>
  )
}

export default App;
