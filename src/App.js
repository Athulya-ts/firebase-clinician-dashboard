import * as React from 'react';
import './App.css';
import { styled, Box, Paper, Grid, Table,Typography, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {db,storage} from "./firebase/firebase"
import { push, set, ref, onValue } from 'firebase/database';
// import { useAuth } from './contexts/authContext'
// import firebase from 'firebase/app'; // Import Firebase app
// import 'firebase/storage'; 
import { doSignOut } from './firebase/auth';
import VideoChatButton from './Components/VideoChatButton'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: "rgb(48, 67, 63)",
}));

const StyledTableCell = styled(TableCell)({
  fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
  fontSize: "large",
  color: "rgb(48, 67, 63)"
});

const rows = [
  createData(1, 'Visual color training', '02-06-2023'),
  createData(2, 'Alphabets and sentence training', '02-06-2023'),
  createData(3, 'Phonics and auditory training', '02-06-2023'),
];

function createData(sno, procedure, startDate) {
  return { sno, procedure, startDate };
}

function createData1(sno, diagnosis, ageOfOnset, status, report) {
  return { sno, diagnosis, ageOfOnset, status, report };
}
const rows1 = [
  createData1(1, 'ASD Level 2', 6, 'Recurring', 'View Report'),
];

export default function App() {
  // const { currentUser } = useAuth()

  const [procedures, setProcedures] = useState([]);
  const [showInputFields, setShowInputFields] = useState(false); // State to control visibility of input fields

  useEffect(() => {
    const proceduresRef = ref(db, "procedures");

    return onValue(proceduresRef, (snapshot) => {
      const data = snapshot.val();
      if(data){
        const proceduresArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setProcedures(proceduresArray);
      }
    });
  }, []);

  const handleLogout = async () => {
    try {
      await doSignOut(); // Call the logout function
      // You may want to redirect the user to the login page after logout
      // You can use react-router-dom for this purpose
      window.location.href = "/Login"
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleClick = async () => {
    // await addDoc(value, { procedure: procedure, startDate: startDate });
  }
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  const [newProcedure, setNewProcedure] = useState({ sno: '', procedure: '', startDate: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProcedure({ ...newProcedure, [name]: value });
  };

  const handleEnterPress = async (event) => {
    if (event.key === 'Enter') {
      try {
        const proceduresRef = ref(db, 'procedures');
        await push(proceduresRef, newProcedure);
        setNewProcedure({ sno: '', procedure: '', startDate: '' });
        setShowInputFields(false); // Hide input fields after successful addition to the database
      } catch (error) {
        console.error('Error adding procedure:', error);
      }
    }
  };

  const handlePlusClick = () => {
    setShowInputFields(true); // Show input fields when plus symbol is clicked
  };

  const handleCloseInputFields = () => {
    setShowInputFields(false); // Hide input fields when enter is pressed
  };

  const renderInputFields = () => {
    return (
      <TableRow>
        <StyledTableCell component="th" scope="row">
          <TextField
            id="sno"
            name="sno"
            label="S.No"
            variant="filled"
            size="small"
            fullWidth
            onChange={handleInputChange}
            onKeyPress={handleEnterPress}
          />
        </StyledTableCell>
        <StyledTableCell align="left">
          <TextField
            id="procedure"
            name="procedure"
            label="Procedure"
            variant="filled"
            size="small"
            fullWidth
            onChange={handleInputChange}
            onKeyPress={handleEnterPress}
            />
        </StyledTableCell>
        <StyledTableCell align="left">
          <TextField
            id="startDate"
            name="startDate"
            label="Start Date"
            variant = "filled"
            size="small"
            fullWidth
            onChange={handleInputChange}
            onKeyPress={handleEnterPress}
          />
        </StyledTableCell>
      </TableRow>
    );
  };
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    // Check if file exists and file size is less than or equal to 2MB
    if (selectedFile && selectedFile.size <= 2 * 1024 * 1024) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError('Please select a file under 2MB in size.');
    }
  };

  const [exampleNode, setExampleNode] = useState({
    colorTraining: [],
    vocabularyTraining: [],
    phonicsTraining: [],
    comparativeAnalysis: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const colorTrainingRef = ref(db, "exampleNode/-Nx4Dt8JE7pw4U-WkI1w");
      const vocabularyTrainingRef = ref(db, "exampleNode/-Nx4Gi93XofdtrpUmATS");
      const phonicsTrainingRef = ref(db, "exampleNode/-Nx4GiQt_P4MYiANDiV3");
      const comparativeAnalysisRef = ref(db, "exampleNode/-Nx4Gij26ub5I-DMta6b");

      // Fetch color training data
      onValue(colorTrainingRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setExampleNode((prevData) => ({
            ...prevData,
            colorTraining: Object.values(data)
          }));
        }
      });

      // Fetch vocabulary training data
      onValue(vocabularyTrainingRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setExampleNode((prevData) => ({
            ...prevData,
            vocabularyTraining: Object.values(data)
          }));
        }
      });

      // Fetch phonics training data
      onValue(phonicsTrainingRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setExampleNode((prevData) => ({
            ...prevData,
            phonicsTraining: Object.values(data)
          }));
        }
      });

      // Fetch comparative analysis data
      onValue(comparativeAnalysisRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setExampleNode((prevData) => ({
            ...prevData,
            comparativeAnalysis: Object.values(data)
          }));
        }
      });
    };

    fetchData();
  }, []);
