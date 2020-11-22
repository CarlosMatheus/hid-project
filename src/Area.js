import './App.css';

import React, { useState } from 'react';

import { getDistance, getLatLonValues } from './Api';
import Region from './Region';

const getMockMatrix = (height, width) => {
  var perlin = require('perlin-noise');

  const matrix = perlin.generatePerlinNoise(height, width);
  const intensityMatrix = Array(height).fill(Array(width).fill(0))

  intensityMatrix.forEach((row, rowIdx)=>{
    row.forEach((element, colIdx)=>{
        intensityMatrix[rowIdx][colIdx] = matrix[(rowIdx * width) + colIdx];
    })
  })

  return intensityMatrix;
}

const getMockMatrix2 = (latMatrix, lonMatrix) => {
  const sensorLat = -23.588826342902333, sensorLon = -46.682215230240686
  const sensorValue = 100
  function getExpectedValue (pointLat, pointLon) {
    const d = getDistance(sensorLat, sensorLon, pointLat, pointLon)
    const value = sensorValue * Math.exp(-d/100) / 120
    return value
  }

  let intensityMatrix = []
  for(let i=0;i<latMatrix.length;i++){
    let intensityArray = []
    for(let j=0;j<lonMatrix.length;j++){
      const noiseValue = getExpectedValue(latMatrix[i][j], lonMatrix[i][j])
      intensityArray.push(noiseValue)
    }
    intensityMatrix.push(intensityArray)
  }
  console.log(intensityMatrix)

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

  let intensityMatrix2 = getMockMatrix2 (latMatrix, lonMatrix) 
  intensityMatrix = intensityMatrix2

  return (
    <div style={{ display: "flex" }}>
      <div>
        {
          [<Region setSelectedSquare={props.setSelectedSquare}  intensityMatrix={intensityMatrix} latMatrix={latMatrix} lonMatrix={lonMatrix} height={baseLength} width={baseLength} startRow={0} startColumn={0} />, <Region setSelectedSquare={props.setSelectedSquare}  intensityMatrix={intensityMatrix} latMatrix={latMatrix} lonMatrix={lonMatrix} height={baseLength} width={lenOfWidth} startRow={0} startColumn={0} startRow={0} startColumn={baseLength} />, <Region setSelectedSquare={props.setSelectedSquare}  intensityMatrix={intensityMatrix} latMatrix={latMatrix} lonMatrix={lonMatrix} height={baseLength} width={baseLength} startRow={0} startColumn={baseLength + lenOfWidth} />]
        }
      </div>
      <div>
        {
          [<Region setSelectedSquare={props.setSelectedSquare}  intensityMatrix={intensityMatrix} latMatrix={latMatrix} lonMatrix={lonMatrix} height={lenOfHeight} width={baseLength} startRow={baseLength} startColumn={0} />, <Region setSelectedSquare={props.setSelectedSquare}  intensityMatrix={intensityMatrix} latMatrix={latMatrix} lonMatrix={lonMatrix} main={true} height={lenOfHeight} width={lenOfWidth} startRow={baseLength} startColumn={baseLength} />, <Region setSelectedSquare={props.setSelectedSquare}  intensityMatrix={intensityMatrix} latMatrix={latMatrix} lonMatrix={lonMatrix} height={lenOfHeight} width={baseLength} startRow={baseLength} startColumn={baseLength + lenOfWidth} />]
        }
      </div>
      <div>
        {
          [<Region setSelectedSquare={props.setSelectedSquare}  intensityMatrix={intensityMatrix} latMatrix={latMatrix} lonMatrix={lonMatrix} height={baseLength} width={baseLength} startRow={baseLength + lenOfHeight} startColumn={0} />, <Region setSelectedSquare={props.setSelectedSquare}  intensityMatrix={intensityMatrix} latMatrix={latMatrix} lonMatrix={lonMatrix} height={baseLength} width={lenOfWidth} startRow={baseLength + lenOfHeight} startColumn={baseLength} />, <Region setSelectedSquare={props.setSelectedSquare}  intensityMatrix={intensityMatrix} latMatrix={latMatrix} lonMatrix={lonMatrix} height={baseLength} width={baseLength} startRow={baseLength + lenOfHeight} startColumn={baseLength + lenOfWidth} />]
        }
      </div>
    </div>
  );
}

export default Area;
