import React from "react";


// MUI imports
import { Button, Link, Typography, Box} from '@mui/material';

// function Footer() {
//   const year = new Date().getFullYear();
//   return (
//     <footer style={{ backgroundColor: "black", height: "auto" }}>
//       <Link href="https://github.com/cankoc95/cellvit" underline="hover"> {'Project Githib Link'} </Link>
//       <p>Copyright ⓒ {year} by the CellViT project team</p>
//     </footer>
//   );
// }

// export default Footer;



function Footer() {
  const year = new Date().getFullYear();
 
  return <Box bgcolor= "#fbf2f2" display="flex" flexDirection="column">
    <Typography fontWeight = "bold" fontSize={{lg:45, md:30, sm:25, xs:20}} variant="h3" paddingTop={10} textAlign="center">Try out our model for free</Typography>
    <Typography fontSize={{lg:24, md:20, sm:16, xs:14}} variant="div" padding={4} textAlign="center">CellViT model for cell painting assay classification</Typography>
    <Box display="flex" margin="auto" justifyContent={"center"} padding={5}> 
    <Link href="https://drive.google.com/drive/folders/1nU_J764-zvR390j358e1TYrwUScFHv9T"><Button sx={{ mr: 2, fontSize:{ lg:20, md:17, sm:12, xs:6}}} variant="contained">Get access to our model weights</Button></Link>
    <Link href="https://github.com/cankoc95/cellvit"><Button sx={{ ml: 2, fontSize:{ lg:20, md:17, sm:12, xs:6}}} variant="contained">Project Github Link</Button></Link>  
    </Box>
    <Typography fontSize={{lg:24, md:20, sm:16, xs:12}} variant="div" padding={1} textAlign="center">Copyright ⓒ {year} by the CellViT project team</Typography>
  </Box>
}

export default Footer;


