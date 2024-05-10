import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

const employerContext = createContext();

export const DataProvider = ({ children }) => {
  const [openWidget, setOpenWidget] = useState(false);
  const [smallDevice, setSmallDevice] = useState(false);
  const [candidatesList, setCandidatesList] = useState([]);
  const [candidatesListDuplicate, setCandidatesListDuplicate] = useState([]);
  const [jobRole, setJobRole] = useState([]);
  const [keepNotes, setKeepNotes] = useState("");
  const [rightSideContent, setRightSideContent] = useState({});
  const [filterSkills, setFilterSkills] = useState([]);
  const [filterLocation, setFilterLocation] = useState([]);
  const [professionalId, setProfessionalId] = useState(0);
  const [jobId, setJobId] = useState(0);
  const [role, setRole] = useState("");
  const [appStatus, setAppStatus] = useState("");
  const [initialGlow, setInitialGlow] = useState(false);
  const [cardSelectedGlow, setCardSelectedGlow] = useState(false);
  const [categorySelectedGlow, setCategorySelectedGlow] = useState(false);
  const [jobStatus, setJobStatus] = useState("Default");
  const [mellieSearchSkills,setMellieSearchSkills]=useState([]);
  const [mellieSearchLocations,setMellieSearchLocations]=useState([]);
  const [jobListContent, setJobListContent] = useState({
    id:0,
    job_title: "Default",
    posted_on: "",
  });

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzE1MzEyNDQ3LCJqdGkiOiI5ZTg3NTkwNy05YmQzLTQ4YjMtYTZhYi05NDM0ZWMwZjBiYzgiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiZW1wbG95ZXJAYWRyYXByb2R1Y3RzdHVkaW8uY29tIiwibmJmIjoxNzE1MzEyNDQ3LCJjc3JmIjoiMmJmYmUwMDAtZDQyZS00OTQ0LWE5MzctOWE2YmE0OTA2NGM0IiwiZXhwIjoxNzE1Mzk4ODQ3fQ.vCwwZ4SoV7sy2QRaNrnk6btxfpn451Da2nLYDVUegUA";
  // const token=localStorage.getItem("Token");

  const getCandidateDatas = async(jobId,changeRole)  =>{
    setFilterSkills([])
    setFilterLocation([])

    if(changeRole===true){
      setCategorySelectedGlow(true)
    }else{
      setInitialGlow(true)
      setMellieSearchSkills([])
      setMellieSearchLocations([])
    }

    if(jobId){
      var obj={
        job_id : jobId
      }
    }else{
      var obj={
        job_id : 200001
      }
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
            if(res.data.data.professional_id!==undefined){
              setInitialGlow(false)
              setCategorySelectedGlow(false)
              setCandidatesList(res.data.data.candidates_short_desc);
              setCandidatesListDuplicate(res.data.data.candidates_short_desc);
              setJobRole(res.data.data.job_list)
              setProfessionalId(res.data.data.professional_id)
              setJobId(res.data.data.job_id)
              setAppStatus(res.data.data.application_status)
              setRightSideContent(res.data.data)
              if(res.data.data.candidates_short_desc.length > 0){
                setRole(res.data.data.candidates_short_desc[0].job_title)
              }
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

              //Location data for filter
              res.data.data.filter_parameters.location.map((v,i)=>{
                return i>=0 ? setFilterLocation(prevState=>[...prevState,{
                  value:i+1,
                  label:v
                }])
                :
                null
              })

              console.log(res.data.data)  
            }else{
              toast.error(res.data.message)
              setRightSideContent({})
              setCandidatesList([])
              setCandidatesListDuplicate([])
            }  
          }
        })
    }
    catch(err){
      console.log(err)
    }
  }

  const selectedProfessionalDetails = async(job_id,professional_id,recall) =>{
    if(recall==='recalling'){
      setCardSelectedGlow(false)
    }else{
      setCardSelectedGlow(true)
    }

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
          if(res.data.error_code === 0){
              setCardSelectedGlow(false)
              setRightSideContent(res.data.data)
              setProfessionalId(res.data.data.professional_id)
              setJobId(res.data.data.job_id)
              setAppStatus(res.data.data.application_status)
              if(res.data.data.experience.length > 0){
                setRole( res.data.data.experience[0].job_title)
              }
              setKeepNotes(res.data.data.custom_notes===null ? '' : res.data.data.custom_notes)
          }
        })
    }
    catch(err){
      console.log(err)
    }
  }

  const handleJobStatus = async(status,recall) =>{
    setJobStatus(status)
    if(recall==='Applied' || recall==='Not Reviewed' || recall==='Shortlisted' || recall==="Recommended"){
      setCategorySelectedGlow(false)
    }else{
      setCategorySelectedGlow(true)
    }

    var obj={
      job_id : jobId,
      status : status
    }
    try{
      await axios.post('https://devapi.2ndcareers.com/filter_by_application_status',obj, {
        headers: {
          authorization: `Bearer ${token}`,
        }
        })
        .then((res)=>{
          console.log('filter_by_application_status',res.data,status)
          if(res.data.error_code==0){
            setCategorySelectedGlow(false)
            if(res.data.data.candidates_short_desc!==undefined){    
              setAppStatus(res.data.data.application_status)
              setCandidatesList(res.data.data.candidates_short_desc)
              setCandidatesListDuplicate(res.data.data.candidates_short_desc)
              
              if(recall==='Applied'){
                selectedProfessionalDetails(jobId,professionalId,'recalling')
              }         
              else if(recall==='Not Reviewed'){
                setRightSideContent(res.data.data)
                setProfessionalId(res.data.data.professional_id)
                if(res.data.data.experience.length > 0){
                  setRole(res.data.data.experience[0].job_title)
                }
              }
              else if(recall==='Shortlisted'){
                setRightSideContent(res.data.data)
                setProfessionalId(res.data.data.professional_id)
                if(res.data.data.experience.length > 0){
                  setRole(res.data.data.experience[0].job_title)
                }
              }
              else if(recall==='Recommended'){
                selectedProfessionalDetails(jobId,professionalId,'recalling')
              }
              else{
                setRightSideContent(res.data.data)
                setProfessionalId(res.data.data.professional_id)
                if(res.data.data.experience.length > 0){
                  setRole(res.data.data.experience[0].job_title)
                }
              }
            }else{
              setRightSideContent({})
              setCandidatesList([])
              setCandidatesListDuplicate([])
            }
          }
        })
    }
    catch(err){
      console.log(err)
    } 
  }

  const handleMellieSearch = async(filterType) =>{
    var sendSkills = mellieSearchSkills.map((v)=>{
      return v.label
    })

    var sendLocations = mellieSearchLocations.map((v)=>{
      var split=v.label.split(',');
      var join =split.join('&&&&&')
      return join
    })

    var obj={
      job_id : jobId,
      skills : sendSkills,
      location : sendLocations
    }
    
    if(filterType==="ApplyFilter"){
      if(sendSkills.length > 0 || sendLocations.length >0){
        setCategorySelectedGlow(true)
        try{
          await axios.post('https://devapi.2ndcareers.com/filter_professionals',obj, {
            headers: {
              authorization: `Bearer ${token}`,
            }
            })
            .then((res)=>{
              console.log(res)
              setCategorySelectedGlow(false)
              if(res.data.error_code === 0){
                if(res.data.data.professional_id!==undefined){
                  setCategorySelectedGlow(false)
                  setCandidatesList(res.data.data.candidates_short_desc);
                  setCandidatesListDuplicate(res.data.data.candidates_short_desc);
                  setProfessionalId(res.data.data.professional_id)
                  setJobId(res.data.data.job_id)
                  setAppStatus(res.data.data.application_status)
                  setRightSideContent(res.data.data)
                  if(res.data.data.candidates_short_desc.length > 0){
                    setRole(res.data.data.candidates_short_desc[0].job_title)
                  }
                  setKeepNotes(res.data.data.custom_notes===null ? '' : res.data.data.custom_notes)
                }
                else{
                  toast.error(res.data.message)
                  setRightSideContent({})
                  setCandidatesList([])
                  setCandidatesListDuplicate([])
                }
              }
            })
          }
        catch(err){
          console.log(err)
        }
      }else{
        toast.error('nothing selected')
      }
    } else{
      getCandidateDatas(jobId,true);
    }
  }

  return (
    <employerContext.Provider
      value={{  
        openWidget,
        setOpenWidget,
        smallDevice,
        setSmallDevice,
        candidatesList,
        setCandidatesList,
        candidatesListDuplicate,
        setCandidatesListDuplicate,
        jobRole,
        setJobRole,
        keepNotes,
        setKeepNotes,
        rightSideContent,
        setRightSideContent,
        filterSkills,
        setFilterSkills,
        filterLocation,
        setFilterLocation,
        professionalId,
        setProfessionalId,
        jobId,
        setJobId,
        role,
        setRole,
        appStatus,
        setAppStatus,
        initialGlow,
        setInitialGlow,
        cardSelectedGlow,
        setCardSelectedGlow,
        categorySelectedGlow,
        setCategorySelectedGlow,
        jobStatus,
        setJobStatus,
        jobListContent,
        setJobListContent,
        getCandidateDatas,selectedProfessionalDetails,
        handleJobStatus,
        token,
        mellieSearchSkills,
        setMellieSearchSkills,
        mellieSearchLocations,
        setMellieSearchLocations,
        handleMellieSearch
      }}
    >
      {children}
    </employerContext.Provider>
  );
};

export default employerContext;
