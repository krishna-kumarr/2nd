import React from 'react'
import { Outlet } from 'react-router-dom'
import EmployerNavComponent from './EmployerNavComponent'

const EmployerAuth = () => {
  const employerPageDashboardMenu = ["Home", "Candidates", "Pool"];


  return (
    <>
        <EmployerNavComponent  dashboadMenus={employerPageDashboardMenu}/>
        <Outlet/>
    </>
  )
}

export default EmployerAuth