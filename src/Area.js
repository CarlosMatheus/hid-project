import './App.css';

import React, { useState } from 'react';

import { getDistance, getLatLonValues } from './Api';
import Region from './Region';



function Area(props) { // assumption: the area is an rectangle
  const lenOfHeight=props.lenOfHeight
  const lenOfWidth=props.lenOfWidth
  const baseLength=props.baseLength
  const latMatrix=props.latMatrix
  const lonMatrix=props.lonMatrix

  const intensityMatrix = props.intensityMatrix

  // let intensityMatrix = props.intensityMatrix ?? null;
  // if (!props.intensityMatrix) {
  //   intensityMatrix = getMockMatrix(lenOfHeight + (2 * baseLength), lenOfWidth + (2 * baseLength));
  // }

  // let intensityMatrix2 = getMockMatrix2 (latMatrix, lonMatrix) 
  // intensityMatrix = intensityMatrix2

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
