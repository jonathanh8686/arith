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
    <div className="w-100 h-100">
      {(gameState === GameState.Title) && <TitleScreen diff={diff} setDiff={setDiff} startGame={startGame}></TitleScreen>}
      {(gameState === GameState.Active) && <Game diff={diff} showResults={showResults} setStatistics={setStatistics}></Game>}
      {(gameState === GameState.Results) && <Results stats={statistics} showTitle={showTitle} startGame={startGame}></Results>}
    </div>
    </>
  );
}

export default App;
