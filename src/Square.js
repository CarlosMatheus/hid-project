import './App.css';

import React, { useState } from 'react';

function Square(props) {
  var color = 'green'


  return (
    <div style={{height: 3, width: 3, backgroundColor: color, marginRight: 1, marginBottom: 1}}>
    </div>
  );
}

export default Square;
