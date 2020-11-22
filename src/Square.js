import './App.css';

import React, { useState } from 'react';

function Square(props) {
  var color = 'green'


  return (
    <div style={{height: 5, width: 5, backgroundColor: color, marginRight: 1, marginBottom: 1}}>
    </div>
  );
}

export default Square;
