import React, { useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery, Tabs, Tab, AppBar, Button} from "@mui/material";

export default function Data() {
  const [value, setValue] = useState(0)
  const handleTabs=(e, val)=> {
    console.warn(val)
    setValue(val)
  }
  return (
    <Box sx={{ width: "max_content"}} style={{marginTop:"15rem", marginLeft:"200px", marginRight:"200px",}}>
    <Box>
    
    {/* <AppBar position="static"> */}
      <Tabs value={value} onChange={handleTabs}
      sx={{
        "& button": {borderRadius: 1},
        "& button: hover": { borderColor: "red"}
      }}
     
      >
      <Tab  sx={{border:1, borderColor: "divider"}} label="Cell Painting Images" />
      <Tab sx={{border:1, borderColor: "divider"}} label="Genetic Perturbations" />
      <Tab sx={{border:1, borderColor: "divider"}} label="Chemical Perturbations" />
      <Tab sx={{border:1, borderColor: "divider"}} label="AWS Data Access" />
      </Tabs>
      </Box>
      <Box sx={{ width: "max_content", borderBottom: 1, borderRight: 1, borderLeft: 1, borderTop: 1 }}>
    {/* </AppBar> */}
    <TabPanel value={value} index={0}>
    <Typography fontSize={{ lg:20, md:18, sm:20, xs:14 }} padding={1} variant="body1">The Cell Painting Gallery is a collection of image datasets created using the Cell Painting assay.</Typography>
  <Typography fontSize={{ lg:20, md:18, sm:20, xs:14 }} padding={1} variant="body1">The images of cells are captured by microscopy imaging, and reveal the response of various labeled cell components to whatever treatments are tested, which can include genetic perturbations, chemicals or drugs, or different cell types. The datasets can be used for diverse applications in basic biology and pharmaceutical research, such as identifying disease-associated phenotypes, understanding disease mechanisms, and predicting a drug’s activity, toxicity, or mechanism of action (Chandrasekaran et al 2020). </Typography>
  <Typography fontSize={{ lg:20, md:18, sm:20, xs:14 }} padding={1} variant="body1">This collection is maintained by the Carpenter–Singh lab and the Cimini lab at the Broad Institute.</Typography>
    </TabPanel>
    <TabPanel value={value} index={1}>Item 2 detail</TabPanel>
    <TabPanel value={value} index={2}>Item 3 detail</TabPanel>
    <TabPanel value={value} index={3}>
    <Typography fontWeight = "bold" fontSize={{ lg:20, md:18, sm:20, xs:14 }} padding={1} variant="body1">Resources on AWS</Typography>
  <Typography fontSize={{ lg:20, md:18, sm:20, xs:14 }} padding={1} style={{marginLeft:"60px"}} variant="body1">Description</Typography>
  <Typography fontSize={{ lg:20, md:18, sm:20, xs:14 }} style={{marginLeft:"64px"}} variant="body1">Cell Painting data, comprising fluorescence microscopy cell images (TIFF), extracted features (CSV), and associated metadata (CSV and TXT).</Typography>
  <Typography fontSize={{ lg:20, md:18, sm:20, xs:14 }} style={{marginLeft:"64px"}} variant="body1">Resource type</Typography>
  <Typography fontSize={{ lg:20, md:18, sm:20, xs:14 }} style={{marginLeft:"64px"}} variant="body1">S3 Bucket</Typography>
  <Typography fontWeight = "bold" fontSize={{ lg:20, md:18, sm:20, xs:14 }} style={{marginLeft:"64px"}} variant="body1">Amazon Resource Name (ARN)</Typography>
  <Typography fontSize={{ lg:20, md:18, sm:20, xs:14 }}  style={{marginLeft:"64px"}} variant="body1" color="red">arn:aws:s3:::cellpainting-gallery</Typography>
  <Typography fontWeight = "bold" fontSize={{ lg:20, md:18, sm:20, xs:14 }} style={{marginLeft:"64px"}} variant="body1">AWS Region</Typography>
  <Typography fontSize={{ lg:20, md:18, sm:20, xs:14 }} style={{marginLeft:"64px"}} variant="body1" color="red">us-east-1</Typography>
  <Typography fontWeight = "bold" fontSize={{ lg:20, md:18, sm:20, xs:14 }} style={{marginLeft:"64px"}} variant="body1">AWS CLI Access (No AWS account required)</Typography>
  <Typography fontSize={{ lg:20, md:18, sm:20, xs:14 }} style={{marginLeft:"64px"}} variant="body1" color="red">aws s3 ls --no-sign-request s3://cellpainting-gallery/</Typography>
  <Typography fontWeight = "bold" fontSize={{ lg:20, md:18, sm:20, xs:14 }} style={{marginLeft:"64px"}} variant="body1">Explore</Typography>
  <Button variant="body1" style={{marginLeft:"64px"}} href="https://github.com/broadinstitute/cellpainting-gallery" fontSize={{ lg:20, md:18, sm:20, xs:14 }} sx={{						
            fontWeight: "bolder",
            color: "blue",  
            
            }}>Documentation</Button>
  <Button variant="body1" style={{marginLeft:"64px"}} href="https://cellpainting-gallery.s3.amazonaws.com/index.html" fontSize={{ lg:20, md:18, sm:20, xs:14 }} sx={{						
              fontWeight: "bolder",
              color: "blue",							
              
							}}>Browse Bucket</Button>
    </TabPanel>
    </Box>
    </Box>
  );
}
function TabPanel(props)
{
  const {children, value, index} = props;
  return(<div>
    {
      value===index && (
        <h1>{children}</h1>
      )
    }
  </div>)
}

// export default Data


