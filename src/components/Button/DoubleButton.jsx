import React, { useState } from 'react'


const DoubleButton = ({
    firstButtonName,
    secondButtonName,
    cardIcon,
    firstCardColorclassName,
    secondCardColorclassName,
    rightLearnUrl,
    leftCommUrl,
    leftLearnUrl
}) => {


    return (
        <div className="d-grid gap-2 d-md-flex justify-content-md-center mb-2 mx-1">
            {
                firstButtonName === "Join Community" ?
                    <a href={`${leftCommUrl}`} role="button" target='_blank' className={`btn btn-${firstCardColorclassName} me-md-2 w-100`}>
                        {cardIcon}
                        {firstButtonName}
                    </a>
                    :
                    <a href={`https://devcdn.2ndcareers.com/${leftLearnUrl}`} target='_blank' download
                        className={`btn btn-${firstCardColorclassName}  me-md-2 w-100`}
                        type="button">
                        {cardIcon}
                        {firstButtonName}
                    </a>
            }


            {
                secondButtonName === "Share" ?
                    <button
                        className={`btn btn-${secondCardColorclassName} w-100`}
                        type="button"
                        onClick={() => secondButtonName === "Share" ? "" : ""}
                        data-bs-toggle="modal"
                        data-bs-target={secondButtonName === "Share" ? "#shareModal" : ""}>
                        {secondButtonName}
                    </button>
                    :
                    <a href={`${rightLearnUrl}`}  role='button' target='_blank' className={`btn btn-${secondCardColorclassName} w-100`}>
                        {secondButtonName}
                    </a>
            }
        </div>
    )
}

export default DoubleButton