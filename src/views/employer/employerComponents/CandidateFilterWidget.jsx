import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";

const CandidateFilterWidget = ({skillData,locationData}) => {

  return (
    <div className="row g-2 p-3 ">
      <div className="col-12">
        <div className="mb-4">
          <h6 className="fw-bold">Skills</h6>
          <Select
            multi
            color="#ffa32d"
            style={{ fontSize: ".9rem" }}
            className="rounded-1"
            options={skillData}
            // onChange={(values) => setSkills(values)}
            // values={skills}
          />
        </div>
      </div>

      <div className="col-12">
        <div className="mb-4">
          <h6 className="fw-bold">Locations</h6>
          <Select
            multi
            color="#ffa32d"
            style={{ fontSize: ".9rem" }}
            className="rounded-1"
            options={locationData}
            // onChange={(values) => setSkills(values)}
            // values={skills}
          />
        </div>
      </div>
    </div>
  );
};

export default CandidateFilterWidget;
