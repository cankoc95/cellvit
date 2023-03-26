import React from 'react'
import { Grid, Box, Typography, useTheme, useMediaQuery, } from "@mui/material";

//Assets
import drugiscoveryimage from './Assets/drugiscoveryimage.JPG';
import cellpaintingassayworkflow from './Assets/cellpaintingassayworkflow.JPG';



function Motivation() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  return (
  <Box   
  style={{marginTop:"2rem", }} 
  width="100%"
  >
  <Box padding ={10} justifyContent="center" alignItems="center">
  <Grid style={{margin:"auto", }} container spacing={3}>
  <Grid item xs={12} md= {5} lg={7}>
  <Typography fontWeight = "bold" fontSize={{ lg:40, md:34, sm:30, xs:26 }} padding={2} variant="h4">CellViT: Cell-painting Vision Transformer</Typography>
  <Typography fontSize={{ lg:20, md:18, sm:20, xs:14 }} variant="body2" padding={1}> Through the use of a transformer-based neural network, we aim to significantly boost the performance of cell-painting assays and help accelerate therapeutic 
              target & biomarker discovery efforts in drug development.
 </Typography>
 <Typography fontSize={{ lg:34, md:30, sm:24, xs:21 }} variant="body1" padding={1}> Project Objectives:</Typography>
 <Typography fontSize={{ lg:20, md:18, sm:20, xs:14 }} variant="body2">
  <ul>
    <li>Accurately classify cell treatments applied (chemical & genetic)</li>
    <li>Improve classification accuracy beyond the convolutional neural network based method (current best-in-class approach)</li>
    <li>Provide a pre-trained MaxVit model specific for cell painting images for community use</li>
  </ul>
</Typography>
<Typography fontSize={{ lg:20, md:18, sm:20, xs:14 }} component="div">
The goal of this project is to provide a proof of concept model using the multi-axis transformer to improved the cell painting assay image classification performance. 
</Typography>
  </Grid>
  {/* <Grid item xs={12} md= {6}></Grid> */}
  <Grid item xs={12} md= {7} lg={5}>
  <img 
  src={drugiscoveryimage} 
  alt="drugiscoveryimage" 
  loading="lazy" 
  width={isMatch ? "85%" : "85%"}
  style={{marginRight:'10%'}}/>
  </Grid>
  </Grid>


  <Grid container spacing={3}>  
  <Grid item xs={12} md= {7}>
  <img 
  src={cellpaintingassayworkflow} 
  alt="drugiscoveryimage" 
  loading="lazy" 
  width={isMatch ? "100%" : "85%"}
  style={{marginLeft:'10%'}}/>
  </Grid>
  <Grid item xs={12} md= {5}>
  <Typography fontWeight = "bold" fontSize={{ lg:40, md:34, sm:30, xs:26 }} padding={2} variant="h5">Why does Cell Painting matter?</Typography>
  <Typography fontSize={{ lg:20, md:18, sm:20, xs:14 }} padding={1} variant="body1">Today, nine out of ten drugs fail in clinical trials. Furthermore, it takes over a decade and an average cost of $2 billion to develop and approve each medicine.1</Typography>
  <Typography fontSize={{ lg:20, md:18, sm:20, xs:14 }} padding={1} variant="body1">An important underlying reason is the gap that exists between cell-based in vitro research and clinical research—often referred to as the “valley of death.” Promising in vitro candidates often fail in the clinic, as in vitro models turn out to be insufficiently predictive and translatable to the clinical setting.</Typography>
  <Typography fontSize={{ lg:20, md:18, sm:20, xs:14 }} padding={1} variant="body1">Cell Painting is a high-content, multiplexed image-based assay used for cytological profiling.  Profiling aims to capture and encode as many properties of a cell as possible (unguided by prior knowledge), providing significant advantage over a traditional screening method where a set of known properties of interest are selected for investigation.2  </Typography>
  <Typography fontSize={{ lg:20, md:18, sm:20, xs:14 }} padding={1} variant="body1">In a Cell Painting assay, up to six fluorescent dyes are used to label different components of the cell including the nucleus, endoplasmic reticulum, mitochondria, cytoskeleton, Golgi apparatus, and RNA. The goal is to “paint” as much of the cell as possible to capture a representative image of the whole cell.</Typography>
  <Typography fontSize={{ lg:20, md:18, sm:20, xs:14 }} padding={1} variant="body1">Using image analysis methods such as CellViT,  features are extracted and profiled from each cell. </Typography>
  </Grid>
  
  </Grid>
  </Box>
  </Box>

  )
}

export default Motivation;