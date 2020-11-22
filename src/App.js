import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import { useState } from 'react';
import { Button, Card, Container, Jumbotron, Nav, Navbar, Tab, Tabs } from 'react-bootstrap';

import { getParams } from './Api';
import { getMockMatrix, getMockMatrix2 } from './ApiMock';
import Area from './Area';
import Square from './Square';

function App() {
  const [sensors, setSensors] = useState(false)
  const [selectedSquare, setSelectedSquare] = useState(null);
  const intensityMatrix = null

  const topLeftLat = -23.588826342902333
  const topLeftLon = -46.682215230240686
  const topRightLat = -23.589672788243483
  const topRightLon = -46.68196461184181
  const bottomRightLat = -23.589956330973465
  const bottomRightLon = -46.68294486601919
  const bottomLeftLat = -23.58908832749717
  const bottomLeftLon = -46.68320100836799

  const baseLength = 30
  const {
    lenOfHeight,
    lenOfWidth,
    latMatrix,
    lonMatrix
  } = getParams(
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

  const intensityMatrixMockPerlin = getMockMatrix(lenOfHeight + (2 * baseLength), lenOfWidth + (2 * baseLength))
  const intensityMatrixMock1Sensor = getMockMatrix2(latMatrix, lonMatrix)

  const minDb = 70;
  const maxDb = 120;

  return (
    <>
      <Container style={{ marginTop: 24, marginBottom: 24 }}>
        <h1>HID Project</h1>
        <p>
          This graph represents the sound intensity on each square meter on the construction site.
    <br />
    The big rectangle in the middle in the construction area.
    <br />
    Each small square has 1 by 1 meter.
    <br />
    The intensity of the sound on each.
    </p>
<p style={{display: 'flex', alignItems: 'center'}}>
<Square intensityPercentage={0}/> <span style={{marginLeft: 2}}>{`${minDb}db`}</span>
</p>
<p style={{display: 'flex', alignItems: 'center'}}>
<Square intensityPercentage={1}/> <span style={{marginLeft: 2}}>{`${maxDb}db`}</span>
</p>
        <p>
        </p>
        <p>
        </p>
        <Card>
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link href="#first" onClick={() => setSensors(false)}>Detection</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#link" onClick={() => setSensors(true)}>Sensors</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Text>
      {
        selectedSquare ? (
          <div>
            <span style={{marginRight: 4}}>{`Latitude: ${selectedSquare.lat}`}</span>
            <span style={{marginRight: 4}}>{`Longitude: ${selectedSquare.lon}`}</span>
            <span style={{marginRight: 4}}>{`Intensity: ${(selectedSquare.intensityPercentage * (maxDb - minDb) + minDb)}db`}</span>
          </div>
        ) : (
          <div>
            <span>{'Navigate on the graph'}</span>
          </div>
        )
      }
              <Area
                lenOfHeight={lenOfHeight}
                lenOfWidth={lenOfWidth}
                baseLength={baseLength}
                latMatrix={latMatrix}
                lonMatrix={lonMatrix}
                intensityMatrix={intensityMatrixMock1Sensor}
                sensors={sensors}
                setSelectedSquare={setSelectedSquare}
              />
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default App;