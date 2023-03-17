import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"


//MUI imports
import { Button , Typography, Grid, AppBar, Toolbar, Stack} from '@mui/material';

//Assets
// import websitelogo from './Assets/websitelogo.png';
// import AwesumEdgeCompleteLogo from './Assets/AwesumEdgeCompleteLogo.jpg';
import Logo2 from './Assets/Logo2.jpg';








function Header() {
    const navigate = useNavigate();
  return (
    <AppBar position="static" style={{ backgroundColor: "black"}}>
    <Toolbar>
    <div style={{ marginRight: "auto" }}>
    {/* <img src={Logo2 } onClick={() => navigate("/")} style={{ width: "100%", height: "6vh"}}/ > */}
    <Button color="inherit" onClick={() => navigate("/")}><Typography variant="h4">CellViT</Typography></Button>
    {/* <h2 color="inherit" onClick={() => navigate("/")}>CELLViT</h2> */}
    </div>
    <Stack direction='row' spacing={2} style={{ display: "flex", width:"100%", justifyContent: "center", alignItems: "center", }}>
    <Button color='inherit' sx={{ textDecoration: "none", ":hover": {textDecoration:"underline", textUnderlineOffset:"5px", textDecorationColor: "red"}}} onClick={() => navigate("/")}>Home</Button>
    <Button color='inherit' sx={{ textDecoration: "none", ":hover": {textDecoration:"underline", textUnderlineOffset:"5px", textDecorationColor: "red"}}} onClick={() => navigate("/demo")}>Demo</Button>
    <Button color='inherit' sx={{ textDecoration: "none", ":hover": {textDecoration:"underline", textUnderlineOffset:"5px", textDecorationColor: "red"}}} onClick={() => navigate("/data")}>Data</Button>
    <Button color='inherit' sx={{ textDecoration: "none", ":hover": {textDecoration:"underline", textUnderlineOffset:"5px", textDecorationColor: "red"}}} onClick={() => navigate("/team")}>Team</Button>
     </Stack>  
      
    </Toolbar>
  </AppBar>
  )
}

export default Header