import React from 'react'
import OrganizerSignup from './OrganizerSignup'
import { OrganizerProvider } from "../../context/OrganizerContext"

function index() {
  return (
    <>
    <OrganizerProvider>
      <OrganizerSignup/>
      </OrganizerProvider>
      </>
  )
}

export default index
