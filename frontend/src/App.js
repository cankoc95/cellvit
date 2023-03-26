import { BrowserRouter, Route, Routes} from "react-router-dom"
import React from "react";


//MUI imports
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Home from "./Components/Home";
import Data from "./Components/Data";
import Motivation from "./Components/Motivation";
import References from "./Components/References";
import Team from "./Components/Team";
import Header from "./Components/Header";
import Footer from "./Components/Footer";


const linksArray = ["home", "motivation", "data", "team", "references"];

function App() {
  return (
    <>
    <BrowserRouter>
    <CssBaseline />
    <Header links={linksArray} />
    <Routes>
    <Route path = '/' element= {<Home />}/>
    <Route path = '/motivation' element= {<Motivation />}/>
    <Route path = '/data' element= {<Data />}/>
    <Route path = '/team' element= {<Team />}/>
    <Route path = '/references' element= {<References />}/>     
    
    </Routes>
    
    </BrowserRouter>
    <Footer />
    </>
  );
}

export default App;
