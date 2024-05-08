import React, { useEffect, useState } from "react";
import InputGroup from "../../../components/Input/InputGroup";
import { IoIosSearch } from "react-icons/io";
import Input from "../../../components/Input/Input";

const CandidateFilterMethods = ({
  jobRole,
  handleSearchInput
}) => {
  const [jobListContent,setJobListContent]=useState({jobType: '',date:'(10-2-2024)'});
  const [jobStatus,setJobStatus]=useState("Applied");
  const jobCategries= ['Applied','Not Reviewed','Shortlisted','Rejected','Contacted','Hired','Recommended']
            

  //updating states when jobrole length greater than 0
  useEffect(()=>{
    if(jobRole.length > 0){
      setJobListContent({jobType:jobRole[0].job_title,date:''})
    }
  },[jobRole])



  const handleJobList = (jobType,date) =>{
    setJobListContent({jobType:jobType,date:date})
  }
  const handleJobStatus = (status) =>{
    setJobStatus(status)
  }
  return (
      <div className="row gy-2">
        <div className="col-12 col-md-6 col-lg-4 ">
          <div className="dropdown employer-custom-dropdown w-100">
            <button
              className="btn dropdown-toggle filter-section px-4 d-flex flex-wrap w-100 align-items-center choose-dropdown"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="fw-bold w-25 text-wrap">Choose job role</span>
                <span className="text-secondary w-75 ps-1">
                  {jobListContent.jobType}
                  <span className="employer-jobList-date">
                    {/* {jobListContent.date} */}
                  </span>
                </span>
            </button>
            <ul className="dropdown-menu w-100 border-0 shadow">
              {
                jobRole.length >0 ? 
                  jobRole.map((v,i)=>{
                    return <li key={i}>
                      <a className="dropdown-item dropdown-jobList" onClick={()=>handleJobList(v.job_title,"(10-2-2024)")}>{v.job_title}<span className="employer-jobList-date">(10-2-2024)</span></a>
                    </li>
                  })
                :
                  <li>
                    <a className="dropdown-item dropdown-jobList">No Data Found</a>
                  </li>
              }
            </ul>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="dropdown employer-custom-dropdown">
            <button
              className="btn dropdown-toggle w-100 filter-section d-flex flex-wrap align-items-center choose-dropdown"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
               <span className="w-25 text-wrap fw-bold">Choose category</span>
                <span className="text-secondary w-75 ps-2">
                  {jobStatus}
                </span>
            </button>

            <ul className="dropdown-menu w-100 border-0 shadow">
              {
                jobCategries.map((v,i)=>{
                  return <li key={i}>
                            <a className="dropdown-item dropdown-jobSort" onClick={()=>handleJobStatus(v)}>{v}</a>
                          </li>
                })
              }
            </ul>
          </div>
        </div>

        <div className="col-12 col-md-12 col-lg-4">
          <div className="d-flex position-relative">
            <InputGroup
              className="home-search-icon fs-5"
              reIcons={<IoIosSearch />}
            />

            <Input
              type="text"
              className="form-control form-control-lg searchInput candidate-searchInput border-0 px-5 py-0 searchInput-border"
              placeHolder="Search by name"
              ariaLabel="default input example"
              testId="searchResult"
              functionOnchange={handleSearchInput}
            />
          </div>
        </div>
      </div>
  );
};

export default CandidateFilterMethods;
