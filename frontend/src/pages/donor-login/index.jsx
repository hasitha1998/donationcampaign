import React from 'react'
import { DonorProvider } from "../../context/DonorContext"
import { ToastContainer } from 'react-toastify';
import DonorLogin from './DonorLogin';

function index() {
  return (
    <>
    <DonorProvider>
    <ToastContainer />
      <DonorLogin/>
      </DonorProvider>
      </>
  )
}

export default index