import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

let Winner = "";
function EndGame(Players){
  
  if (Players.Player1 === Players.Player2)
  {
    //Tie
    Winner = "Tie";
    console.log("Tie")
  }
  else if (Players.Player1 > Players.Player2)
  {
    //Player1
    Winner = "Player1";
    console.log("Player1")
  }
  else
  {
    //Player2
    Winner = "Player2";
    console.log("Player2")
  }
  
}

function Nav(Players) {

  return(
    <div className='Nav'>
      <ul>
        <li className='PlayerCount'><p>Player 1: {Players.Player1}</p></li>
        <li className='PlayerCount'><p>Player 2: {Players.Player2}</p></li>
        <li className="TieCount"><p>Tie Stack: </p></li>
        <li className="Winner"><p>Winner: {Winner}</p></li>
        <li className='EndGameButton'><button onClick={() => EndGame(Players)}>End Game</button></li>
      </ul>
    </div>
  );
} 


function FetchAPI(Players) {

  console.log("Fetch")
  console.log(Players)

  console.log("Fetchy")

  useEffect(() => {
    fetch("http://localhost:8080/home/filmId/" + Players.index)
        .then((res) => res.json())
        .then((result) => {
            Players.setPlayer(result);
    })
  },[]);
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

function Option(choice,P1,P2) {

  //Doesn't work!!!!!

  const [Player1, setPlayer1] = useState(null);
  const [Player2, setPlayer2] = useState(null);

  <><FetchAPI index={P1[0]} setPlayer={setPlayer1} />
  <FetchAPI index={P2[0]} setPlayer={setPlayer2} /></>
  

  //let Player1 = FetchAPI (P1[0],"rating");
  console.log(Player1)

  console.log("Player1")
  console.log(Player1.rating)


  if (choice === "rating")
  {
    console.log("rating")
    if(P1[0] > P2[0])
    {
      P1[25] = P2[0];
      P1[26] = P1[0];
    }
    else
    {
      P2[25] = P1[0];
      P2[26] = P2[0];
    }
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

  const P1Indexs = {};
  const P2Indexs = {};

  let CardNum = CardData.CardNum;
  let rand = Math.floor( Math.random() * ((1000 -CardNum) - 1) + 1);

  for(let i = 0; i < CardNum/2; i++)
  {
    P1Indexs[i] = rand + i;
  }
  for(let i = 0; i < CardNum/2; i++)
  {
    P2Indexs[i] = rand + i + (CardNum/2);
  }
  
  return(
    <div className='Cards'>
      <div className='Player Left'>
        <GetCard index={P1Indexs[0]}/>
      </div>
      <div className='Player Right'>
        <div className='CardData'>
        <hr/>
        <h2 id='RightPlayer'>Choose a value you wish to use</h2>
        <hr/>
        </div>
        <div className='center'>
          <button className='Choices' onClick={() => Option("rating",P1Indexs,P2Indexs)}>Rating</button> <br/>
          <button className='Choices' onClick={() => Option("length",P1Indexs,P2Indexs)}>Length</button> <br/>
          <button className='Choices' onClick={() => Option("rate",P1Indexs,P2Indexs)}>Rental Rate</button> <br/>
          <button className='Choices' onClick={() => Option("duration",P1Indexs,P2Indexs)}>Rental Duration</button> <br/>
          <button className='Choices' onClick={() => Option("cost",P1Indexs,P2Indexs)}>Replacement Cost</button> <br/>
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
      <Nav Player1={Player1} setPlayer1={setPlayer1} Player2={Player2} setPlayer2={setPlayer2}/>
      <Cards CardNum={CardNum}/>
    </div>
  );
}


//export default Container;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Container />);
