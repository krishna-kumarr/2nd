import React, { useEffect, useState } from "react";
import InputGroup from "../../../components/Input/InputGroup";
import { IoIosSearch } from "react-icons/io";
import Input from "../../../components/Input/Input";
import axios from "axios";

const CandidateFilterMethods = ({jobRole,handleSearchInput,initialGlow,jobStatus,handleJobStatus,jobListContent,setJobListContent,getCandidateDatas,setJobStatus}) => {

  const jobCategries= ['Applied','Not Reviewed','Shortlisted','Rejected','Contacted','Hired','Recommended']
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzE1MjI1NzY4LCJqdGkiOiIwOGVkY2FhMC00MGNjLTQwYWYtYWY3MC04OWVlOTk3NTczNGYiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiZW1wbG95ZXJAYWRyYXByb2R1Y3RzdHVkaW8uY29tIiwibmJmIjoxNzE1MjI1NzY4LCJjc3JmIjoiMGZkYjg1MGMtMGZjZC00NWE3LTk2NjktZDQyODc3OGEzZTc0IiwiZXhwIjoxNzE1MzEyMTY4fQ.gBnuEOxHKJcls-LhjLQ0wmJ_LEyTB6GGMcH89QF5IMI";

  return (
    <>
      {initialGlow ?
        <div className="row gy-2">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="placeholder w-100 pt-4 pb-3 rounded-3"></div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="placeholder w-100 pt-4 pb-3 rounded-3"></div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="placeholder w-100 pt-4 pb-3 rounded-3"></div>
          </div>
        </div> 
        :
        <div className="row gy-2">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="dropdown employer-custom-dropdown w-100">
              <button
                className="btn dropdown-toggle filter-section px-4 d-flex flex-wrap w-100 align-items-center choose-dropdown"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="fw-bold w-25 text-wrap">Choose job role</span>
                  <span className="text-secondary w-75 ps-1">
                    {jobListContent.job_title}
                    <span className="employer-jobList-date ps-2">
                      {jobListContent.posted_on}
                    </span>
                  </span>
              </button>
              <ul className="dropdown-menu w-100 border-0 shadow">
                {
                  jobRole.length >0 ? 
                    jobRole.map((v,i)=>{
                      return <li key={i}>
                        <a className="dropdown-item dropdown-jobList" onClick={()=>{setJobStatus("Default")
                          getCandidateDatas(v.id,true)
                          setJobListContent(v)}}>
                          {v.job_title}
                          <span className="employer-jobList-date ps-2">({v.posted_on})</span></a>
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
                              <a className="dropdown-item dropdown-jobSort" onClick={()=>{handleJobStatus(v)}}>{v}</a>
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
      }
    </>
  );
};

export default CandidateFilterMethods;
