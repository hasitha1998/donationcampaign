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
    AllOrganizer,
    DonationCamp,
    DonorSignup,
    DonorLogin,
    UnderReview,
    DonorHome,
    

}from "../pages"



const AppRoutes=() =>{
  return (
    <>
        <Router>
            <Routes>
                {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/under-review" element={<UnderReview />} />
						<Route path="/prediction" element={<PredictionUi />} />
            <Route path="/organizer-login" element={<Organizer />} />
            <Route path="/organizer-signup" element={<OrganizerSignup />} />
            <Route path="/donor-signup" element={<DonorSignup />} />
            <Route path="/donor-login" element={<DonorLogin />} />
            <Route path="/organizers" element={<AllOrganizer />} />
            <Route path="/organize-camp" element={<DonationCamp />} />
            <Route path="/donor-home" element={<DonorHome />} />
            </Routes>
        </Router>
    </>
  )
}

export default AppRoutes;