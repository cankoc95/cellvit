import React, { useState } from 'react'
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, useTheme, useMediaQuery, Link } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
// import MenuIcon from '@mui/icons-material/Menu';

// const sampleList = ["Home", "Demo"];
// const DrawerComp = () => {
//   return (
//     <React.Fragment>
//   <Drawer open={true}>
//   <List>
//     {sampleList.map((item) => (
//         <ListItemButton>
//             <ListItemText>{item}</ListItemText>
//         </ListItemButton>
//     ))}
//     </List>
//   </Drawer>
//   <IconButton sx={{ color: "white", marginLeft: "auto" }}>
//   <MenuIcon color="blue" />
//   </IconButton>
//   </React.Fragment>
//   );
// };

// export default DrawerComp


const DrawerComp = ({links}) => {
    
    const [open, setOpen] = useState(false)
  return (
    <>
        <Drawer PaperProps={{sx:{backgroundColor:'rgba(49,49,116,1)'}}} open={open} onclose={()=>setOpen(false)}>
            <List>
            {links.map((link, index) => (
                <ListItemButton LinkComponent={Link} to={`/${link==="home" ? "" : link}`} onClick= {()=>setOpen(false)} key={index} divider>
                <ListItemIcon>
                    <ListItemText sx={{color:'white'}}>
                        {link}
                    </ListItemText>
                </ListItemIcon>
            </ListItemButton>
            ))}
            </List>
        </Drawer>
        <IconButton sx={{ marginLeft: "auto", color:"white"}} onClick={()=>setOpen(!open)}>
            <MenuRoundedIcon/>
        </IconButton>
    </>
  );
};

export default DrawerComp