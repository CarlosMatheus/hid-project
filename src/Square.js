import './App.css';

import React, { useState } from 'react';

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function Square(props) {
  var color = 'green'
  const isMeter = props.isMeter ?? false;
  const intensityPercentage = props.intensityPercentage ?? 0;
  const lat=props.lat;
  const lon=props.lon;

  const r = parseInt((187 - 75) * intensityPercentage + 75);
  const g = parseInt((33 - 181) * intensityPercentage + 181);
  const b = parseInt((36 - 67) * intensityPercentage + 67);

  const setSelectedSquare = props.setSelectedSquare ?? (() => null);

  return (
    <div 
        key={`${Math.random()}`}
        style={{height: 5, width: 5, backgroundColor: rgbToHex(r,g,b), marginRight: 1, marginBottom: 1}}
        onMouseEnter={() => setSelectedSquare({lat, lon, intensityPercentage})}
        onMouseLeave={() => setSelectedSquare(null)}
    />
  );
}

export default Square;
