import React from "react";
import { IoCalendarOutline, IoAdd } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";
import { PiBagFill } from "react-icons/pi";
import { MdModeEditOutline } from "react-icons/md";

const ProfileInfoAddCard = ({ cardHeadingIcon, cardHeading, data, handleEditExperience, handleEditEducation, profilePageAllContent }) => {

    if (data === undefined) return


    

    const handleDateConvert = (value) =>{
        var Months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        var splitDate = value.split("-")   // 2024-01
        var l=[splitDate[0]]

        var monthConverted=Months[parseInt(splitDate[1])-1]
        
        l.unshift(monthConverted)
        
        return l.join(" ")
    }
    
    return (
        <>
            <div className="card mt-3 border-0 shadow-sm rounded-4 placeholder-glow">
                <div className="card-body">
                    <div className="d-flex justify-content-between ms-1">
                        <label className="profile-side-headers d-flex align-items-center">
                            {cardHeadingIcon}
                            <span className={profilePageAllContent ? "" : "placeholder px-3 w-100 py-1  rounded-1"}>{cardHeading}</span>
                        </label>
                        {cardHeading === "Experience" ?
                            <button type="button" title="Add Experience" className={profilePageAllContent ? "btn btn-brand-color px-3 d-flex align-items-center gap-2" : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"} data-bs-toggle="modal" data-bs-target="#addExperienceModal">
                                <MdAddBox /> Add
                            </button> : null
                        }
                        {cardHeading === "Education" ?
                            <button type="button" title="Add Education" className={profilePageAllContent ? "btn btn-brand-color px-3 d-flex align-items-center gap-2" : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"} data-bs-toggle="modal" data-bs-target="#addEducationModal">
                                <MdAddBox /> Add
                            </button> : null
                        }
                    </div>


                    {/* <React.Fragment >
                                    <div className="ms-5">
                                        <div className="d-flex justify-content-between  mt-3">
                                            <label className="profile-inner-headers">
                                                
                                            </label>
                                          

                                        </div>

                                        {cardHeading === "Experience" ? 
                                         <p className="mt-1 profile-descriptions">
                                         Your Experience details will be displayed here..
                                     </p> :  <p className="mt-1 profile-descriptions">
                                            Your Education details will be displayed here..
                                        </p> }


                                        <hr className="" />
                                    </div>
                                </React.Fragment> */}



                    {
                        data.length === 0 ?
                            <>
                                {cardHeading === "Experience" ? <p className={profilePageAllContent ? "text-grey ms-5 mt-3 " : "placeholder px-3 w-50 py-1 ms-5 mt-3 rounded-1"}>Your experience details will be displayed here</p> : ""}
                                {cardHeading === "Education" ?  <p className={profilePageAllContent ? "text-grey ms-5 mt-3" : "placeholder px-3 w-50 py-1 ms-5 mt-3 rounded-1"}>Your education details will be displayed here</p> : ""}
                            </>
                            :
                            data.map((val) => {
                                return (
                                    <React.Fragment key={val.id}>

                                        {
                                            <div className="ms-5">
                                                <div className="d-flex justify-content-between mt-3 ">
                                                    <label className="profile-inner-headers placeholder-glow d-inline-block w-75">
                                                        {cardHeading === "Experience" ? <span >{val.job_title} | {val.company_name}</span> : null}
                                                        {cardHeading === "Education" ? <span className="text-break">{val.degree_level} {val.specialisation} |  {val.institute_name} </span> : null}
                                                    </label>
                                                    {cardHeading === "Experience" ? <MdModeEditOutline className="icon edit-icon fs-4 brand-color" title="Edit Experience" onClick={(e) => handleEditExperience(e, val.id)} data-bs-toggle="modal" data-bs-target="#editExperienceModal" /> : null}
                                                    {cardHeading === "Education" ? <MdModeEditOutline className="icon edit-icon fs-4 brand-color" title="Edit Education" onClick={(e) => handleEditEducation(e, val.id)} data-bs-toggle="modal" data-bs-target="#editEducationModal" /> : null}

                                                </div>

                                                {/* <label className="profile-descriptions mt-1">
                                                    {cardHeading === "Education" ? <span className="d-flex align-items-center gap-2 text-dark">
                                                        {val.institute_location}
                                                    </span> : null}
                                                </label> */}

                                                <label className="profile-descriptions mt-1">
                                                    <IoCalendarOutline />&nbsp; <span> {handleDateConvert(val.start_date)}</span> &nbsp;-&nbsp;<span> {handleDateConvert(val.end_date)}&nbsp; </span>
                                                    {cardHeading === "Experience" ? <span className="d-flex align-items-center gap-2">
                                                        <IoLocationOutline /> {val.job_location} 
                                                    </span> : null}
                                                    {cardHeading === "Education" ? <span className="d-flex align-items-center gap-2">
                                                        <IoLocationOutline /> {val.institute_location} 
                                                    </span> : null}
                                                </label>



                                                {cardHeading === "Experience" ? <p className="mt-1 profile-descriptions text-break">
                                                    {val.job_description}
                                                </p> : null}
<hr/>
                                            </div>
                                        }


                                    </React.Fragment>
                                )
                            })
                    }


                </div>
            </div>
        </>
    )
}

export default ProfileInfoAddCard
