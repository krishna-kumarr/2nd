import React from 'react'
import EntryLevelLeftSideContainer from '../../components/Container/EntryLevelLeftSideContainer'
import EntryLevelRightSideContainer from '../../components/Container/EntryLevelRightSideContainer'
import { Toaster } from 'react-hot-toast';
import EmployerSignupForm from '../../components/Forms/employer/EmployerSignupForm';


const EmployerManualSignup = () => {
  return (
    <div className="container-fluid ps-md-0">
      <Toaster/>
      <div className="row g-0">
        <EntryLevelLeftSideContainer bgImage="professional-bg-image" />
        <EntryLevelRightSideContainer formTitle="Create Account"  formWidth="col-lg-8 col-md-8"  formHeaderClassName="signup-heading" form={<EmployerSignupForm/>} formFooterQuestion="Already have an account?" footerNavigationLink="/" footerNavigationTestId="signin-link" footerNavigateLinkContent="Sign in" loginMode="signup" id="manual-sign-in"/>
      </div>
    </div>
  )
}

export default EmployerManualSignup