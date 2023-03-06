import React, { useState } from 'react';
import './App.css';
import { TitleScreen } from './components/Title/TitleScreen';
import { Difficulty } from './difficulty';
import {Game} from './components/Core/Game'

enum GameState {
  Title = 0,
  Active = 1
}

const App = () => {
  const [diff, setDiff] = useState(Difficulty.Medium);
  const [gameState, setGameState] = useState(GameState.Title);
  const startGame = () => {
    setGameState(GameState.Active);
  }

  return (
    <>
      {(gameState === GameState.Title) && <TitleScreen diff={diff} setDiff={setDiff} startGame={startGame}></TitleScreen>}
      {(gameState === GameState.Active) && <Game diff={diff}></Game>}
    </>
  );
}

export default App;
