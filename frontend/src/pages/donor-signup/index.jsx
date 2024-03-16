import React from 'react'
import DonorSignup from './DonorSignup'
import { DonorProvider } from "../../context/DonorContext"
import { ToastContainer } from 'react-toastify';

function index() {
  return (
    <>
    
    <DonorProvider>
    <ToastContainer />
      <DonorSignup/>
      </DonorProvider>
      </>
  )
}

export default index
