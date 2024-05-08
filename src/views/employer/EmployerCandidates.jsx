import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import CandidateFilterWidget from "./employerComponents/CandidateFilterWidget";
import CandidateFilterMethods from "./employerComponents/CandidateFilterMethods";
import CandidateLeftContent from "./employerComponents/CandidateLeftContent";
import CandidateRightContent from "./employerComponents/CandidateRightContent";
import axios from "axios";


const EmployerCandidates = () => {
  const [openWidget, setOpenWidget] = useState(false);
  const [smallDevice,setSmallDevice] = useState(false);
  const [candidatesList,setCandidatesList] = useState([]);
  const [candidatesListDuplicate,setCandidatesListDuplicate] = useState([]);
  const [jobRole,setJobRole] = useState([]);
  const [skills,setSkills]=useState([]);
  const [skillData,setSkillData]=useState([]);
  const [fullName,setFullName]=useState('');
  const [role,setRole]=useState('');
  const [selectedCardId,setSelectedCardId]=useState(0);
  const [email,setEmail]=useState('');
  const [contactNum,setContactNum]=useState(0);
  const [address,setAddress]=useState('');
  const [takeNotes,setTakeNotes]=useState('');
  const [about,setAbout]=useState('');
  const [experience,setExperience]=useState([]);
  const [education,setEducation]=useState([]);
  const [preference,setPreference]=useState('');
  const [video,setVideo]=useState('');
  const [language,setLanguage]=useState([]);
  const [additionalInfo,setAdditionalInfo]=useState('');
  const [quesAndAns,setQuesAndAns]=useState([]);
  
  useEffect(()=>{
    //get professional candidates datas
    const getCandidateDatas = async()  =>{
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzE1MTM4MDM1LCJqdGkiOiJmZWIwZWRlNi04MjYyLTRhZjgtODE5MS1mYTk2MGRlODM1YWIiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiZW1wbG95ZXJAYWRyYXByb2R1Y3RzdHVkaW8uY29tIiwibmJmIjoxNzE1MTM4MDM1LCJjc3JmIjoiOTI1ODkwMmEtNDZhZi00MDkzLTg4MGYtMmFiNWIyMDdmMDcwIiwiZXhwIjoxNzE1MjI0NDM1fQ.4OqHEN6R3KVCkZbrDxk7LdCj4KBPV3-bmZLuefsTT5Y";

      try{
        await axios.get('https://devapi.2ndcareers.com/candidates_dashboard_view', {
          headers: {
            authorization: `Bearer ${token}`,
          }
          })
          .then((res)=>{
            if(res.data.error_code === 0){
              setCandidatesList(res.data.data.candidates_short_desc);
              setCandidatesListDuplicate(res.data.data.candidates_short_desc);
              setJobRole(res.data.data.job_list)
              setSkills(res.data.data.skills)
              setFullName(`${res.data.data.first_name} ${res.data.data.last_name}`)
              setRole(res.data.data.candidates_short_desc[0].job_title)
              setEmail(res.data.data.email_id)
              setSelectedCardId(res.data.data.professional_id)
              setAbout(res.data.data.about)
              setLanguage(res.data.data.languages)
              setVideo(res.data.data.video_name)
              setQuesAndAns(res.data.data.question_answers)
              setAdditionalInfo(res.data.data.additional_info)
              setExperience(res.data.data.experience)
              setPreference(res.data.data.preferences)
              setEducation(res.data.data.education)
              setContactNum(res.data.data.contact_number)
              setAddress(res.data.data)
              setTakeNotes(res.data.data)
              console.log(res.data.data)    
            }
          })
      }
      catch(err){
        console.log(err)
      }
    }
    (async () => getCandidateDatas())();


    //finding minimum devices and updating to state
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
  },[])


  useEffect(()=>{
    if(skills!==undefined){
      skills.map((v,i)=>{
        return i>=0 ? setSkillData(prevState=>[...prevState,{
          value:v.id,
          label:v.skill_name
        }])
        :
        null
      })
    }
  },[skills])


  const handleSearchInput = (e) => {
    const searchIp = e.target.value.replace(/[\[\]\?\*\+\|\{\}\\\(\)\@\.\n\r]/g ,"");
    const searchData = candidatesList.filter((v)=>{
      return v.job_title.toLowerCase().match(searchIp.toLowerCase()) || v.first_name.toLowerCase().match(searchIp.toLowerCase()) || v.last_name.toLowerCase().match(searchIp.toLowerCase())
    })
   
    setCandidatesListDuplicate(searchData)
  }
  

  return (
    <>
      <div className={smallDevice ? "homePage-backgroundColor overflow-scroll": "homePage-backgroundColor pt-2 overflow-hidden"}>
        <div className="container-fluid px-sm-2 px-md-3 px-xl-5">
          <div className="col-12 pt-3 pb-2">
            <CandidateFilterMethods
              jobRole={jobRole}
              handleSearchInput={handleSearchInput}
            />
          </div>

          <div className={smallDevice ? "mt-1 py-1 h-100" : "mt-1 setting-employer-row-height py-1"}>
            <div className="row h-100">
              <div className="col-12 col-md-12 col-lg-3 h-100 overflow-scroll">
                <CandidateLeftContent 
                  skills={skills}
                  candidatesList={candidatesListDuplicate}
                />
              </div>

              <div className="col-lg-9 h-100 d-none d-lg-block">
                <div className="card h-100 border-0">
                  <div className="card-body h-100 overflow-scroll p-lg-4 row">
                    <CandidateRightContent
                      fullName={fullName}
                      role={role}
                      selectedCardId={selectedCardId}
                      email={email}
                      contactNum={contactNum}
                      address={address}
                      takeNotes={takeNotes}
                      about={about}
                      experience={experience}
                      education={education}
                      preference={preference}
                      video={video}
                      language={language}
                      additionalInfo={additionalInfo}
                      quesAndAns={quesAndAns}
                      skills={skills}
                    />
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
              skillData={skillData}
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
