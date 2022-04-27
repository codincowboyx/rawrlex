import React, { useState } from 'react';
import rawrlex from './rawrlex.png';
import Input from '@mui/material/Input';
import './App.css';
import Button from '@mui/material/Button';

function App() {
  const [dinoId, setDinoId] = useState(1);

  return (
    <div className="App">
      <header className="App-header">
        <img src={"https://raw.githubusercontent.com/tinydinosnft/tinydinosassets/426fc34fe5df44e11c8eea51ce1b56dd414a809a/images/branding/1600x1600/logo-transparent.png"} className="App-logo" alt="logo" />
        <img src={rawrlex} className="App-header-logo" />
      </header>
      <div className="App-button-group">
        <h3 className='Input-label'>Input Dino ID:</h3>
        <Input variant="outlined" 
          value={dinoId}
          onChange={(e) => {
            setDinoId(e.target.value);
          }}/>
        <Button onClick={() => { window.print() }} variant="contained" sx={{ marginTop: "20px" }}>Print</Button>
      </div>
      <div className='Rawrlex-container'>
        <div className='dashed-container'>
          <div className='solid-container'>
            <div className='watch-face'>
              <img src={`https://raw.githubusercontent.com/tinydinosnft/tinydinosassets/main/images/dinos/1600x1600/transparent/${dinoId}.png`} className="Rawrlex-dino-img" alt="logo" />
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
  );
}

export default App;
