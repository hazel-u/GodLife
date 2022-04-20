import React from 'react';
import Bingo from './components/commons/Bingo/Bingo'


const exampleBingo  = [
  '일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼',
  '이삼사','삼사오','사오육','오육칠','육칠팔','칠팔구','팔','구'
]


function App() {
  return (
    <div className="App">
      <Bingo 
        size={ 9 }
        goals = { exampleBingo }
        isActive = { false }
      />
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
