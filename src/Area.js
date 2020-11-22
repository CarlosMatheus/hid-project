import './App.css';

import React, { useState } from 'react';

import Region from './Region';
import { getLatLonValues, getDistance } from './Api';

const getMockMatrix = (height, width) => {
  var perlin = require('perlin-noise');

  const matrix = perlin.generatePerlinNoise(height, width);
  const intensityMatrix = Array(height).fill(Array(width).fill(0))

  intensityMatrix.forEach((row, rowIdx) => {
    // console.log(rowIdx);
    row.forEach((element, colIdx) => {
      // console.log(colIdx);
      // console.log(matrix[(rowIdx * width) + colIdx]);
      intensityMatrix[rowIdx][colIdx] = matrix[(rowIdx * width) + colIdx];
    })
  })

  // console.log(intensityMatrix);

  return intensityMatrix;
}

const getMockMatrix2 = (
  topLeftLat,
  topLeftLon,
  bottomRightLat,
  bottomRightLon,
  bottomLeftLat,
  bottomLeftLon,
  topRightLat,
  topRightLon,
  baseLength
) => {
  const { latMatrix, lonMatrix } = getLatLonValues(
    topLeftLat,
    topLeftLon,
    bottomRightLat,
    bottomRightLon,
    bottomLeftLat,
    bottomLeftLon,
    topRightLat,
    topRightLon,
    baseLength
  )

  let intensityMatrix = []
  latMatrix.forEach((row) => {
    let intensityArray = []
    row.forEach((element)=>{
      intensityArray.push(0.3)
    })
    intensityMatrix.push(intensityArray)
  })

  return intensityMatrix
}

function Area(props) { // assumption: the area is an rectangle

  const topLeftLat = props.topLeftLat;
  const topLeftLon = props.topLeftLon;
  const bottomRightLat = props.bottomRightLat;
  const bottomRightLon = props.bottomRightLon;
  const bottomLeftLat = props.bottomLeftLat;
  const bottomLeftLon = props.bottomLeftLon;
  const topRightLat = props.topRightLat;
  const topRightLon = props.topRightLon;

  const deltaLat = bottomRightLat - topLeftLat;

  const hypotenuse = getDistance(topLeftLat, topLeftLon, bottomRightLat, bottomRightLon);

  const cathetusTop = getDistance(topLeftLat, topLeftLon, topRightLat, topRightLon);

  const cathetusRight = getDistance(topRightLat, topRightLon, bottomRightLat, bottomRightLon);

  const lenOfHeight = parseInt(cathetusRight);
  const lenOfWidth = parseInt(cathetusTop);

  const baseLength = 30;

  let intensityMatrix = props.intensityMatrix ?? null;
  if (!props.intensityMatrix) {
    intensityMatrix = getMockMatrix(lenOfHeight + (2 * baseLength), lenOfWidth + (2 * baseLength));
  }

  let intensityMatrix2 = getMockMatrix2 (
    topLeftLat,
    topLeftLon,
    bottomRightLat,
    bottomRightLon,
    bottomLeftLat,
    bottomLeftLon,
    topRightLat,
    topRightLon,
    baseLength
  ) 
  // intensityMatrix = intensityMatrix2

  return (
    <div style={{ display: "flex" }}>
      <div>
        {
          [<Region intensityMatrix={intensityMatrix} height={baseLength} width={baseLength} startRow={0} startColumn={0} />, <Region intensityMatrix={intensityMatrix} height={baseLength} width={lenOfWidth} startRow={0} startColumn={0} startRow={0} startColumn={baseLength} />, <Region intensityMatrix={intensityMatrix} height={baseLength} width={baseLength} startRow={0} startColumn={baseLength + lenOfWidth} />]
        }
      </div>
      <div>
        {
          [<Region intensityMatrix={intensityMatrix} height={lenOfHeight} width={baseLength} startRow={baseLength} startColumn={0} />, <Region intensityMatrix={intensityMatrix} main={true} height={lenOfHeight} width={lenOfWidth} startRow={baseLength} startColumn={baseLength} />, <Region intensityMatrix={intensityMatrix} height={lenOfHeight} width={baseLength} startRow={baseLength} startColumn={baseLength + lenOfWidth} />]
        }
      </div>
      <div>
        {
          [<Region intensityMatrix={intensityMatrix} height={baseLength} width={baseLength} startRow={baseLength + lenOfHeight} startColumn={0} />, <Region intensityMatrix={intensityMatrix} height={baseLength} width={lenOfWidth} startRow={baseLength + lenOfHeight} startColumn={baseLength} />, <Region intensityMatrix={intensityMatrix} height={baseLength} width={baseLength} startRow={baseLength + lenOfHeight} startColumn={baseLength + lenOfWidth} />]
        }
      </div>
    </div>
  );
}

export default Area;
