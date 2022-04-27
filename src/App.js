import React, { useState } from 'react';
import rawrlex from './rawrlex.png';
import Input from '@mui/material/Input';
import './App.css';
import Button from '@mui/material/Button';
import ColorPicker from 'material-ui-color-picker';
import { Slider } from '@mui/material';

function App() {
  const [dinoId, setDinoId] = useState(1);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(100);

  return (
    <div className="App">
      <header className="App-header">
        <img src={"https://raw.githubusercontent.com/tinydinosnft/tinydinosassets/426fc34fe5df44e11c8eea51ce1b56dd414a809a/images/branding/1600x1600/logo-transparent.png"} className="App-logo" alt="logo" />
        <img src={rawrlex} className="App-header-logo" alt="logo" />
      </header>
      <div className="App-button-group">
        <h3 className='Input-label'>Input Dino ID:</h3>
        <Input variant="outlined" 
          value={dinoId}
          onChange={(e) => {
            setDinoId(e.target.value);
          }}/>
        <div className='Color-picker-container'>
          <h3 className='Input-label'>Choose Color:</h3>
          <ColorPicker value={color} variant="outlined" TextFieldProps={{ value: color }} onChange={colorVal => {
              setColor(colorVal);
            }} />
        </div>
        <div className='Size-slider-container'>
          <h3 className='Input-label'>Choose Face Size:</h3>
          <Slider value={size} onChange={(event, sizeVal) => {
              setSize(sizeVal);
            }} />
        </div>
        <Button onClick={() => { window.print() }} variant="contained" sx={{ marginTop: "20px" }}>Print</Button>

      </div>
      
      <div className='Rawrlex-container'>
        <div className='watch-face' style={{
          border: `${size * 0.2}px solid ${color}`,
          width: `${size * 3.5}px`,
          height: `${size * 3.5}px`
        }}>
          <img style={{
            width: `${size * 2.5}px`,
            height: `${size * 2.5}px`
          }} src={`https://raw.githubusercontent.com/tinydinosnft/tinydinosassets/main/images/dinos/1600x1600/transparent/${dinoId}.png`} className="Rawrlex-dino-img" alt="dino" />
        </div>
        <div className='dashed-container' style={{
              border: `2px dotted ${color}`
            }}>
          <div className='solid-container' style={{
              border: `2px solid ${color}`
            }}>
            
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
