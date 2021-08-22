import React, { useEffect, useState } from "react";
import { Button, Nav, Navbar, Container, Row, Col, Form , ListGroup} from 'react-bootstrap';
import axios from 'axios'; 
import './loader.css'

function Details() {

  const [data, setData] = useState([{title:"loading"}]); 

  useEffect(() => {
    // axios
    //   .get("http://127.0.0.1:8000/post")
    //   .then(response => setData(response.data));

  }, []);

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

</>
    );
}

export default Details;