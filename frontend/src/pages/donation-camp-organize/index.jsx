import React from 'react'

import { CampProvider } from "../../context/DonationCampContext"
import DonationCamp from './DonationCamp';

function index() {
  return (
    <CampProvider>
      <DonationCamp/>
    </CampProvider>
  )
}

export default index
