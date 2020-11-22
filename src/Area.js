import './App.css';

import React, { useState } from 'react';

import Region from './Region';

const getDistance = (topLeftLat, topLeftLon, bottomRightLat, bottomRightLon) => {
  var R = 6371000; // Radius of the Earth in miles
  var rlat1 = topLeftLat * (Math.PI/180); // Convert degrees to radians
  var rlat2 = bottomRightLat * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (bottomRightLon-topLeftLon) * (Math.PI/180); // Radian difference (longitudes)

  return 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
}

function Area(props) {
  // assumption: the area is an rectangle

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

  console.log(lenOfHeight);
  console.log(lenOfWidth);
  console.log(hypotenuse);

  return (
    <div style={{display: "flex"}}>
      <div>
        {
          [<Region/>, <Region/>,<Region/>]
        }
      </div>
      <div>
        {
          [<Region/>, <Region main={true}/>,<Region/>]
        }
      </div>
      <div>
        {
          [<Region/>, <Region/>,<Region/>]
        }
      </div>
    </div>
  );
}

export default Area;
