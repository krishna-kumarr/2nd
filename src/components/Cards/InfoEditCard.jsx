import React from 'react'

const InfoEditCard = ({pageContentLoaded,cardHeadingIcon,cardHeading,placeholder,cardContent}) => {
    return (
        <>
            <div className="card border-0 ">
                <div className="card-body ">
                    <div className="d-flex justify-content-between ms-1">
                        <label className="profile-side-headers d-flex align-items-center">
                            {cardHeadingIcon}
                            <span className={pageContentLoaded ? "" : "placeholder px-3 w-100 py-1 rounded-1"}>{cardHeading}</span>
                        </label>

                    </div>
                    <div className="ms-5 mt-3 profile-descriptions">
                        {
                            cardHeading === "Preference" ?                                
                                    <p className={pageContentLoaded ? 'text-break ms-1' : 'text-break placeholder rounded-2 w-100 py-5'}>{cardContent ? cardContent : placeholder}</p>
                                    : null
                        }
                        {
                            cardHeading === "About" ?
                                    <p className={pageContentLoaded ? 'text-break ms-1' : 'text-break placeholder rounded-2 w-100 py-5'}>{cardContent ? cardContent : placeholder}</p>
                                    :
                                    null
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default InfoEditCard
