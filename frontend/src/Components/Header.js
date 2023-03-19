import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"


//MUI imports
import { Button , Typography, Grid, AppBar, Toolbar, Stack, useTheme, useMediaQuery, Tabs, Tab, Box} from '@mui/material';
import DrawerComp from './DrawerComp';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';


//Assets
import Logo2Edited from './Assets/Logo2Edited.png';




function Header({links}) {
  const navigate = useNavigate();
  const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setvalue] = useState()
 
  return (
    <AppBar sx={{backgroundImage:"linear-gradient(90deg, rgba(180,58,58,1) 2%, rgba(49,49,116,1) 36%, rgba(105,0,161,1) 73%, rgba(166,69,252,1) 100%)"}}>
  <Toolbar>
  {isMatch ? <>
    {/* <Typography>
      <ShoppingCartCheckoutIcon />
      </Typography> */}
      
      <Button><img src={Logo2Edited } width={isMatch ? "40%" : "60%" } onClick={() => navigate("/")}/></Button>
      {/* <Button color="inherit" onClick={() => navigate("/")}><Typography variant="h4">Cell<span style={{color: 'red'}}>ViT</span></Typography></Button> */}
    <DrawerComp links= {links} />
  </> : <Grid sx={{placeItems:'center'}}container>
    <Grid item xs={4}>
      {/* <Typography>
      <ShoppingCartCheckoutIcon />
      </Typography> */}
      <Button><img src={Logo2Edited } width={isMatch ? "100%" : "50%" } onClick={() => navigate("/")}/></Button>
      {/* <Button color="inherit" onClick={() => navigate("/")}><Typography variant="h4">Cell<span style={{color: 'red'}}>ViT</span></Typography></Button> */}
      {/* <img src={websitelogotransparent1 } onClick={() => navigate("/")}/ > */}
    </Grid>
    <Grid item xs={6}>
      <Tabs indicatorColor="secondary" textColor="inherit" value={value} onChange={(e, val) => setvalue(val)}>
        {links.map((link, index) => (
          <Tab LinkComponent={Link} to={`/${link==="home" ? "" : link}`} sx={{textDecoration: "none", ":hover": {textDecoration: "underline", textUnderlineOffset: "18px"},}} key={index} label={link}/>
        ))}
      </Tabs>
    </Grid>
    <Grid item xs={1} />
    {/* <Grid item sx={3}>
      <Box display="flex">
               
        <Link href="https://github.com/cankoc95/cellvit" style={{ textDecoration: 'none' }}><Button sx={{marginLeft:"auto", background:'rgba(180,58,58,1)'}} variant="contained">Github Link</Button></Link> 
              
      </Box>
    </Grid> */}

  </Grid>}
    
    
      
    </Toolbar>
   
  </AppBar>
  )
}

export default Header



{/* <Link href="https://github.com/cankoc95/cellvit"><Button sx={{ ml: 2, fontSize:{ lg:20, md:17, sm:12, xs:6}}} variant="contained">Project Github Link</Button></Link>   */}

// function Header({links}) {
//   const theme = useTheme();
//     const isMatch = useMediaQuery(theme.breakpoints.down('md'));
//   const [value, setvalue] = useState()
 
//   return (
//     <AppBar sx={{backgroundImage:"linear-gradient(90deg, rgba(180,58,58,1) 2%, rgba(49,49,116,1) 36%, rgba(105,0,161,1) 73%, rgba(166,69,252,1) 100%)"}}>
//   <Toolbar>
//   {isMatch ? <>
//     <Typography>
//       <ShoppingCartCheckoutIcon />
//       </Typography>
//     <DrawerComp links= {links} />
//   </> : <Grid sx={{placeItems:'center'}}container>
//     <Grid item xs={2}>
//       <Typography>
//       <ShoppingCartCheckoutIcon />
//       </Typography>
//     </Grid>
//     <Grid item xs={6}>
//       <Tabs indicatorColor="secondary" textColor="inherit" value={value} onChange={(e, val) => setvalue(val)}>
//         {links.map((link, index) => (
//           <Tab key={index} label={link}/>
//         ))}
//       </Tabs>
//     </Grid>
//     <Grid item xs={1} />
//     <Grid item sx={3}>
//       <Box display="flex">
//         <Button sx={{marginLeft:"auto", background:'rgba(180,58,58,1)'}} variant="contained">Github Link</Button>
//         {/* <Button sx={{marginLeft:1}} variant="contained">Github Link</Button> */}
//       </Box>
//     </Grid>

//   </Grid>}
    
    
      
//     </Toolbar>
   
//   </AppBar>
//   )
// }

// export default Header




// function Header() {
//   const isMatch = useMediaQuery(useTheme().breakpoints.down("md"));
//   console.log(isMatch);
//     const navigate = useNavigate();
//   return (
//     <AppBar position="static" style={{ backgroundColor: "black"}}>
//    { isMatch ? (
//     <>
//     <Button color="inherit" onClick={() => navigate("/")}><Typography variant="h4">CellViT</Typography></Button>
//     <DrawerComp />
//      </>
//      ) 
//      : (<Toolbar>
    
//     <div style={{ marginRight: "auto" }}>
//     {/* <img src={Logo2 } onClick={() => navigate("/")} style={{ width: "100%", height: "6vh"}}/ > */}
//     <Button color="inherit" onClick={() => navigate("/")}><Typography variant="h4">CellViT</Typography></Button>
//     {/* <h2 color="inherit" onClick={() => navigate("/")}>CELLViT</h2> */}
//     </div>
//     <Stack direction='row' spacing={2} style={{ display: "flex", width:"100%", justifyContent: "center", alignItems: "center", }}>
//     <Button color='inherit' sx={{ textDecoration: "none", ":hover": {textDecoration:"underline", textUnderlineOffset:"5px", textDecorationColor: "red"}}} onClick={() => navigate("/")}>Home</Button>
//     <Button color='inherit' sx={{ textDecoration: "none", ":hover": {textDecoration:"underline", textUnderlineOffset:"5px", textDecorationColor: "red"}}} onClick={() => navigate("/demo")}>Demo</Button>
//     <Button color='inherit' sx={{ textDecoration: "none", ":hover": {textDecoration:"underline", textUnderlineOffset:"5px", textDecorationColor: "red"}}} onClick={() => navigate("/data")}>Data</Button>
//     <Button color='inherit' sx={{ textDecoration: "none", ":hover": {textDecoration:"underline", textUnderlineOffset:"5px", textDecorationColor: "red"}}} onClick={() => navigate("/team")}>Team</Button>
//      </Stack>  
      
//     </Toolbar>)}
   
//   </AppBar>
//   )
// }

// export default Header