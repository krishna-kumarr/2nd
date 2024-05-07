import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import CandidateFilterWidget from "./employerComponents/CandidateFilterWidget";
import CandidateFilterMethods from "./employerComponents/CandidateFilterMethods";
import CandidateLeftContent from "./employerComponents/CandidateLeftContent";
import CandidateRightContent from "./employerComponents/CandidateRightContent";


const EmployerCandidates = () => {
  const [openWidget, setOpenWidget] = useState(false);
  const [smallDevice,setSmallDevice] = useState(false)
  
  useEffect(()=>{
    const handleResize = () => {
      if(window.innerWidth<=992){
        setSmallDevice(true);
      }else{
        setSmallDevice(false)
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[])

  return (
    <>
      <div className={smallDevice ? "homePage-backgroundColor overflow-scroll": "homePage-backgroundColor pt-2 overflow-hidden"}>
        <div className="container-fluid px-sm-2 px-md-3 px-xl-5">
          <div className="col-12 pt-3 pb-2">
            <CandidateFilterMethods />
          </div>

          <div className={smallDevice ? "mt-1 py-1" : "mt-1 setting-employer-row-height py-1"}>
            <div className="row h-100">
              <div className="col-12 col-md-12 col-lg-3 h-100 overflow-scroll">
                <CandidateLeftContent />
              </div>

              <div className="col-lg-9 h-100 d-none d-lg-block">
                <div className="card h-100 border-0">
                  <div className="card-body h-100 overflow-scroll p-lg-4 row">
                    <CandidateRightContent/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      

      <div className={`${openWidget ? 'responsive-filter d-lg-none ' : 'd-none'}`} id="myModal">
        <div className="responsive-filter-card filter-closet">
          <header>
            <h2 className='m-0 text-start ps-3'>Filter</h2>
            <p className=" close-icon responsive-filter-close-icon" onClick={() => setOpenWidget(!openWidget)}><IoMdClose /></p>
          </header>

          <div className="filter-body-content ">
            <CandidateFilterWidget />
          </div>
        </div>
      </div>

        <div className="responsive-filter-toggler d-lg-none">
          {openWidget ?
            <p className="material-symbols-outlined mb-0" onClick={() => setOpenWidget(!openWidget)}>< IoMdClose /></p>
            :
            <p className="material-symbols-outlined  mb-0" onClick={() => setOpenWidget(!openWidget)}><  FiFilter /></p>
          }
        </div>
    </>
  );
};

export default EmployerCandidates;