//   const [image, setImage] = useState('');
//   const upload = () => {
//     if (image == null)
//         return;
//     const storageRef = firebase.storage().ref(); // Get reference to Firebase Storage
//     storageRef.child(`/images/${image.name}`).put(image) // Use child method to specify the path
//         .on("state_changed", alert("success"), alert);
// }

  return (
    <div className='dash-body'>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: "rgb(48, 67, 63)",maxHeight:45,marginTop:-10,marginLeft:-5,width:1536, position : "sticky", top: 0, left: 0, right: 0 }}>
        <Toolbar sx={{ paddingLeft: 0, paddingRight: 0 ,marginTop : -1.5}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2,marginTop:-1 }}
            onClick={handleMenuOpen}
            >
            <MenuIcon />
          </IconButton>
          {/* Add your title here */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            3 PIXELS
          </Typography>
          <VideoChatButton/>
            &nbsp;&nbsp;
          <div style = {{marginRight:0}}>
            {/* <Link to = "/Login" style = {{textDecoration:"none",color:"white"}}> */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1,cursor:"pointer",marginTop : -1}} onClick = {handleLogout}>
              Logout
            </Typography>
            {/* </Link> */}
          </div>
        </Toolbar>
      </AppBar>
      <br/><br/>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4} sx = {{marginTop:2}}>
          <Item style={{ backgroundColor: "rgb(202, 217, 214)", borderRadius: 25 ,height:153}}>
            <br/>
            <div className='profile-icon'>
              <div>
                <i className="fa fa-user-circle" style={{ fontSize: 105}} ></i>
              </div>
              <div className='profile-details'>
                <ul style={{ fontSize: 16, fontWeight: "bold", font: "caption" }}>
                  <li>Patient ID : 12</li>
                  <li>Name : Athulya</li>
                  {/* <li>Name : {currentUser.displayName ? currentUser.displayName : currentUser.email}</li> */}
                  <li>Age : 19</li>
                  <li>Gender : Female</li>
                </ul>
              </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs sx = {{marginTop:2}}>
          <Item style={{ backgroundColor: "rgb(202, 217, 214)", borderRadius: 25 ,height : 155}}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow className="table">
                    <StyledTableCell align="center">S.No</StyledTableCell>
                    <StyledTableCell align="center">Diagnosis</StyledTableCell>
                    <StyledTableCell align="center">Age of Onset&nbsp;</StyledTableCell>
                    <StyledTableCell align="center">Status&nbsp;</StyledTableCell>
                    <StyledTableCell align="center">Report&nbsp;</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows1.map((row) => (
                    <TableRow className="table"
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell align="center" component="th" scope="row">{row.sno}</StyledTableCell>
                      <StyledTableCell align="center">{row.diagnosis}</StyledTableCell>
                      <StyledTableCell align="center">{row.ageOfOnset}</StyledTableCell>
                      <StyledTableCell align="center">{row.status}</StyledTableCell>
                      <StyledTableCell align="center">{row.report}</StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid>
        <Grid item md={4.5} sx = {{marginTop:0}}>
          <Item style={{ backgroundColor: "rgb(202, 217, 214)", borderRadius: 25, maxHeight: 300, overflowX: "hidden" ,overflowY: "auto"}}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx = {{fontWeight:"bold"}} align="center">S.No</StyledTableCell>
                    <StyledTableCell sx = {{fontWeight:"bold"}} align="center">Procedure</StyledTableCell>
                    <StyledTableCell sx = {{fontWeight:"bold"}} className="table" align="center">Start-Date&nbsp;</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {procedures.map((pr) => (
                    <TableRow className="table"
                      key={pr.sno}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">{pr.sno}</StyledTableCell>
                      <StyledTableCell align="left">{pr.procedure}</StyledTableCell>
                      <StyledTableCell align="left">{pr.startDate}</StyledTableCell>
                    </TableRow>
                  ))}
                  {showInputFields && renderInputFields()} {/* Conditionally render input fields based on state */}
                </TableBody>
              </Table>
          <i className="fa fa-plus-circle" style={{ fontSize: 36, float: "right", marginBottom: "10px", cursor: 'pointer' }} onClick={handlePlusClick}></i>
            </TableContainer>
          </Item>
        </Grid>
        <Grid item xs sx={{ marginTop: 0 }}>
          <Item className='container' style={{ backgroundColor: "rgb(202, 217, 214)", borderRadius: 25, maxWidth: 1000, maxHeight: 430, overflowY: "scroll", overflowX: "hidden" }}>
          <p className='perform-title'>PERFORMANCE STATISTICS</p>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs>
            <Item style={{ borderRadius: 25 }}>
          <Typography align="center" sx = {{marginBottom:-5, textDecoration:"underline"}}>COLOR TRAINING</Typography>
          <LineChart
            series={[
              { curve: "linear", data: [6, 3, 7, 9.5, 4, 2] },
            ]}
            width={350}
            height={280}
          />
          <Typography variant="body1" align="center">X-axis Points taken in integer</Typography>
          <Typography variant="body1" align="center">Y-axis Response time in seconds</Typography>
              </Item>
            </Grid>
            <Grid item xs>
              <Item style={{ borderRadius: 25 }}>
                <Typography align="center" sx = {{marginBottom:-5, textDecoration:"underline"}}>VOCABULARY TRAINING</Typography>
                <LineChart
                  series={[
                    { curve: "linear", data: [0, 5, 2, 6, 3, 9.3] },
                  ]}
                  width={350}
                  height={280}
                />
          <Typography variant="body1" align="center">X-axis Points taken in integer</Typography>
          <Typography variant="body1" align="center">Y-axis Response time in seconds</Typography>
              </Item>
            </Grid>
            <Grid item xs>
              <Item style={{ borderRadius: 25 }}>
                <Typography align="center" sx = {{marginBottom:-5, textDecoration:"underline"}}>PHONICS TRAINING</Typography>
                <LineChart
                  series={[
                    { curve: "linear", data: [0, 5, 2, 6, 3, 9.3] },
                  ]}
                  width={350}
                  height={280}
                />
          <Typography variant="body1" align="center">X-axis Points taken in integer</Typography>
          <Typography variant="body1" align="center">Y-axis Response time in seconds</Typography>
              </Item>
            </Grid>
            <Grid item xs>
              <Item style={{ borderRadius: 25 }}>
                <Typography align="center" sx = {{marginBottom:-5, textDecoration:"underline"}}>COMPARATIVE ANALYSIS</Typography>
                <LineChart
                  series={[
                    { curve: "linear", data: [6, 3, 7, 9.5, 4, 2] },
                  ]}
                  width={350}
                  height={280}
                />
          <Typography variant="body1" align="center">X-axis Points taken in integer</Typography>
          <Typography variant="body1" align="center">Y-axis Response time in seconds</Typography>
              </Item>
            </Grid>
          </Grid>
        </Item>
      </Grid>
      </Grid>
      <div className="upload" style={{ marginTop: -80, fontSize: 18, marginLeft: 95, color: "rgb(48, 67, 63)" }}>
      <label htmlFor="myfile" style={{ fontSize: 20 }}>Upload EEG:</label>
      <input type="file" id="myfile" onChange={handleChange} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button>Upload</button>
    </div>
    </Box>
    </div>
  );
}
