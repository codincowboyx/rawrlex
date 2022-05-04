import React, { useEffect, useState, useRef } from 'react';
import rawrlex from './rawrlex.png';
import realisticLeather from './images/realistic_strap_leather.png';
import realisticMetal from './images/realistic_strap_metal.png';
import clsx from 'clsx';
import Input from '@mui/material/Input';
import './App.css';
import Button from '@mui/material/Button';
import ColorPicker from 'material-ui-color-picker';
import { Slider } from '@mui/material';

const STYLE = {
  DOMINANT_COLOR: 0,
  GRID: 1,
  REALISTIC_LEATHER: 2,
  REALISTIC_METAL: 3
}

const FACE_SHAPE = {
  SQUARE: 0,
  ROUND_SQUARE: 1,
  CIRCLE: 2
}

const WATCH_SIZE = {
  ADULT: 0,
  KIDS: 1
}

const GRID_SIZE = 1000;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getBorderRadius(faceShape) {
  switch(faceShape) {
    case FACE_SHAPE.ROUND_SQUARE:
      return '25%';
    case FACE_SHAPE.CIRCLE:
      return '50%';
    case FACE_SHAPE.SQUARE:
    default:
      return '0';
  }
}

const Cell = ({ colors }) => {
  return <div className='cell' style={{ backgroundColor: `#${colors[getRandomInt(colors.length)]}` }} />;
}

const Grid = ({ colors }) => {
  return <div className='watch-grid'>
    {[...Array(GRID_SIZE).keys()].map(() => (
      <Cell colors={colors} />
    ))}
  </div>
}

