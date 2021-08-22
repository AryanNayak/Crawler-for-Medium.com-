import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Nav,
  Navbar,
  Container,
  Row,
  Col,
  Form,
  ListGroup,
} from "react-bootstrap";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./loader.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    minWidth: 650,
  },
}));

export default function NavTabs() {
  const [input, setInput] = useState("loading");

  const [axiosTimer, setAxiosTimer] = useState('');

  let [numberOfPost, setNumberOfPost] = useState(10)
  const [data, setData] = useState(['loading']);
  const handleOnClick = () => {
    let startTime = Date.now();
    axios
      .post("http://127.0.0.1:8000/post", { tag: input })
      .then((response) => {
        setData(response.data);
        axiosTimerFunc(startTime);
        
      });
  };

  const axiosTimerFunc = (startTime) => {
    let now = Date.now();
    let seconds = Math.floor((now - startTime)/1000);
    let milliseconds = Math.floor((now - startTime)%1000);
    setAxiosTimer(`${seconds}.${milliseconds} seconds`);
  }

  var startPost = 0; 
  const handleOnClickExpand = () => {

    startPost = (numberOfPost + 1);
    setNumberOfPost(numberOfPost += 10);
  
  };
  
  const [data2, setData2] = useState(["....loading"]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/history")
      .then((response) => setData2(response.data));
  }, []);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style = {{background: "black"}}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Crawl" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="History" href="/trash" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Row>
          <Col xs={7}>
            {/* <Form.Control
              placeholder="User"
              onChange={(e) => setInput(e.target.value)}
            /> */}

            <TextField
              id="standard-full-width"
              label="Tag"
              style={{ margin: 8, left: "100px", color: "white" }}
              placeholder="Enter the Tag"
              helperText="Welcome to Medium Crawler!"
              fullWidth
              margin="normal"
              onChange={(e) => setInput(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Col>
          <Col>
            <Button
              variant="contained"
              style={{ right: "20px", top: "20px", height: "50px" }}
              onClick={() => handleOnClick()}
            >
              {" "}
              Crawl Tags
            </Button>
          </Col>
        </Row>

        <Container className="container-loader">
          <Row>
            <Col style={{ textAlign: "left" }}>
            <p> <strong>Crawl Time: {axiosTimer}</strong> </p>
              <p>
                <strong>Similar Tags: </strong>
                <p style={{ color: "blue", display: "contents" }}>
                  {data[0].tags}
                </p>
              </p>
            </Col>
          </Row>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Title</strong>
                  </TableCell>
                  <TableCell align="middle">
                    <strong>Author</strong>
                  </TableCell>
                  <TableCell align="middle">
                    <strong>Details</strong>
                  </TableCell>
                  <TableCell align="left">
                    <strong>Link</strong>
                  </TableCell>
                  {/* <TableCell align="left"><strong>Similar Tags</strong></TableCell> */}
                </TableRow>
              </TableHead>
              
              {data.slice(startPost,numberOfPost).map((newData) => {
                return (
                  <TableBody>
                    <TableCell align="middle"> {newData.title} </TableCell>
                    <TableCell align="middle"> {newData.author}</TableCell>
                    <TableCell align="middle"> {newData.details} </TableCell>
                    <TableCell align="middle">
                      {" "}
                      <a href={newData.link} target="_blank">
                        Link
                      </a>{" "}
                    </TableCell>
                    {/* <TableCell align="middle"> {data[0].tags} </TableCell> */}
                  </TableBody>
                );
              })}
            </Table>
          </TableContainer>
        </Container>
        <Button variant="contained" size="s" className="next"  onClick={() => handleOnClickExpand()}>
          {" "}
          Crawl More
        </Button>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container className="container-loader">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <ListGroup.Item style={{ textAlign: "middle" }}>
                    {" "}
                    <strong>Searched Tag History</strong>
                  </ListGroup.Item>
                </TableRow>
              </TableHead>
              <TableBody>
                {data2.map((newData) => {
                  return <ListGroup.Item>{newData.tag}</ListGroup.Item>;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </TabPanel>
    </div>
  );
}
