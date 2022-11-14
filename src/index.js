import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

let Player1Cards = 0;
let Player2Cards = 0;

function EndGame(){

}

function Nav() {

  return(
    <div className='Nav'>
      <ul>
        <li className='PlayerCount'><p>Player 1: {Player1Cards}</p></li>
        <li className='PlayerCount'><p>Player 2: {Player2Cards}</p></li>
        <li className='EndGameButton'><button onClick={() => <EndGame/>}>End Game</button></li>
      </ul>
    </div>
  );
} 


function FetchAPI() {

  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  console.log("Load");

  useEffect(() => {
    console.log("Use");
    fetch("http://localhost:8080/home/filmId/1")
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            setData(result);
            setLoaded(true);
    })
  },[])

  if (!loaded)
  {
    return (
      <div className='center'>
        <p>Data unavailable</p>
      </div>
    );
  }

  return (
    <div className=''>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
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

function Cards() {
  
  return(
    <div className='Cards'>
      <div className='Player Left'>
        <FetchAPI />
      </div>
      <div className='Player Right'>
        <div className='center'>
          <button className='Choices'>Rating</button> <br/>
          <button className='Choices'>Length</button> <br/>
          <button className='Choices'>Rental Rate</button> <br/>
          <button className='Choices'>Rental Duration</button> <br/>
          <button className='Choices'>Replacement Cost</button> <br/>
        </div> 
      </div>
    </div>
  );
}

function Container() {

  return(
    <div>
      <Nav />
      <Cards />
    </div>
  );
}


//export default Container;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Container />);
