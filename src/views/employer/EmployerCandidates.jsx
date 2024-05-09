import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import CandidateFilterWidget from "./employerComponents/CandidateFilterWidget";
import CandidateFilterMethods from "./employerComponents/CandidateFilterMethods";
import CandidateLeftContent from "./employerComponents/CandidateLeftContent";
import CandidateRightContent from "./employerComponents/CandidateRightContent";
import axios from "axios";
import Button from "../../components/Button/Button";
import CandidateProfile from "./CandidateProfile";


const EmployerCandidates = () => {
  const [openWidget, setOpenWidget] = useState(false);
  const [smallDevice,setSmallDevice] = useState(false);
  const [candidatesList,setCandidatesList] = useState([]);
  const [candidatesListDuplicate,setCandidatesListDuplicate] = useState([]);
  const [jobRole,setJobRole] = useState([]);
  const [keepNotes,setKeepNotes]=useState('');
  const [rightSideContent,setRightSideContent]=useState({});
  const [filterSkills,setFilterSkills]=useState([]);
  const [filterLocation,setFilterLocation]=useState([]);
  const [professionalId,setProfessionalId]=useState(0);
  const [jobId,setJobId]=useState(0);
  const [role,setRole]=useState('');
  const [appStatus,setAppStatus]=useState('');
  const [initialGlow,setInitialGlow]=useState(false);
  const [cardSelectedGlow,setCardSelectedGlow]=useState(false);
  const [categorySelectedGlow,setCategorySelectedGlow]=useState(false);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzE1MjI1NzY4LCJqdGkiOiIwOGVkY2FhMC00MGNjLTQwYWYtYWY3MC04OWVlOTk3NTczNGYiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiZW1wbG95ZXJAYWRyYXByb2R1Y3RzdHVkaW8uY29tIiwibmJmIjoxNzE1MjI1NzY4LCJjc3JmIjoiMGZkYjg1MGMtMGZjZC00NWE3LTk2NjktZDQyODc3OGEzZTc0IiwiZXhwIjoxNzE1MzEyMTY4fQ.gBnuEOxHKJcls-LhjLQ0wmJ_LEyTB6GGMcH89QF5IMI";
  
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

  const getCandidateDatas = async()  =>{
    setInitialGlow(true)
    var obj={
      job_id : ""
    }

    try{
      await axios.post('https://devapi.2ndcareers.com/candidates_dashboard_view',obj, {
        headers: {
          authorization: `Bearer ${token}`,
        }
        })
        .then((res)=>{
          console.log(res)
          if(res.data.error_code === 0){
            setInitialGlow(false)
            setCandidatesList(res.data.data.candidates_short_desc);
            setCandidatesListDuplicate(res.data.data.candidates_short_desc);
            setJobRole(res.data.data.job_list)
            setRole(res.data.data.candidates_short_desc[0].job_title)
            setProfessionalId(res.data.data.professional_id)
            setJobId(res.data.data.job_id)
            setAppStatus(res.data.data.application_status)
            setRightSideContent(res.data.data)
            setKeepNotes(res.data.data.custom_notes===null ? '' : res.data.data.custom_notes)

            //skills data for filter
            res.data.data.filter_parameters.skill.map((v,i)=>{
              return i>=0 ? setFilterSkills(prevState=>[...prevState,{
                value:i+1,
                label:v
              }])
              :
              null
            })

            res.data.data.filter_parameters.location.map((v,i)=>{
              return i>=0 ? setFilterLocation(prevState=>[...prevState,{
                value:i+1,
                label:v
              }])
              :
              null
            })

            console.log(res.data.data)    
          }
        })
    }
    catch(err){
      console.log(err)
    }
  }

  const selectedProfessionalDetails = async(job_id,professional_id) =>{
    setCardSelectedGlow(true)

    var obj = {
      job_id:job_id,
      professional_id:professional_id
    }

    try{
      await axios.post('https://devapi.2ndcareers.com/get_selected_professional_detail',obj, {
        headers: {
          authorization: `Bearer ${token}`,
        }
        })
        .then((res)=>{
          console.log(res)
          if(res.data.error_code === 0){
              setCardSelectedGlow(false)
              setRightSideContent(res.data.data)
              setRole(res.data.data.experience[0].job_title)
              setProfessionalId(res.data.data.professional_id)
              setJobId(res.data.data.job_id)
              setAppStatus(res.data.data.application_status)
              setKeepNotes(res.data.data.custom_notes===null ? '' : res.data.data.custom_notes)
          }

        })
    }
    catch(err){
      console.log(err)
    }
  }

  const handleSearchInput = (e) => {
    const searchIp = e.target.value.replace(/[\[\]\?\*\+\|\{\}\\\(\)\@\.\n\r]/g ,"");
    const searchData = candidatesList.filter((v)=>{
      return v.job_title.toLowerCase().match(searchIp.toLowerCase()) || v.first_name.toLowerCase().match(searchIp.toLowerCase()) || v.last_name.toLowerCase().match(searchIp.toLowerCase())
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
                  candidatesList={candidatesList}
                  candidatesListDuplicate={candidatesListDuplicate}
                  skills={filterSkills}
                  locationData={filterLocation}
                  setProfessionalId={setProfessionalId}
                  jobId={jobId}
                  setCandidatesListDuplicate={setCandidatesListDuplicate}
                  selectedProfessionalDetails={selectedProfessionalDetails}
                />
              </div>

              <div className="col-lg-8 col-xl-9 h-100 d-none d-lg-block">
                {initialGlow || cardSelectedGlow || categorySelectedGlow ?
                <div className="card h-100 border-0">
                  <div className="card-body h-100 overflow-scroll p-lg-4 row">
                    <div className="col-12">
                      <div className="container-fluid">
                        <div className="row border-bottom border-3 py-3">
                          <div className="col-2 text-center">
                            <img src={""} alt="..." width={100} height={100} className='pe-none placeholder rounded-circle' />
                          </div>

                          <div className="col-10">
                            <div className="row">
                              <div className="col-lg-6 col-xxl-8">
                                <h1 className="employer-card-candidate-name mb-0 d-inline-block pe-3 border-end border-dark placeholder w-50 py-3 rounded-1 me-2"></h1>
                                <h1 className="employer-card-candidate-role mb-0 d-inline-block ps-3 placeholder w-25 py-3 rounded-1"></h1>
                              </div>
                              <div className="col-lg-6 col-xxl-4">
                                <button type="button" className="btn btn-sm px-5 border py-2 me-1 placeholder"></button>
                                <button type="button" className="btn btn-sm px-5 border py-2 placeholder" ></button>
                              </div>
                              <div className="col-12 pt-4 row">
                                <div className="col-5">
                                  <p className="employer-card-candidate-role placeholder pt-3 pb-2 w-100 rounded-1"></p>
                                </div>
                                <div className="col-4">
                                  <p className="employer-card-candidate-role placeholder pt-3 pb-2 w-75 rounded-1"></p>
                                </div>
                                <div className="col-3">
                                  <p className="employer-card-candidate-role placeholder pt-3 pb-2 w-75 rounded-1"></p>
                                </div>
                              </div>
                              <div className="col-12">
                                <button buttonType="button" className="btn col-2 me-4 py-1 placeholder"></button>
                                <button buttonType="button" className="btn col-1 py-1 placeholder"></button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-12 border-bottom border-3 py-4">
                          <CandidateProfile rightSideContent={rightSideContent} initialGlow={initialGlow} categorySelectedGlow={categorySelectedGlow} cardSelectedGlow={cardSelectedGlow}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                :
                <div className={rightSideContent.job_id!==undefined ? "card h-100 border-0" : "card bg-transparent h-100 border-0"}>
                  <div className={rightSideContent.job_id!==undefined ? "card-body h-100 overflow-scroll p-lg-4 row" : "card-body h-100 overflow-scroll p-lg-4 row justify-content-center align-items-center"}>
                    {rightSideContent.job_id!==undefined ?
                        <CandidateRightContent
                          rightSideContent={rightSideContent}
                          role={role}
                          professionalId={professionalId}
                          jobId={jobId}
                          token={token}
                          keepNotes={keepNotes}
                          setKeepNotes={setKeepNotes}
                          appStatus={appStatus}                      
                        />
                      :
                        <p className="text-center">Oops! No Data Available</p>
                    }
                  </div>
                </div>
              }
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
              skillData={filterSkills}
              locationData={filterLocation}
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
