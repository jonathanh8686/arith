import React, { useState } from 'react';
import './App.css';
import { TitleScreen } from './components/Title/TitleScreen';
import { Difficulty } from './difficulty';
import {Game} from './components/Core/Game'
import { Statistics } from './statistics';
import { Results } from './components/Core/Results';

enum GameState {
  Title = 0,
  Active = 1,
  Results = 2
}

const App = () => {
  const [diff, setDiff] = useState(Difficulty.Medium);
  const [gameState, setGameState] = useState(GameState.Title);
  const [statistics, setStatistics] = useState<Statistics>({story: [], score: 0});

  const [gameKey, setGameKey] = useState(0);

  const startGame = () => {
    setGameState(GameState.Active);
  }

  const showResults = () => {
    setGameState(GameState.Results);
  }

  const showTitle = () => {
    setGameState(GameState.Title);
  }

  return (
    <>
    <div className="flex justify-center flex-col w-100 h-100">
      <div>
      {(gameState === GameState.Title) && <TitleScreen diff={diff} setDiff={setDiff} startGame={startGame}></TitleScreen>}
      {(gameState === GameState.Active) && <Game key={gameKey} diff={diff} showResults={showResults} returnToTitle={showTitle} setStatistics={setStatistics} restartGame={() => {setGameKey(gameKey => gameKey + 1)}}></Game>}
      {(gameState === GameState.Results) && <Results stats={statistics} showTitle={showTitle} startGame={startGame}></Results>}

      </div>
    </div>
    </>
  );
}

export default App;