function App() {
  const [dinoId, setDinoId] = useState(1);
  const [color, setColor] = useState("#000000");
  const [colorArr, setColorArr] = useState([]);
  const [size, setSize] = useState(100);
  const [style, setStyle] = useState(STYLE.DOMINANT_COLOR);
  const [faceShape, setFaceShape] = useState(FACE_SHAPE.SQUARE);
  const [watchSize, setWatchSize] = useState(WATCH_SIZE.ADULT);
  const previewRef = useRef(null);
  const imgRef = useRef(null);
  const innerBandRef = useRef(null);

  useEffect(() => {
    if (dinoId) {
      fetch(`images/${dinoId}.svg`)
        .then(res => res.text())
        .then((str) => {
          const colorArrTemp = str.match(/[a-f0-9]{6}/gi);

          const colorObj = {};
          let dominant = colorArrTemp[0];
          let maxFound = 0;

          colorArrTemp.forEach(col => {
            if (colorObj[col]) {
              colorObj[col] = colorObj[col] + 1;
            } else {
              colorObj[col] = 1;
            }

            if (colorObj[col] > maxFound) {
              maxFound = colorObj[col];
              dominant = col;
            }
          });

          setColorArr(colorArrTemp);
          setColor(`#${dominant}`);
        });
    }
  }, [dinoId])

  // TODO: uncomment if we want the average color of the picture

  // useEffect(() => {
  //   // get the dinos dominant color from the svg
  //   if (dinoId) {
  //     fetch(`https://raw.githubusercontent.com/tinydinosnft/tinydinosassets/main/images/dinos/1600x1600/transparent/${dinoId}.png`)
  //       .then(res => res.blob())
  //       .then((blob) => {
  //         var img = URL.createObjectURL(blob);
  //         const ctx = imgRef.current.getContext("2d");
  //         ctx.clearRect(0, 0, imgRef.current.width, imgRef.current.height);
          
  //         const getDominantColor = (imageObject) => {
  //           //draw the image to one pixel and let the browser find the dominant color
  //           ctx.drawImage(imageObject, 0, 0, 1, 1);
          
  //           //get pixel color
  //           const i = ctx.getImageData(0, 0, 1, 1).data;
           
  //           console.log("here");
  //           setColor("#" + ((1 << 24) + (i[0] << 16) + (i[1] << 8) + i[2]).toString(16).slice(1));
  //         }

  //         const image = new Image();
  //         image.onload = function() {
  //           //shows preview of uploaded image
  //           previewRef.current.getContext("2d").clearRect(0, 0, previewRef.current.width, previewRef.current.height);
  //           previewRef.current.getContext("2d").drawImage(
  //             image,
  //             0,
  //             0,
  //             previewRef.current.width,
  //             previewRef.current.height,
  //           );
  //           getDominantColor(image);
  //         };
  //         image.src = img;
  //       })
  //   }
  // }, [dinoId])


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
        <canvas ref={previewRef} style={{ width: "200px", height: "200px", display: "none" }} />
        <canvas ref={imgRef} style={{ width: "200px", height: "200px", display: "none" }} />
        <div className='Size-slider-container'>
          <h3 className='Input-label'>Choose Face Size:</h3>
          <Slider value={size} onChange={(event, sizeVal) => {
              setSize(sizeVal);
            }} />
        </div>
        <div className='Watch-style-options'>
          <h3 className='Input-label'>Choose Design:</h3>
          <div 
            className={clsx('option-container', { 'option-selected': style === STYLE.DOMINANT_COLOR })}
            onClick={() => { setStyle(STYLE.DOMINANT_COLOR); }}
            >
            <div className='option' style={{ backgroundColor: color }} />
          </div>
          <div 
            className={clsx('option-container', { 'option-selected': style === STYLE.GRID })}
            onClick={() => { setStyle(STYLE.GRID); }}
            >
            <div className='option'>
              <div className='grid'>
                <div className='row'>
                  <Cell colors={colorArr} />
                  <Cell colors={colorArr} />
                  <Cell colors={colorArr} />
                </div>
                <div className='row'>
                  <Cell colors={colorArr} />
                  <Cell colors={colorArr} />
                  <Cell colors={colorArr} />
                </div>
                <div className='row'>
                  <Cell colors={colorArr} />
                  <Cell colors={colorArr} />
                  <Cell colors={colorArr} />
                </div>
              </div>
            </div>
          </div>
          <div 
            className={clsx('option-container', { 'option-selected': style === STYLE.REALISTIC_LEATHER })}
            onClick={() => { setStyle(STYLE.REALISTIC_LEATHER); }}
            >
            <img src={realisticLeather} className="realistic-chooser" alt="leather band" />
          </div>
          <div 
            className={clsx('option-container', { 'option-selected': style === STYLE.REALISTIC_METAL })}
            onClick={() => { setStyle(STYLE.REALISTIC_METAL); }}
            >
            <img src={realisticMetal} className="realistic-chooser" alt="metal band" />
          </div>
        </div>
        <div className='watch-face-styles'>
          <h3 className='Input-label'>Choose Face Shape:</h3>
          <div className={clsx('face-option-container', { 'face-option-selected': faceShape === FACE_SHAPE.SQUARE }, 'face-shape-square')}
            onClick={() => { setFaceShape(FACE_SHAPE.SQUARE) }}
          />
          <div className={clsx('face-option-container', 'face-shape-round-square', { 'face-option-selected': faceShape === FACE_SHAPE.ROUND_SQUARE })}
            onClick={() => { setFaceShape(FACE_SHAPE.ROUND_SQUARE) }}
          />
          <div className={clsx('face-option-container', 'face-shape-circle', { 'face-option-selected': faceShape === FACE_SHAPE.CIRCLE })}
            onClick={() => { setFaceShape(FACE_SHAPE.CIRCLE) }}
          />
        </div>
        <div className='watch-band-size'>
          <h3 className='Input-label'>Choose Band Size:</h3>
          <div 
            className={clsx('option-container', 'dino-option', { 'option-selected': watchSize === WATCH_SIZE.ADULT })}
            onClick={() => { setWatchSize(WATCH_SIZE.ADULT); setSize(75); }}
          >
            <img style={{ width: '75px', height: '75px' }} 
              src={`images/${dinoId ? dinoId : 1}.svg`} 
              className="Rawrlex-dino-img" 
              alt="dino"
            />
          </div>
          <div 
            className={clsx('option-container', 'dino-option', { 'option-selected': watchSize === WATCH_SIZE.KIDS })}
            onClick={() => { setWatchSize(WATCH_SIZE.KIDS); setSize(50); }}
          >
            <img style={{ width: '30px', height: '30px' }} 
              src={`images/${dinoId ? dinoId : 1}.svg`} 
              className="Rawrlex-dino-img" 
              alt="dino"
            />
          </div>
        </div>
        <Button onClick={() => { window.print() }} variant="contained" sx={{ marginTop: "20px" }}>Print</Button>

      </div>
      
      <div className='Rawrlex-container'>
        
        <div className={clsx('dashed-container', { 'kids-container': watchSize === WATCH_SIZE.KIDS })} style={{
              border: style === STYLE.REALISTIC_METAL || style === STYLE.REALISTIC_LEATHER ? 'none' : `2px dotted ${color}`
            }}>
          {(style === STYLE.REALISTIC_METAL || style === STYLE.REALISTIC_LEATHER) ? (
            <div className='img-band-container'>
              <img src={style === STYLE.REALISTIC_METAL ? realisticMetal : realisticLeather} className='img-band' alt="realstic band" />
            </div>) :
            (<div 
              className='solid-container' 
              ref={innerBandRef} 
              style={{
                border: `2px solid ${color}`,
                backgroundColor: style === STYLE.DOMINANT_COLOR ? color : 'none'
            }}>
              {style === STYLE.GRID && <Grid colors={colorArr} />}
            </div>)}
        </div>
        <div className='watch-face' style={{
          border: style === STYLE.REALISTIC_LEATHER || style === STYLE.REALISTIC_METAL ?
          `${size * 0.1}px solid gray` : `${size * 0.1}px solid ${color}`,
          width: `${size * 3.5}px`,
          height: `${size * 3.5}px`,
          boxSizing: 'border-box',
          // outline: style === STYLE.DOMINANT_COLOR ? '2px black solid' : 'none',
          borderRadius: getBorderRadius(faceShape)
        }}>
          <img 
            // TODO: uncomment if we only want the dino and not svg
            // style={{
            //   width: `${size * 2.5}px`,
            //   height: `${size * 2.5}px`
            // }} 
            // src={`images/${dinoId ? dinoId : 1}.svg`} 
            style={{
              width: `${size * 3.5}px`,
              height: `${size * 3.5}px`
            }} 
            src={`https://raw.githubusercontent.com/tinydinosnft/tinydinosassets/main/images/dinos/1600x1600/original/${dinoId ? dinoId : 1}.png`}
            className="Rawrlex-dino-img" 
            alt="dino"
          />
        </div>
      </div>
      
    </div>
  );
}

export default App;
