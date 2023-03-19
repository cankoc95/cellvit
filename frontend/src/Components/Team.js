import React from 'react'
import { Card, CardActionArea, Grid, CardMedia , CardContent, Typography, Link } from '@mui/material'

//Assets
import chris from './Assets/chris.JPG';
import cj from './Assets/cj.JPG';
import john from './Assets/john.JPG';
import ope from './Assets/ope.JPG';

function Team() {
  return (
    <container>
    <Typography style={{margin:"5rem", }} align= "center" variant="h4">Capstone Project Team</Typography>
        <Grid style={{margin:"auto", }} container spacing={1}>
            <Grid item xs={12} sm = {6} md= {3}>
            <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image={chris}
          alt="Chris"
        />
        <CardContent>
        <Typography align= "center" variant="h6" component="div">
          Chris Bakan
          </Typography>
          <Typography style={{color:"blue" }} align= "center" variant="body2" component="div">
          christine.bakan@berkeley.edu
          </Typography>
          {/* <Link align= "center" variant="body2" href="https://www.linkedin.com/in/opeyemi-olanipekun-ph-d-pmp-certified-six-sigma-black-belt-02735133/" underline="none">LinkedIn</Link> */}
          <Link align= "center" variant="body2" href="https://www.linkedin.com/in/opeyemi-olanipekun-ph-d-pmp-certified-six-sigma-black-belt-02735133/" underline="none">
          <Typography align= "center" style={{color:"blue" }}variant="body2" component="div">
          LinkedIn
          </Typography></Link>
        </CardContent>
      </CardActionArea>
    </Card>
            </Grid>

            <Grid item xs={12} sm = {6} md= {3}>
            <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image= {cj}
          alt="CJ"
        />
        <CardContent>
        <Typography align= "center" variant="h6" component="div">
          CJ Donahoe
          </Typography>
          <Typography style={{color:"blue" }} align= "center" variant="body2" component="div">
          cjdonahoe@berkeley.edu
          </Typography>
          <Link align= "center" variant="body2" href="https://www.linkedin.com/in/opeyemi-olanipekun-ph-d-pmp-certified-six-sigma-black-belt-02735133/" underline="none">
          <Typography align= "center" style={{color:"blue" }}variant="body2" component="div">
          LinkedIn
          </Typography></Link>
           </CardContent>
      </CardActionArea>
    </Card>
            </Grid>

            <Grid item xs={12} sm = {6} md= {3}>
            <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image= {john}
          alt="John"
        />
        <CardContent>
        <Typography align= "center" variant="h6" component="div">
          Can (John) Koc
          </Typography>
          <Typography style={{color:"blue" }} align= "center" variant="body2" component="div">
          cankoc@berkeley.edu
          </Typography>          
          <Link align= "center" variant="body2" href="https://www.linkedin.com/in/opeyemi-olanipekun-ph-d-pmp-certified-six-sigma-black-belt-02735133/" underline="none">
          <Typography align= "center" style={{color:"blue" }}variant="body2" component="div">
          LinkedIn
          </Typography></Link>
        </CardContent>
      </CardActionArea>
    </Card>
            </Grid>

            <Grid item xs={12} sm = {6} md= {3}>
            <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image= {ope}
          alt="Ope"
        />
        <CardContent>
        <Typography align= "center" variant="h6" component="div">
          Opeyemi Olanipekun
          </Typography>
          <Typography style={{color:"blue" }} align= "center" variant="body2" component="div">
          obolanipekun@berkeley.edu
          </Typography>
          <Link align= "center" variant="body2" href="https://www.linkedin.com/in/opeyemi-olanipekun-ph-d-pmp-certified-six-sigma-black-belt-02735133/" underline="none">
          <Typography align= "center" style={{color:"blue" }}variant="body2" component="div">
          LinkedIn
          </Typography></Link>
          </CardContent>
      </CardActionArea>
    </Card>
            </Grid>
        </Grid>


        <Typography style={{margin:"3.5rem" }} align= "center" variant="h4">Project Advisors</Typography>
        <Grid style={{margin:"auto",}} align= "center" container spacing={3}>
            <Grid item xs={12} sm= {6}>
            <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image="https://media.licdn.com/dms/image/C4D03AQFlO5GzA4-GkA/profile-displayphoto-shrink_200_200/0/1632190911471?e=1684368000&v=beta&t=KM5riT6B1myv7qGf0eSgywS-0YuOgm6rmgZAP4GShPM"
          alt="Joyce"
        />
        <CardContent>
        <Typography align= "center" variant="h6" component="div">
          Joyce J. Shen
          </Typography>
          <Typography style={{color:"blue" }} align= "center" variant="body2" component="div">
          joyceshen@ischool.berkeley.edu
          </Typography>
          {/* <Link align= "center" variant="body2" href="https://www.linkedin.com/in/opeyemi-olanipekun-ph-d-pmp-certified-six-sigma-black-belt-02735133/" underline="none">LinkedIn</Link> */}
          <Link align= "center" variant="body2" href="https://www.linkedin.com/in/opeyemi-olanipekun-ph-d-pmp-certified-six-sigma-black-belt-02735133/" underline="none">
          <Typography align= "center" style={{color:"blue" }}variant="body2" component="div">
          LinkedIn
          </Typography></Link>
        </CardContent>
      </CardActionArea>
    </Card>
            </Grid>

            <Grid paddingBottom= {5} item xs={12} sm= {6}>
            <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image= "https://media.licdn.com/dms/image/C4D03AQE5Bor4sprfzQ/profile-displayphoto-shrink_200_200/0/1517251844615?e=1684368000&v=beta&t=EqGqdQRMzJfcGMFBx0AdIqbRStUZliXxofRUsZluEA4"
          alt="CJ"
        />
        <CardContent>
        <Typography align= "center" variant="h6" component="div">
          Fred Nugen
          </Typography>
          <Typography style={{color:"blue" }} align= "center" variant="body2" component="div">
          nooj@ischool.berkeley.edu
          </Typography>
          <Link align= "center" variant="body2" href="https://www.linkedin.com/in/opeyemi-olanipekun-ph-d-pmp-certified-six-sigma-black-belt-02735133/" underline="none">
          <Typography align= "center" style={{color:"blue" }}variant="body2" component="div">
          LinkedIn
          </Typography></Link>
           </CardContent>
      </CardActionArea>
    </Card>
            </Grid>

       

        
        </Grid>
        
    </container>
  )
}

export default Team

