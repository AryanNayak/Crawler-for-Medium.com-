import React from "react";
import { Button , Nav, Navbar, Container} from 'react-bootstrap';
import Label from '@material-ui/core';
import './nav.css';
import './loader.css'
function NavBar(){

    return (
      
            <Navbar variant="dark" style ={{background: "black"}}>
    <Container>
    <centre><Navbar.Brand  href="#home">Medium.com Crawler</Navbar.Brand></centre>
   <Navbar.Brand style = {{ marginRight: '390px'}} href="#home">An easy way to find your favorite blogs by Tags</Navbar.Brand> 
    
    </Container>
  </Navbar>
       
    );
}

export default NavBar;