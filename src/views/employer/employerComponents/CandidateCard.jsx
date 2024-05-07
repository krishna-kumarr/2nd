import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { PiBriefcaseThin } from "react-icons/pi";

const CandidateCard = ({ applicationStatus,name,role,location }) => {
  return (
    <div className="col-12 col-sm-6 col-lg-12 cursorPointer">
      <div className="card border-0 rounded-3">
        <div className="card-body">
          <div className="row align-items-center pt-3">
            {/* card image  */}
            <div className="col-4">
              <img
                src="https://tse4.mm.bing.net/th?id=OIP.eGHa3HgHxIlTHmcvKNDs7AHaGe&pid=Api&P=0&h=180"
                alt="person"
                width={75}
                height={75}
                className="img-fluid rounded-circle"
              />
            </div>

            {/* card content  */}
            <div className="col-8 px-1 pt-lg-3 pt-xl-0">
              <div className="col-12">
                <p className="mb-0 employer-card-candidate-name">{name}</p>

                <div className="pt-2">
                <p className="mb-0 employer-card-candidate-role"><PiBriefcaseThin/>{role}</p>
                <p className="mb-0 employer-card-candidate-location"><CiLocationOn />{location}</p>
                </div>
              </div>
              <div className="appliedOrSaved col-7 col-md-8 col-xl-6 p-0">
                <div className={`py-1 px-3 employer-borderRadius
                ${
                  applicationStatus === "ai"
                    ? "job-shortlisted"
                    : null || 
                    
                    applicationStatus === "2ndcareers-recommended"
                    ? "job-contacted"
                    : null
                }`}
                >
                  <p className="m-0 employer-card-absolute-fs">
                    {applicationStatus === "2ndcareers-recommended"
                      ? "2ndcareers-recommended"
                      : null || 
                      
                      applicationStatus === "ai"
                      ? "AI Recommendation"
                      : null}
                  </p>
                </div>
              </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
