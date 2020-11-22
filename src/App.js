import './App.css';

import Area from './Area';
import logo from './logo.svg';

function App() {

  var perlin = require('perlin-noise');
 
  const intensityMatrix = perlin.generatePerlinNoise(100, 100);

  return (
    <Area
      topLeftLat={-23.588826342902333}
      topLeftLon={-46.682215230240686}
      topRightLat={-23.589672788243483}
      topRightLon={-46.68196461184181}
      bottomRightLat={-23.589956330973465}
      bottomRightLon={-46.68294486601919}
      intensityMatrix={intensityMatrix}
    />
  );
}

export default App;
