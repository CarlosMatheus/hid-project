import { getDistance, getSensors } from './CoordinateUtils';

const getPerlinMockMatrix = (height, width) => {
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
  
  const get1SensorMockMatrix = (latMatrix, lonMatrix) => {
    const sensorLat = -23.588826342902333, sensorLon = -46.682215230240686
    const sensorValue = 100
    function getExpectedValue (pointLat, pointLon) {
      const d = getDistance(sensorLat, sensorLon, pointLat, pointLon)
      const value = sensorValue * Math.exp(-d/50) / 120
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

    return intensityMatrix
  }

  const getMockSensors =  (latMatrix, lonMatrix) => {
    const sensorsLatList = [-23.588826342902333], sensorLonList = [-46.682215230240686]
    return getSensors(latMatrix, lonMatrix, sensorsLatList, sensorLonList)
  }

  export {
      getPerlinMockMatrix,
      get1SensorMockMatrix,
      getMockSensors
  }

