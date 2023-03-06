import React, { useState } from 'react';
import './App.css';
import { TitleScreen } from './components/Title/TitleScreen';
import { Difficulty } from './difficulty';

const App = () => {

  const [diff, setDiff] = useState(Difficulty.Medium);

  

  return (
    <div className="text-center p-5">
      <TitleScreen diff={diff} setDiff={setDiff}></TitleScreen>
    </div>
  );
}

export default App;
