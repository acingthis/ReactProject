import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


//ToDo
function EndGame(){
  /*
  let Winner = "";

  if (Player1Cards === Player2Cards)
  {
    //Tie
    Winner = "Tie";
  }
  else if (Player1Cards > Player2Cards)
  {
    //Player1
    Winner = "Player1";
  }
  else
  {
    //Player2
    Winner = "Player2";
  }
  */
}

function Nav(Players) {

  return(
    <div className='Nav'>
      <ul>
        <li className='PlayerCount'><p>Player 1: {Players.Player1}</p></li>
        <li className='PlayerCount'><p>Player 2: {Players.Player2}</p></li>
        <li className='TieCount'><p>Tie Stack: </p></li>
        <li className='Winner'><p>Winner:</p></li>
        <li className='EndGameButton'><button onClick={() => <EndGame/>}>End Game</button></li>
      </ul>
    </div>
  );
} 


function GetCard(index) {

  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/home/filmId/" + index.index)
        .then((res) => res.json())
        .then((result) => {
            setData(result);
            setLoaded(true);
    })
  },[]);

  if (!loaded)
  {
    return (
      <div className='center'>
        <p>Data unavailable</p>
      </div>
    );
  }

  return (
    <div className='CardData'>
      <hr/> 
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <hr/> 
      <br/><br/><br/><br/>
      <br/><br/><br/><br/>
      <div className='center'>
        <p className='Data'>Rating:           {data.rating}</p>
        <p className='Data'>Length:           {data.length}</p>
        <p className='Data'>Rental Rate:      {data.rentalRate}</p>
        <p className='Data'>Rental Duration:  {data.rentalDuration}</p>
        <p className='Data'>Replacement Cost: {data.replacementCost}</p>
      </div>
    </div>
  );
}

function Option(choice) {
  if (choice === "rating")
  {
    console.log("rating")
  }
  else if (choice === "length")
  {
    console.log("length")
  }
  else if (choice === "rate")
  {
    console.log("rate")
  }
  else if (choice === "duration")
  {
    console.log("duration")
  }
  else if (choice === "cost")
  {
    console.log("cost")
  }
  else
  {
    console.log("None")
  }

}

function Cards(CardData) {

  const CardIndexes = {};

  let CardNum = CardData.CardNum;
  let rand = Math.floor( Math.random() * ((1000 -CardNum) - 1) + 1);

  for(let i = 0; i < CardNum; i++)
  {
    CardIndexes[i] = rand + i;
  }
  
  return(
    <div className='Cards'>
      <div className='Player Left'>
        <GetCard index={CardIndexes[0]}/>
      </div>
      <div className='Player Right'>
        <div className='CardData'>
        <hr/>
        <h2 id='RightPlayer'>Choose a value you wish to use</h2>
        <hr/>
        </div>
        <div className='center'>
          <button className='Choices' onClick={() => Option("rating")}>Rating</button> <br/>
          <button className='Choices' onClick={() => Option("length")}>Length</button> <br/>
          <button className='Choices' onClick={() => Option("rate")}>Rental Rate</button> <br/>
          <button className='Choices' onClick={() => Option("duration")}>Rental Duration</button> <br/>
          <button className='Choices' onClick={() => Option("cost")}>Replacement Cost</button> <br/>
        </div> 
      </div>
    </div>
  );
}

function Container() {

  const [Player1, setPlayer1] = useState(0);
  const [Player2, setPlayer2] = useState(0);

  let CardNum = 50;

  useEffect(() => {
    setPlayer1(CardNum/2)
    setPlayer2(CardNum/2)
  },[])

  
  return(
    <div>
      <Nav Player1={Player1} Player2={Player2}/>
      <Cards CardNum={CardNum}/>
    </div>
  );
}


//export default Container;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Container />);
