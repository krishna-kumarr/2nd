import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import Pdf from "./Pdf";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDone } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import EmployerCandidateProfile from "../EmployerCandidateProfile";


const CandidateRightContent = ({rightSideContent,role,professionalId,jobId,token,keepNotes,setKeepNotes,appStatus,selectedProfessionalDetails,jobStatus,handleJobStatus,initialGlow,cardSelectedGlow,categorySelectedGlow,setJobStatus}) => {

  const [quesAndAns,setQuesAndAns]=useState([]);
  useEffect(()=>{
    if(rightSideContent.question_answers!==undefined){
      setQuesAndAns(rightSideContent.question_answers)
    }
  },[rightSideContent])
  

  const handleupdateNotes = async() =>{
    var obj = {
      job_id:jobId,
      professional_id:professionalId,
      custom_notes:keepNotes
    }
    
    if(keepNotes!==''){
      try{
        await axios.post('https://devapi.2ndcareers.com/update_custom_notes',obj, {
          headers: {
            authorization: `Bearer ${token}`,
          }
          })
          .then((res)=>{
            if(res.data.error_code===0){
              toast.success(res.data.message);
              document.getElementById('closeApplyModal').click();
            }
          })
      }
      catch(err){
        console.log(err)
      }
    }else{
      toast.error('keep notes should not be empty')
    }
  }

  const handleApplicationStatus = async(applicationStatus)=>{
    var obj = {job_id:'',professional_id:'',status:""}

    if(applicationStatus==='invite_to_interview'){
      obj = {...obj, job_id:jobId,professional_id:professionalId,status:'invite_to_interview'}
    }else{
      if(appStatus==="Shortlisted"){
        obj = {...obj, job_id:jobId,professional_id:professionalId,status:"not reviewed"}
      }
      else if(appStatus==="Rejected"){
        obj = {...obj, job_id:jobId,professional_id:professionalId,status:"not reviewed"}
      }
      else{
        obj = {...obj, job_id:jobId,professional_id:professionalId,status:applicationStatus}
      }
    }
    
    try{
      await axios.post('https://devapi.2ndcareers.com/update_application_status',obj, {
        headers: {
          authorization: `Bearer ${token}`,
        }
        })
        .then((res)=>{
          if(res.data.error_code===0){
            switch(jobStatus){
              case "Default":
                selectedProfessionalDetails(jobId,professionalId,'recalling')
              break
              case "Applied":
                handleJobStatus("Applied",'Applied')
              break

              case "Not Reviewed":
                handleJobStatus("Not Reviewed","Not Reviewed")
              break

              case "Shortlisted":
                handleJobStatus("Shortlisted",'Shortlisted')
              break

              case "Rejected":
                handleJobStatus("Rejected",'Shortlisted')
              break

              case "Contacted":
                handleJobStatus("Contacted",'recalling');
              break

              case "Hired":
                handleJobStatus("Hired",'recalling')
              break

              case "Recommended":
                handleJobStatus("Recommended",'Recommended');
                
              break
            }
            toast.success(res.data.message);
          }else{
            toast.error(res.data.message);
          }
        })
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <>
      {initialGlow || cardSelectedGlow || categorySelectedGlow ?
        <div className="card h-100 border-0">
          <div className="card-body h-100 overflow-scroll p-lg-4 px-lg-2 row">
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
                  <EmployerCandidateProfile rightSideContent={rightSideContent} initialGlow={initialGlow} categorySelectedGlow={categorySelectedGlow} cardSelectedGlow={cardSelectedGlow}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      :
          <div className="col-12">
            <div className="container-fluid">
              <div className="row border-bottom border-3 py-3">
                <div className="col-3 col-lg-2 text-center">
                  <img src={`https://devcdn.2ndcareers.com/${rightSideContent.profile_image}`} alt="" width={100} height={100} className="rounded-circle" />
                </div>

                <div className="col-9 col-lg-10">
                  <div className="row align-items-center">
                    <div className="col-12 col-md-6 col-xxl-8 d-flex flex-wrap align-items-center">
                      <h1 className="employer-card-candidate-name mb-0 d-inline-block pe-3 border-end border-dark col">
                        {rightSideContent.first_name} {rightSideContent.last_name}
                      </h1>
                      <h1 className="employer-card-candidate-role mb-0 d-inline-block ps-3 col">
                        {role}
                      </h1>
                    </div>

                    <div className="col-12 col-sm-4 col-md-6 col-xxl-4 mt-3 mt-md-0 row justify-content-end mt-4 mt-sm-0">
                      <div className="col-6 col-sm-12 col-md-6 text-md-end">
                        <button
                          type="button"
                          className={rightSideContent.application_status==="Shortlisted" ? "btn btn-sm px-5 border shortlisted-candidate me-1" : "btn btn-sm px-5 border select-candidate me-1"}
                          title={rightSideContent.application_status==="Shortlisted" ? "Undo Shortlist" : "Shortlist"}
                          onClick={()=>handleApplicationStatus('shortlisted')}
                        >
                          <MdOutlineDone className="fs-5"/>
                        </button>
                      </div>
                      <div className="col-6 col-sm-12 col-md-6 mt-sm-4 mt-md-0 text-md-start">
                        <button
                          type="button"
                          className={rightSideContent.application_status==="Rejected" ? "btn btn-sm px-5 border reject-candidate-thick" : "btn btn-sm px-5 border reject-candidate"}
                          title={rightSideContent.application_status==="Rejected" ? "undo Rejected" : "Rejected"}
                          onClick={()=>handleApplicationStatus('rejected')}
                        >
                          <RxCross2 className="fs-5"/>
                        </button>
                      </div>
                    </div>

                    <div className="col-12 col-sm-9 col-lg-12 pt-4 row">
                      <div className="col-12 col-md-8 col-lg-5">
                        <p className="employer-card-candidate-role">
                          <b className="employer-card-candidate-name pe-2">
                            Mail :
                          </b>
                          {rightSideContent.email_id}
                        </p>
                      </div>
                      <div className="col-12 col-md-4 col-lg-4">
                        <p className="employer-card-candidate-role">
                          <b className="employer-card-candidate-name pe-2">
                            Address :
                          </b>
                          {rightSideContent.city}
                        </p>
                      </div>
                      <div className="col-12 col-md-6 col-lg-3">
                        <p className="employer-card-candidate-role">
                          <b className="employer-card-candidate-name pe-2">
                            Phone :
                          </b>
                          {rightSideContent.contact_number}
                        </p>
                      </div>
                    </div>

                    <div className="col-12">
                      <Button
                        buttonType={"button"}
                        className={rightSideContent.invite_to_interview==="Y" ? "btn btn-transparent border btn-brand-color candidate-right-side-btn pe-none" : "btn btn-transparent border btn-brand-color candidate-right-side-btn"}
                        title={rightSideContent.invite_to_interview==="Y" ? "Invited" : "Invite to Interview"}
                        functionOnchange={()=>handleApplicationStatus('invite_to_interview')}
                      />

                      <button buttonType={"button"} className="btn btn-transparent border border-brand-color ms-4 candidate-right-side-btn" data-bs-toggle="modal" data-bs-target="#takeNotesModal">Take Notes</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-12 border-bottom border-3 py-4">
                <EmployerCandidateProfile rightSideContent={rightSideContent} />
              </div>

              <div className="col-12 pt-5">
                <div className="container-fluid">
                  <h1 className="employer-card-Content-heading">
                    Resume
                  </h1>
                  <Pdf pdfUrl={`https://cors-anywhere.herokuapp.com/https://cdn.2ndcareers.com/${rightSideContent.resume_name}`}/>
                </div>
              </div>

              <div className="col-12 pt-5">
                <div className="container-fluid">
                  <h1 className="employer-card-Content-heading">
                    Cover letter
                  </h1>
                  <Pdf pdfUrl="https://cors-anywhere.herokuapp.com/https://cdn.2ndcareers.com/partner/learning-doc/learning-1.pdf"/>
                </div>
              </div>
            </div>

            <div className="col-12 pt-5">
              <div className="container-fluid">
                <h1 className="employer-card-Content-heading">
                  Additional Questions
                </h1>
                
                  {quesAndAns.map((v,i)=>{
                    return <div className="col-12">
                      <p className="employer-card-Content">
                        <span className="pe-2">
                        {i+1}.
                        </span>
                        {v.custom_pre_screen_ques}
                      </p>
                      <div className="px-4">
                        <textarea
                          className="p-3 rounded-3 mb-3 form-control outline-none pe-none employer-card-Content"
                          minLength={25}
                          maxLength={10000}
                          rows={4}
                          value={v.custom_pre_screen_ans}
                        />
                      </div>
                    </div>
                  })}
              </div>
            </div>        
          </div>
      }
      
      {/* take notes modal box  */}
      <div className="modal fade" id="takeNotesModal" data-bs-backdrop="static" data-bs-keyboard="false"  tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg vh-50">
            <div className="modal-content p-2">
                <div className="modal-header border-bottom-0">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Take notes
                  </h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"  id="closeApplyModal"></button>
                </div>
                <div className="modal-body border-bottom-0">
                  <div className="container">
                    <div className="row">
                      <textarea
                        className="p-3 rounded-3 mb-3 form-control outline-none"
                        minLength={25}
                        maxLength={10000}
                        rows={4}
                        placeholder=""
                        value={keepNotes}
                        onChange={(e)=>setKeepNotes(e.target.value)}
                      />
                    </div>
                  </div>
                </div> 

                <div className="modal-footer border-top-0">
                  <div className="container">
                    <div className="row float-end">
                      <div className="col-lg-12 ">
                        <button type="submit" className="btn btn-brand-color my-2 px-5" onClick={handleupdateNotes}>save</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default CandidateRightContent;
