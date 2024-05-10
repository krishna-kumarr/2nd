import React, { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import CandidateFilterWidget from "./employerComponents/CandidateFilterWidget";
import CandidateFilterMethods from "./employerComponents/CandidateFilterMethods";
import CandidateLeftContent from "./employerComponents/CandidateLeftContent";
import CandidateRightContent from "./employerComponents/CandidateRightContent";
import employerContext from "../../hooks/employerContext";


const EmployerCandidates = () => {
  
  const {
    openWidget, setOpenWidget,
    smallDevice,setSmallDevice,
    candidatesList,setCandidatesList,
    candidatesListDuplicate,setCandidatesListDuplicate,
    jobRole,setJobRole,
    keepNotes,setKeepNotes,
    rightSideContent,setRightSideContent,
    filterSkills,setFilterSkills,
    filterLocation,setFilterLocation,
    professionalId,setProfessionalId,
    jobId,setJobId,
    role,setRole,
    appStatus,setAppStatus,
    initialGlow,setInitialGlow,
    cardSelectedGlow,setCardSelectedGlow,
    categorySelectedGlow,setCategorySelectedGlow,
    jobStatus,setJobStatus,
    jobListContent,setJobListContent,
    getCandidateDatas,selectedProfessionalDetails,
    handleJobStatus,token,
    mellieSearchSkills,setMellieSearchSkills,
    mellieSearchLocations,setMellieSearchLocations,
    handleMellieSearch
  }=useContext(employerContext);

 
  
  useEffect(()=>{
    //finding minimum devices and updating to state at initial
    if(window.innerWidth<=992){
      setSmallDevice(true);
    }else{
      setSmallDevice(false)
    }


     //finding minimum devices and updating to state when screen adjustment
     const handleResize = () => {
      if(window.innerWidth<=992){
        setSmallDevice(true);
      }else{
        setSmallDevice(false)
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  })

  useEffect(()=>{
    getCandidateDatas();
  },[])


  const handleSearchInput = (e) => {
    const searchIp = e.target.value.replace(/[\[\]\?\*\+\|\{\}\\\(\)\@\.\n\r]/g ,"");
    const searchData = candidatesList.filter((v)=>{
      return  v.first_name.toLowerCase().match(searchIp.toLowerCase()) || v.last_name.toLowerCase().match(searchIp.toLowerCase())
    })
    setCandidatesListDuplicate(searchData)
  }

  return (
    <>
      <div className={smallDevice ? "homePage-backgroundColor employer-minium-device-height overflow-scroll placeholder-glow": "homePage-backgroundColor pt-2 overflow-hidden placeholder-glow"}>
        <div className="container-fluid px-sm-2 px-md-3 px-xl-5">
          <div className="col-12 pt-3 pb-2">
            <CandidateFilterMethods
              initialGlow={initialGlow}
              jobRole={jobRole}
              jobId={jobId}
              setCandidatesList={setCandidatesList}
              setCandidatesListDuplicate={setCandidatesListDuplicate}
              setRightSideContent={setRightSideContent}
              setCategorySelectedGlow={setCategorySelectedGlow}
              handleSearchInput={handleSearchInput}
              jobStatus={jobStatus}
              setJobStatus={setJobStatus}
              jobListContent={jobListContent}
              setJobListContent={setJobListContent}
              handleJobStatus={handleJobStatus}
              getCandidateDatas={getCandidateDatas}
            />
          </div>

          <div className={smallDevice ? "mt-1 py-1 h-100" : "mt-1 setting-employer-row-height py-1"}>
            <div className="row h-100">
              <div className={initialGlow || categorySelectedGlow ?
                  smallDevice ? 
                  "col-12 col-md-12 col-lg-4 col-xl-3 h-100" 
                :
                  "col-12 col-md-12 col-lg-4 col-xl-3 h-100  overflow-scroll" 
                :
                smallDevice ?
                  "col-12 col-md-12 col-lg-4 col-xl-3 h-100" 
                  :
                    candidatesListDuplicate.length > 0 
                      ? "col-12 col-md-12 col-lg-4 col-xl-3 h-100 overflow-scroll" 
                      :
                      "col-12 col-md-12 col-lg-4 col-xl-3 h-100 overflow-hidden"
                    }
                >
                <CandidateLeftContent 
                  initialGlow={initialGlow}
                  categorySelectedGlow={categorySelectedGlow}
                  smallDevice={smallDevice}
                  candidatesList={candidatesList}
                  candidatesListDuplicate={candidatesListDuplicate}
                  skills={filterSkills}
                  locationData={filterLocation}
                  setProfessionalId={setProfessionalId}
                  jobId={jobId}
                  setCandidatesListDuplicate={setCandidatesListDuplicate}
                  selectedProfessionalDetails={selectedProfessionalDetails}
                  mellieSearchSkills={mellieSearchSkills}
                  setMellieSearchSkills={setMellieSearchSkills}
                  mellieSearchLocations={mellieSearchLocations}
                  setMellieSearchLocations={setMellieSearchLocations}
                  handleMellieSearch={handleMellieSearch}
                />
              </div>

              <div className="col-lg-8 col-xl-9 h-100 d-none d-lg-block">
                <div className={candidatesList.length>0 ? "card h-100 border-0" : "card bg-transparent h-100 border-0"}>
                  <div className={candidatesList.length>0 ? "card-body h-100 overflow-scroll p-0 row" : "card-body h-100 overflow-scroll p-0 row justify-content-center align-items-center"}>
                    {candidatesList.length>0 || initialGlow || categorySelectedGlow || cardSelectedGlow ?
                        <CandidateRightContent
                          initialGlow={initialGlow}
                          cardSelectedGlow={cardSelectedGlow}
                          categorySelectedGlow={categorySelectedGlow}
                          candidatesList={candidatesList}
                          rightSideContent={rightSideContent}
                          role={role}
                          professionalId={professionalId}
                          jobId={jobId}
                          token={token}
                          keepNotes={keepNotes}
                          setKeepNotes={setKeepNotes}
                          appStatus={appStatus}           
                          jobStatus={jobStatus}
                          setJobStatus={setJobStatus}
                          selectedProfessionalDetails={selectedProfessionalDetails}       
                          handleJobStatus={handleJobStatus}    
                        />
                      :
                        <p className="text-center">Oops! No Data Available</p>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      

      <div className={`${openWidget ? 'responsive-filter d-lg-none ' : 'd-none'}`} id="myModal">
        <div className="responsive-filter-card filter-closet">
          <header>
            <h2 className='m-0 text-start ps-3'>Filter</h2>
            <p className=" close-icon responsive-filter-close-icon" onClick={() => setOpenWidget(!openWidget)}><IoMdClose /></p>
          </header>

          <div className="filter-body-content ">
            <CandidateFilterWidget 
              initialGlow={initialGlow}
              skillData={filterSkills}
              locationData={filterLocation}
              mellieSearchSkills={mellieSearchSkills}
              setMellieSearchSkills={setMellieSearchSkills}
              mellieSearchLocations={mellieSearchLocations}
              setMellieSearchLocations={setMellieSearchLocations}
              handleMellieSearch={handleMellieSearch}
            />
          </div>
        </div>
      </div>

        <div className="responsive-filter-toggler d-lg-none">
          {openWidget ?
            <p className="material-symbols-outlined mb-0" onClick={() => setOpenWidget(!openWidget)}>< IoMdClose /></p>
            :
            <p className="material-symbols-outlined  mb-0" onClick={() => setOpenWidget(!openWidget)}><  FiFilter /></p>
          }
        </div>
    </>
  );
};

export default EmployerCandidates;
