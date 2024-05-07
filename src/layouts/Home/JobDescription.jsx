import React, { useContext, useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import CommonContext from "../../hooks/CommonContext";

const JobDescription = ({deviceResolution}) => {
  const { gettingResponse, selectedSkeleton, selectedCardData,applyFilterResponse } = useContext(CommonContext);
  const [abouCompany, setAboutCompany] = useState("");
  const [jobSummary, setJobSummary] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (selectedCardData.length > 0) {
      if(selectedCardData[0].job_overview!==undefined){
        setAboutCompany(selectedCardData[0].job_overview);
      }
      if(selectedCardData[0].job_desc!==undefined){
        var splitSummary = selectedCardData[0].job_desc.split("\n");
        setJobSummary(splitSummary);
      }
      if(selectedCardData[0].additional_info!==undefined){
        var splitAdditionalInfo =selectedCardData[0].additional_info.split("\n");
        setAdditionalInfo(splitAdditionalInfo);
      }
      if(selectedCardData[0].responsibilities!==undefined){
        var splitResponsibilites =selectedCardData[0].responsibilities.split("\n");
        setResponsibilities(splitResponsibilites);
      }
      if(selectedCardData[0].skills!==undefined){
        var splitSkills = selectedCardData[0].skills.split(",");
        setSkills(splitSkills);
      }
    }
  }, [selectedCardData]);

  return (
    <>
      <div className={deviceResolution==="smallDevice" ? "p-4 pb-0 bg-white rounded-bottom-4" : "p-4 pb-0 bg-white rounded-4 jobDescription-height overflow-scroll"}>
        <div>
          {gettingResponse === false || selectedSkeleton || applyFilterResponse ? (
            <>
              <h5 className="job-title-weight placeholder rounded col-4 py-3"></h5>
              <p className="job-description placeholder rounded skeleton-jobParagraph-medium col-12"></p>
            </>
          ) : (
            <>
              <h5 className="job-title-weight">About Company</h5>
              <p className="job-description">{abouCompany}</p>
            </>
          )}
        </div>
        <div className="d-flex justify-content-around mt-4">
          {gettingResponse === false || selectedSkeleton || applyFilterResponse ? (
            <>
              <label className="company-details-icon placeholder rounded col-2 py-2 pt-3"></label>
              <label className="company-details-icon placeholder rounded col-2 py-2 pt-3"></label>
            </>
          ) : (
            <>
              <label className="company-details-icon ">
                <FaRegCalendarAlt className="me-2 text-success" />
                Non-for-Profit / NGO
              </label>
              <label className="company-details-icon">
                <FaRegCalendarAlt className="me-2 text-warning" />
                Social Sector
              </label>
            </>
          )}
        </div>

        {gettingResponse === false || selectedSkeleton || applyFilterResponse ? (
          <div className="mt-4">
            <h1 className="job-title-weight placeholder rounded col-4 py-3"></h1>
            <p className="job-description placeholder rounded col-12 skeleton-jobParagraph-medium"></p>
            <p className="job-description placeholder rounded col-12 skeleton-jobParagraph-medium"></p>
          </div>
        ) : (
          <>
            <div className="mt-4">
              <h5 className="job-title-weight">Job Summary</h5>
              {jobSummary.map((v, i) => {
                return (
                  <p className="job-description" key={i}>
                    {v}
                  </p>
                );
              })}
            </div>
            <div className="mt-4">
              <h5 className="job-title-weight">Responsibilities</h5>
              <ul className="dashboard-responsibility-ul">
                {responsibilities.map((v, i) => {
                  return v!=='' ? <li key={i}>{v}</li> : null;
                })}
              </ul>
            </div>
            <div className="mt-4">
              <h5 className="job-title-weight">Skills / Competencies</h5>
              <ul className="ms-5 dashboard-skills-ul">
                {skills.map((v, i) => {
                  return v!=='' ? <li key={i}>{v}</li> : null;
                })}
              </ul>
              <div className="d-flex justify-content-around mt-4 dashboard-job-post-icons">
                <label className="company-details-icon">
                  <FaRegCalendarAlt className="me-2 text-success" />
                  Volunteer
                </label>
                <label className="company-details-icon">
                  <FaRegCalendarAlt className="me-2 text-warning" />
                  Full Time
                </label>
                <label className="company-details-icon">
                  <FaRegCalendarAlt className="me-2 text-primary" />
                  12hrs/week
                </label>
              </div>
            </div>
            <div className="mt-4">
              <h5 className="job-title-weight">Additional Informations</h5>
              <ul className="ms-5 dashboard-additional-information-ul mt-4">
                {additionalInfo.map((v,i)=>{
                  return v!=='' ? <li key={i}>{v}</li> : null;
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default JobDescription;
