import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import CandidateCard from "./CandidateCard";
import CandidateFilterWidget from "./CandidateFilterWidget";


const CandidateLeftContent = ({
  skills,
  candidatesList
}) => {
  const [skillData,setSkillData]=useState([]);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    // notification box closing fuction
    const handler = (e) => {
      if (!e.target.closest(".filter-closet")) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });


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



  return (
    <>
      <div className="sticky-top top-0 homePage-backgroundColor">
        <div className="w-100 d-none d-lg-block">
          <div className="card rounded-3 border-0">
            <div className="card-body p-0 cursorPointer">
              <div
                className="row p-0 filter-closet py-2 px-3"
                onClick={() => setOpen(!open)}
              >
                <div className="col">Filter</div>
                <div className="col text-end">
                  <IoFilterSharp />
                </div>
              </div>

              <div
                className={`${
                  open
                    ? "employer-filter-box rounded-4 filter-closet shadow"
                    : "d-none"
                }`}
              >
                <div className="contner h-100">
                  <div className="row align-items-center sticky-top p-3 pb-2 border-bottom bg-white  start-0 end-0 top-0 bottom-0 w-100 rounded-top-4">
                    <div className="col">
                      <h6 className="m-0 fw-bold">Filter</h6>
                    </div>
                    <div className="col text-end">
                      <button className="btn btn-sm border-0">
                        <IoIosCloseCircleOutline
                          className="fs-4"
                          onClick={() => setOpen(!open)}
                        />
                      </button>
                    </div>
                  </div>

                  {/* employer-filter-box body */}
                 <CandidateFilterWidget
                    skillData={skillData}
                 />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row py-3 px-0 px-sm-1 align-items-center">
          <div className="col-6 col-sm-6 col-lg-5">
            <p className="text-secondary showing-Persoon-content mb-0">
              Showing:{candidatesList.length} filtered profiles
            </p>
          </div>
          <div className="col-6 col-sm-6 col-lg-7">
            <div className="card border-0 rounded-3 w-100">
              <div className="card-body showing-Persoon-content py-0">
                <div className="row align-items-center employer-custom-dropdown">
                  <div className="w-25 p-0">
                    <span className="text-secondary w-100">Sort by:</span>
                  </div>
                  <div className="w-75 px-0">
                    <button
                      className="btn btn-secondary showing-Persoon-content dropdown-toggle border-0 outline-none w-100 py-2"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      sort by
                    </button>
                    <ul className="dropdown-menu w-100 border-0 shadow">
                      <li>
                        <a className="dropdown-item">Date Posted</a>
                      </li>
                      <li>
                        <a className="dropdown-item">A-Z</a>
                      </li>
                      <li>
                        <a className="dropdown-item">Z-A</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row align-content-start gy-2 h-100">
        {
          candidatesList.map((v,i)=>{
            return <CandidateCard 
              professional_id={v.professional_id}
              experience_id={v.experience_id}
              first_name={v.first_name}
              last_name={v.last_name}
              profile_image={v.profile_image}
              job_title={v.job_title}
              city={v.city}
              applicationStatus={v.applicationStatus}
            />
          })
        }
        <div className="px-3">
        <button type="button" className="btn btn-transparent border border-brand-color w-100">Load More</button>
        </div>
      </div>
    </>
  );
};

export default CandidateLeftContent;
