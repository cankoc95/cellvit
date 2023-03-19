import React, { useState } from 'react'
// import { Link } from "react-router-dom"
import { Link } from '@mui/material'

// MUI imports
import { Button, Typography, Box, useMediaQuery, useTheme} from '@mui/material';

//Components
import Header from './Header'; 

//Assets
import callpaintimage from './Assets/callpaintimage.jpg';
import biologicalscientists from './Assets/biologicalscientists.jpg';



function Home() {
    const [btnColor, setBtnColor] = useState("error");
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    
  return (
    <>
   
    
      <Box style={{position: "relative"}}> 
      <img src={callpaintimage} alt="cellpaint" style={{ width: "100%", height: "50vh" }}/>
      <div style={{
						position: "absolute",
						zIndex: "100",
						top: "100px",
						left: "50px",
						textAlign: "center",
					}}>
      <Typography fontSize={{lg:70, md:60, sm:45, xs:30}} style={{ color: "white", fontWeight: "bolder" }}>Welcome to <span style={{color: 'red'}}>CELLViT</span> Project Page</Typography>    
      </div>
      </Box>
      <Box style={{position: "relative"}} bgcolor= "#fff" padding={5} display="flex" justifyContent={"space-between"} alignItems="center" flexDirection={isMatch ? "column" : "row"}>
      <Box>
     <Typography fontSize={{lg:24, md:20, sm:16, xs:12}}> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
     </Typography>
      </Box>
      
      <img src={biologicalscientists} alt="biologicalscientist" loading="lazy" width={isMatch ? "100%" : "50%" } style={{marginLeft: "10%", borderRadius: 20}} height="300px"/>
      {/* <Link variant="body2" href="https://studentscholarships.org/salary/487/biological_scientists.php" underline="none">
          <Typography padding={5} marginTop={14} marginLeft={-10} style={{color:"blue", position: "absolute"}} variant="body2" component="div">
          Source
          </Typography></Link> */}
      
          
      </Box>
      
      
      
  </>
  );
}

export default Home;

