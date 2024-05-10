import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";

const CandidateFilterWidget = ({ skillData, locationData, initialGlow,mellieSearchSkills,setMellieSearchSkills,mellieSearchLocations,setMellieSearchLocations,handleMellieSearch }) => {
  return (
    <div className="row g-2 p-3">
      <div className="col-12">
        <div className="mb-4">
          {initialGlow ? (
            <>
              <h6 className="placeholder p-2 py-3 w-50 rounded-2"></h6>
              <p className="placeholder p-2 py-3 w-100 rounded-2 mb-0"></p>
            </>
          ) : (
            <>
              <h6 className="fw-bold">Skills</h6>
              <Select
                multi
                color="#ffa32d"
                style={{ fontSize: ".9rem" }}
                className="rounded-1"
                options={skillData}
                onChange={(values) => setMellieSearchSkills(values)}
                values={mellieSearchSkills}
              />
            </>
          )}
        </div>
      </div>

      <div className="col-12">
        <div className="mb-4">
          {initialGlow ? (
            <>
              <h6 className="placeholder p-2 py-3 w-50 rounded-2"></h6>
              <p className="placeholder p-2 py-3 w-100 rounded-2 mb-0"></p>
            </>
          ) : (
            <>
              <h6 className="fw-bold">Locations</h6>
              <Select
                multi
                color="#ffa32d"
                style={{ fontSize: ".9rem" }}
                className="rounded-1"
                options={locationData}
                onChange={(values) => setMellieSearchLocations(values)}
                values={mellieSearchLocations}
              />
            </>
          )}
        </div>
      </div>

      <button type="button" className="btn btn-transparent border btn-brand-color candidate-right-side-btn" onClick={()=>handleMellieSearch("ApplyFilter")}>Apply Filter</button>
      <button type="button" className="btn btn-transparent border border-brand-color candidate-right-side-btn" onClick={()=>{
        setMellieSearchSkills([])
        setMellieSearchLocations([])
        handleMellieSearch("ClearFilter")
        }}>
        Clear Filter
      </button>

    </div>
  );
};

export default CandidateFilterWidget;
