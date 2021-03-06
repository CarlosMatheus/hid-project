import './App.css';

import React, { useState } from 'react';

import Square from './Square';

function Region(props) {
  let height = props.height;
  let width = props.width;
  const isMain = props.main || false;

  var matrix = Array(height).fill(Array(width).fill(<Square isMain={isMain} />))

  const backgroundColor = isMain ? '#CDCDCD' : 'white';
  //   const borderColor = isMain ? 'black' : 'white';
  //   const borderSize = isMain ? 1 : 1;

  const startRow = props.startRow;
  const startColumn = props.startColumn;

  const intensityMatrix = props.intensityMatrix;
  const latMatrix = props.latMatrix;
  const lonMatrix = props.lonMatrix;

  // console.log(intensityMatrix);
  // console.log(intensityMatrix[0]);

  return (
    //   <div />
    <div style={{
      display: "flex",
      backgroundColor: backgroundColor,
      // border: borderSize,
      // borderStyle: "solid",
      // borderColor: borderColor,
    }}>
      {
        matrix.map((row, rowIdx) => {
          return <div style={{ display: "" }} key={`${rowIdx}`}>
            {
              row.map((square, colIdx) => {
                return <Square key={`${rowIdx} ${colIdx}`} setSelectedSquare={props.setSelectedSquare} isMain={isMain} intensityPercentage={intensityMatrix[rowIdx + startRow][colIdx + startColumn]} lat={latMatrix[rowIdx + startRow][colIdx + startColumn]} lon={lonMatrix[rowIdx + startRow][colIdx + startColumn]} />
                // return <Square isMain={isMain} intensityPercentage={intensityMatrix[rowIdx][colIdx]}/>
              })
            }
          </div>
        })
      }
    </div>
  );
}

export default Region;
