import './App.css';

import React, { useState } from 'react';

import Region from './Region';

const getDistance = (pontALat, pointBLon, pointBLat, pointBLon) => {
  var R = 6371000; // Radius of the Earth in miles
  var rlat1 = pontALat * (Math.PI/180); // Convert degrees to radians
  var rlat2 = pointBLat * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (pointBLon-pointBLon) * (Math.PI/180); // Radian difference (longitudes)

  return 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
}

function Area(props) { // assumption: the area is an rectangle

  const topLeftLat = props.topLeftLat;
  const topLeftLon = props.topLeftLon;
  const bottomRightLat = props.bottomRightLat;
  const bottomRightLon = props.bottomRightLon;

  const topRightLat = props.topRightLat;
  const topRightLon = props.topRightLon;

  const deltaLat = bottomRightLat - topLeftLat;

  const hypotenuse = getDistance(topLeftLat, topLeftLon, bottomRightLat, bottomRightLon);

  const cathetusTop = getDistance(topLeftLat, topLeftLon, topRightLat, topRightLon);

  const cathetusRight = getDistance(topRightLat, topRightLon, bottomRightLat, bottomRightLon);

  const lenOfHeight = parseInt(cathetusRight);
  const lenOfWidth = parseInt(cathetusTop);

  const intensityMatrix = props.intensityMatrix ?? null;

  // console.log(lenOfHeight);
  // console.log(lenOfWidth);

  const baseLength = 30;

  // 1.............2...........3
  // or
  // 1
  // .
  // .
  // 2
  // .
  // .
  // 3
  function getThirdPoint({lat1, lon1, lat2, lon2, d12, d13}) {
    return {
      lat: (lat2-lat1)*d13/d12 + lat1,
      lon: (lon2-lon1)*d13/d12 + lon1
    }
  }

  // const lat1 = topLeftLat, lon1=topLeftLon, lat2=topRightLat, topRightLon
  // const d12 = getDistance(lat1, lon1, lat2, lon2)

  // for(let j=0;j<2*baseLength + lenOfWidth;j++){    
  //   const {latLeft, lonLeft} = getThirdPoint({lat1, lon1, lat2, lon2, d12, d13})


  //   const d13 = i - baseLength + lenOfWidth
  //   const {lat, lon} = getThirdPoint({lat1, lon1, lat2, lon2, d12, d13})


  // }

  // for(let i=0;i<2*baseLength + lenOfWidth;i++){
  //   const d13 = i - baseLength + lenOfWidth
  //   const {lat, lon} = getThirdPoint({lat1, lon1, lat2, lon2, d12, d13})
  // }

  return (
    <div style={{display: "flex"}}>
      <div>
        {
          [<Region height={baseLength} width={baseLength} startRow={0} startColumn={0}/>, <Region height={baseLength} width={lenOfWidth} startRow={0} startColumn={0} startRow={0} startColumn={baseLength}/>,<Region height={baseLength} width={baseLength} startRow={0} startColumn={baseLength + lenOfWidth}/>]
        }
      </div>
      <div>
        {
          [<Region height={lenOfHeight} width={baseLength} startRow={baseLength} startColumn={0}/>, <Region main={true} height={lenOfHeight} width={lenOfWidth} startRow={baseLength} startColumn={baseLength}/>,<Region height={lenOfHeight} width={baseLength} startRow={baseLength} startColumn={baseLength + lenOfWidth}/>]
        }
      </div>
      <div>
        {
          [<Region height={baseLength} width={baseLength} startRow={baseLength + lenOfHeight} startColumn={0}/>, <Region height={baseLength} width={lenOfWidth} startRow={baseLength + lenOfHeight} startColumn={baseLength}/>,<Region height={baseLength} width={baseLength} startRow={baseLength + lenOfHeight} startColumn={baseLength + lenOfWidth}/>]
        }
      </div>
    </div>
  );
}

export default Area;
