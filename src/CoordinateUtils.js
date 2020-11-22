const getDistance = (pontALat, pointALon, pointBLat, pointBLon) => {
    var R = 6371000; // Radius of the Earth in miles
    var rlat1 = pontALat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = pointBLat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (pointBLon - pointALon) * (Math.PI / 180); // Radian difference (longitudes)

    return 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
}

function getThirdPoint(lat1, lon1, lat2, lon2, d12, d13) {
    return {
        lat: (lat2 - lat1) * d13 / d12 + lat1,
        lon: (lon2 - lon1) * d13 / d12 + lon1
    }
}

function getLatLonValues(
    topLeftLat,
    topLeftLon,
    bottomRightLat,
    bottomRightLon,
    bottomLeftLat,
    bottomLeftLon,
    topRightLat,
    topRightLon,
    baseLength
) {
    const cathetusTop = getDistance(topLeftLat, topLeftLon, topRightLat, topRightLon);
    const cathetusRight = getDistance(topRightLat, topRightLon, bottomRightLat, bottomRightLon);

    const lenOfHeight = parseInt(cathetusRight);
    const lenOfWidth = parseInt(cathetusTop);

    let latMatrix = [], lonMatrix = []
    // We will find all points on the line formed by a left and a right point
    for (let i = 0; i < 2 * baseLength + lenOfHeight; i++) {
        // Get right point coordinate by interpolating bottom right and top right
        const d12Right = getDistance(topRightLat, topRightLon, bottomRightLat, bottomRightLon)
        const d13Right = i - baseLength
        const right = getThirdPoint(topRightLat, topRightLon, bottomRightLat, bottomRightLon, d12Right, d13Right)
        const latRight = right.lat
        const lonRight = right.lon

        // Get left point coordinate by interpolating left right and left right
        const d12Left = getDistance(topLeftLat, topLeftLon, bottomLeftLat, bottomLeftLon)
        const d13Left = i - baseLength
        const left = getThirdPoint(topLeftLat, topLeftLon, bottomLeftLat, bottomLeftLon, d12Left, d13Left)
        const latLeft = left.lat
        const lonLeft = left.lon

        let latArray = [], lonArray = []
        // Find all points on the line formed by the left and right point
        for (let j = 0; j < 2 * baseLength + lenOfWidth; j++) {
            const d12 = getDistance(latLeft, lonLeft, latRight, lonRight)
            const d13 = j - baseLength
            const { lat, lon } = getThirdPoint(latLeft, lonLeft, latRight, lonRight, d12, d13)
            latArray.push(lat)
            lonArray.push(lon)
        }
        latMatrix.push(latArray)
        lonMatrix.push(lonArray)
    }

    return {
        latMatrix, lonMatrix
    }
}

const getSensors =  (latMatrix, lonMatrix, sensorsLatList, sensorsLonList) => {
    let intensityMatrix = []
    for(let i=0;i<latMatrix.length;i++){
      let intensityArray = []
      for(let j=0;j<lonMatrix.length;j++){
        let hasSensor = false;
        for(let k=0;k<sensorsLatList.length;k++){
            const d = getDistance(sensorsLatList[k], sensorsLonList[k], latMatrix[i][j], lonMatrix[i][j])
            hasSensor = hasSensor || d < 2
        }
        intensityArray.push(hasSensor ? 1 : 0)
      }
      intensityMatrix.push(intensityArray)
    }
    return intensityMatrix
  }

export {
    getLatLonValues,
    getDistance,
    getSensors
}