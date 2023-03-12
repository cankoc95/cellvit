import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"


//MUI imports
import { Button , Typography, Grid, AppBar, Toolbar} from '@mui/material';




function Header() {
    const navigate = useNavigate();
  return (
    <AppBar position="static" style={{ backgroundColor: "black"}}>
    <Toolbar>
    <div style={{ marginRight: "auto" }}>
    <Button color="inherit" onClick={() => navigate("/")}><Typography variant="h4">CellViT</Typography></Button>
    </div>
    <div>
    <Button color="inherit" onClick={() => navigate("/demo")} style={{
        marginRight: "2rem",
    //     "&:hover": {
    // backgroundColor: "blue",
    //     },
        }}><Typography variant="h6">Demo</Typography></Button>
      <Button color="inherit" onClick={() => navigate("/data")} style={{marginLeft: "2rem"}}><Typography variant="h6">Data</Typography></Button>  
      <Button onClick={() => navigate("/team")} style={{
							// backgroundColor: "green",
							color: "white",
							width: "15rem",
							fontSize: "0.8rem",
							// marginRight: "1rem",
							// "&:hover": {
							// 	backgroundColor: "blue",
							// },
						}}>Team</Button>
      <Button style={{
								// backgroundColor: "white",
								color: "white",
								width: "15rem",
								fontSize: "0.8rem",
								marginLeft: "1rem",
								// "&:hover": {
								// 	backgroundColor: "green",
								// },
							}}onClick={() => navigate("/github")}>Github</Button>          
    </div>
    {/* <div style={{ marginLeft: "auto", marginRight: "10rem" }}>
    <Button onClick={() => navigate("/team")} style={{
							// backgroundColor: "green",
							color: "white",
							width: "15rem",
							fontSize: "1.1rem",
							// marginRight: "1rem",
							// "&:hover": {
							// 	backgroundColor: "blue",
							// },
						}}>Team</Button>
      <Button style={{
								// backgroundColor: "white",
								color: "white",
								width: "15rem",
								fontSize: "1.1rem",
								marginLeft: "1rem",
								// "&:hover": {
								// 	backgroundColor: "green",
								// },
							}}onClick={() => navigate("/github")}>Github</Button>
    </div>    */}
      
    </Toolbar>
  </AppBar>
  )
}

export default Header