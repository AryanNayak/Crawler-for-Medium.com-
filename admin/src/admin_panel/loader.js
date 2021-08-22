import React, {useState} from "react";
import axios from "axios"; 
import { Button, Nav, Navbar, Container, Row, Col, Form, ListGroup } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './loader.css';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



function Loader() {
  const classes = useStyles();
  const [input, setInput] = useState('');
  const [data, setData] = useState(['loading']); 

  const handleOnClick=()=>
  {
    axios.post("http://127.0.0.1:8000/post", {tag: input}).then((response)=>{
      setData(response.data); 
    })
  }

    return (

      <>
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
    

        <Container className="container-loader">
           <Form fluid className = "search-form">
  <Row>
    <Col xs={7}>
      <Form.Control placeholder="User" onChange = {(e)=> setInput(e.target.value)}/>
    </Col>
    <Col>
    <Button variant="flat" size="l" onClick={()=> handleOnClick()} > Crawl Tags</Button>
    </Col>

  </Row>


  <Container  className="container-loader">
  <Row>
    <Col>
    <ListGroup>

</ListGroup>

<br></br>1 of 1<br></br>

<Button variant="flat" size="s" className="next"> Crawl More</Button></Col>
  </Row>
</Container>


<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Details</TableCell>
            <TableCell align="right">Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
        {
    data.map((newData)=>{
    return (
      <ListGroup.Item>{newData.title}, {newData.author}, {newData.details} </ListGroup.Item>
    )
  })};




        </TableBody>
      </Table>
    </TableContainer>


  

</Form> 
        </Container>
        </>
    );
}

export default Loader;