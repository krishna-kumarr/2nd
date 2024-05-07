import React, { useContext, useEffect } from 'react'
import { FaShoppingBag, FaWallet } from 'react-icons/fa'
import { FaLocationDot } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import CommonContext from '../../hooks/CommonContext';
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import toast from 'react-hot-toast';
import images from '../../utils/images';
import { Navigate, useNavigate } from 'react-router-dom';

const JobCard = ({ handleRemoveJob, cardName, cardId, cardDes, cardType, applicationStatus, cardHeading, cardPostedOn, cardWorkplace, cardState, cardSchedule, cardJobType, cardPayment }) => {

  const { setAnswer,setSelectedCardLink,setSelectedCardPath,setJobcardId,setIsSmallDevice,setSelectedCardIndex, cardArray, setSelectedCardData, setSelectedSkeleton } = useContext(CommonContext);
  const pageRender = useNavigate()


  const handleSelectedCardData = async (cardId) => {
    if (window.location.pathname === "/professional/home/all_jobs" || window.location.pathname === "/professional/home/recommended_jobs" || window.location.pathname === "/professional/home/saved_jobs" || window.location.pathname==="/professional/home/job_Details"){      
      var findJobIndex = cardArray.findIndex((v) => {
        return v.id === cardId
      })
      setSelectedCardIndex(findJobIndex)
    }

    setSelectedCardData([])
    setSelectedSkeleton(true)
    setSelectedCardPath(window.location.pathname)
    setSelectedCardLink(`https://app.2ndcareers.com/professional/home/all_jobs?job_id=${btoa(cardId)}`)

    if(window.innerWidth<=992){
      setIsSmallDevice(true)
      pageRender("/professional/home/job_Details")
    }else{
      setIsSmallDevice(false)
    }

    const token = localStorage.getItem("Token")
    let jobId = { job_id: cardId }
    try {
      await axios.post("https://api.2ndcareers.com/selected_job_details", jobId, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          if (res.data.error_code === 0) {
            setSelectedCardData(res.data.data)
            setSelectedSkeleton(false)
            setJobcardId(cardId)
            res.data.data[0].questions.map((v) => {
              setAnswer((prevState) => [
                ...prevState,
                { question_id: v.id, answer: "" },
              ]);
            });
          }
          else {
            setSelectedSkeleton(false)
            toast.error(res.data.message)
          }
        })
        .catch((err) => console.log(err))
    }
    catch (err) {
      console.log(err)
    }
  }



  return (
    <div className='cursorPointer'>
      <div className="d-flex align-items-center my-2 ">
        <div className="flex-shrink-0" onClick={() => {
          handleSelectedCardData(cardId)
          setAnswer([])
          }}>
          <img src={images.companyLogo} alt="..." width={52} height={52} className='pe-none' />
        </div>
        <div className="flex-grow-1 ms-3" onClick={() => {
          handleSelectedCardData(cardId)
          setAnswer([])
        }}>
          <h6 className='job-card-component-heading'>{cardHeading}</h6>
          <p className='job-card-posted-time m-0'>Posted on {cardPostedOn}</p>
        </div>

        {/* Applied job cards  */}
        {
          cardType === "applied" ?
            <div className='flex-shrink-0 appliedOrSaved'>
              <div
                className={`py-1 px-3 appliedOrSaved-borderRadius
                ${applicationStatus === "reviewed" ? 'job-reviewed' : null ||
                    applicationStatus === "shortlisted" ? 'job-shortlisted' : null ||
                      applicationStatus === "contacted" ? 'job-contacted' : null ||
                        applicationStatus === "rejected" ? 'job-rejected' : null
                  }`
                }
              >

                <p className='m-0'>{applicationStatus === "reviewed" ? 'reviewed' : null ||
                  applicationStatus === "shortlisted" ? 'shortlisted' : null ||
                    applicationStatus === "contacted" ? 'contacted' : null ||
                      applicationStatus === "rejected" ? 'Not selected by Employer' : null
                }</p>
              </div>
            </div>
            :
            null
        }


        {/* recommended job cards  */}
        {
          cardType === "recommended" ?
            <div className='flex-shrink-0 appliedOrSaved'>
              <div
                className={`py-1 px-3 appliedOrSaved-borderRadius
                ${applicationStatus === "ai" ? 'job-reviewed' : null ||
                    applicationStatus === "manual" ? 'job-shortlisted' : null
                  }`
                }
              >

                <p className='m-0'>{applicationStatus === "manual" ? 'Manual Recommendation' : null ||
                  applicationStatus === "ai" ? 'AI Recommendation' : null
                }</p>
              </div>
            </div>
            :
            null
        }

        {
          cardName === "saved" ?
            <button type="button" className="btn btn-outline-secondary d-flex align-items-center" onClick={() => handleRemoveJob(cardId)}>
              <MdDeleteOutline className='fs-5' /> Remove
            </button>
            :
            null
        }


      </div>
      <div onClick={() => {
        handleSelectedCardData(cardId)
        setAnswer([])
        }}>
        <div className="row justify-content-around card-company-details-icon mt-4">
          <label className="fs-7 card-inner-details col-6 col-sm-3 px-5 px-sm-0 py-1 py-sm-0 text-start text-sm-center">
            <FaLocationDot className="me-2 text-success" />
            {cardWorkplace}-{cardState}
          </label>
          <label className="fs-7 card-inner-details col-6 col-sm-3 px-5 px-sm-0 py-1 py-sm-0 text-start text-sm-center">
            <FaShoppingBag className="me-2 text-warning" />
            {cardSchedule}
          </label>
          <label className="fs-7 card-inner-details col-6 col-sm-3 px-5 px-sm-0 py-1 py-sm-0 text-start text-sm-center">
            <IoTimeSharp className="me-2 text-primary" />
            {cardJobType}
          </label>
          <label className="fs-7 card-inner-details col-6 col-sm-3 px-5 px-sm-0 py-1 py-sm-0 text-start text-sm-center">
            <FaWallet className="me-2 text-warning" />
            {cardPayment}
          </label>
        </div>
        <p className='mt-4 job-card-description'>{cardDes}</p>
      </div>
    </div>
  )
}

export default JobCard