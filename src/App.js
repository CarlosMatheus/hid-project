import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import { useState } from 'react';
import { Button, Card, Container, Jumbotron, Nav, Navbar, Tab, Tabs } from 'react-bootstrap';

import Area from './Area';
import Square from './Square';
import { getDistance, getLatLonValues } from './CoordinateUtils';
import { getPerlinMockMatrix, get1SensorMockMatrix, getMockSensors } from './ApiMock';

function App() {
  const topLeftLat = -23.588826342902333
  const topLeftLon = -46.682215230240686
  const topRightLat = -23.589672788243483
  const topRightLon = -46.68196461184181
  const bottomRightLat = -23.589956330973465
  const bottomRightLon = -46.68294486601919
  const bottomLeftLat = -23.58908832749717
  const bottomLeftLon = -46.68320100836799
  const baseLength = 30

  const cathetusTop = getDistance(topLeftLat, topLeftLon, topRightLat, topRightLon)
  const cathetusRight = getDistance(topRightLat, topRightLon, bottomRightLat, bottomRightLon)

  const lenOfHeight = parseInt(cathetusRight)
  const lenOfWidth = parseInt(cathetusTop)

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

  const [sensors, setSensors] = useState(false)
  const [intensityMatrix, setIntensityMatrix] = useState(get1SensorMockMatrix(latMatrix, lonMatrix))

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
        <p style={{ display: 'flex', alignItems: 'center' }}>
          <Square /> {'70db'}
        </p>
        <p style={{ display: 'flex', alignItems: 'center' }}>
          <Square /> {'120db'}
        </p>
        <p>
        </p>
        <p>
        </p>
        <Card>
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#1">
              <Nav.Item>
                <Nav.Link href="#1" onClick={() => {
                  setSensors(false);
                  setIntensityMatrix(get1SensorMockMatrix(latMatrix, lonMatrix))
                }}>Detection</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#2" onClick={() => {
                  setSensors(false);
                  setIntensityMatrix(get1SensorMockMatrix(latMatrix, lonMatrix))
                }}>Sensors</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#3" onClick={() => {
                  setSensors(false);
                  setIntensityMatrix(get1SensorMockMatrix(latMatrix, lonMatrix))
                }}>Detection Example - 1 Sensor</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#5" onClick={() => {
                  setSensors(true);
                  setIntensityMatrix(getMockSensors(latMatrix, lonMatrix))
                }}>Sensors Example -  1 Sensor</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#6" onClick={() => {
                  setSensors(false);
                  setIntensityMatrix(getPerlinMockMatrix(lenOfHeight + (2 * baseLength), lenOfWidth + (2 * baseLength)))
                }}>Detection Example - Perlin Distribution</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Area
                lenOfHeight={lenOfHeight}
                lenOfWidth={lenOfWidth}
                baseLength={baseLength}
                latMatrix={latMatrix}
                lonMatrix={lonMatrix}
                intensityMatrix={intensityMatrix}
                sensors={sensors}
              />
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default App;