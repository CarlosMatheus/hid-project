import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import { useState } from 'react';
import { Button, Card, Container, Jumbotron, Nav, Navbar, Tab, Tabs } from 'react-bootstrap';

import Area from './Area';
import Square from './Square';

function App() {
  const [sensors, setSensors] = useState(false);
  const intensityMatrix = null;

  return (
    <>
    <Container style={{marginTop: 24, marginBottom: 24}}>
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
    <Square /> {'70db'}
  </p>
  <p style={{display: 'flex', alignItems: 'center'}}>
    <Square /> {'120db'}
  </p>
  <p>
  </p>
  <p>
  </p>
    <Card>
  <Card.Header>
    <Nav variant="tabs" defaultActiveKey="#first">
      <Nav.Item>
        <Nav.Link href="#first" onClick={()=>setSensors(false)}>Detection</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#link" onClick={()=>setSensors(true)}>Sensors</Nav.Link>
      </Nav.Item>
    </Nav>
  </Card.Header>
  <Card.Body>
    <Card.Text>
    <Area
      topLeftLat={-23.588826342902333}
      topLeftLon={-46.682215230240686}
      topRightLat={-23.589672788243483}
      topRightLon={-46.68196461184181}
      bottomRightLat={-23.589956330973465}
      bottomRightLon={-46.68294486601919}
      bottomLeftLat={-23.58908832749717}
      bottomLeftLon={-46.68320100836799}
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