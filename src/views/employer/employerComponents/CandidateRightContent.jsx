import React from "react";
import Button from "../../../components/Button/Button";
import Pdf from "./Pdf";
import CandidateProfile from "../CandidateProfile";


const CandidateRightContent = () => {

  const quesAndAns = [
    {
      question:'Do you have any experience matching to the job profile?',
      answer:'Y or N'
    },
    {
      question:'Could you please provide some insights into your experience and expertise related to matching job profiles?',
      answer:'Y or N'
    }
  ]

  
  return (
    <>
      <div className="col-12">
        <div className="container-fluid">
          <div className="row border-bottom border-3 py-3">
            <div className="col-2 text-center">
              <img
                src="https://tse4.mm.bing.net/th?id=OIP.eGHa3HgHxIlTHmcvKNDs7AHaGe&pid=Api&P=0&h=180"
                alt="person"
                width={"100px"}
                height={"100px"}
                className="img-fluid rounded-circle"
              />
            </div>

            <div className="col-10">
              <div className="row">
                <div className="col-lg-6 col-xxl-8">
                  <h1 className="employer-card-candidate-name mb-0 d-inline-block pe-3 border-end border-dark">
                    Candidate name
                  </h1>
                  <h1 className="employer-card-candidate-role mb-0 d-inline-block ps-3">
                    Role
                  </h1>
                </div>
                <div className="col-lg-6 col-xxl-4">
                  <button
                    type="button"
                    className="btn btn-sm px-5 border select-candidate me-1"
                    title="Accept"
                  >
                    &#x2713;
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm px-5 border reject-candidate"
                    title="Reject"
                  >
                    &#x2715;
                  </button>
                </div>
                <div className="col-12 pt-4 row">
                  <div className="col-4">
                    <p className="employer-card-candidate-role">
                      <b className="employer-card-candidate-name pe-2">
                        Mail :
                      </b>
                      abc@gmail.com
                    </p>
                  </div>
                  <div className="col-4">
                    <p className="employer-card-candidate-role">
                      <b className="employer-card-candidate-name pe-2">
                        Address :
                      </b>
                      coimbatore
                    </p>
                  </div>
                  <div className="col-4">
                    <p className="employer-card-candidate-role">
                      <b className="employer-card-candidate-name pe-2">
                        Phone :
                      </b>
                      123457890
                    </p>
                  </div>
                </div>
                <div className="col-12">
                  <Button
                    buttonType={"button"}
                    className={
                      "btn btn-transparent border btn-brand-color candidate-right-side-btn"
                    }
                    title={"Invite to Interview"}
                    
                  />

                  <button buttonType={"button"} className="btn btn-transparent border border-brand-color ms-4 candidate-right-side-btn" data-bs-toggle="modal" data-bs-target="#takeNotesModal">Take Notes</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-12 border-bottom border-3 py-4">
            <CandidateProfile/>
          </div>

          <div className="col-12 pt-5">
            <div className="container">
              <h1 className="employer-card-Content-heading">
                Resume
              </h1>
              <Pdf pdfUrl="https://cors-anywhere.herokuapp.com/https://cdn.2ndcareers.com/partner/learning-doc/learning-1.pdf"/>
            </div>
          </div>

          <div className="col-12 pt-5">
            <div className="container">
              <h1 className="employer-card-Content-heading">
                Cover letter
              </h1>
              <Pdf pdfUrl="https://cors-anywhere.herokuapp.com/https://cdn.2ndcareers.com/partner/learning-doc/learning-1.pdf"/>
            </div>
          </div>
        </div>

        <div className="col-12 pt-5">
          <div className="container">
            <h1 className="employer-card-Content-heading">
              Additional Questions
            </h1>
            
              {quesAndAns.map((v,i)=>{
                return <div className="col-12">
                  <p className="employer-card-Content">
                    <span className="pe-2">
                    {i+1}.
                    </span>
                    {v.question}
                  </p>
                  <div className="px-4">
                    <textarea
                      className="p-3 rounded-3 mb-3 form-control outline-none pe-none employer-card-Content"
                      minLength={25}
                      maxLength={10000}
                      rows={4}
                      value={v.answer}
                    />
                  </div>
                </div>
              })}
          </div>
        </div>
        
      </div>

      
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
                      />
                    </div>
                  </div>
                </div> 

                <div className="modal-footer border-top-0">
                  <div className="container">
                    <div className="row float-end">
                      <div className="col-lg-12 ">
                        <button type="submit" className="btn btn-brand-color my-2 px-5">save</button>
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
