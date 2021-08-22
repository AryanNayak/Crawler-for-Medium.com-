import React from "react";
import { Button, Nav, Navbar, Container, Row, Col, Form , ListGroup} from 'react-bootstrap';
import '../admin_panel/loader.css'
function Details() {

    return ( <>
<style type="text/css">
    {`
    .btn-flat {
      background-color: purple;
      color: white;
    }
    .next{
      width: 50%;
      height: 40px;
    }
    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    `}
  </style>
  <Container  className="container-loader">
  <Row>
    <Col><ListGroup>
  <ListGroup.Item> Title</ListGroup.Item>
  <ListGroup.Item>Blog</ListGroup.Item>
  <ListGroup.Item>Tags</ListGroup.Item>
  <ListGroup.Item>Responses</ListGroup.Item>
  <ListGroup.Item>Source URL</ListGroup.Item>
  
</ListGroup><br></br>

<Button variant="flat" size="s" className="next"> Back to Crawler</Button></Col>
  </Row>
</Container>
</>
    );
}

export default Details;