import { BrowserRouter, Route, Routes} from "react-router-dom"
import React from "react";


//MUI imports
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Home from "./Components/Home";
import Data from "./Components/Data";
import Demo from "./Components/Demo";
import Github from "./Components/Github";
import Team from "./Components/Team";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
    <BrowserRouter>
    <CssBaseline />
    <Header />
    <Routes>
    <Route path = '/' element= {<Home />}/>
    <Route path = '/demo' element= {<Demo />}/>
    <Route path = '/data' element= {<Data />}/>
    <Route path = '/team' element= {<Team />}/>
    <Route path = '/github' element= {<Github />}/>     
    
    </Routes>
    
    </BrowserRouter>
    {/* <Footer /> */}
    </>
  );
}

export default App;
