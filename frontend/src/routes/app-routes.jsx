import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

// Components
// import Header from "../components/Header";
// import Footer from "../components/Footer";

//pages
import{

    PredictionUi
}from "../pages"



const AppRoutes=() =>{
  return (
    <>
        <Router>
            <Routes>
                {/* Public Routes */}
						<Route path="/prediction" element={<PredictionUi />} />
            </Routes>
        </Router>
    </>
  )
}

export default AppRoutes;