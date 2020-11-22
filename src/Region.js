import './App.css';

import React, { useState } from 'react';

import Square from './Square';

function Region(props) {
  let height = 100;
  let width = 100;
  const isMain = props.main || false;

  var matrix = Array(height).fill(Array(width).fill(<Square isMain={isMain}/>))

  const backgroundColor = isMain ? '#CDCDCD' : 'white';
//   const borderColor = isMain ? 'black' : 'white';
//   const borderSize = isMain ? 1 : 1;

  return (
    <div style={{
        display: "flex",
        backgroundColor: backgroundColor,
        // border: borderSize,
        // borderStyle: "solid",
        // borderColor: borderColor,
        }}>
      {
        matrix.map(row => {
        return <div style={{display: ""}}>
            {
            row
            }
        </div>
        })
      }
    </div>
  );
}

export default Region;
