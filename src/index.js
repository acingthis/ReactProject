import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

let Winner = "";
function EndGame(Players) {

  if (Players.Player1 === Players.Player2)
  {
    //Tie
    Winner = "Tie";
    console.log("Tie");
    alert("The Game is a Tie");
  }
  else if (Players.Player1 > Players.Player2)
  {
    //Player1
    Winner = "Player1";
    console.log("Player1");
    alert("PLayer 1, You have Won");
  }
  else
  {
    //Player2
    Winner = "Player2";
    console.log("Player2");
    alert("PLayer 2, You have Won");
  }

}

function Nav(Players) {

  if (Players.start && (Players.Player1 === 0 || Players.Player2 === 0))
  {
    EndGame(Players);
  }
  else
  {
    Players.setStart(true);
  }

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


function FetchAPI(index,setPlayer) {

    fetch("http://localhost:8080/home/filmId/" + index)
        .then((res) => res.json())
        .then((result) => {
            setPlayer(result);
    })
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

  if (index.setChoosen != null)
  {
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
          <button className='Choices' onClick={() => index.setChoosen(false)}>Ok</button>
        </div>
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

function Option(choice,P1,setPlayer1,P2,setPlayer2,setChanged) {

  FetchAPI (P1[0],setPlayer1);
  FetchAPI (P2[0],setPlayer2);

  setChanged(choice);
}

function Rating(PRating)
{
  let RatingNum = 0;

  if (PRating === "G")
  {
    RatingNum = 1;
  }
  else if (PRating === "PG")
  {
    RatingNum = 2;
  }
  else if (PRating === "PG-13")
  {
    RatingNum = 3;
  }
  else if (PRating === "R")
  {
    RatingNum = 4;
  }
  else if (PRating === "NC-17")
  {
    RatingNum = 5;
  }

  return RatingNum;
}

function StackDecks (choice,P1,Player1,P2,Player2,setChanged,CardData){

  if (choice === "rating")
  {
    let P1Rating = Rating(Player1.rating);
    let P2Rating = Rating(Player2.rating);
    console.log("rating")
    if(P1Rating > P2Rating)
    {
      P1[P1.length] = P2[0];
      P1[P1.length] = P1[0];
      CardData.setCurrentPlayer1(CardData.CurrentPlayer1 + 1)
      CardData.setCurrentPlayer2(CardData.CurrentPlayer2 - 1)
    }
    else
    {
      P2[P2.length] = P1[0];
      P2[P2.length] = P2[0];
      CardData.setCurrentPlayer1(CardData.CurrentPlayer1 - 1)
      CardData.setCurrentPlayer2(CardData.CurrentPlayer2 + 1)
    }
  }
  else if (choice === "length")
  {
    console.log("length")
    if(Player1.length > Player2.length)
    {
      P1[P1.length] = P2[0];
      P1[P1.length] = P1[0];
      CardData.setCurrentPlayer1(CardData.CurrentPlayer1 + 1)
      CardData.setCurrentPlayer2(CardData.CurrentPlayer2 - 1)
    }
    else
    {
      P2[P2.length] = P1[0];
      P2[P2.length] = P2[0];
      CardData.setCurrentPlayer1(CardData.CurrentPlayer1 - 1)
      CardData.setCurrentPlayer2(CardData.CurrentPlayer2 + 1)
    }
  }
  else if (choice === "rate")
  {
    console.log("rate")
    if(Player1.rentalRate > Player2.rentalRate)
    {
      P1[P1.length] = P2[0];
      P1[P1.length] = P1[0];
      CardData.setCurrentPlayer1(CardData.CurrentPlayer1 + 1)
      CardData.setCurrentPlayer2(CardData.CurrentPlayer2 - 1)
    }
    else
    {
      P2[P2.length] = P1[0];
      P2[P2.length] = P2[0];
      CardData.setCurrentPlayer1(CardData.CurrentPlayer1 - 1)
      CardData.setCurrentPlayer2(CardData.CurrentPlayer2 + 1)
    }
  }
  else if (choice === "duration")
  {
    console.log("duration")
    if(Player1.rentalDuration > Player2.rentalDuration)
    {
      P1[P1.length] = P2[0];
      P1[P1.length] = P1[0];
      CardData.setCurrentPlayer1(CardData.CurrentPlayer1 + 1)
      CardData.setCurrentPlayer2(CardData.CurrentPlayer2 - 1)
    }
    else
    {
      P2[P2.length] = P1[0];
      P2[P2.length] = P2[0];
      CardData.setCurrentPlayer1(CardData.CurrentPlayer1 - 1)
      CardData.setCurrentPlayer2(CardData.CurrentPlayer2 + 1)
    }
  }
  else if (choice === "cost")
  {
    console.log("cost")
    if(Player1.replacementCost > Player2.replacementCost)
    {
      P1[P1.length] = P2[0];
      P1[P1.length] = P1[0];
      CardData.setCurrentPlayer1(CardData.CurrentPlayer1 + 1)
      CardData.setCurrentPlayer2(CardData.CurrentPlayer2 - 1)
    }
    else
    {
      P2[P2.length] = P1[0];
      P2[P2.length] = P2[0];
      CardData.setCurrentPlayer1(CardData.CurrentPlayer1 - 1)
      CardData.setCurrentPlayer2(CardData.CurrentPlayer2 + 1)
    }
  }
  else
  {
    console.log("None")
  }
  setChanged(null)
}

function Cards(CardData) {
  
  const [Player1, setPlayer1] = useState(null);
  const [Player2, setPlayer2] = useState(null);
  const [Changed, setChanged] = useState(null);

  const P1Indexs = {};
  const P2Indexs = {};

  const [Setup, setSetup] = useState(false);

  if (!Setup)
  {
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
  }

  const [Choosen, setChoosen] = useState(false);

  if (Changed != null && Player1 != null && Player2 != null)
  {
    StackDecks(Changed,P1Indexs,Player1,P2Indexs,Player2,setChanged,CardData);
    setChoosen(true)
  }


  if (Choosen)
  {
    return(
      <div className='Cards'>
        <div className='Player Left'>
          <GetCard index={P1Indexs[0]}/>
        </div>
        <div className='Player Right'>
          <GetCard index={P2Indexs[0]} setChoosen={setChoosen}/>
        </div>
      </div>
    );
  }
  else
  {
    return(
      <div className='Cards'>
        <div className='Player Left'>
          <GetCard index={P1Indexs[0]}/>
        </div>
        <div className='Player Right'>
          <div className='CardData'>
          <hr/>
          <h2 id='RightPlayer'>What value do you think will win?</h2>
          <hr/>
          </div>
          <div className='center'>
            <button className='Choices' onClick={() => Option("rating",P1Indexs,setPlayer1,P2Indexs,setPlayer2,setChanged)}>Rating</button> <br/>
            <button className='Choices' onClick={() => Option("length",P1Indexs,setPlayer1,P2Indexs,setPlayer2,setChanged)}>Length</button> <br/>
            <button className='Choices' onClick={() => Option("rate",P1Indexs,setPlayer1,P2Indexs,setPlayer2,setChanged)}>Rental Rate</button> <br/>
            <button className='Choices' onClick={() => Option("duration",P1Indexs,setPlayer1,P2Indexs,setPlayer2,setChanged)}>Rental Duration</button> <br/>
            <button className='Choices' onClick={() => Option("cost",P1Indexs,setPlayer1,P2Indexs,setPlayer2,setChanged)}>Replacement Cost</button> <br/>
          </div> 
        </div>
      </div>
    );
  }
}

function Container() {

  const [Player1, setPlayer1] = useState(0);
  const [Player2, setPlayer2] = useState(0);

  let CardNum = 50;

  useEffect(() => {
    setPlayer1(CardNum/2)
    setPlayer2(CardNum/2)
  },[])

  const [start, setStart] = useState(false);
  
  return(
    <div>
      <Nav Player1={Player1} setPlayer1={setPlayer1} Player2={Player2} setPlayer2={setPlayer2} start={start} setStart={setStart}/>
      <Cards CardNum={CardNum} CurrentPlayer1={Player1} setCurrentPlayer1={setPlayer1} CurrentPlayer2={Player2} setCurrentPlayer2={setPlayer2}/>
    </div>
  );
}


//export default Container;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Container />);
