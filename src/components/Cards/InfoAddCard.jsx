import React from 'react'
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5'

const InfoAddCard = ({
    pageContentLoaded,
    cardHeadingIcon,
    cardHeading,
    placeholder,
    arrayContent
}) => {


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

            <div className={window.location.pathname==="/2nd/employer_dashboard/candidates" ? "card border-0" : "card mt-3 border-0 shadow-sm rounded-4 placeholder-glow"}>
                <div className="card-body">
                    <div className="d-flex justify-content-between ms-1">
                        <label className="profile-side-headers d-flex align-items-center">
                            {cardHeadingIcon}
                            <span className={pageContentLoaded ? "" : "placeholder px-3 w-100 py-1  rounded-1"}>{cardHeading}</span>
                        </label>
                    </div>
                    {
                        arrayContent.length === 0 ?
                            <>
                                {cardHeading === "Experience" ? 
                                    <div className='ms-5'>
                                        <p className={pageContentLoaded ? "text-grey ms-1  mt-3 " : "placeholder px-3 w-50 py-1 ms-1 mt-3 rounded-1"}>{placeholder}</p>
                                    </div>
                                   : ""}
                                {cardHeading === "Education" ? 
                                    <div className="ms-5">
                                        <p className={pageContentLoaded ? "text-grey ms-1 mt-3" : "placeholder px-3 w-50 py-1 ms-1  mt-3 rounded-1"}>{placeholder}</p> 
                                    </div>
                                    : ""}
                            </>
                            : 
                            arrayContent.map((val) => {
                                return (
                                    <React.Fragment key={val.id}>

                                        {
                                            <div className="ms-5">
                                                <div className="d-flex justify-content-between mt-3 ">
                                                    <label className={window.location.pathname==="/employer_dashboard/candidates" ? "placeholder-glow d-inline-block w-75 employer-card-Content-short-heading" : "profile-inner-headers placeholder-glow d-inline-block w-75"}>
                                                        {cardHeading === "Experience" ? <span >{val.job_title} | {val.company_name}</span> : null}
                                                        {cardHeading === "Education" ? <span className="text-break">{val.degree_level} {val.specialisation} |  {val.institute_name} </span> : null}
                                                    </label>
                                                </div>



                                                <label className="profile-descriptions mt-1">
                                                    <IoCalendarOutline />&nbsp; <span> {handleDateConvert(val.start_date)}</span> &nbsp;-&nbsp;<span> {handleDateConvert(val.end_date)}&nbsp; </span>
                                                    {cardHeading === "Experience" ? <span className={window.location.pathname==="/employer_dashboard/candidates" ? "employer-card-Content" : "d-flex align-items-center gap-2"}>
                                                        <IoLocationOutline /> {val.job_location}
                                                    </span> : null}
                                                    {cardHeading === "Education" ? <span className={window.location.pathname==="/employer_dashboard/candidates" ?"employer-card-Content" : "d-flex align-items-center gap-2"}>
                                                        <IoLocationOutline /> {val.institute_location}
                                                    </span> : null}
                                                </label>

                                                {cardHeading === "Experience" ? <p className={window.location.pathname==="/employer_dashboard/candidates" ?"mt-1 text-break employer-card-Content" : "mt-1 profile-descriptions text-break"}>
                                                    {val.job_description}
                                                </p> : null}
                                                <hr />
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

export default InfoAddCard
