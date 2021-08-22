import React, { useEffect, useState } from "react";
import { Button, Nav, Navbar, Container, Row, Col, Form , ListGroup} from 'react-bootstrap';
import axios from 'axios'; 
import './loader.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

function History() {
  const classes = useStyles();
  const [data, setData] = useState(['....loading']); 

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/history")
      .then(response => setData(response.data));

  }, []);

    return ( <>

<Container className="container-loader">


<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
        {
    data.map((newData)=>{
    return (
      <ListGroup.Item>{newData.tag}</ListGroup.Item>
    )
  })};

        </TableBody>
      </Table>
    </TableContainer>


  

</Container>

</>
    );
}

export default History;