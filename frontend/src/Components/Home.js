import React, { useState } from 'react'
import { Link} from "react-router-dom"

// MUI imports
import { Button , Typography, Grid, AppBar, Toolbar} from '@mui/material';

//Components
import Header from './Header'; 

//Assets
import callpaintimage from './Assets/callpaintimage.jpg';


function Home() {
    const [btnColor, setBtnColor] = useState("error");
    
  return (
    <>
   
    
      <div style={{position: "relative"}}> 
      <img src={callpaintimage} style={{ width: "100%", height: "92vh" }}/>
      <div style={{
						position: "absolute",
						zIndex: "100",
						top: "100px",
						left: "20px",
						textAlign: "center",
					}}>
      <Typography variant="h1" style={{ color: "white", fontWeight: "bolder" }}>WELCOME TO <span style={{color: 'white'}}>CELLViT</span></Typography>
      <Button variant="contained" sx={{
							fontSize: "1.5rem",
							borderRadius: "10px",
							backgroundColor: "green",
							marginTop: "2rem",
                            marginLeft: "-40rem"
							
						}}>Get Started</Button>
      </div>

      </div>
      
  </>
  );
}

export default Home;
