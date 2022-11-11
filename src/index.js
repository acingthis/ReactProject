import React from 'react';
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
        <button className='Choices'>Year</button> <br/>
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



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Container />);
