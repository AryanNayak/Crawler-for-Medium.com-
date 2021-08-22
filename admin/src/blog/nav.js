import React from "react";
import { Button , Nav, Navbar, Container} from 'react-bootstrap';
import './nav.css';
import '../admin_panel/loader.css'
function NavBar(){

    return (
      
            <Navbar bg="dark" variant="dark">
    <Container>
    <centre><Navbar.Brand  href="#home">Blog page</Navbar.Brand></centre>
    <Nav className="me-auto">
     
      <Nav.Link href="#features">Crawler</Nav.Link>
     
    </Nav>
    </Container>
  </Navbar>
       
    );
}

export default NavBar;