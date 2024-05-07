import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import CandidateCard from "./CandidateCard";
import CandidateFilterWidget from "./CandidateFilterWidget";


const CandidateLeftContent = () => {

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

  const cardList = [
    {applicationStatus:"ai",
    name:"candidate-1",
    role:"software engineer",
    location:"coimbatore"},

    {applicationStatus:"2ndcareers-recommended",
    name:"candidate-2",
    role:"software developer",
    location:"coimbatore"},

    {applicationStatus:"ai",
    name:"candidate-3",
    role:"data analyst",
    location:"coimbatore"},

    {applicationStatus:"2ndcareers-recommended",
    name:"candidate-4",
    role:"data scientist",
    location:"coimbatore"},

    {applicationStatus:"",
    name:"candidate-5",
    role:"front end developer",
    location:"coimbatore"},

    {applicationStatus:"",
    name:"candidate-6",
    role:"back end developer",
    location:"coimbatore"},

    {applicationStatus:"",
    name:"candidate-7",
    role:"full stack developer",
    location:"coimbatore"},
  ]
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
                 <CandidateFilterWidget/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row py-3 px-0 px-sm-1 align-items-center">
          <div className="col-6 col-sm-6 col-lg-5">
            <p className="text-secondary showing-Persoon-content mb-0">
              Showing:2 filtered profiles
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
                    <ul className="dropdown-menu w-100">
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
          cardList.map((v,i)=>{
            return <CandidateCard 
            applicationStatus={v.applicationStatus}
            name={v.name}
            role={v.role}
            location={v.location}
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
