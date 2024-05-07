import React, { useState } from "react";
import InputGroup from "../../../components/Input/InputGroup";
import { IoIosSearch } from "react-icons/io";
import Input from "../../../components/Input/Input";

const CandidateFilterMethods = () => {
  const [jobListContent,setJobListContent]=useState({jobType:'Data quality manager',date:'(10-2-2024)'});
  const [jobStatus,setJobStatus]=useState("Applied")

  const handleJobList = (jobType,date) =>{
    setJobListContent({jobType:jobType,date:date})
  }

  const handleJobStatus = (status) =>{
    setJobStatus(status)
  }
  return (
      <div className="row gy-2">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="dropdown employer-custom-dropdown">
            <button
              className="btn dropdown-toggle w-100 border-0 outline-none filter-section px-4 fw-bold"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {jobListContent.jobType}<span className="employer-jobList-date">{jobListContent.date}</span>
            </button>
            <span className="dropdown-floating-label rounded-top-1 text-secondary">Choose job role</span>

            <ul className="dropdown-menu w-100">
              <li>
                <a className="dropdown-item dropdown-jobList" onClick={()=>handleJobList("Data quality manager","(10-2-2024)")}>Data quality manager <span className="employer-jobList-date">(10-2-2024)</span></a>
              </li>
              <li>
                <a className="dropdown-item dropdown-jobList" onClick={()=>handleJobList("Product consultant quality manager","(10-2-2024)")}>Product consultant quality manager <span className="employer-jobList-date">(10-2-2024)</span></a>
              </li>
              <li>
                <a className="dropdown-item dropdown-jobList" onClick={()=>handleJobList("Data quality manager","(10-2-2024)")}>Data quality manager <span className="employer-jobList-date">(10-2-2024)</span></a>
              </li>
              <li>
                <a className="dropdown-item dropdown-jobList" onClick={()=>handleJobList("Data quality manager","(10-2-2024)")}>Data quality manager <span className="employer-jobList-date">(10-2-2024)</span></a>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="dropdown employer-custom-dropdown">
            <button
              className="btn btn-secondary dropdown-toggle w-100 border-0 outline-none filter-section fw-bold "
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {jobStatus}
            </button>
            <span className="dropdown-floating-label rounded-top-1 text-secondary">Choose category</span>
            <ul className="dropdown-menu w-100">
              <li>
                <a className="dropdown-item dropdown-jobSort" onClick={()=>handleJobStatus("Applied")}>Applied</a>
              </li>
              <li>
                <a className="dropdown-item dropdown-jobSort" onClick={()=>handleJobStatus("Not Reviewed")}>Not Reviewed</a>
              </li>
              <li>
                <a className="dropdown-item dropdown-jobSort" onClick={()=>handleJobStatus("Shortlisted")}>Shortlisted</a>
              </li>
              <li>
                <a className="dropdown-item dropdown-jobSort" onClick={()=>handleJobStatus("Rejected")}>Rejected</a>
              </li>
              <li>
                <a className="dropdown-item dropdown-jobSort" onClick={()=>handleJobStatus("Contacted")}>Contacted</a>
              </li>
              <li>
                <a className="dropdown-item dropdown-jobSort" onClick={()=>handleJobStatus("Hired")}>Hired</a>
              </li>
              <li>
                <a className="dropdown-item dropdown-jobSort" onClick={()=>handleJobStatus("Recommended")}>Recommended</a>
              </li>
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
              className="form-control form-control-lg searchInput candidate-searchInput border-0 px-5 py-0"
              placeHolder="Search by name"
              ariaLabel="default input example"
              testId="searchResult"
              // functionOnchange={handleSearchInput}
            />
          </div>
        </div>
      </div>
  );
};

export default CandidateFilterMethods;
