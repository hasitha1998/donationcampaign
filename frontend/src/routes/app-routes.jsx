import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

// Components
// import Header from "../components/Header";
// import Footer from "../components/Footer";

//pages
import{


    PredictionUi,
    Home,
    Organizer,
    OrganizerSignup,
    AllOrganizer
}from "../pages"



const AppRoutes=() =>{
  return (
    <>
        <Router>
            <Routes>
                {/* Public Routes */}
            <Route path="/" element={<Home />} />
						<Route path="/prediction" element={<PredictionUi />} />
            <Route path="/organizer-login" element={<Organizer />} />
            <Route path="/organizer-signup" element={<OrganizerSignup />} />
            <Route path="/organizers" element={<AllOrganizer />} />
            </Routes>
        </Router>
    </>
  )
}

export default AppRoutes;