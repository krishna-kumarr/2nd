import React, { useContext, useEffect, useRef, useState } from "react";
import { LuUpload } from "react-icons/lu";
import { MdAddBox } from "react-icons/md";
import { IoLanguage } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { PiBagFill } from "react-icons/pi";
import { HiLightBulb } from "react-icons/hi";
import { MdAppRegistration } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { RiNotificationBadgeFill } from "react-icons/ri";
import DashboardNavbar from "../components/Navbar/DashboardNavbar";
import { VideoJS } from "../components/VideoJS/Video";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdSave } from "react-icons/md";
import { MdAddAPhoto } from "react-icons/md";
import { HiOutlineUpload } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { LuTrash } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";
import ProfileInfoEditCard from "../components/Cards/ProfileInfoEditCard";
import { FaCalendar } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import ProfileInfoAddCard from "../components/Cards/ProfileInfoAddCard";
import axios from "axios";
import toast from "react-hot-toast";
import { BsFiletypePdf } from "react-icons/bs";
import { MdZoomOutMap } from "react-icons/md";
import { LuDownload } from "react-icons/lu";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { PiVideoFill } from "react-icons/pi";
import { RiVideoFill } from "react-icons/ri";
import { MdAddToPhotos } from "react-icons/md";
import { MdWorkspacePremium } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";
import CommonContext from "../hooks/CommonContext";
import VideoPlayer from "../components/VideoJS/VideoPlayer";
import Location from "../components/Input/Location";
import AutoCompleteComponent from "../components/Input/AutoCompleteComponent";

const Profile = ({ location, setLocation }) => {

  const {
    profilePicture,
    setProfilePicture,
    disableProfilePictureDelete,
    setDisableProfilePictureDelete,
    editLocation,
    setEditLocation,
    isProfilePictureUploaded,
    setIsProfilePictureUploaded
  } = useContext(CommonContext);

  const [profilePageAllContent, setProfilePageAllContent] = useState(false);

  const professionalPageDashboardMenu = ["Home", "Learning", "Community"];
  const [videoFile, setVideoFile] = useState(false);


  const [aboutContent, setAboutContent] = useState("");
  const [aboutEditIcon, setAboutEditIcon] = useState(false);

  const [additionalInformationData, setAdditionalInformationData] = useState(
    []
  );

  const [additionalInformationInputs, setAdditionalInformationInputs] = useState({
    additionalInfoTitle: "",
    additionalInfoDescription: "",
  });

  const [maxMonth, setMaxMonth] = useState("");


  const [uploadedVideoFile, setUploadedVideoFile] = useState("");
  const [isVideoUploaded, setIsVideoUploaded] = useState(false)
  const [videoUploading, setVideoUploading] = useState(false)
  const [videoDeletingLoading, setVideoDeletingLoading] = useState(false)
  const [videoUploadedPlaceholder, setVideoUploadedPlaceholder] = useState(true)
  const [videoFullyUploaded, setVideoFullyUploaded] = useState(false)

  const [responseLoading, setResponseLoading] = useState(false);

  const [editAdditionalInformationInputs, setEditAdditionalInformationInputs] =
    useState({
      id: 0,
      additionalInfoTitle: "",
      additionalInfoDescription: "",
    });

  const [expertNotes, setExpertNotes] = useState(
    "If you have a premium account, schedule a call with the 2nd Careers team from your profile. Based on your discussion with experts, you will receive expert capture which can be published to the employers upon your consent"
  );

  const [preferenceContent, setPreferenceContent] = useState("");
  const [preferenceEditIcon, setPreferenceEditIcon] = useState(false);

  const [profilePageRefresh, setProfilePageRefresh] = useState(false);

  const [resumeUploaded, setResumeUploaded] = useState(false);

  const [uploadedResumeFile, setUploadedResumeFile] = useState(null);

  const [resumeName, setResumeName] = useState("");

  const [resumeUploadedDate, setResumeUploadedDate] = useState("");

  const [displayMonth, setDisplayMonth] = useState("");

  const [progressPercentage, setProgressPercentage] = useState(null);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);

  const [editSelectedSkill, setEditSelectedSkill] = useState(null);
  const [editSkillDropdown, setEditSkillDropdown] = useState(false);

  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    profilePercentage: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
    city: ""
  });



  const [experienceInputs, setExperienceInputs] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    startMonthAndYear: "",
    endMonthAndYear: "",
    experienceDescription: "",
  });

  const [educationInputs, setEducationInputs] = useState({
    degree: "",
    fieldOfStudy: "",
    institution: "",
    instituteLocation: "",
    educationStartMonthAndYear: "",
    educationEndMonthAndYear: "",
  });

  const [experienceFieldsFilled, setExperienceFieldsFilled] = useState(false);
  const [educationFieldsFilled, setEducationFieldsFilled] = useState(false);

  const [selectedLanguageId, setSelectedLanguageId] = useState(null);

  const [dateOfBirthShow, setDateOfBirthShow] = useState(false);

  const [socialMediaArray, setSocialMediaArray] = useState([]);

  const [redirectURL, setRedirectURL] = useState("");

  const [skillsKnown, setSkillsKnown] = useState([]);

  const [updatedSkillsKnown, setUpdatedSkillsKnown] = useState({
    updatedSkillName: "",
    updatedSkillLevel: "",
  });

  const [updatedSkillsObj, setUpdatedSkillsObj] = useState({
    skillName: "",
    skillLevel: "",
  });

  const [languagesObj, setLanguagesObj] = useState({
    languageName: "",
    languageLevel: "",
  });

  const [updatedLanguagesObj, setUpdatedLanguagesObj] = useState({
    languageName: "",
    languageLevel: "",
  });

  const handleAdditionalInformationInputs = (e) => {
    setAdditionalInformationInputs({
      ...additionalInformationInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditAdditionalInformationInputs = (e) => {
    setEditAdditionalInformationInputs({
      ...editAdditionalInformationInputs,
      [e.target.name]: e.target.value,
    });
  };

  // Add Additional Information

  const handleAdditionalInformationAdd = async () => {
    if (
      additionalInformationInputs.additionalInfoTitle === "" ||
      additionalInformationInputs.additionalInfoDescription === ""
    ) {
      toast("Please enter all the fields", {
        icon: (
          <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
        ),
      });
    } else {
      const token = localStorage.getItem("Token");

      const additionalInfoParams = {
        title: additionalInformationInputs.additionalInfoTitle,
        description: additionalInformationInputs.additionalInfoDescription,
      };

      try {
        await axios
          .post(
            "https://devapi.2ndcareers.com/update_professional_additional_info",
            additionalInfoParams,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {

            if (response.data.error_code === 0) {
              toast.success(response.data.message);
              document.getElementById("addAdditionalInformationClose").click();
              setAdditionalInformationInputs({
                additionalInfoTitle: "",
                additionalInfoDescription: "",
              });
              setProfilePageRefresh(!profilePageRefresh);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Handle redirect URL

  const handleRedirectURL = (e, URL) => {
    window.location.href = `${URL}`;
  };

  // Edit Additional Information

  const handleAdditionalInformationEdit = async (e, infoId) => {

    const result = additionalInformationData.filter((value, id) => {
      return value.id === infoId;
    });

    setEditAdditionalInformationInputs({
      id: infoId,
      additionalInfoTitle: result[0].title,
      additionalInfoDescription: result[0].description,
    });

    // const token = localStorage.getItem("Token");
    // const additionalInfoParams = {
    //   info_id: id
    // }

    // try {
    //   await axios.post('https://devapi.2ndcareers.com/get_additional_info', additionalInfoParams, {
    //     headers: {
    //       authorization: `Bearer ${token}`
    //     }
    //   }).then((response) => {
    //     if (response.data.error_code === 0) {
    //       setEditAdditionalInformationInputs({
    //         id: response.data.data[0].id,
    //         additionalInfoTitle: response.data.data[0].title,
    //         additionalInfoDescription: response.data.data[0].description
    //       })
    //     }
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // } catch (err) {
    //   console.log(err)
    // }
  };

  // Additional Info update

  const handleAdditionalInformationUpdate = async (e, id, saveClick) => {


    if (
      editAdditionalInformationInputs.additionalInfoTitle === "" ||
      editAdditionalInformationInputs.additionalInfoDescription === ""
    ) {
      toast("Please enter all the fields", {
        icon: (
          <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
        ),
      });
    } else {
      const token = localStorage.getItem("Token");

      const additionalInfoParams = {
        info_id: id,
        title: editAdditionalInformationInputs.additionalInfoTitle,
        description: editAdditionalInformationInputs.additionalInfoDescription,
      };

      try {
        await axios
          .post(
            "https://devapi.2ndcareers.com/update_professional_additional_info",
            additionalInfoParams,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {

            if (response.data.error_code === 0) {
              if (saveClick === "Save") {
                document.getElementById("updateAdditionalInformationClose").click();
              }

              toast.success(response.data.message);
              setProfilePageRefresh(!profilePageRefresh);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Delete Info edit

  const handleAdditionalInformationDelete = async (e, id) => {

    const token = localStorage.getItem("Token");
    const additionalInfoParams = {
      info_id: id,
    };

    try {
      await axios
        .post(
          "https://devapi.2ndcareers.com/delete_professional_additional_info",
          additionalInfoParams,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.error_code === 0) {
            toast.success(response.data.message);
            setProfilePageRefresh(!profilePageRefresh);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Updated Skill

  const handleUpdatedSkillName = (skillName) => {
    setUpdatedSkillsObj({ ...updatedSkillsObj, skillName: skillName });
  };

  const handleUpdatedSkillLevel = (skillLevel) => {
    setUpdatedSkillsObj({ ...updatedSkillsObj, skillLevel: skillLevel });
  };

  // Handle Updated Language

  const handleUpdatedLanguageName = (languageName) => {
    setUpdatedLanguagesObj({
      ...updatedLanguagesObj,
      languageName: languageName,
    });
  };

  const handleUpdatedLanguageLevel = (languageLevel) => {
    setUpdatedLanguagesObj({
      ...updatedLanguagesObj,
      languageLevel: languageLevel,
    });
  };

  useEffect(() => {
    const currentDateFun = () => {
      const objectDate = new Date();
      let day = objectDate.getDate();
      day = day < 10 ? `0${day}` : `${day}`;

      let month = objectDate.getMonth();
      month = month < 10 ? `0${month + 1}` : `${month + 1}`;

      let year = objectDate.getFullYear();

      let format = `${year}-${month}`;

      setMaxMonth(format);
    };

    currentDateFun();


    //

    const getProfileDetails = async () => {
      const token = localStorage.getItem("Token");
      try {
        await axios
          .get("https://devapi.2ndcareers.com/professional_profile_dashboard", {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.data.error_code === 0) {
              setProfilePageAllContent(true);
              setPersonalDetails({
                firstName: response.data.data.first_name,
                lastName: response.data.data.last_name,
                profilePercentage: response.data.data.profile_percentage,
                dateOfBirth: response.data.data.dob,
                email: response.data.data.email_id,
                phone: response.data.data.contact_number,
                address: response.data.data.country,
                city: response.data.data.city
              });
              setAboutContent(response.data.data.about);
              setPreferenceContent(response.data.data.preferences);
              setExperienceDataArray(response.data.data.experience);
              setEducationDataArray(response.data.data.education);
              setLanguagesKnown(response.data.data.languages);
              setSkillsKnown(response.data.data.skills);
              setSocialMediaArray(response.data.data.social_link);
              setAdditionalInformationData(response.data.data.additional_info);
              setExperienceFieldsFilled(false);
              setEducationFieldsFilled(false);
              setProfilePicture(`https://devcdn.2ndcareers.com/${response.data.data.profile_image}`)
              setUploadedVideoFile(`https://devcdn.2ndcareers.com/${response.data.data.video_name}`)

              setResumeName(response.data.data.resume_name)
              if ((response.data.data.profile_image).includes("default_profile_picture.png")) {
                setDisableProfilePictureDelete(true)
              } else {
                setDisableProfilePictureDelete(false)
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    };

    (async () => getProfileDetails())();
  }, [profilePageRefresh]);

  const languagesData = [
    {
      id: 4,
      languageName: "English",
    },
    {
      id: 17,
      languageName: "Spanish",
    },
    {
      id: 5,
      languageName: "French",
    },
    {
      id: 14,
      languageName: "Portuguese",
    },
    {
      id: 3,
      languageName: "Chinese ",
    },
    {
      id: 6,
      languageName: "German",
    },
    {
      id: 16,
      languageName: "Russian",
    },
    {
      id: 9,
      languageName: "Italian",
    },
    {
      id: 10,
      languageName: "Japanese",
    },
    {
      id: 11,
      languageName: "Korean",
    },
    {
      id: 20,
      languageName: "Vietnamese",
    },
    {
      id: 13,
      languageName: "Persian (Farsi)",
    },
    {
      id: 8,
      languageName: "Hindi",
    },
    {
      id: 2,
      languageName: "Bengali",
    },
    {
      id: 7,
      languageName: "Gujarati",
    },
    {
      id: 19,
      languageName: "Telugu",
    },
    {
      id: 15,
      languageName: "Punjabi",
    },
    {
      id: 18,
      languageName: "Tamil",
    },
    {
      id: 12,
      languageName: "Malayalam",
    },
    {
      id: 1,
      languageName: "Arabic",
    },
  ];

  languagesData.sort(function (a, b) {
    if (a.languageName < b.languageName) {
      return -1;
    }
    if (a.languageName > b.languageName) {
      return 1;
    }
    return 0;
  });


  const [languageLevelData, setLanguageLevelData] = useState([
    {
      id: 1,
      languageLevel: "Elementary Proficiency",
    },
    {
      id: 3,
      languageLevel: "Limited Working Proficiency",
    },
    {
      id: 5,
      languageLevel: "Professional Working Proficiency",
    },
    {
      id: 2,
      languageLevel: "Full Professional Proficiency",
    },
    {
      id: 4,
      languageLevel: "Native / Bilingual Proficiency",
    },
  ]);

  languageLevelData.sort(function (a, b) {
    if (a.languageLevel < b.languageLevel) {
      return -1;
    }
    if (a.languageLevel > b.languageLevel) {
      return 1;
    }
    return 0;
  });


  const [languagesKnown, setLanguagesKnown] = useState([
    // {
    //   id: 105,
    //   language_known: "Tamil ",
    //   language_level: "Professional"
    // },
    // {
    //   id: 106,
    //   language_known: "Tamil ",
    //   language_level: "Professional"
    // }
  ]);

  const [languagesArray, setLanguagesArray] = useState([]);

  const [editClick, setEditClick] = useState(false);

  const [experienceDataArray, setExperienceDataArray] = useState([]);
  // {
  //   "id": 241,
  //   "company_name": "Brainery Spot Technologies",
  //   "end_month": "Dec",
  //   "end_year": "2022",
  //   "job_description": "Lorem ipsum dolor sit amet consectetur adipisicing elit.Dolor, recusandae iste quos placeat enim cum facere accusantium nemo deserunt voluptas quisquam doloremque officiis. Adipisci, odio!",
  //   "job_location": "Coimbatore",
  //   "job_title": "Full Stack Developer",
  //   "start_month": "Jan",
  //   "start_year": "2020"
  // }

  // Edit experience with id

  const [editExperienceData, setEditExperienceData] = useState({
    id: "",
    jobTitle: "",
    companyName: "",
    location: "",
    startMonthAndYear: "",
    endMonthAndYear: "",
    experienceDescription: "",
  });

  const handleEditExperienceInputs = (e) => {
    setEditExperienceData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Edit education with id

  const [editEducationData, setEditEducationData] = useState({
    id: "",
    degree: "",
    fieldOfStudy: "",
    institution: "",
    instituteLocation: "",
    educationStartMonthAndYear: "",
    educationEndMonthAndYear: "",
  });

  const handleEditEducationInputs = (e) => {
    setEditEducationData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [editSocialMediaData, setEditSocialMediaData] = useState({
    id: "",
    socialMediaName: "",
    url: "",
  });

  const handleEditSocialMediaData = (e) => {
    setEditSocialMediaData({
      ...editSocialMediaData,
      [e.target.name]: e.target.value,
    });
  };

  const [educationDataArray, setEducationDataArray] = useState([]);
  // {
  //   "id": 134,
  //   "degree_level": "B.E Mechanical Engineering",
  //   "end_month": "Dec",
  //   "end_year": "2022",
  //   "institute_location": "Tuticorin",
  //   "institute_name": "St. Mother Theresa Engineering College",
  //   "specialisation": "specialisation",
  //   "start_month": "Jan",
  //   "start_year": "2020"
  // }

  const skillsData = [
    {
      id: 1,
      skillName: "Agile Methodologies",
    },
    {
      id: 2,
      skillName: "Algorithm Design",
    },
    {
      id: 3,
      skillName: "Analytics",
    },
    {
      id: 4,
      skillName: "Application Programming Interfaces (APIs)",
    },
    {
      id: 5,
      skillName: "Budgeting",
    },
    {
      id: 6,
      skillName: "Business Strategy",
    },
    {
      id: 7,
      skillName: "Change Management",
    },
    {
      id: 8,
      skillName: "Conflict Resolution",
    },
    {
      id: 9,
      skillName: "Contract Management Skills",
    },
    {
      id: 10,
      skillName: "Data Analysis",
    },
    {
      id: 11,
      skillName: "Database Design",
    },
    {
      id: 12,
      skillName: "Debugging",
    },
    {
      id: 13,
      skillName: "Direct Sales",
    },
    {
      id: 14,
      skillName: "Earned Value Management",
    },
    {
      id: 15,
      skillName: "Financial Management",
    },
    {
      id: 16,
      skillName: "Human Resource Management",
    },
    {
      id: 17,
      skillName: "Keyword Research",
    },
    {
      id: 18,
      skillName: "Leadership Skills",
    },
    {
      id: 19,
      skillName: "Market Research",
    },
    {
      id: 20,
      skillName: "Marketing Skills",
    },
    {
      id: 21,
      skillName: "Metrics and KPIs",
    },
    {
      id: 22,
      skillName: "Mobile Application Development",
    },
    {
      id: 23,
      skillName: "Negotiation",
    },
    {
      id: 24,
      skillName: "Operations Management",
    },
    {
      id: 25,
      skillName: "Organizational Development",
    },
    {
      id: 26,
      skillName: "Presentation",
    },
    {
      id: 27,
      skillName: "Process Improvement",
    },
    {
      id: 28,
      skillName: "Product Knowledge",
    },
    {
      id: 29,
      skillName: "Project Management",
    },
    {
      id: 30,
      skillName: "Quality Assurance (QA)",
    },
    {
      id: 31,
      skillName: "Recruiting",
    },
    {
      id: 32,
      skillName: "Revenue Expansion",
    },
    {
      id: 33,
      skillName: "Risk Assessment",
    },
    {
      id: 34,
      skillName: "SaaS Knowledge",
    },
    {
      id: 35,
      skillName: "Sales Strategy and Planning ",
    },
    {
      id: 36,
      skillName: "Sales and Budget Forecasting",
    },
    {
      id: 37,
      skillName: "Salesforce",
    },
    {
      id: 38,
      skillName: "Strategic Planning",
    },
    {
      id: 39,
      skillName: "Supply Chain Management",
    },
    {
      id: 40,
      skillName: "Talent Management",
    },
    {
      id: 41,
      skillName: "Team Leadership",
    },
    {
      id: 42,
      skillName: "Upselling",
    },
  ];

  const [skillsObj, setSkillsObj] = useState({
    skillName: "",
    skillLevel: "",
  });

  const handleUploadResumeClick = () => {
    document.getElementById("input-file").click();
  };

  const handleUploadNewResumeClick = () => {
    document.getElementById("input-file2").click();
  };

  const handleResumeUpload = async (e) => {

    try {
      const token = localStorage.getItem("Token");

      let file = e.target.files[0];

      if (file.name.includes(".pdf") || file.name.includes(".docx")) {
        setFileUploadLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
          onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgressPercentage(percentCompleted);
          },
        };

        await axios
          .post(
            "https://devapi.2ndcareers.com/professional_profile_extraction",
            formData,
            config
          )
          .then((response) => {
            setProgressPercentage(0);
            if (response.data.error_code === 0) {
              setFileUploadLoading(false);


              toast.success(response.data.message);
              setResumeUploaded(true);
              setResumeName(file.name);
              setUploadedResumeFile(file);
              setResumeUploadedDate(response.data.data.resume_upload_date)
              // setResumeUploadedDate(format)
              setProfilePageRefresh(!profilePageRefresh);
              file = "";
            } else {
              toast.error(response.data.message);
            }
          });
      } else {
        toast.error("Unsupported file format. Please upload PDF files only.");
        setFileUploadLoading(false);

      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleProfilePhotoUpload = async (e) => {
    setResponseLoading(true);

    try {
      const token = localStorage.getItem("Token");

      const file = e.target.files[0];



      if (
        file.name.includes(".png") ||
        file.name.includes(".jpeg") ||
        file.name.includes(".jpg") ||
        file.name.includes(".HEIC")
      ) {
        const formData = new FormData();
        formData.append("profile_pic", file);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        };


        await axios
          .post(
            "https://devapi.2ndcareers.com/upload_user_profile_pic",
            formData,
            config
          )
          .then((response) => {
            if (response.data.error_code === 0) {
              toast.success(response.data.message);

              setProfilePicture(`https://devcdn.2ndcareers.com/${response.data.data.picture_name}`);
              setResponseLoading(false);
              setIsProfilePictureUploaded(true)
            } else {
              toast.error(response.data.message);
            }
          });
      } else {
        toast.error(
          "Unsupported file format. Please upload .jpeg, .jpg, .png, .HEIC files only."
        );
        setResponseLoading(false);
        setIsProfilePictureUploaded(false)

      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleVideoUpload = async (e) => {


    try {

      setVideoUploading(true)

      setVideoUploadedPlaceholder(false)


      const token = localStorage.getItem("Token");

      const file = e.target.files[0];




      if (file.name.includes(".mp4")) {
        const formData = new FormData();
        formData.append("intro_video", file);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        };

        await axios
          .post(
            "https://devapi.2ndcareers.com/professional_video_upload",
            formData,
            config
          )
          .then((response) => {
            if (response.data.error_code === 0) {
              toast.success(response.data.message);
              setUploadedVideoFile(`https://devcdn.2ndcareers.com/${response.data.data.video_name}`)

              setProfilePageRefresh(!profilePageRefresh)
              setIsVideoUploaded(!isVideoUploaded)
              setVideoUploading(false)
              setVideoFullyUploaded(true)
              setVideoUploadedPlaceholder(false)
            } else {
              toast.error(response.data.message);
            }
          });
      } else {
        setVideoUploading(false)
        setVideoFullyUploaded(false)
        setVideoUploadedPlaceholder(true)
        toast.error("Unsupported file format. Only MP4 video formats are supported.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const inputRef = useRef();

  const handleResumeDelete = (e) => {
    setResumeUploaded(false);
    toast.success("Resume deleted successfully");
    setAboutContent("");
    setPreferenceContent("");
    setExperienceDataArray([]);
    setEducationDataArray([]);
    setLanguagesKnown([]);
    setSkillsKnown([]);
    setSocialMediaArray([]);
    setAdditionalInformationData([]);
    setProfilePageRefresh(!profilePageRefresh);
  };

  const handlePeronalDetailsChange = (e) => {
    setPersonalDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePeronalDetailsEdit = () => {
    setEditClick(!editClick);
  };

  const handlePersonalDetailsSave = async () => {
    const token = localStorage.getItem("Token");

    if (personalDetails.phone !== "") {
      setEditLocation({
        city: "",
        country: ""
      })
    }





    if (personalDetails.phone === "" || (editLocation.city === "" && editLocation.country === "")) {
      toast("Please fill all the details", {
        icon: (
          <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
        ),
      })
    } else {

      const personalDetailsParams = {
        first_name: personalDetails.firstName,
        last_name: personalDetails.lastName,
        contact_number: personalDetails.phone,
        country: editLocation.country,
        city: editLocation.city,
      };

      try {



        await axios
          .post(
            "https://devapi.2ndcareers.com/professional_profile_update",
            personalDetailsParams,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.data.error_code === 0) {
              toast.success(response.data.message);
              setEditClick(!editClick);
              setProfilePageRefresh(!profilePageRefresh)
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }


  };

  // about edit icon
  const handleAboutEditOrSaveIcon = async (e, editOrSave) => {
    if (editOrSave === "Save") {
      if (aboutContent.trim() === "" || aboutContent === "") {
        toast("Please enter text before saving.", {
          icon: (
            <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
          ),
        });
        return;
      } else {
        setAboutEditIcon(false);
      }

      const token = localStorage.getItem("Token");
      const aboutParams = {
        about: aboutContent,
      };

      try {
        await axios
          .post(
            "https://devapi.2ndcareers.com/professional_about_update",
            aboutParams,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.data.error_code === 0) {
              toast.success(response.data.message);
              setAboutEditIcon(false);
              setProfilePageRefresh(!profilePageRefresh);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      setAboutEditIcon(true);
    }
  };

  // preference edit icon
  const handlePreferenceEditOrSaveIcon = async (e, editOrSave) => {
    if (editOrSave === "Save") {
      setPreferenceEditIcon(false);
      if (preferenceContent.trim() === "") {
        setPreferenceEditIcon(true);
        toast("Please enter text before saving.", {
          icon: (
            <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
          ),
        });
        return;
      } else {
        setPreferenceEditIcon(false);
        // setAboutEditIcon(false);
      }

      const token = localStorage.getItem("Token");
      const preferenceParams = {
        preferences: preferenceContent,
      };

      try {
        await axios
          .post(
            "https://devapi.2ndcareers.com/professional_preferences_update",
            preferenceParams,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.data.error_code === 0) {
              toast.success(response.data.message);
              setPreferenceEditIcon(false);
              setProfilePageRefresh(!profilePageRefresh);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    } 
    else {
    setPreferenceEditIcon(true);
      // setAboutEditIcon(true);
    }
  };

  // Handle experience inputs

  const handleExperienceInputs = (e) => {
    if (e.target.type === "month") {
      handleDisplayMonth(e);
      setExperienceInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    } else {
      setExperienceInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  // Handle education inputs

  const handleEducationInputs = (e) => {
    setEducationInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Skill

  const handleSkillName = (skillName) => {
    setSkillsObj({ ...skillsObj, skillName: skillName });
  };

  const handleSkillLevel = (skillLevel) => {
    setSkillsObj({ ...skillsObj, skillLevel: skillLevel });
  };

  //  handle add skill

  const handleAddSkill = async (skillName, skillLevel) => {
    if (skillsObj.skillName === "" || skillsObj.skillLevel === "") {
      toast("Please select all the fields", {
        icon: (
          <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
        ),
      });
    } else {

      const token = localStorage.getItem("Token");
      const skillParams = {
        skill_name: skillName,
        skill_level: skillLevel,
      };

      try {
        await axios
          .post(
            "https://devapi.2ndcareers.com/professional_skills_update",
            skillParams,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.data.error_code === 0) {
              toast.success(response.data.message);
              setSkillsObj({
                skillName: "",
                skillLevel: "",
              });
              setProfilePageRefresh(!profilePageRefresh);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSaveSkill = (skillName, skillLevel) => {
    toast.success("Skills saved");
  };

  const [editSkillClick, setEditSkillClick] = useState(false);
  const [editLanguageClick, setEditLanguageClick] = useState(false);
  const [editSkillInputs, setEditSkillInputs] = useState({
    skill_id: 0,
    skill_name: "",
    skill_level: "",
  });
  const [editLanguageInputs, setEditLanguageInputs] = useState({
    language_id: 0,
    language_known: "",
    language_level: "",
  });

  const [editUpdateBtn, seteditUpdateBtn] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState(0);

  // handle delete profile picture

  const handleDeleteProfilePicture = async () => {

    try {
      const token = localStorage.getItem("Token");

      await axios
        .post(
          "https://devapi.2ndcareers.com/delete_user_profile_pic", {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.error_code === 0) {
            toast.success(response.data.message);
            document.getElementById("deleteProfilePhotoModalConfirmationModal").click();
            setProfilePageRefresh(!profilePageRefresh)
            setProfilePicture("https://devcdn.2ndcareers.com/professional/profile-pic/default_profile_picture.png")
            setIsProfilePictureUploaded(false)
          } else {
            toast.error(response.data.message);
          }
        }).catch((err) => {
          console.log(err);
        })
    } catch (err) {
      console.log(err);
    }
  };



  // handle delete video

  const handleDeleteVideo = async () => {

    try {
      setVideoDeletingLoading(true)
      const token = localStorage.getItem("Token");

      await axios
        .post(
          "https://devapi.2ndcareers.com/delete_professional_intro_video", {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.error_code === 0) {
            toast.success(response.data.message);
            setProfilePageRefresh(!profilePageRefresh)
            setUploadedVideoFile("")
            document.getElementById("deleteVideoModalConfirmationModal").click();
            setVideoDeletingLoading(false)
            setVideoUploadedPlaceholder(true)
            setVideoFullyUploaded(false)

          } else {
            toast.error(response.data.message);
          }
        }).catch((err) => {
          console.log(err);
        })
    } catch (err) {
      console.log(err);
    }
  };


  //  handle edit skill
  const handleEditSkill = async (e, id) => {

    setSelectedSkillId(id);

    // setEditSkillDropdown(true)
    // setEditSelectedSkill(id)

    const token = localStorage.getItem("Token");
    const skillParams = {
      skill_id: id,
    };

    setEditSkillClick(true);
    const result = skillsKnown.filter((val, i) => {
      return val.id === id;
    });
    setEditSkillInputs({
      skill_id: id,
      skill_name: result[0].skill_name,
      skill_level: result[0].skill_level,
    });
    setUpdatedSkillsObj({
      ...updatedSkillsObj,
      skillName: result[0].skill_name,
      skillLevel: result[0].skill_level,
    });
    // setSkillsObj({ ...skillsObj, skillName: , skillLevel: result[0].skill_level })

    if (result[0].skill_name !== "" && result[0].skill_level !== "") {
      seteditUpdateBtn(true);
    }

    // try {
    //   await axios.post("https://devapi.2ndcareers.com/get_professional_skills", skillParams, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   }).then((response) => {
    //     if (response.data.error_code === 0) {
    //       // setProfilePageRefresh(!profilePageRefresh)
    //     }

    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // } catch (err) {
    //   console.log(err)
    // }
  };

  //  handle edit language
  const handleEditLanguage = async (e, id) => {

    setSelectedLanguageId(id);

    // setEditSkillDropdown(true)
    // setEditSelectedSkill(id)

    const token = localStorage.getItem("Token");
    const languageParams = {
      language_id: id,
    };

    setEditLanguageClick(true);
    const result = languagesKnown.filter((val, i) => {
      return val.id === id;
    });
    setEditLanguageInputs({
      language_id: 0,
      language_known: result[0].language_known,
      language_level: result[0].language_level,
    });
    setUpdatedLanguagesObj({
      ...updatedLanguagesObj,
      languageName: result[0].language_known,
      languageLevel: result[0].language_level,
    });
    // setSkillsObj({ ...skillsObj, skillName: , skillLevel: result[0].skill_level })

    if (result[0].language_known !== "" && result[0].language_level !== "") {
      seteditUpdateBtn(true);
    }

    // try {
    //   await axios.post("https://devapi.2ndcareers.com/get_professional_skills", skillParams, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   }).then((response) => {
    //     if (response.data.error_code === 0) {
    //       // setProfilePageRefresh(!profilePageRefresh)
    //     }

    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // } catch (err) {
    //   console.log(err)
    // }
  };

  //  handle update skill

  const handleUpdateSkill = async (e, id) => {

    const token = localStorage.getItem("Token");
    const skillParams = {
      skill_id: id,
      skill_name: updatedSkillsObj.skillName,
      skill_level: updatedSkillsObj.skillLevel,
    };


    try {
      await axios
        .post(
          "https://devapi.2ndcareers.com/professional_skills_update",
          skillParams,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.error_code === 0) {
            // const result = skillsKnown.filter((val, i) => {
            //   return val.id === id
            // })
            // // setSkillsKnown({...skillsKnown, skill_name : result[0].skill_name, skill_level: result[0].skill_level })
            toast.success(response.data.message);
            setEditSkillClick(false);
            setProfilePageRefresh(!profilePageRefresh);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  //  handle update language

  const handleUpdateLanguage = async (e, id) => {

    const token = localStorage.getItem("Token");
    const languageParams = {
      language_id: id,
      language_known: updatedLanguagesObj.languageName,
      language_level: updatedLanguagesObj.languageLevel,
    };


    try {
      await axios
        .post(
          "https://devapi.2ndcareers.com/professional_language_update",
          languageParams,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.error_code === 0) {
            // const result = skillsKnown.filter((val, i) => {
            //   return val.id === id
            // })
            // // setSkillsKnown({...skillsKnown, skill_name : result[0].skill_name, skill_level: result[0].skill_level })
            toast.success(response.data.message);
            setEditLanguageClick(false);
            setProfilePageRefresh(!profilePageRefresh);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  //  handle delete skill

  const handleDeleteSkill = async (e, id) => {

    const token = localStorage.getItem("Token");
    const skillParams = {
      skill_id: id,
    };

    try {
      await axios
        .post(
          "https://devapi.2ndcareers.com/professional_skill_delete",
          skillParams,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.error_code === 0) {
            toast.success(response.data.message);
            setProfilePageRefresh(!profilePageRefresh);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Language
  const handleLanguageName = (languageName) => {
    setLanguagesObj({ ...languagesObj, languageName: languageName });
  };

  const handleLanguageLevel = (languageLevel) => {
    setLanguagesObj({ ...languagesObj, languageLevel: languageLevel });
  };

  const handleEditLanguageModalBoxClick = (languageId) => {
    setSelectedLanguageId(languageId);
    setEditLanguageClick(false);
  };

  //  Add Language

  const handleAddLanguage = async (languageName, languageLevel) => {
    if (languagesObj.languageName === "" || languagesObj.languageLevel === "") {
      toast("Please select all the fields", {
        icon: (
          <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
        ),
      });
    } else {

      const token = localStorage.getItem("Token");
      const languageParams = {
        language_known: languageName,
        language_level: languageLevel,
      };

      try {
        await axios
          .post(
            "https://devapi.2ndcareers.com/professional_language_update",
            languageParams,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.data.error_code === 0) {
              toast.success(response.data.message);
              setLanguagesObj({
                languageName: "",
                languageLevel: "",
              });
              setProfilePageRefresh(!profilePageRefresh);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // const handleEditLanguage = async (e, id) => {


  //   setLanguagesArray(prevState => [...prevState, languagesObj])

  //   const token = localStorage.getItem("Token");
  //   const languageParams = {
  //     language_known: "",
  //     language_level: ""
  //   }

  //   try {
  //     await axios.post("https://devapi.2ndcareers.com/professional_language_update", languageParams, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     }).then((response) => {
  //       if (response.data.error_code === 0) {
  //         setProfilePageRefresh(!profilePageRefresh)
  //       }

  //     }).catch((err) => {
  //       console.log(err)
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }

  // }

  //  Delete Language

  const handleDeleteLanguage = async (e, id) => {
    const token = localStorage.getItem("Token");
    const languageParams = {
      language_id: id,
    };

    try {
      await axios
        .post(
          "https://devapi.2ndcareers.com/professional_language_delete",
          languageParams,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.error_code === 0) {
            toast.success(response.data.message);
            setProfilePageRefresh(!profilePageRefresh);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveLanguage = (languageName, languageLevel) => {
    toast.success("Languages saved");
  };

  const handleDateOfBirthShow = () => {
    setDateOfBirthShow(!dateOfBirthShow);

    dateOfBirthShow
      ? toast.success("Your DOB will be visible to the Employer")
      : toast.success("Your DOB will be hidden to the Employer");
  };

  // Add experience api

  const handleAddExperience = async (e, saveClick) => {
    if (
      experienceInputs.jobTitle === "" ||
      experienceInputs.companyName === "" ||
      experienceInputs.location === "" ||
      experienceInputs.startMonthAndYear === "" ||
      experienceInputs.endMonthAndYear === ""
    ) {
      toast("Please fill all the details", {
        icon: (
          <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
        ),
      });
      return;
    } else {
      const token = localStorage.getItem("Token");
      const addExperienceParams = {
        company_name: experienceInputs.companyName,
        job_title: experienceInputs.jobTitle,
        start_date: experienceInputs.startMonthAndYear,
        end_date: experienceInputs.endMonthAndYear,
        job_description: experienceInputs.experienceDescription,
        job_location: experienceInputs.location,
      };

      try {

        await axios
          .post(
            "https://devapi.2ndcareers.com/professional_experience_update",
            addExperienceParams,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {

            if (response.data.error_code === 0) {
              if (saveClick === "Save") {
                document.getElementById("addExperienceClose").click();
              }
              toast.success(response.data.message);
              // setExperienceDisplayMonth()
              setExperienceInputs({
                jobTitle: "",
                companyName: "",
                location: "",
                startMonthAndYear: "",
                endMonthAndYear: "",
                experienceDescription: "",
              });
              setProfilePageRefresh(!profilePageRefresh);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Edit experience api

  const handleEditExperience = async (e, expId) => {


    const result = experienceDataArray.filter((value) => {
      return value.id === expId;
    });


    setEditExperienceData({
      id: expId,
      jobTitle: result[0].job_title,
      companyName: result[0].company_name,
      location: result[0].job_location,
      startMonthAndYear: "",
      endMonthAndYear: "",
      experienceDescription: result[0].job_description,
    });





    // var regex = /^\d{4}-(0[1-9]|1[0-2])$/;

    // if (regex.test(result[0].start_date)) {

    //   setEditExperienceData({
    //     id: expId,
    //     jobTitle: result[0].job_title,
    //     companyName: result[0].company_name,
    //     location: result[0].job_location,
    //     startMonthAndYear:  result[0].start_date,
    //     experienceDescription: result[0].job_description,
    //   });

    // } else {
    //   setEditExperienceData({
    //     id: expId,
    //     jobTitle: result[0].job_title,
    //     companyName: result[0].company_name,
    //     location: result[0].job_location,
    //     startMonthAndYear:  "",
    //     experienceDescription: result[0].job_description,
    //   });

    // }


    // if (regex.test(result[0].end_date)) {

    //   setEditExperienceData({
    //     id: expId,
    //     jobTitle: result[0].job_title,
    //     companyName: result[0].company_name,
    //     location: result[0].job_location,
    //     startMonthAndYear:  result[0].start_date,
    //     endMonthAndYear: result[0].end_date,
    //     experienceDescription: result[0].job_description,
    //   });
    // } else {
    //   setEditExperienceData({
    //     id: expId,
    //     jobTitle: result[0].job_title,
    //     companyName: result[0].company_name,
    //     location: result[0].job_location,
    //     startMonthAndYear:  result[0].start_date,
    //     endMonthAndYear: "",
    //     experienceDescription: result[0].job_description,
    //   });
    // }



  };




  // Update experience api

  const handleUpdateExperience = async (e, id, saveClick) => {




    if (
      editExperienceData.jobTitle === "" ||
      editExperienceData.companyName === "" ||
      editExperienceData.location === "" ||
      editExperienceData.startMonthAndYear === "" ||
      editExperienceData.endMonthAndYear === ""
    ) {
      toast("Please fill all the details", {
        icon: (
          <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
        ),
      });
      return;
    } else {
      const token = localStorage.getItem("Token");

      const updateExperienceParams = {
        experience_id: id,
        company_name: editExperienceData.companyName,
        job_title: editExperienceData.jobTitle,
        start_date: editExperienceData.startMonthAndYear,
        end_date: editExperienceData.endMonthAndYear,
        job_description: editExperienceData.experienceDescription,
        job_location: editExperienceData.location,
      };

      try {


        await axios
          .post(
            "https://devapi.2ndcareers.com/professional_experience_update",
            updateExperienceParams,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {

            if (response.data.error_code === 0) {
              toast.success(response.data.message);
              if (saveClick === "Save") {
                document.getElementById("updateExperienceClose").click();
              }
              setProfilePageRefresh(!profilePageRefresh);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }





  };

  // Delete experience api

  const handleDeleteExperience = async (e, id) => {
    const token = localStorage.getItem("Token");

    const deleteExperienceParams = {
      experience_id: id,
      // "is_experienced": "Y",
      // "company_name": "Brainery Spot Technologies",
      // "job_title": "Full Stack Developer",
      // "start_month": "May",
      // "start_year": "2022",
      // "end_month": "May",
      // "end_year": "2023",
      // "is_currently_working": "N",
      // "job_description": "Full Stack Developer",
      // "job_location": "Madurai"
    };

    try {
      await axios
        .post(
          "https://devapi.2ndcareers.com/professional_experience_delete",
          deleteExperienceParams,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.error_code === 0) {
            setProfilePageRefresh(!profilePageRefresh);
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Add education api

  const handleAddEducation = async (e, saveClick) => {
    if (
      educationInputs.degree === "" ||
      educationInputs.fieldOfStudy === "" ||
      educationInputs.institution === "" ||
      educationInputs.instituteLocation === "" ||
      educationInputs.educationStartMonthAndYear === "" ||
      educationInputs.educationEndMonthAndYear === ""
    ) {
      toast("Please fill all the details", {
        icon: (
          <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
        ),
      });
      return;
    } else {
      const token = localStorage.getItem("Token");

      const addEducationParams = {
        degree_level: educationInputs.degree,
        specialisation: educationInputs.fieldOfStudy,
        institute_name: educationInputs.institution,
        institute_location: educationInputs.instituteLocation,
        start_date: educationInputs.educationStartMonthAndYear,
        end_date: educationInputs.educationEndMonthAndYear,
      };

      try {
        await axios
          .post(
            "https://devapi.2ndcareers.com/professional_education_update",
            addEducationParams,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.data.error_code === 0) {
              if (saveClick === "Save") {
                document.getElementById("addEducationClose").click();
              }
              toast.success(response.data.message);
              setProfilePageRefresh(!profilePageRefresh);
              setEducationInputs({
                institution: "",
                instituteLocation: "",
                degree: "",
                fieldOfStudy: "",
                educationStartMonthAndYear: "",
                educationEndMonthAndYear: "",
                grade: "",
                educationDescription: "",
              });
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Edit education api

  const handleEditEducation = async (e, eduId) => {

    const result = educationDataArray.filter((value, id) => {
      return value.id === eduId;
    });

    setEditEducationData({
      id: eduId,
      degree: result[0].degree_level,
      fieldOfStudy: result[0].specialisation,
      institution: result[0].institute_name,
      instituteLocation: result[0].institute_location,
      educationStartMonthAndYear: "",
      educationEndMonthAndYear: "",
    });

    // const token = localStorage.getItem("Token");

    // const editEducationParams = {
    //   education_id: id,
    // }

    // try {
    //   await axios.post('https://devapi.2ndcareers.com/get_professional_education', editEducationParams, {
    //     headers: {
    //       authorization: `Bearer ${token}`
    //     }
    //   }).then((response) => {
    //     if (response.data.error_code === 0) {
    //       setEditEducationData({
    //         id: id,
    //         degree: response.data.data[0].degree_level,
    //         fieldOfStudy: response.data.data[0].specialisation,
    //         institution: response.data.data[0].institute_name,
    //         instituteLocation: response.data.data[0].institute_location,
    //         educationStartMonthAndYear: response.data.data[0].start_date,
    //         educationEndMonthAndYear: response.data.data[0].end_date,
    //       })
    //       setProfilePageRefresh(!profilePageRefresh)
    //     }
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // } catch (err) {
    //   console.log(err)
    // }
  };

  // Update education api

  const handleUpdateEducation = async (e, id, saveClick) => {


    if (
      editEducationData.degree === "" ||
      editEducationData.fieldOfStudy === "" ||
      editEducationData.institution === "" ||
      editEducationData.instituteLocation === "" ||
      editEducationData.educationStartMonthAndYear === "" ||
      editEducationData.educationEndMonthAndYear === ""
    ) {
      toast("Please fill all the details", {
        icon: (
          <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
        ),
      });
      return;
    } else {
      const token = localStorage.getItem("Token");

      const updateEducationParams = {
        education_id: id,
        degree_level: editEducationData.degree,
        specialisation: editEducationData.fieldOfStudy,
        institute_name: editEducationData.institution,
        institute_location: editEducationData.instituteLocation,
        start_date: editEducationData.educationStartMonthAndYear,
        end_date: editEducationData.educationEndMonthAndYear,
        is_pursuing: "N",
      };

      try {
        await axios
          .post(
            "https://devapi.2ndcareers.com/professional_education_update",
            updateEducationParams,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.data.error_code === 0) {
              toast.success(response.data.message);
              if (saveClick === "Save") {
                document.getElementById("updateEducationClose").click();
              }
              setProfilePageRefresh(!profilePageRefresh);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }




  };

  // Delete education api

  const handleDeleteEducation = async (e, id) => {
    const token = localStorage.getItem("Token");

    const deleteExperienceParams = {
      education_id: id,
      // "institute_name" : "CIT",
      // "institute_location" : "Coimbatore",
      // "degree_level" : "Bachelors",
      // "specialisation" : "Mechanical",
      // "start_month" : "June",
      // "start_year" : "2018",
      // "end_month" : "May",
      // "end_year" : "2021",
      // "is_pursuing" : "N"
    };

    try {
      await axios
        .post(
          "https://devapi.2ndcareers.com/professional_education_delete",
          deleteExperienceParams,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {

          if (response.data.error_code === 0) {
            setProfilePageRefresh(!profilePageRefresh);
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // About edit section

  const handleAboutChange = (e) => {
    setAboutContent(e.target.value);
  };

  // Preference edit section

  const handlePreferenceChange = (e) => {
    setPreferenceContent(e.target.value);
  };

  const [socialMediaInputs, setSocialMediaInputs] = useState({
    socialMediaName: "",
    url: "",
  });

  const handleSocialMediaInputs = (e) => {
    setSocialMediaInputs({
      ...socialMediaInputs,
      [e.target.name]: e.target.value,
    });
  };

  //  add social media
  const handleAddSocialMedia = async (e, saveClick) => {
    if (
      socialMediaInputs.socialMediaName === "" ||
      socialMediaInputs.url === ""
    ) {
      toast("Please enter all the fields", {
        icon: (
          <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
        ),
      });
    } else {
      const token = localStorage.getItem("Token");

      const socialMediaParams = {
        title: socialMediaInputs.socialMediaName,
        url: socialMediaInputs.url,
      };

      try {
        await axios
          .post(
            "https://devapi.2ndcareers.com/professional_socail_link_update",
            socialMediaParams,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {

            if (response.data.error_code === 0) {
              setProfilePageRefresh(!profilePageRefresh);
              toast.success(response.data.message);
              if (saveClick === "Save") {
                document.getElementById("addSocialLinkMediaClose").click();
              }
              setSocialMediaInputs({
                socialMediaName: "",
                url: "",
              });
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // edit social media
  const handleEditSocialMedia = async (e, socialId) => {




    const result = socialMediaArray.filter((value, id) => {
      return value.id === socialId;
    });

    setEditSocialMediaData({
      id: socialId,
      socialMediaName: result[0].title,
      url: result[0].url,
    });

    // const token = localStorage.getItem("Token");

    // const socialMediaParams = {
    //   link_id: id,
    // }

    // try {
    //   await axios.post('https://devapi.2ndcareers.com/get_selected_professional_social_link', socialMediaParams, {
    //     headers: {
    //       authorization: `Bearer ${token}`
    //     }
    //   }).then((response) => {

    //     if (response.data.error_code === 0) {
    //       setEditSocialMediaData({
    //         id: id,
    //         socialMediaName: response.data.data[0].title,
    //         url: response.data.data[0].url
    //       })
    //     }
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // } catch (err) {
    //   console.log(err)
    // }
  };

  // update social media

  const handleUpdateSocialMedia = async (e, id, saveClick) => {

    if (
      editSocialMediaData.socialMediaName === "" ||
      editSocialMediaData.url === ""
    ) {
      toast("Please enter all the fields", {
        icon: (
          <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
        ),
      });
    } else {
      const token = localStorage.getItem("Token");

      const socialMediaParams = {
        link_id: id,
        title: editSocialMediaData.socialMediaName,
        url: editSocialMediaData.url,
      };

      try {
        await axios
          .post(
            "https://devapi.2ndcareers.com/professional_socail_link_update",
            socialMediaParams,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {

            if (response.data.error_code === 0) {
              toast.success(response.data.message);
              if (saveClick === "Save") {
                document.getElementById("updateSocialLinkMediaClose").click();
              }
              setProfilePageRefresh(!profilePageRefresh);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }



  };

  // delete social media
  const handleDeleteSocialMedia = async (e, id) => {

    const token = localStorage.getItem("Token");

    const socialMediaParams = {
      link_id: id,
    };

    try {
      await axios
        .post(
          "https://devapi.2ndcareers.com/professional_social_link_delete",
          socialMediaParams,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {

          if (response.data.error_code === 0) {
            toast.success(response.data.message);
            setProfilePageRefresh(!profilePageRefresh);
          } else {
            toast.else(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const [experienceStartMonth, setExperienceStartMonth] = useState("");
  const [experienceEndMonth, setExperienceEndMonth] = useState("");
  // const [experienceStartMonth,setExperienceStartMonth] = useState("")
  // const [experienceStartMonth,setExperienceStartMonth] = useState("")

  const handleDisplayMonth = (e) => {
    let monthAndYear = e.target.value;

    let monthSplit = monthAndYear.split("-");
    let monthOnly = monthSplit[1];

    switch (monthOnly) {
      case "01":
        setDisplayMonth("Jan");
        setExperienceStartMonth("Jan");
        setExperienceEndMonth("Jan");
        break;
      case "02":
        setDisplayMonth("Feb");
        setExperienceStartMonth("Feb");
        setExperienceEndMonth("Feb");
        break;
      case "03":
        setDisplayMonth("Mar");
        setExperienceStartMonth("Mar");
        setExperienceEndMonth("Mar");
        break;
      case "04":
        setDisplayMonth("Apr");
        setExperienceStartMonth("Apr");
        setExperienceEndMonth("Apr");
        break;
      case "05":
        setDisplayMonth("May");
        setExperienceStartMonth("May");
        setExperienceEndMonth("May");
        break;
      case "06":
        setDisplayMonth("June");
        setExperienceStartMonth("June");
        setExperienceEndMonth("June");
        break;
      case "07":
        setDisplayMonth("July");
        setExperienceStartMonth("Jan");
        setExperienceEndMonth("Jan");
        break;
      case "08":
        setDisplayMonth("Aug");
        setExperienceStartMonth("Aug");
        setExperienceEndMonth("Aug");
        break;
      case "09":
        setDisplayMonth("Sep");
        setExperienceStartMonth("Sep");
        setExperienceEndMonth("Sep");
        break;
      case "10":
        setDisplayMonth("Oct");
        setExperienceStartMonth("Oct");
        setExperienceEndMonth("Oct");
        break;
      case "11":
        setDisplayMonth("Nov");
        setExperienceStartMonth("Nov");
        setExperienceEndMonth("Nov");
        break;
      case "12":
        setDisplayMonth("Dec");
        setExperienceStartMonth("Dec");
        setExperienceEndMonth("Dec");
        break;

      default:
        break;
    }
  };

  return (
    <>
      <section className="profile-bg placeholder-glow">
        <div className="container-fluid mb-3">
          <div className="p-2 p-lg-5">
            <div className="row g-3">
              <div className="col-lg-3">
                <div className="card border-0 h-100 rounded-4">
                  <div className="card-body d-flex align-items-center justify-content-center pt-1">
                    <div className="w-100">
                      <div className="row justify-content-center p-0">
                        <div className="pic-holder mb-0 ">
                          {profilePageAllContent ? (
                            responseLoading ? (
                              <div className="d-flex justify-content-center">
                                <div
                                  className="spinner-border brand-color"
                                  role="status"
                                >
                                  <span className="visually-hidden ">
                                    Loading...
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <img
                                id="profilePic"
                                name="profile_pic"
                                src={profilePicture}
                                width={150}
                                height={150}
                                className="rounded-circle"
                              />
                            )
                          ) : (
                            <div className="placeholder rounded-2 ">
                              <img
                                id="profilePic"
                                src=""
                                width={150}
                                height={150}
                                className="rounded-circle"
                              />
                            </div>
                          )}

                          <label
                            htmlFor="newProfilePhoto"
                            className={
                              profilePageAllContent
                                ? `upload-file-block ${responseLoading ? `pe-none` : ""} `
                                : "upload-file-block pe-none"
                            }
                            data-bs-toggle="modal"
                            data-bs-target="#profilePhotoModal"
                          >
                            <div className="text-center">
                              <MdAddAPhoto className="fs-5 mb-3" />
                              <div className="">
                                Update <br /> Profile Photo
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="text-center pt-4">
                        <h5 className="text-dark font-size-20 placeholder-glow ">
                          <span
                            className={
                              profilePageAllContent
                                ? ""
                                : "placeholder py-3 w-25 rounded-1 me-2"
                            }
                          >
                            {personalDetails.firstName}{" "}
                          </span>
                          <span
                            className={
                              profilePageAllContent
                                ? ""
                                : "placeholder py-3 w-25 rounded-1"
                            }
                          >
                            {personalDetails.lastName}
                          </span>
                        </h5>
                      </div>

                      <div className="p-3 pb-0">
                        <div
                          className={
                            profilePageAllContent
                              ? "progress "
                              : "placeholder rounded-2 w-100"
                          }
                          style={{ height: "1.4rem" }}
                        >
                          <div
                            className={
                              profilePageAllContent
                                ? "progress-bar progress-bar-color"
                                : "progress-bar "
                            }
                            role="progressbar"
                            style={{
                              width: `${personalDetails.profilePercentage}%`,
                            }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {personalDetails.profilePercentage}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-5">
                <div className="card border-0 h-100 rounded-4">
                  <div className="card-body">
                    <div className="d-flex justify-content-between ms-1 my-3">
                      <label className="profile-side-headers d-flex align-items-center placeholder-glow">
                        <PiBagFill
                          className={
                            profilePageAllContent
                              ? "me-4 brand-color fs-3"
                              : "me-4 fs-1 placeholder rounded-2"
                          }
                        />
                        <span
                          className={
                            profilePageAllContent
                              ? ""
                              : "placeholder px-3 w-100 py-1  rounded-1"
                          }
                        >
                          Personal details
                        </span>
                      </label>
                      {editClick === false ? (
                        <MdModeEditOutline
                          className={
                            profilePageAllContent
                              ? "icon edit-icon fs-3 brand-color"
                              : "icon fs-3 placeholder rounded-2"
                          }
                          title="Edit Personal details"
                          onClick={handlePeronalDetailsEdit}
                        />
                      ) : (
                        <MdSave
                          className={
                            profilePageAllContent
                              ? "icon edit-icon fs-3 brand-color"
                              : "icon fs-3 placeholder rounded-2"
                          }
                          title="Save Personal details"
                          onClick={handlePersonalDetailsSave}
                        />
                      )}
                    </div>

                    <div className="">
                      <ul className="list-group list-group-flush placeholder-glow">
                        {/* <li className="list-group-item py-3 pe-0 border-0 d-flex align-items-center justify-content-between">
                          <div className="w-75">
                            <FaCalendar
                              className={
                                profilePageAllContent
                                  ? "me-3"
                                  : "me-3 placeholder rounded-2"
                              }
                            />
                            <span
                              className={
                                profilePageAllContent
                                  ? ""
                                  : "placeholder px-3 w-75 py-3 rounded-1"
                              }
                            >
                              {personalDetails.dateOfBirth}
                            </span>
                          </div>
                          <div>
                            <label
                              className={
                                profilePageAllContent
                                  ? "switch"
                                  : "switch placeholder rounded-2"
                              }
                              title={
                                dateOfBirthShow
                                  ? "Show DOB to the Employer"
                                  : "Hide DOB to the Employer"
                              }
                            >
                              <input
                                type="checkbox"
                                onClick={handleDateOfBirthShow}
                              />
                              <span
                                className={
                                  profilePageAllContent
                                    ? "slider round"
                                    : "slider round placeholder rounded-2"
                                }
                              ></span>
                            </label>
                          </div>
                        </li> */}
                        <li className="list-group-item py-3 border-0 d-flex align-items-center">
                          <FaEnvelope
                            className={
                              profilePageAllContent
                                ? "me-3"
                                : "me-3 placeholder rounded-2"
                            }
                          />
                          <span
                            className={
                              profilePageAllContent
                                ? ""
                                : "placeholder px-3 w-75 py-3 rounded-1"
                            }
                          >
                            {personalDetails.email}
                          </span>
                        </li>
                        <li className="list-group-item py-3 border-0 d-flex align-items-center placeholder-glow">
                          <FaPhone
                            className={
                              profilePageAllContent
                                ? "me-3"
                                : "me-3 placeholder rounded-2"
                            }
                          />
                          {editClick === false ? (
                            <span
                              className={
                                profilePageAllContent
                                  ? ""
                                  : "placeholder px-3 py-1 rounded-1"
                              }
                            >
                              <input
                                className="non-edit-input d-block w-100"
                                name="phone"
                                disabled
                                value={personalDetails.phone}
                              />
                            </span>
                          ) : (
                            <span
                              className={
                                profilePageAllContent
                                  ? ""
                                  : "placeholder px-3  py-2 rounded-1"
                              }
                            >
                              <input
                                
                                className="personal-detail-input"
                                type="number"
                                name="phone"
                                value={personalDetails.phone}
                                onChange={handlePeronalDetailsChange}
                              />
                            </span>
                          )}
                        </li>

                        <li className="list-group-item py-3 border-0 d-flex align-items-center">
                          <IoLocationSharp
                            className={
                              profilePageAllContent
                                ? "me-3"
                                : "me-3 placeholder rounded-2"
                            }
                          />
                          {editClick === false ? (
                            <span
                              className={
                                profilePageAllContent
                                  ? ""
                                  : "placeholder px-3  py-1 rounded-1"
                              }
                            >
                              <input
                                className="non-edit-input "
                                name="text"
                                disabled
                                value={`${personalDetails.city} , ${personalDetails.address}`}
                              />
                            </span>
                          ) : (
                            <span>
                              {/* <input
                                className="personal-detail-input d-inline-block"
                                type="text"
                                name="address"
                                value={personalDetails.address}
                                onChange={handlePeronalDetailsChange}
                              /> */}
                              <AutoCompleteComponent 
                                userEnteredCity={personalDetails.city}
                                userEnteredCountry={personalDetails.address}
                                editClick={editClick}/>
                            </span>
                          )}
                        </li>
                      </ul>
                    </div>

                    {/* <div className="container px-5">
                      <table cellPadding="15px" className="w-100 text-start">
                        <tbody>
                          <tr title="Hide DOB to the employee">
                            <td><input type="checkbox" /><span className="ms-3">Date of Birth</span></td>
                            <td>11/12/1990</td>
                            <td>11/12/1990</td>
                          </tr>

                          <tr>
                            <td><input type="checkbox" className="invisible-checkbox" /><span className="ms-3">Mail</span></td>
                            <td>georgemartin@gmail.com</td>
                          </tr>

                          <tr>

                            <td><input type="checkbox" className="invisible-checkbox" /><span className="ms-3">Phone</span></td>
                            <td className="">{editClick === false ?
                              <input
                                className="non-edit-input "
                                name="phone"
                                disabled
                                value={personalDetails.phone} />
                              :
                              <input

                                className="personal-detail-input "
                                type="number"
                                name="phone"
                                value={personalDetails.phone}
                                onChange={handlePeronalDetailsChange} />
                            }
                            </td>
                          </tr>

                          <tr>
                            <td><input type="checkbox" className="invisible-checkbox" /><span className="ms-3">Address</span></td>
                            <td>{editClick === false ?
                              <input
                                className="non-edit-input "
                                name="text"
                                disabled
                                value={personalDetails.address} />
                              : <input
                                className="personal-detail-input d-inline-block"
                                type="text"
                                name="address"
                                value={personalDetails.address}
                                onChange={handlePeronalDetailsChange} />
                            }
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                {resumeName.length > 0 ? (
                  <div className="card border-0 h-100 rounded-4 p-5 ">
                    <div className="card-body border rounded-3 pt-4 ">
                      {fileUploadLoading ? (
                        <div className="d-flex justify-content-center align-items-center h-100">
                          <div
                            className="spinner-border brand-color"
                            role="status"
                          >
                            <span className="visually-hidden ">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="pb-3 ">
                            <div className="p-3 pb-4 uploaded-resume-container ">
                              <div>
                                <BsFiletypePdf className="pdf-icon text-danger me-3 fs-1 mb-2" />
                              </div>
                              <div>
                                <p className="resume-name mb-1">{resumeName}</p>
                                <p className="fileUploadedOnText pb-0 mb-0">
                                  {/* File uploaded on : {resumeUploadedDate} */}
                                </p>
                              </div>
                            </div>
                            {/* <div>
                        <a className="download-icon me-3 fs-4" href={uploadedResumeFile} onClick={() => console.log('Resume downloaded')} download><LuDownload title="Download pdf" className="download-icon me-3" /></a>
                      </div> */}
                          </div>
                          <hr />
                          <div className="px-3 gap-3 mt-2 d-flex float-end align-items-center">
                            {/* <p className="text-decoration-underline mb-0 delete-resume-text" data-bs-toggle="modal" data-bs-target="#deleteResumeModal" >Delete</p> */}
                            {/* <LuTrash className="icon edit-icon fs-4 brand-color" title="Delete Resume" data-bs-toggle="modal" data-bs-target="#deleteResumeModal" /> */}
                            {/* <button type="submit" className="btn btn-sm btn-brand-color  px-3" data-bs-toggle="modal" data-bs-target="#newResumeUploadConfirmationModal">Upload New Resume</button> */}
                            <LuUpload
                              className="upload-icon fs-4 brand-color"
                              title="Upload New Resume"
                              data-bs-toggle="modal"
                              data-bs-target="#newResumeUploadConfirmationModal"
                            />
                            {/* <a className="download-icon me-3 fs-4" href={uploadedResumeFile} onClick={(e) => console.log(e)} download><LuDownload title="Download pdf" className="download-icon me-3" /></a> */}
                          </div>
                        </>
                      )}
                    </div>
                    {fileUploadLoading ? (
                      <div className="progress mx-5 mb-3 mt-4 ">
                        <div
                          className="pt-2 progress-bar bg-brand-color progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          aria-valuenow="100"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: `${progressPercentage}%` }}
                        //  style={{ width: '100%' }}
                        >
                          Loading {progressPercentage}%
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="card border-0 h-100 rounded-4 ">
                    <div className="card-body d-flex align-items-center justify-content-center">
                      {fileUploadLoading ? (
                        <div className="d-flex justify-content-center align-items-center h-100 ">
                          <div
                            className="spinner-border brand-color"
                            role="status"
                          >
                            <span className="visually-hidden ">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div
                            className={
                              profilePageAllContent
                                ? "border rounded-4 py-5 uploadResumeCard "
                                : "border rounded-5 py-5 uploadResumeCard placeholder rounded-2"
                            }
                            data-bs-toggle="modal"
                            data-bs-target="#resumeUploadConfirmationModal"
                          >
                            <input
                              type="file"
                              className="form-control"
                              id="input-file"
                              hidden
                              accept=".doc, .docx,.pdf"
                              onChange={handleResumeUpload}
                            />
                            <div className="text-center ">
                              <div className="fs-3">
                                <LuUpload />
                              </div>
                              <p className="px-5 m-0 pt-3">
                                Click here to upload resume
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {fileUploadLoading ? (
                      <div className="progress mx-5 mb-3 ">
                        <div
                          className=" progress-bar bg-brand-color progress-bar-striped progress-bar-animated "
                          role="progressbar"
                          aria-valuenow="100"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: `${progressPercentage}%` }}
                        //  style={{ width: '100%' }}
                        >
                          Loading {progressPercentage}%
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>

            <ProfileInfoEditCard
              placeholder="Provide a brief description about yourself"
              content={aboutContent}
              EditIcon={aboutEditIcon}
              handleTextAreaChange={handleAboutChange}
              cardHeadingIcon={
                <FaUserTie
                  className={
                    profilePageAllContent
                      ? "me-4 brand-color fs-4"
                      : "me-4  fs-4 placeholder rounded-2"
                  }
                />
              }
              cardHeading="About"
              profilePageAllContent={profilePageAllContent}
              cardSaveIcon={
                <MdSave
                  className={`icon edit-icon fs-3 ${aboutContent.trim() === "" ? "text-muted" : "brand-color"
                    }`}
                  title="Save About"
                  onClick={(e) => handleAboutEditOrSaveIcon(e, "Save")}
                />
              }
              cardEditIcon={
                <MdModeEditOutline
                  className={
                    profilePageAllContent
                      ? "icon edit-icon fs-4 brand-color"
                      : "icon edit-icon fs-4 placeholder rounded-2 text-dark"
                  }
                  title="Edit About"
                  onClick={(e) => handleAboutEditOrSaveIcon(e, "Edit")}
                />
              }
              cardDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt a ipsum vitae assumenda iure sequi? Dicta saepe
                asperiores blanditiis natus quo repellat, eius, soluta sed
                architecto accusantium eum veritatis at voluptas rem odit
                corrupti earum! Minima itaque sunt a quos culpa laudantium
                totam reiciendis. Laudantium quae aspernatur quas cupiditate
                debitis expedita placeat iusto esse culpa tenetur aliquam
                recusandae quaerat repellendus fugiat voluptates laborum
                dolores, facere eveniet impedit sit. Asperiores, distinctio?"
            />

            {/* <input type="month" onChange={handleDisplayMonth} /> */}

            <ProfileInfoAddCard
              cardHeadingIcon={
                <PiBagFill
                  className={
                    profilePageAllContent
                      ? "me-4 brand-color fs-4"
                      : "me-4  fs-4 placeholder rounded-2"
                  }
                />
              }
              cardHeading="Experience"
              data={experienceDataArray}
              handleEditExperience={handleEditExperience}
              profilePageAllContent={profilePageAllContent}
              displayMonth={displayMonth}
            />

            <ProfileInfoAddCard
              cardHeadingIcon={
                <FaGraduationCap
                  className={
                    profilePageAllContent
                      ? "me-4 brand-color fs-4"
                      : "me-4  fs-4 placeholder rounded-2"
                  }
                />
              }
              cardHeading="Education"
              data={educationDataArray}
              handleEditEducation={handleEditEducation}
              profilePageAllContent={profilePageAllContent}
              displayMonth={displayMonth}
            />

            {/* <div className="card mt-3 border-0 shadow-sm rounded-4">
              <div className="card-body">
                <div className="d-flex justify-content-between ms-1">
                  <label className="profile-side-headers d-flex align-items-center">
                    <FaGraduationCap className="me-4 brand-color" />
                    <span>Education</span>
                  </label>
                  <div>
                    <button type="button" title="Add Education" className="btn btn-brand-color px-3 me-2" data-bs-toggle="modal" data-bs-target="#addEducationModal">
                      <MdAddBox /> Add Education
                    </button>
                  </div>
                </div>
                <div className="ms-5">
                  <div className="d-flex justify-content-between  mt-3">
                    <label className="profile-inner-headers">Los Angels</label>
                    <MdModeEditOutline className="icon edit-icon fs-4 brand-color" title="Edit Education" data-bs-toggle="modal" data-bs-target="#editEducationModal" />
                  </div>


                  <label className="profile-descriptions">
                    <IoCalendarOutline /> Oct 2012 - Sep 2015
                    <div className="vr ms-3"></div>
                    <span>
                      <IoLocationOutline /> Los Angels
                    </span>
                  </label>
                  <p className="mt-1 profile-descriptions">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolor, recusandae iste quos placeat enim cum facere
                    accusantium nemo deserunt voluptas quisquam doloremque
                    officiis. Adipisci, odio!
                  </p>


                </div>
              </div>
            </div> */}

            <div className="card mt-3 border-0 shadow-sm rounded-4">
              <div className="card-body">
                <div className="d-flex justify-content-between ms-1">
                  <label className="profile-side-headers d-flex align-items-center placeholder-glow">
                    <HiLightBulb
                      className={
                        profilePageAllContent
                          ? "me-4 brand-color fs-4"
                          : "me-4  fs-3 placeholder rounded-2"
                      }
                    />
                    <span
                      className={
                        profilePageAllContent
                          ? ""
                          : "placeholder px-3 w-100 py-1  rounded-1"
                      }
                    >
                      Skills
                    </span>
                  </label>
                  <div>
                    {skillsKnown.length > 0 ? (
                      <div className="d-flex gap-2">

                        <button
                          type="button"
                          title="Edit Skill"
                          className={
                            profilePageAllContent
                              ? "btn btn-outline-brand-color px-3 d-flex align-items-center gap-2"
                              : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"
                          }
                          data-bs-toggle="modal"
                          data-bs-target="#editSkillModalBox "
                          onClick={() => {
                            setSkillsObj({
                              ...skillsObj,
                              skillName: "",
                              skillLevel: "",
                            });
                          }}
                        >
                          <MdModeEditOutline /> Edit
                        </button>
                        <button
                          type="button"
                          title="Add Skill"
                          className={
                            profilePageAllContent
                              ? "btn btn-brand-color px-3 d-flex align-items-center gap-2"
                              : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"
                          }
                          data-bs-toggle="modal"
                          data-bs-target="#addSkillModal "
                        >
                          <MdAddBox /> Add
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        title="Add Skill"
                        className={
                          profilePageAllContent
                            ? "btn btn-brand-color px-3 d-flex align-items-center gap-2"
                            : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"
                        }
                        data-bs-toggle="modal"
                        data-bs-target="#addSkillModal "
                      >
                        <MdAddBox /> Add
                      </button>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="row row-cols-auto ms-5 g-3 profile-descriptions mt-3">
                    {skillsKnown.length === 0 ? (
                      <p
                        className={
                          profilePageAllContent
                            ? "mt-0 word-space-content px-0"
                            : "placeholder px-3 py-2 mt-0 rounded-1"
                        }
                      >
                        Your skills will be displayed here
                      </p>
                    ) : (
                      skillsKnown.map((skill, index) => {
                        return (
                          <React.Fragment key={skill.id}>
                            <div className="col mt-0">
                              <div className="border rounded-2 p-2 fw-bold mb-3">
                                {skill.skill_name} -{" "}
                                <span className="fw-normal">
                                  {skill.skill_level}
                                </span>
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      })
                    )}
                  </div>
                  {/* <div className="flex-shrink-0 pt-2">
                      {skillsKnown.length === 0 ? null : <MdModeEditOutline className="icon edit-icon fs-5 brand-color" title="Edit Skill" data-bs-toggle="modal" data-bs-target="#editSkillModalBox " onClick={() => { setSkillsObj({ ...skillsObj, skillName: '', skillLevel: '' }) }} />}
                    </div> */}
                </div>

                <br />
              </div>
            </div>

            <ProfileInfoEditCard
              placeholder="Share with potential employers about your job preferences"
              content={preferenceContent}
              EditIcon={preferenceEditIcon}
              handleTextAreaChange={handlePreferenceChange}
              cardHeadingIcon={
                <MdAppRegistration
                  className={
                    profilePageAllContent
                      ? "me-4 brand-color fs-4"
                      : "me-4  fs-4 placeholder rounded-2"
                  }
                />
              }
              cardHeading="Preference"
              cardSaveIcon={
                <MdSave
                  className={`icon edit-icon fs-3 ${preferenceContent.trim() === ""
                      ? "text-muted"
                      : "brand-color"
                    }`}
                  title="Save Preference"
                  onClick={(e) => handlePreferenceEditOrSaveIcon(e,"Save")}
                />
              }
              cardEditIcon={
                <MdModeEditOutline
                  className={
                    profilePageAllContent
                      ? "icon edit-icon fs-4 brand-color"
                      : "icon edit-icon fs-4 placeholder rounded-2 text-dark"
                  }
                  title="Edit Preference"
                  onClick={(e) => handlePreferenceEditOrSaveIcon(e, "Edit")}
                />
              }
              cardDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deserunt a ipsum vitae assumenda iure sequi? Dicta saepe
                  asperiores blanditiis natus quo repellat, eius, soluta sed
                  architecto accusantium eum veritatis at voluptas rem odit
                  corrupti earum! Minima itaque sunt a quos culpa laudantium
                  totam reiciendis. Laudantium quae aspernatur quas cupiditate
                  debitis expedita placeat iusto esse culpa tenetur aliquam
                  recusandae quaerat repellendus fugiat voluptates laborum
                  dolores, facere eveniet impedit sit. Asperiores, distinctio?"
              profilePageAllContent={profilePageAllContent}
            />

            <div className="row mt-2 g-3 placeholder-glow">
              <div className="col-12 col-md-6 mb-3 mb-sm-0">
                <div className="card h-100 border-0 shadow-sm rounded-4 ">
                  <div className="card-body">
                    <div className={`d-flex justify-content-between ms-1 ${videoFullyUploaded || uploadedVideoFile.includes('.mp4') ? "mb-2" : ""}`}>
                      <label className="profile-side-headers d-flex align-items-center">
                        <RiVideoFill
                          className={
                            profilePageAllContent
                              ? "me-4 brand-color fs-3"
                              : "me-4 fs-1 placeholder rounded-2"
                          }
                        />
                        <span
                          className={
                            profilePageAllContent
                              ? ""
                              : "placeholder px-3 w-100 py-1  rounded-1"
                          }
                        >
                          Video
                        </span>
                      </label>
                      <div>
                        {videoFullyUploaded === true || uploadedVideoFile.includes(".mp4") ? (
                          <div className="d-flex gap-3">
                            <button
                              type="button"
                              title="Delete video"
                              className={
                                profilePageAllContent
                                  ? "btn btn-outline-brand-color px-3 d-flex align-items-center gap-2"
                                  : "btn  px-3 d-flex align-items-center gap-2 placeholder rounded-2"
                              }
                              data-bs-toggle="modal"
                              data-bs-target="#deleteVideoModal"
                              disabled={videoUploading === true ? "disabled" : ""}
                            >
                              <MdDelete />
                            </button>
                            <button
                              type="button"
                              className={
                                profilePageAllContent
                                  ? "btn  btn-brand-color px-3 d-flex align-items-center gap-2"
                                  : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"
                              }
                              data-bs-toggle="modal"
                              data-bs-target="#videoUploadModal"
                              disabled={videoUploading === true ? "disabled" : ""}
                            >
                              <MdAddBox /> Upload
                            </button>


                          </div>
                        ) : (
                          <button
                            type="button"
                            className={
                              profilePageAllContent
                                ? "btn btn-brand-color px-3 d-flex align-items-center gap-2"
                                : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"
                            }
                            data-bs-toggle="modal"
                            data-bs-target="#videoUploadModal"
                            disabled={videoUploading === true ? "disabled" : ""}
                          >
                            <MdAddBox /> Upload video
                          </button>
                        )}
                      </div>
                    </div>

                    {
                      videoUploadedPlaceholder === true && !uploadedVideoFile.includes('.mp4') ?
                        <div
                          className={
                            profilePageAllContent
                              ? "mt-3 d-flex justify-content-center align-items-center h-75 p-5 pt-3 text-grey"
                              : "mt-3 d-flex justify-content-center align-items-center h-75 p-5 pt-3 text-grey placeholder mb-5 ms-5 rounded-2"
                          }
                        >
                          Share a video introducing more about yourself, your
                          experiences, and anything else that might not come
                          across as effectively in writing. Please refrain from
                          sharing any content that incites violence or spreads
                          hate against individuals or groups.
                        </div> :

                        videoUploading === true || videoDeletingLoading === true ? <div
                          className={
                            profilePageAllContent
                              ? "mt-3 d-flex justify-content-center align-items-center h-75 p-5 pt-3 text-grey"
                              : "mt-3 d-flex justify-content-center align-items-center h-75 p-5 pt-3 text-grey placeholder mb-5 ms-5 rounded-2"
                          }
                        >
                          <div className="d-flex justify-content-center align-items-center h-100">
                            <div
                              className="spinner-border brand-color"
                              role="status"
                            >
                              <span className="visually-hidden ">
                                Loading...
                              </span>
                            </div>
                          </div>
                        </div> :
                          <div className="d-flex justify-content-center mb-4">
                            <VideoPlayer
                              uploadedVideoFile={uploadedVideoFile}
                              isVideoUploaded={isVideoUploaded}
                            />
                          </div>

                    }


                    {/* {uploadedVideoFile.length > 0 ? (
                      <div className="p-3 d-flex justify-content-center mt-3 ">
                        {videoUploading ? (
                          <div
                            className={
                              profilePageAllContent
                                ? "mt-3 d-flex justify-content-center align-items-center h-75 p-5 pt-3 text-grey"
                                : "mt-3 d-flex justify-content-center align-items-center h-75 p-5 pt-3 text-grey placeholder mb-5 ms-5 rounded-2"
                            }
                          >
                            <div className="d-flex justify-content-center align-items-center h-100">
                              <div
                                className="spinner-border brand-color"
                                role="status"
                              >
                                <span className="visually-hidden ">
                                  Loading...
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <VideoPlayer
                            uploadedVideoFile={uploadedVideoFile}
                            isVideoUploaded={isVideoUploaded}
                          />
                        )}
                      </div>
                    ) : (
                      <div
                        className={
                          profilePageAllContent
                            ? "mt-3 d-flex justify-content-center align-items-center h-75 p-5 pt-3 text-grey"
                            : "mt-3 d-flex justify-content-center align-items-center h-75 p-5 pt-3 text-grey placeholder mb-5 ms-5 rounded-2"
                        }
                      >
                        Share a video introducing more about yourself, your
                        experiences, and anything else that might not come
                        across as effectively in writing. Please refrain from
                        sharing any content that incites violence or spreads
                        hate against individuals or groups.
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
              <div className="col col-md-6 placeholder-glow">
                <div className="card h-100 border-0 shadow-sm rounded-4">
                  <div className="card-body">
                    <div className="d-flex justify-content-between ms-1">
                      <label className="profile-side-headers d-flex align-items-center">
                        <IoLanguage
                          className={
                            profilePageAllContent
                              ? "me-4 brand-color fs-4"
                              : "me-4 fs-4 placeholder rounded-2"
                          }
                        />
                        <span
                          className={
                            profilePageAllContent
                              ? ""
                              : "placeholder px-3 w-100 py-1  rounded-1"
                          }
                        >
                          Languages
                        </span>
                      </label>
                      <div>
                        {languagesKnown.length > 0 ? (
                          <div className="d-flex gap-2">
                            <button
                              type="button"
                              className={
                                profilePageAllContent
                                  ? "btn btn-outline-brand-color px-3 d-flex align-items-center gap-2"
                                  : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"
                              }
                              title="Edit Languages"
                              data-bs-toggle="modal"
                              data-bs-target="#editLanguageModalBox"
                            >
                              <MdModeEditOutline /> Edit
                            </button>
                            <button
                              type="button"
                              className={
                                profilePageAllContent
                                  ? "btn btn-brand-color px-3 d-flex align-items-center gap-2"
                                  : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"
                              }
                              data-bs-toggle="modal"
                              data-bs-target="#addLanguageModal"
                            >
                              <MdAddBox /> Add
                            </button>

                          </div>
                        ) : (
                          <button
                            type="button"
                            className={
                              profilePageAllContent
                                ? "btn btn-brand-color px-3 d-flex align-items-center gap-2"
                                : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"
                            }
                            data-bs-toggle="modal"
                            data-bs-target="#addLanguageModal"
                          >
                            <MdAddBox /> Add
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="ms-5 mt-3 ">
                      {languagesKnown.length === 0 ? (
                        <p
                          className={
                            profilePageAllContent
                              ? "mt-1 profile-descriptions"
                              : "mt-1 profile-descriptions placeholder rounded-2"
                          }
                        >
                          Looking to make your profile stand out? Don't forget
                          to add your language skills!
                        </p>
                      ) : (
                        languagesKnown.map((language) => {
                          return (
                            <React.Fragment key={language.id}>
                              <div className="d-flex justify-content-between">
                                <label className="profile-inner-headers">
                                  {language.language_known}
                                </label>
                                {/* <MdModeEditOutline className="icon edit-icon fs-4 brand-color" title="Edit Language" data-bs-toggle="modal" data-bs-target="#editLanguageModalBox" onClick={() => handleEditLanguageModalBoxClick(language.id)} /> */}
                              </div>
                              <p className="mt-1 profile-descriptions">
                                {language.language_level}
                              </p>
                              <hr />
                            </React.Fragment>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-3 border-0 shadow-sm rounded-4 placeholder-glow">
              <div className="card-body ">
                <div className="d-flex justify-content-between ms-1">
                  <label className="profile-side-headers d-flex align-items-center">
                    <MdAddToPhotos
                      className={
                        profilePageAllContent
                          ? "me-4 brand-color fs-4"
                          : "me-4 fs-4 placeholder rounded-2"
                      }
                    />
                    <span
                      className={
                        profilePageAllContent
                          ? ""
                          : "placeholder px-3 w-100 py-1  rounded-1"
                      }
                    >
                      Additional Information
                    </span>
                  </label>

                  <button
                    type="button"
                    title="Add Additional Information"
                    className={
                      profilePageAllContent
                        ? "btn btn-brand-color px-3 d-flex align-items-center gap-2"
                        : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"
                    }
                    data-bs-toggle="modal"
                    data-bs-target="#additionalInformationModal"
                  >
                    <MdAddBox /> Add
                  </button>

                  {/* <MdModeEditOutline className="icon edit-icon fs-4 brand-color" title="Edit Information" data-bs-toggle="modal" data-bs-target="#additionalInformationModal" /> */}
                </div>

                <div className="ms-5 mt-3">
                  {/* <ul className="mt-1 profile-descriptions">
                    <p>{additionalInformation}</p>
                  </ul> */}

                  {additionalInformationData.length === 0 ? (
                    <p
                      className={
                        profilePageAllContent
                          ? "text-grey"
                          : "text-grey placeholder rounded-2"
                      }
                    >
                      Add other information such as board positions,
                      volunteering roles, certifications, awards, etc.
                    </p>
                  ) : (
                    additionalInformationData.map((info, index) => {
                      return (
                        <React.Fragment key={index}>
                          <div className="additional-information">
                            <div className="d-flex justify-content-between ">
                              <label className="profile-inner-headers ">
                                {info.title}
                              </label>
                              <MdModeEditOutline
                                className="icon edit-icon fs-4 brand-color"
                                title="Edit additional information"
                                data-bs-toggle="modal"
                                data-bs-target="#editInformationModal"
                                onClick={(e) =>
                                  handleAdditionalInformationEdit(e, info.id)
                                }
                              />
                            </div>
                            <ul className="mt-1 profile-descriptions">
                              <li>{info.description}</li>
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            <div className="card mt-3 border-0 shadow-sm rounded-4 placeholder-glow">
              <div className="card-body">
                {/* <div className="d-flex  profile-side-headers align-items-center">
                  <div className="flex-grow-1">
                    <label className="profile-side-headers">
                      <IoShareSocialSharp className="me-4 brand-color" />
                      <span>Social Media Links</span>
                    </label>
                  </div>
                  <div className="">
                    <button type="button" title="Add Social Link" className="btn btn-brand-color px-3 ms-5" data-bs-toggle="modal" data-bs-target="#addSocialLinkModal"  >
                      <MdAddBox /> Add
                    </button>
                  </div>
                </div> */}
                <div className="d-flex justify-content-between ms-1">
                  <label className="profile-side-headers d-flex align-items-center">
                    <IoShareSocialSharp
                      className={
                        profilePageAllContent
                          ? "me-4 brand-color fs-4"
                          : "me-4 fs-4 placeholder rounded-2"
                      }
                    />
                    <span
                      className={
                        profilePageAllContent
                          ? ""
                          : "placeholder px-3 w-100 py-1  rounded-1"
                      }
                    >
                      Social Media Links
                    </span>
                  </label>

                  <button
                    type="button"
                    title="Add Media Social Link"
                    className={
                      profilePageAllContent
                        ? "btn btn-brand-color px-3 d-flex align-items-center gap-2"
                        : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"
                    }
                    data-bs-toggle="modal"
                    data-bs-target="#addSocialLinkModal"
                  >
                    <MdAddBox /> Add
                  </button>

                  {/* <MdModeEditOutline className="icon edit-icon fs-4 brand-color" title="Edit Information" data-bs-toggle="modal" data-bs-target="#additionalInformationModal" /> */}
                </div>
                <div className="ms-3 mt-3">
                  <ul className="mt-1 profile-descriptions social-media-links">
                    {socialMediaArray.length === 0 ? (
                      <p
                        className={
                          profilePageAllContent ? "" : "placeholder rounded-2"
                        }
                      >
                        Provide links to your social media accounts such as
                        LinkedIn, X, etc. Please refrain from sharing any
                        content that incites violence or spreads hate against
                        individuals or groups.
                      </p>
                    ) : (
                      socialMediaArray.map((socialMedia, index) => {
                        return (
                          <React.Fragment key={index}>
                            <div className="d-flex justify-content-between align-items-start">
                              <label className="profile-inner-headers d-block">
                                {socialMedia.title}
                              </label>
                              <button
                                type="button"
                                title="Edit Media Social Link"
                                className={
                                  profilePageAllContent
                                    ? "btn btn-outline-brand-color px-3 d-flex align-items-center gap-2"
                                    : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"
                                }
                                data-bs-toggle="modal"
                                data-bs-target="#editSocialLinkModal"
                                onClick={(e) =>
                                  handleEditSocialMedia(e, socialMedia.id)
                                }
                              >
                                <MdModeEditOutline /> Edit
                              </button>
                            </div>
                            <p className="mt-1 profile-descriptions d-flex justify-content-between">
                              <a
                                className="social-media-url-link d-inline-block w-75"
                                href={(socialMedia.url).includes("https://") ? socialMedia.url : `https://${socialMedia.url}`}
                                target="_blank"
                              >
                                {socialMedia.url}
                              </a>
                              {/* <MdModeEditOutline
                                className="icon edit-icon fs-4 brand-color"
                                title="Edit Social Link"
                                data-bs-toggle="modal"
                                data-bs-target="#editSocialLinkModal"
                                onClick={(e) =>
                                  handleEditSocialMedia(e, socialMedia.id)
                                }
                              /> */}

                            </p>
                            <hr />
                          </React.Fragment>
                        );
                      })
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="card mt-3 border-0 shadow-sm rounded-4 position-relative">
              <div className="card-body">
                <div className="d-flex justify-content-between ms-1">
                  <label className="profile-side-headers d-flex align-items-center">
                    <RiNotificationBadgeFill
                      className={
                        profilePageAllContent
                          ? "me-4 brand-color fs-4"
                          : "me-4 fs-4 placeholder rounded-2"
                      }
                    />
                    <span
                      className={
                        profilePageAllContent
                          ? ""
                          : "placeholder px-3 w-100 py-1  rounded-1"
                      }
                    >
                      Expert Notes
                    </span>
                  </label>
                </div>
                <div
                  className={
                    profilePageAllContent
                      ? "premium-account-feauture-container position-absolute top-0 end-0 d-flex align-items-center p-2 me-3 rounded-2"
                      : "premium-account-feauture-container position-absolute top-0 end-0 d-flex align-items-center p-2 me-3 placeholder rounded-2"
                  }
                >
                  <MdWorkspacePremium
                    className={
                      profilePageAllContent
                        ? "brand-color fs-3 me-1"
                        : "placeholder fs-3 me-1"
                    }
                  />
                  <span
                    className={
                      profilePageAllContent ? "brand-color" : "placeholder"
                    }
                  >
                    Premium
                  </span>
                </div>
                {/* <p className="ms-5 mt-3 profile-descriptions">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deserunt a ipsum vitae assumenda iure sequi? Dicta saepe
                  asperiores blanditiis natus quo repellat, eius, soluta sed
                  architecto accusantium eum veritatis at voluptas rem odit
                  corrupti earum! Minima itaque sunt a quos culpa laudantium
                  totam reiciendis. Laudantium quae aspernatur quas cupiditate
                  debitis expedita placeat iusto esse culpa tenetur aliquam
                  recusandae quaerat repellendus fugiat voluptates laborum
                  dolores, facere eveniet impedit sit. Asperiores, distinctio?
                </p> */}
                <p
                  className={
                    profilePageAllContent
                      ? "ms-5 mt-3 profile-descriptions opacity-50"
                      : "ms-5 mt-3 profile-descriptions placeholder rounded-2"
                  }
                >
                  {expertNotes}
                </p>
                <div className="form-check ms-5 mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className={
                      profilePageAllContent
                        ? "form-check-label consent"
                        : "form-check-label placeholder rounded-2"
                    }
                    htmlFor="flexCheckDefault"
                  >
                    I provide consent to 2nd Careers to market the expert notes
                    and my profile to potential employees
                  </label>
                </div>
                <button
                  className={
                    profilePageAllContent
                      ? "btn btn-brand-color mt-3 ms-5"
                      : "btn mt-3 ms-5 placeholder rounded-2"
                  }
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Photo upload Modal */}

        <div
          className="modal fade"
          id="profilePhotoModal"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                  Profile Photo Upload
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="card border-0 h-100 rounded-4">
                  <div className="card-body d-flex align-items-center justify-content-center">
                    <div className="w-100">
                      <div className="text-center position-relative">
                        <img
                          src={profilePicture}
                          className="avatar-xxl rounded-circle"
                          alt=""
                          width={150}
                          height={150}
                        />
                      </div>
                      <div className="text-center pt-4">
                        <button
                          type="button"
                          htmlFor="fileInput"
                          className="btn btn-brand-color mx-3 upload-btn"
                          data-bs-dismiss="modal"
                          onClick={() =>
                            document.getElementById("profile-photo").click()
                          }
                        >
                          {/* <HiOutlineUpload className="me-2 fs-4" /> */}

                          {/* <form action="/file_upload" method="POST" encType="multipart/form-data">
                              <input type="file" name="profile_pic" id="profile-photo"  className="form-control" onChange={handleProfilePhotoUpload} />
                              <input type="submit"  />
                            </form> */}

                          <input
                            type="file"
                            name="profile_pic"
                            id="profile-photo"
                            hidden
                            className="form-control"
                            onChange={handleProfilePhotoUpload}
                          />

                          <span>Upload Photo</span>
                        </button>
                        {
                          isProfilePictureUploaded === true ?
                            <button
                              type="button"
                              className={`btn btn-outline-secondary profile-picture-delete-button`}
                              data-bs-toggle="modal"
                              data-bs-target="#deletePhotoModal"
                            >
                              {/* <MdDelete className="me-2 fs-4" /> */}
                              <span>Delete Photo</span>
                            </button> : null
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="deletePhotoModal"
          aria-hidden="true"
          aria-labelledby="deletePhotoModal"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deletePhotoModal">
                  Delete Profile Photo
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  id="deleteProfilePhotoModalConfirmationModal"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center pb-4">
                Are you sure you want to delete this photo?
                <div className="text-center pt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >
                    {/* <ImCancelCircle className="me-2 fs-4" /> */}

                    <span>Cancel</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-brand-color mx-3 upload-btn"
                  >
                    {/* <MdDelete className="me-2 fs-4" /> */}
                    <label
                      className="custom-file-label upload-btn"
                      onClick={handleDeleteProfilePicture}
                    >
                      Delete
                    </label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Modal */}

        <div
          className="modal fade"
          id="editAbout"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  About
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row mb-2 mt-3">
                    <div className="col-lg-12 d-flex justify-content-between">
                      <div>Description</div>
                      <div></div>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row">
                      <textarea
                        className="p-3 rounded-3"
                        rows={15}
                        placeholder="Enter your text here.."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="container">
                  <button
                    type="button"
                    className="btn btn-brand-color w-100 my-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resume upload confirmation Modal */}

        <div
          className="modal fade"
          id="resumeUploadConfirmationModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1
                  className="modal-title  fs-5 d-flex align-items-center"
                  id="staticBackdropLabel"
                >
                  <IoIosInformationCircleOutline className="fs-1 brand-color me-3" />
                  Resume Upload Confirmation
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body border-bottom-0">
                <div className="container">
                  <div className="card">
                    <div className="card-body p-4 ">
                      <p className="text-justify mb-5">
                        After uploading the resume, the contents of all fields
                        will be replaced with the content from the resume
                      </p>
                      <p>
                        <span className="brand-color">Note :</span> If you have
                        issues uploading your resume, please try with a
                        different browser
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer  border-top-0 me-2">
                <button
                  type="submit"
                  className="btn btn-brand-color px-3"
                  onClick={handleUploadResumeClick}
                >
                  Upload Resume
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary mx-2 my-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="modal fade" id="deleteExperienceModal" aria-hidden="true" aria-labelledby="deleteExperienceModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deleteExperienceModal">Delete Experience</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-center pb-4">
                Are you sure to delete this experience?
                <div className="text-center pt-4">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">

                    <span>Cancel</span>
                  </button>
                  <button type="button" className="btn btn-brand-color mx-3 upload-btn" data-bs-dismiss="modal">
                    <label className="custom-file-label upload-btn" onClick={(e) => handleDeleteExperience(e, editExperienceData.id)}>Delete</label>
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* New Resume upload confirmation Modal */}

        <div
          className="modal fade"
          id="newResumeUploadConfirmationModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1
                  className="modal-title fs-5 d-flex align-items-center"
                  id="staticBackdropLabel"
                >
                  <IoIosInformationCircleOutline className="fs-1 brand-color me-3" />
                  New Resume Upload Confirmation
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body border-bottom-0">
                <div className="container">
                  <div className="card">
                    <div className="card-body">
                      <p className="mb-5">
                        Upon uploading the new resume, all fields will be
                        replaced with the content extracted from the new resume.
                      </p>
                      <p>
                        <span className="brand-color">Note :</span> If you have
                        issues uploading your resume, please try with a
                        different browser
                      </p>
                      <input
                        type="file"
                        className="form-control"
                        id="input-file2"
                        hidden
                        accept=".doc, .docx,.pdf"
                        onChange={handleResumeUpload}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer  border-top-0 me-2">
                <button
                  type="submit"
                  className="btn btn-brand-color px-3"
                  data-bs-dismiss="modal"
                  onClick={handleUploadNewResumeClick}
                >
                  Upload New Resume
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary mx-2 my-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="modal fade" id="deleteExperienceModal" aria-hidden="true" aria-labelledby="deleteExperienceModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deleteExperienceModal">Delete Experience</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-center pb-4">
                Are you sure to delete this experience?
                <div className="text-center pt-4">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">

                    <span>Cancel</span>
                  </button>
                  <button type="button" className="btn btn-brand-color mx-3 upload-btn" data-bs-dismiss="modal">
                    <label className="custom-file-label upload-btn" onClick={(e) => handleDeleteExperience(e, editExperienceData.id)}>Delete</label>
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Resume delete confirmation Modal */}

        <div
          className="modal fade"
          id="deleteResumeModal"
          aria-hidden="true"
          aria-labelledby="deleteResumeModal"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deleteResumeModal">
                  Delete Resume
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center pb-4">
                Are you sure to delete this resume?
                <div className="text-center pt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >
                    <span>Cancel</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-brand-color mx-3 upload-btn"
                    data-bs-dismiss="modal"
                  >
                    <label
                      className="custom-file-label upload-btn"
                      onClick={(e) => handleResumeDelete(e)}
                    >
                      Delete
                    </label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Experience Modal */}

        <div
          className="modal fade"
          id="addExperienceModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Add Experience
                </h1>
                <button
                  type="button"
                  id="addExperienceClose"
                  className="btn-close"
                  onClick={() =>
                    setExperienceInputs({
                      jobTitle: "",
                      companyName: "",
                      location: "",
                      startMonthAndYear: "",
                      endMonthAndYear: "",
                      experienceDescription: "",
                    })
                  }
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body border-bottom-0">
                <div className="container">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="jobTitle" className="form-label">
                        Job Title
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        name="jobTitle"
                        id="jobTitle"
                        aria-describedby="jobTitle"
                        placeholder="Enter your job"
                        value={experienceInputs.jobTitle}
                        onChange={handleExperienceInputs}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="companyName" className="form-label">
                        Company Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="companyName"
                        id="companyName"
                        aria-describedby="companyName"
                        placeholder="Enter your company name"
                        value={experienceInputs.companyName}
                        onChange={handleExperienceInputs}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="location" className="form-label">
                        Location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        id="location"
                        aria-describedby="location"
                        placeholder="Enter your location"
                        value={experienceInputs.location}
                        onChange={handleExperienceInputs}
                      />
                    </div>
                    <div className="row justify-content-between mb-3">
                      <div className="col-lg-6">
                        <label
                          htmlFor="startMonthAndYear"
                          className="form-label"
                        >
                          Start Month & Year
                        </label>
                        <input
                          type="month"
                          className="form-control"
                          name="startMonthAndYear"
                          id="startMonthAndYear"
                          max={maxMonth}
                          aria-describedby="start-month-and-year"
                          value={experienceInputs.startMonthAndYear}
                          onChange={handleExperienceInputs}
                        />
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="endMonthAndYear" className="form-label">
                          End Month & Year
                        </label>
                        <input
                          type="month"
                          className="form-control"
                          name="endMonthAndYear"
                          id="endMonthAndYear"
                          min={experienceInputs.startMonthAndYear}
                          max={maxMonth}
                          aria-describedby="end-month-and-year"
                          value={experienceInputs.endMonthAndYear}
                          onChange={handleExperienceInputs}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="container pe-0">
                        <div className="row mb-2 ">
                          <div className="col-lg-12 d-flex justify-content-between">
                            <div>Description (Optional)</div>
                            <div></div>
                          </div>
                        </div>
                        <div className="container">
                          <div className="row">
                            <textarea
                              className="p-3 rounded-3"
                              name="experienceDescription"
                              required
                              minLength="30"
                              maxLength="3000"
                              rows={5}
                              placeholder="Enter your text here.."
                              value={experienceInputs.experienceDescription}
                              onChange={handleExperienceInputs}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer border-top-0">
                <div className="container">
                  <div className="row float-end">
                    {/* <div className="col-lg-7">
                      <button type="button" className="btn btn-brand-color mx-2 my-2">Delete Experience</button>
                    </div> */}
                    <div className="col-lg-12 ">
                      <button
                        type="submit"
                        className="btn btn-brand-color my-2 mx-2 px-3"
                        onClick={(e) =>
                          handleAddExperience(e, "Save & Add another")
                        }
                      >
                        Save & Add another
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary my-2 px-3"
                        onClick={(e) => handleAddExperience(e, "Save")}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Experience Modal */}

        <div
          className="modal fade"
          id="editExperienceModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Edit Experience
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  id="updateExperienceClose"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body border-bottom-0">
                <div className="container">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="jobTitle" className="form-label">
                        Job Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="jobTitle"
                        id="jobTitle"
                        aria-describedby="jobTitle"
                        placeholder="Enter your job"
                        value={editExperienceData.jobTitle}
                        onChange={(e) => handleEditExperienceInputs(e)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="companyName" className="form-label">
                        Company Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="companyName"
                        id="companyName"
                        aria-describedby="companyName"
                        placeholder="Enter your company name"
                        value={editExperienceData.companyName}
                        onChange={(e) => handleEditExperienceInputs(e)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="location" className="form-label">
                        Location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        id="location"
                        aria-describedby="location"
                        placeholder="Enter your location"
                        value={editExperienceData.location}
                        onChange={(e) => handleEditExperienceInputs(e)}
                      />
                    </div>
                    <div className="row justify-content-between mb-3">
                      <div className="col-lg-6">
                        <label
                          htmlFor="startMonthAndYear"
                          className="form-label"
                        >
                          Start Month & Year
                        </label>
                        <input
                          type="month"
                          className="form-control "
                          name="startMonthAndYear"
                          id="startMonthAndYear"
                          max={maxMonth}
                          aria-describedby="start-month-and-year"
                          value={editExperienceData.startMonthAndYear}
                          onChange={(e) => handleEditExperienceInputs(e)}
                        />
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="endMonthAndYear" className="form-label">
                          End Month & Year
                        </label>
                        <input
                          type="month"
                          className="form-control "
                          name="endMonthAndYear"
                          id="endMonthAndYear"
                          max={maxMonth}
                          aria-describedby="end-month-and-year"
                          value={editExperienceData.endMonthAndYear}
                          onChange={(e) => handleEditExperienceInputs(e)}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="container pe-0">
                        <div className="row mb-2 ">
                          <div className="col-lg-12 d-flex justify-content-between ">
                            <div>Description</div>
                            <div></div>
                          </div>
                        </div>
                        <div className="container">
                          <div className="row">
                            <textarea
                              className="p-3 rounded-3"
                              name="experienceDescription"
                              required
                              minLength="30"
                              maxLength="10000"
                              rows={5}
                              placeholder="Enter your text here.."
                              value={editExperienceData.experienceDescription}
                              onChange={(e) => handleEditExperienceInputs(e)}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer  border-top-0 me-2">
                <button
                  type="submit"
                  className="btn btn-brand-color px-3"
                  onClick={(e) =>
                    handleUpdateExperience(e, editExperienceData.id, "Save")
                  }
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary mx-2 my-2"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteExperienceModal"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="deleteExperienceModal"
          aria-hidden="true"
          aria-labelledby="deleteExperienceModal"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deleteExperienceModal">
                  Delete Experience
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center pb-4">
                Are you sure you want to delete this information?
                <div className="text-center pt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >
                    {/* <ImCancelCircle className="me-2 fs-4" /> */}

                    <span>Cancel</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-brand-color mx-3 upload-btn"
                    data-bs-dismiss="modal"
                  >
                    {/* <MdDelete className="me-2 fs-4" /> */}
                    <label
                      className="custom-file-label upload-btn"
                      onClick={(e) =>
                        handleDeleteExperience(e, editExperienceData.id)
                      }
                    >
                      Delete
                    </label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Education Modal */}

        <div
          className="modal fade"
          id="addEducationModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Add Education
                </h1>
                <button
                  type="button"
                  id="addEducationClose"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={() =>
                    setEducationInputs({
                      degree: "",
                      fieldOfStudy: "",
                      institution: "",
                      instituteLocation: "",
                      educationStartMonthAndYear: "",
                      educationEndMonthAndYear: "",
                    })
                  }
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body border-bottom-0">
                <div className="container">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="degree" className="form-label">
                        Degree
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        name="degree"
                        id="degree"
                        aria-describedby="degree"
                        placeholder="Enter your degree"
                        value={educationInputs.degree}
                        onChange={handleEducationInputs}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="fieldOfStudy" className="form-label">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        name="fieldOfStudy"
                        id="fieldOfStudy"
                        aria-describedby="fieldOfStudy"
                        placeholder="Enter your field of study"
                        value={educationInputs.fieldOfStudy}
                        onChange={handleEducationInputs}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="institution" className="form-label">
                        School
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="institution"
                        id="institution"
                        aria-describedby="institution"
                        placeholder="Enter your school name"
                        value={educationInputs.institution}
                        onChange={handleEducationInputs}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="instituteLocation" className="form-label">
                        Location
                      </label>
                      <input
                        // type="text"
                        className="form-control"
                        name="instituteLocation"
                        id="instituteLocation"
                        aria-describedby="instituteLocation"
                        placeholder="Enter your location"
                        value={educationInputs.instituteLocation}
                        onChange={handleEducationInputs}
                      />
                    </div>
                    <div className="row justify-content-between mb-3">
                      <div className="col-lg-6">
                        <label
                          htmlFor="educationStartMonthAndYear"
                          className="form-label"
                        >
                          Start Month & Year
                        </label>
                        <input
                          type="month"
                          className="form-control "
                          name="educationStartMonthAndYear"
                          id="educationStartMonthAndYear"
                          max={maxMonth}
                          aria-describedby="education-start-month-and-year"
                          value={educationInputs.educationStartMonthAndYear}
                          onChange={handleEducationInputs}
                        />
                      </div>
                      <div className="col-lg-6">
                        <label
                          htmlFor="educationEndMonthAndYear"
                          className="form-label"
                        >
                          End Month & Year
                        </label>
                        <input
                          type="month"
                          className="form-control"
                          name="educationEndMonthAndYear"
                          id="educationEndMonthAndYear"
                          min={educationInputs.educationStartMonthAndYear}
                          max={maxMonth}
                          aria-describedby="education-end-month-and-year"
                          value={educationInputs.educationEndMonthAndYear}
                          onChange={handleEducationInputs}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer border-top-0">
                <div className="container">
                  <div className="row float-end">
                    {/* <div className="col-lg-7">
                      <button type="button" className="btn btn-brand-color mx-2 my-2">Delete Education</button>
                    </div> */}
                    <div className="col-lg-12 ">
                      <button
                        type="button"
                        className="btn btn-brand-color my-2 mx-2 px-3"
                        onClick={(e) =>
                          handleAddEducation(e, "Save & Add another")
                        }
                      >
                        Save & Add another
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary my-2 px-3"
                        onClick={(e) => handleAddEducation(e, "Save")}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Education Modal */}

        <div
          className="modal fade"
          id="editEducationModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Edit Education
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  id="updateEducationClose"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body border-bottom-0">
                <div className="container">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="degree" className="form-label">
                        Degree
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        name="degree"
                        id="degree"
                        aria-describedby="degree"
                        placeholder="Enter your degree"
                        value={editEducationData.degree}
                        onChange={(e) => handleEditEducationInputs(e)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="fieldOfStudy" className="form-label">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        name="fieldOfStudy"
                        id="fieldOfStudy"
                        aria-describedby="fieldOfStudy"
                        placeholder="Enter your field of study"
                        value={editEducationData.fieldOfStudy}
                        onChange={(e) => handleEditEducationInputs(e)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="institution" className="form-label">
                        School
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="institution"
                        id="institution"
                        aria-describedby="institution"
                        placeholder="Enter your school name"
                        value={editEducationData.institution}
                        onChange={(e) => handleEditEducationInputs(e)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="instituteLocation" className="form-label">
                        Location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="instituteLocation"
                        id="instituteLocation"
                        aria-describedby="instituteLocation"
                        placeholder="Enter your location"
                        value={editEducationData.instituteLocation}
                        onChange={(e) => handleEditEducationInputs(e)}
                      />
                    </div>
                    <div className="row justify-content-between mb-3">
                      <div className="col-lg-6">
                        <label
                          htmlFor="educationStartMonthAndYear"
                          className="form-label"
                        >
                          Start Month & Year
                        </label>
                        <input
                          type="month"
                          className="form-control "
                          name="educationStartMonthAndYear"
                          id="educationStartMonthAndYear"
                          max={maxMonth}
                          aria-describedby="education-start-month-and-year"
                          value={editEducationData.educationStartMonthAndYear}
                          onChange={handleEditEducationInputs}
                        />
                      </div>
                      <div className="col-lg-6">
                        <label
                          htmlFor="educationEndMonthAndYear"
                          className="form-label"
                        >
                          End Month & Year
                        </label>
                        <input
                          type="month"
                          className="form-control"
                          name="educationEndMonthAndYear"
                          id="educationEndMonthAndYear"
                          min={editEducationData.educationStartMonthAndYear}
                          max={maxMonth}
                          aria-describedby="education-end-month-and-year"
                          value={editEducationData.educationEndMonthAndYear}
                          onChange={handleEditEducationInputs}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer  border-top-0 me-2">
                <button
                  type="submit"
                  className="btn btn-brand-color px-3"
                  onClick={(e) =>
                    handleUpdateEducation(e, editEducationData.id, "Save")
                  }
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary mx-2 my-2"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteEducationModal"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="deleteEducationModal"
          aria-hidden="true"
          aria-labelledby="deleteEducationModal"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deleteEducationModal">
                  Delete Education
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center pb-4">
                Are you sure you want to delete this information?
                <div className="text-center pt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >
                    {/* <ImCancelCircle className="me-2 fs-4" /> */}

                    <span>Cancel</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-brand-color mx-3 upload-btn"
                    data-bs-dismiss="modal"
                  >
                    {/* <MdDelete className="me-2 fs-4" /> */}
                    <label
                      className="custom-file-label upload-btn"
                      onClick={(e) =>
                        handleDeleteEducation(e, editEducationData.id)
                      }
                    >
                      Delete
                    </label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Skill Modal */}

        <div
          className="modal fade"
          id="addSkillModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Add Skill
                </h1>
                <button
                  type="button"
                  id="addSkillClose"
                  className="btn-close"
                  onClick={() =>
                    setSkillsObj({
                      skillName: "",
                      skillLevel: "",
                    })
                  }
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body border-bottom-0">
                <div className="container">
                  <form>
                    <div className="row justify-content-between mb-3 align-items-center">
                      <div className="col-lg-5">
                        <label className="form-label">Skill</label>
                        <div className="dropdown custom-dropdown">
                          <button
                            className="btn btn-secondary dropdown-toggle w-100"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {skillsObj.skillName === ""
                              ? "Select your Skill"
                              : skillsObj.skillName}
                          </button>
                          <ul className="dropdown-menu">
                            {skillsData.map((skill) => {
                              return (
                                <React.Fragment key={skill.id}>
                                  <li
                                    onClick={() =>
                                      handleSkillName(skill.skillName)
                                    }
                                  >
                                    <a className="dropdown-item">
                                      {skill.skillName}
                                    </a>
                                  </li>
                                </React.Fragment>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="dropdown custom-dropdown mt-3 mb-3">
                          <label className="form-label">Skill Level</label>
                          <button
                            className="btn btn-secondary dropdown-toggle w-100"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {skillsObj.skillLevel === ""
                              ? "Select your Skill Level"
                              : skillsObj.skillLevel}
                          </button>
                          <ul className="dropdown-menu">
                            <li onClick={() => handleSkillLevel("Beginner")}>
                              <a className="dropdown-item">Beginner</a>
                            </li>
                            <li
                              onClick={() => handleSkillLevel("Intermediate")}
                            >
                              <a className="dropdown-item">Intermediate</a>
                            </li>
                            <li onClick={() => handleSkillLevel("Advanced")}>
                              <a className="dropdown-item">Advanced</a>
                            </li>
                            <li onClick={() => handleSkillLevel("Expert")}>
                              <a className="dropdown-item">Expert</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-2 ">
                        <button
                          type="button"
                          className="btn btn-brand-color d-block ms-2 "
                          onClick={() =>
                            handleAddSkill(
                              skillsObj.skillName,
                              skillsObj.skillLevel
                            )
                          }
                        >
                          Add Skill
                        </button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="grade" className="form-label">
                        Skills
                      </label>
                      <table className="table">
                        <tbody>
                          {skillsKnown.length === 0 ? (
                            <>
                              <tr className="ms-3 d-block text-grey border p-3 rounded-1 mt-2">
                                <td className="border-0 text-grey">
                                  No skills found
                                </td>
                              </tr>
                            </>
                          ) : (
                            skillsKnown.map((skill, index) => {
                              return (
                                <React.Fragment key={skill.id}>
                                  <tr className="text-center">
                                    <td>{skill.skill_name}</td>
                                    <td>-</td>
                                    <td>{skill.skill_level}</td>
                                  </tr>
                                </React.Fragment>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer border-top-0">
                <div className="container">
                  <div className="row float-end">
                    {/* <div className="col-lg-7">
                      <button type="button" className="btn btn-brand-color mx-2 my-2">Delete Skill</button>
                    </div> */}
                    {/* <div className="col-lg-12 d-flex justify-content-between">
                        <button type="button" className="btn btn-brand-color my-2 ms-2 px-3" data-bs-dismiss="modal" onClick={handleSaveSkill}>Save</button>
                        <button type="button" className="btn btn-outline-secondary my-2 px-3">Save</button>
                      </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Skill Modal Box*/}
        <div
          className="modal fade"
          id="editSkillModalBox"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Edit Skill
                </h1>
                <button
                  type="button"
                  id="addSkillClose"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={() => setEditSkillClick(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body border-bottom-0">
                <div className="container">
                  <form>
                    <div className="row justify-content-between mb-3 align-items-center">
                      <div className="col-lg-5">
                        <label className="form-label">Skill</label>
                        <div className="dropdown custom-dropdown">
                          <button
                            className="btn btn-secondary dropdown-toggle w-100"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={
                              editSkillClick === false ? "disabled" : ""
                            }
                          >
                            {updatedSkillsObj.skillName === "" ||
                              editSkillClick === false
                              ? "Select your Skill"
                              : updatedSkillsObj.skillName}
                            {/* //  editSkillClick ?
                                // skillsObj.skillName === "hi" : ""} */}
                          </button>
                          <ul className="dropdown-menu">
                            {skillsData.map((skill) => {
                              return (
                                <React.Fragment key={skill.id}>
                                  <li
                                    onClick={() =>
                                      handleUpdatedSkillName(skill.skillName)
                                    }
                                  >
                                    <a className="dropdown-item">
                                      {skill.skillName}
                                    </a>
                                  </li>
                                </React.Fragment>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="dropdown custom-dropdown mt-3 mb-3">
                          <label className="form-label">Skill Level</label>
                          <button
                            className="btn btn-secondary dropdown-toggle w-100"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={
                              editSkillClick === false ? "disabled" : ""
                            }
                          >
                            {updatedSkillsObj.skillLevel === "" ||
                              editSkillClick === false
                              ? "Select your Skill Level"
                              : updatedSkillsObj.skillLevel}
                          </button>
                          <ul className="dropdown-menu">
                            <li
                              onClick={() =>
                                handleUpdatedSkillLevel("Beginner")
                              }
                            >
                              <a className="dropdown-item">Beginner</a>
                            </li>
                            <li
                              onClick={() =>
                                handleUpdatedSkillLevel("Intermediate")
                              }
                            >
                              <a className="dropdown-item">Intermediate</a>
                            </li>
                            <li
                              onClick={() =>
                                handleUpdatedSkillLevel("Advanced")
                              }
                            >
                              <a className="dropdown-item">Advanced</a>
                            </li>
                            <li
                              onClick={() => handleUpdatedSkillLevel("Expert")}
                            >
                              <a className="dropdown-item">Expert</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-2 ">
                        <button
                          type="button"
                          disabled={editSkillClick === false ? "disabled" : ""}
                          className="btn btn-brand-color d-block ms-2"
                          onClick={(e) => handleUpdateSkill(e, selectedSkillId)}
                        >
                          Update
                        </button>

                        {/* {editUpdateBtn ?
                            <button type="button" className="btn btn-brand-color d-block ms-2">Update</button>
                            :
                            <button type="button" className="btn btn-brand-color d-block ms-2 " onClick={() => handleAddSkill(skillsObj.skillName, skillsObj.skillLevel)}>Add Skill</button>
                          } */}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="grade" className="form-label">
                        Skills
                      </label>
                      <table className="table">
                        <tbody>
                          {skillsKnown.length === 0 ? (
                            <>
                              <tr className="ms-3 d-block text-grey border p-3 rounded-1 mt-2">
                                <td className="border-0 text-grey">
                                  No skills found
                                </td>
                              </tr>
                            </>
                          ) : (
                            skillsKnown.map((skill, index) => {
                              return (
                                <React.Fragment key={skill.id}>
                                  <tr className="text-center">
                                    <td>{skill.skill_name}</td>
                                    <td>-</td>
                                    <td>{skill.skill_level}</td>
                                    <td className="text-center">
                                      <span className="mx-3">
                                        <FiEdit
                                          className="fs-4 react-icon fw-lighter"
                                          title="Edit Skill"
                                          onClick={(e) =>
                                            handleEditSkill(e, skill.id)
                                          }
                                        />
                                      </span>
                                      <span>
                                        <LuTrash
                                          className="fs-4 react-icon"
                                          title="Delete Skill"
                                          onClick={(e) =>
                                            handleDeleteSkill(e, skill.id)
                                          }
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                </React.Fragment>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer border-top-0">
                <div className="container">
                  <div className="row float-end">
                    {/* <div className="col-lg-7">
                      <button type="button" className="btn btn-brand-color mx-2 my-2">Delete Skill</button>
                    </div> */}
                    {/* <div className="col-lg-12 d-flex justify-content-between">
                        <button type="button" className="btn btn-brand-color my-2 ms-2 px-3" data-bs-dismiss="modal" onClick={handleSaveSkill}>Save</button>
                        <button type="button" className="btn btn-outline-secondary my-2 px-3">Save</button>
                      </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Skill Modal */}

        <div
          className="modal fade"
          id="editSkillModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Edit Skill
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body border-bottom-0">
                <div className="container">
                  <form>
                    <div className="mb-3">
                      <table className="table">
                        <tbody>
                          {skillsKnown.map((skill, index) => {
                            return (
                              <React.Fragment key={skill.id}>
                                <tr className="">
                                  <td>
                                    {editSkillDropdown === true &&
                                      editSelectedSkill === skill.id ? (
                                      <div className="dropdown custom-dropdown">
                                        <button
                                          className="btn btn-secondary dropdown-toggle w-100"
                                          type="button"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          {updatedSkillsObj.skillName === ""
                                            ? "Select your Skill"
                                            : updatedSkillsObj.skillName}
                                        </button>
                                        <ul className="dropdown-menu">
                                          {skillsData.map((skill) => {
                                            return (
                                              <React.Fragment key={skill.id}>
                                                <li
                                                  onClick={() =>
                                                    handleUpdatedSkillName(
                                                      skill.skillName
                                                    )
                                                  }
                                                >
                                                  <a className="dropdown-item">
                                                    {skill.skillName}
                                                  </a>
                                                </li>
                                              </React.Fragment>
                                            );
                                          })}
                                        </ul>
                                      </div>
                                    ) : (
                                      skill.skill_name
                                    )}
                                  </td>
                                  <td>-</td>
                                  <td>
                                    {editSkillDropdown === true &&
                                      editSelectedSkill === skill.id ? (
                                      <div className="dropdown custom-dropdown mt-3 mb-3">
                                        <button
                                          className="btn btn-secondary dropdown-toggle w-100"
                                          type="button"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          {updatedSkillsObj.skillLevel === ""
                                            ? "Select your Skill Level"
                                            : updatedSkillsObj.skillLevel}
                                        </button>
                                        <ul className="dropdown-menu">
                                          <li
                                            onClick={() =>
                                              handleUpdatedSkillLevel(
                                                "Beginner"
                                              )
                                            }
                                          >
                                            <a className="dropdown-item">
                                              Beginner
                                            </a>
                                          </li>
                                          <li
                                            onClick={() =>
                                              handleUpdatedSkillLevel(
                                                "Intermediate"
                                              )
                                            }
                                          >
                                            <a className="dropdown-item">
                                              Intermediate
                                            </a>
                                          </li>
                                          <li
                                            onClick={() =>
                                              handleUpdatedSkillLevel(
                                                "Professional Working Efficiency"
                                              )
                                            }
                                          >
                                            <a className="dropdown-item">
                                              Professional Working Efficiency
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    ) : (
                                      skill.skill_level
                                    )}
                                  </td>
                                  <td className="text-center">
                                    {/* <span className="mx-3"><FiEdit className="fs-4 react-icon fw-lighter" title="Edit Skill" onClick={(e) => handleEditSkill(e, skill.id)} /></span> */}
                                    <span>
                                      <LuTrash
                                        className="fs-4 react-icon"
                                        title="Delete Skill"
                                        onClick={(e) =>
                                          handleDeleteSkill(e, skill.id)
                                        }
                                      />
                                    </span>
                                  </td>
                                </tr>
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer  border-top-0 me-2">
                <button
                  type="submit"
                  className="btn btn-brand-color px-3"
                  data-bs-dismiss="modal"
                  onClick={() => toast.success("Skills saved")}
                >
                  Save
                </button>
                {/* <button type="button" className="btn btn-outline-secondary mx-2 my-2" data-bs-toggle="modal" data-bs-target="#deleteSkillModal">Delete</button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Delete Skill Modal */}

        <div
          className="modal fade"
          id="deleteSkillModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Delete Skill
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body border-bottom-0">
                <div className="container">
                  <form>
                    <div className="mb-3">
                      <table className="table">
                        <tbody>
                          {skillsKnown.length === 0 ? (
                            <tr className="ms-3 d-block text-grey border p-3 rounded-1 mt-2">
                              <td className="border-0 text-grey">
                                No skills found
                              </td>
                            </tr>
                          ) : (
                            skillsKnown.map((skill, index) => {
                              return (
                                <React.Fragment key={skill.id}>
                                  <tr className="">
                                    <td>
                                      {editSkillDropdown === true &&
                                        editSelectedSkill === skill.id ? (
                                        <div className="dropdown custom-dropdown">
                                          <button
                                            className="btn btn-secondary dropdown-toggle w-100"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            {updatedSkillsObj.skillName === ""
                                              ? "Select your Skill"
                                              : updatedSkillsObj.skillName}
                                          </button>
                                          <ul className="dropdown-menu">
                                            {skillsData.map((skill) => {
                                              return (
                                                <React.Fragment key={skill.id}>
                                                  <li
                                                    onClick={() =>
                                                      handleUpdatedSkillName(
                                                        skill.skillName
                                                      )
                                                    }
                                                  >
                                                    <a className="dropdown-item">
                                                      {skill.skillName}
                                                    </a>
                                                  </li>
                                                </React.Fragment>
                                              );
                                            })}
                                          </ul>
                                        </div>
                                      ) : (
                                        skill.skill_name
                                      )}
                                    </td>
                                    <td>-</td>
                                    <td>
                                      {editSkillDropdown === true &&
                                        editSelectedSkill === skill.id ? (
                                        <div className="dropdown custom-dropdown mt-3 mb-3">
                                          <button
                                            className="btn btn-secondary dropdown-toggle w-100"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            {updatedSkillsObj.skillLevel === ""
                                              ? "Select your Skill Level"
                                              : updatedSkillsObj.skillLevel}
                                          </button>
                                          <ul className="dropdown-menu">
                                            <li
                                              onClick={() =>
                                                handleUpdatedSkillLevel(
                                                  "Beginner"
                                                )
                                              }
                                            >
                                              <a className="dropdown-item">
                                                Beginner
                                              </a>
                                            </li>
                                            <li
                                              onClick={() =>
                                                handleUpdatedSkillLevel(
                                                  "Intermediate"
                                                )
                                              }
                                            >
                                              <a className="dropdown-item">
                                                Intermediate
                                              </a>
                                            </li>
                                            <li
                                              onClick={() =>
                                                handleUpdatedSkillLevel(
                                                  "Professional Working Efficiency"
                                                )
                                              }
                                            >
                                              <a className="dropdown-item">
                                                Professional Working Efficiency
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      ) : (
                                        skill.skill_level
                                      )}
                                    </td>
                                    <td className="text-center">
                                      {/* <span className="mx-3"><FiEdit className="fs-4 react-icon fw-lighter" title="Edit Skill" onClick={(e) => handleEditSkill(e, skill.id)} /></span> */}
                                      <span>
                                        <LuTrash
                                          className="fs-4 react-icon"
                                          title="Delete Skill"
                                          onClick={(e) =>
                                            handleDeleteSkill(e, skill.id)
                                          }
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                </React.Fragment>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer  border-top-0 me-2">
                <button
                  type="submit"
                  className="btn btn-brand-color px-3"
                  data-bs-dismiss="modal"
                  onClick={() => toast.success("Skills updated")}
                >
                  Save
                </button>
                {/* <button type="button" className="btn btn-outline-secondary mx-2 my-2" data-bs-toggle="modal" data-bs-target="#deleteSkillModal">Delete</button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Preference Modal */}

        <div
          className="modal fade"
          id="editPreference"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Preference
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row mb-2 mt-3">
                    <div className="col-lg-12 d-flex justify-content-between">
                      <div>Description</div>
                      <div></div>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row">
                      <textarea
                        className="p-3 rounded-3"
                        rows={15}
                        placeholder="Enter your text here.."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="container">
                  <button
                    type="button"
                    className="btn btn-brand-color w-100 my-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video upload Modal */}

        <div
          className="modal fade"
          id="videoUploadModal"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                  Video Upload
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="closeVideoModel"
                ></button>
              </div>
              <div className="modal-body">
                <div className="card border-0 h-100 rounded-4">
                  <div className="card-body d-flex align-items-center justify-content-center">
                    <div className="w-100">
                      <div className="text-center position-relative">
                        <div className="col-lg-12">
                          <div className="card border-0 h-100 rounded-4">
                            <div className="card-body d-flex align-items-center justify-content-center">
                              <div
                                className="border rounded-5 py-5 cursorPointer"
                                onClick={() =>
                                  document
                                    .getElementById("introduction-video")
                                    .click()
                                }
                              >
                                <input
                                  type="file"
                                  className="form-control"
                                  id="introduction-video"
                                  name="profile_image"
                                  hidden
                                  // accept="video/mp4,video/x-m4v,video/*"
                                  onChange={handleVideoUpload}
                                  onClick={() =>
                                    document
                                      .getElementById("closeVideoModel")
                                      .click()
                                  }
                                />
                                <div className="text-center">
                                  <div className="fs-1">
                                    <LuUpload />
                                  </div>
                                  <p className="px-5 m-0 pt-3 upload-video-text">
                                    Click here to upload video
                                    <br />

                                  </p>
                                  <span className="unsupported-video-format-text text-grey">(Only MP4 video formats are supported)</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Delete video Modal */}

        <div
          className="modal fade"
          id="deleteVideoModal"
          aria-hidden="true"
          aria-labelledby="deleteVideoModal"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deleteVideoModal">
                  Delete Video
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="deleteVideoModalConfirmationModal"
                ></button>
              </div>
              <div className="modal-body text-center pb-4">
                Are you sure you want to delete this video?
                <div className="text-center pt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >

                    <span>Cancel</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-brand-color mx-3 upload-btn"
                    data-bs-dismiss="modal"
                  >
                    <label
                      className="custom-file-label upload-btn"
                      // onClick={() => setVideoFile(false)}
                      onClick={handleDeleteVideo}
                    >
                      Delete
                    </label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Add Language Modal */}

        <div
          className="modal fade"
          id="addLanguageModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Add Language
                </h1>
                <button
                  type="button"
                  id="addLanguageClose"
                  className="btn-close"
                  onClick={() =>
                    setLanguagesObj({
                      languageName: "",
                      languageLevel: "",
                    })
                  }
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body border-bottom-0">
                <div className="container">
                  <form>
                    <div className="row justify-content-between mb-3 align-items-center">
                      <div className="col-lg-5">
                        <label className="form-label">Language</label>
                        <div className="dropdown custom-dropdown">
                          <button
                            className="btn btn-secondary dropdown-toggle w-100"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {languagesObj.languageName === ""
                              ? "Select your Language"
                              : languagesObj.languageName}
                          </button>
                          <ul className="dropdown-menu">
                            {languagesData.map((language) => {
                              return (
                                <React.Fragment key={language.id}>
                                  <li
                                    onClick={() =>
                                      handleLanguageName(language.languageName)
                                    }
                                  >
                                    <a className="dropdown-item">
                                      {language.languageName}
                                    </a>
                                  </li>
                                </React.Fragment>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="dropdown custom-dropdown mt-3 mb-3">
                          <label className="form-label">Language Level</label>
                          <button
                            className="btn btn-secondary dropdown-toggle w-100"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {languagesObj.languageLevel === ""
                              ? "Select your Language Level"
                              : languagesObj.languageLevel}
                          </button>
                          <ul className="dropdown-menu">
                            {languageLevelData.map((languageLevel) => {
                              return (
                                <React.Fragment key={languageLevel.id}>
                                  <li
                                    onClick={() =>
                                      handleLanguageLevel(
                                        languageLevel.languageLevel
                                      )
                                    }
                                  >
                                    <a className="dropdown-item">
                                      {languageLevel.languageLevel}
                                    </a>
                                  </li>
                                </React.Fragment>
                              );
                            })}
                            {/* <li onClick={() => handleLanguageLevel("Beginner")}><a className="dropdown-item" >Beginner</a></li>
                            <li onClick={() => handleLanguageLevel("Intermediate")}><a className="dropdown-item" >Intermediate</a></li>
                            <li onClick={() => handleLanguageLevel("Professional Working Efficiency")}><a className="dropdown-item" >Professional Working Efficiency</a></li> */}
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-2 text-end">
                        <button
                          type="button"
                          className="btn btn-brand-color"
                          onClick={() =>
                            handleAddLanguage(
                              languagesObj.languageName,
                              languagesObj.languageLevel
                            )
                          }
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="grade" className="form-label">
                        Languages
                      </label>
                      <table className="table">
                        <tbody>
                          {languagesKnown.length === 0 ? (
                            <>
                              <tr className="ms-3 d-block text-grey border p-3 rounded-1 mt-2">
                                <td className="border-0 text-grey">
                                  No Languages found
                                </td>
                              </tr>
                            </>
                          ) : (
                            languagesKnown.map((language) => {
                              return (
                                <tr key={language.id} className="text-center">
                                  <td>{language.language_known}</td>
                                  <td>-</td>
                                  <td>{language.language_level}</td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer border-top-0">
                <div className="container">
                  <div className="">
                    {/* <div className="col-lg-12 text-end">
                        <button type="button" className="btn btn-brand-color my-2  px-3" data-bs-dismiss="modal" onClick={handleSaveLanguage}>Save</button>
                      </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Language Modal */}

        <div
          className="modal fade"
          id="editLanguageModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Edit Language
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body border-bottom-0">
                <div className="container">
                  <form>
                    <div className="mb-3">
                      <table className="table">
                        <tbody>
                          {languagesKnown.length === 0 ? (
                            <>
                              <tr className="ms-3 d-block text-grey border p-3 rounded-1 mt-2">
                                <td className="border-0 text-grey">
                                  No Languages found
                                </td>
                              </tr>
                            </>
                          ) : (
                            languagesKnown.map((language) => {
                              return (
                                <tr key={language.id} className="text-center">
                                  <td>{language.language_known}</td>
                                  <td>-</td>
                                  <td>{language.language_level}</td>
                                  <td className="text-center">
                                    {/* <span className="mx-3"><FiEdit className="fs-4 react-icon fw-lighter" onClick={(e) => handleEditLanguage(e, language.id)} /></span> */}
                                    <span
                                      onClick={(e) =>
                                        handleDeleteLanguage(
                                          e,
                                          selectedLanguageId
                                        )
                                      }
                                    >
                                      <LuTrash className="fs-4 react-icon" />
                                    </span>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer  border-top-0">
                <button
                  type="submit"
                  className="btn btn-brand-color me-4 px-3"
                  data-bs-dismiss="modal"
                  onClick={() =>
                    toast.success("Languages updated successfully")
                  }
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="modal fade" id="deleteLanguageModal" aria-hidden="true" aria-labelledby="deleteLanguageModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deleteLanguageModal">Delete Language</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-center pb-4">
                Are you sure to delete this language?
                <div className="text-center pt-4">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">

                    <span>Cancel</span>
                  </button>
                  <button type="button" className="btn btn-brand-color mx-3 upload-btn" data-bs-dismiss="modal" onClick={(e) => handleDeleteLanguage(e, selectedLanguageId)}>
                     <MdDelete className="me-2 fs-4" /> 
                    <label className="custom-file-label upload-btn" >Delete</label>
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>  */}

        {/* Edit Language Modal Box */}

        <div
          className="modal fade"
          id="editLanguageModalBox"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          {/* <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content p-2">
                <div className="modal-header border-bottom-0">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Language</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body border-bottom-0">
                  <div className="container">
                    <form>
                      <div className="mb-3">
                        <table className="table">
                          <tbody>
                            {

                              languagesKnown.length === 0 ?
                                <>
                                  <tr className="ms-3 d-block text-grey border p-3 rounded-1 mt-2">
                                    <td className="border-0 text-grey">No Languages found</td>
                                  </tr>
                                </>

                                  :
                              languagesKnown.map((language) => {
                                return (
                            <tr key={language.id} className="text-center">
                              <td>{language.language_known}</td>
                              <td>-</td>
                              <td>{language.language_level}</td>
                              <td className="text-center">
                                <span className="mx-3"><FiEdit className="fs-4 react-icon fw-lighter" onClick={(e) => handleEditLanguage(e, language.id)} /></span>
                                <span onClick={(e) => handleDeleteLanguage(e, selectedLanguageId)}><LuTrash className="fs-4 react-icon" /></span>
                              </td>
                            </tr>
                            )
                              })
                            }
                          </tbody>
                        </table>
                      </div>

                    </form>
                  </div>
                </div>
                <div className="modal-footer  border-top-0" >
                  <button type="submit" className="btn btn-brand-color me-4 px-3" data-bs-dismiss="modal" onClick={() => toast.success("Languages updated successfully")}>Save</button>
                </div>
              </div>
            </div> */}

          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Edit Language
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditLanguageClick(false)}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body border-bottom-0">
                <div className="container">
                  <form>
                    <div className="row justify-content-between mb-3 align-items-center">
                      <div className="col-lg-5">
                        <label className="form-label">Language Name</label>
                        <div className="dropdown custom-dropdown">
                          <button
                            className="btn btn-secondary dropdown-toggle w-100"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={
                              editLanguageClick === false ? "disabled" : ""
                            }
                          >
                            {updatedLanguagesObj.languageName === "" ||
                              editLanguageClick === false
                              ? "Select your Language"
                              : updatedLanguagesObj.languageName}
                            {/* //  editSkillClick ?
                                // skillsObj.skillName === "hi" : ""} */}
                          </button>
                          <ul className="dropdown-menu">
                            {languagesData.map((language) => {
                              return (
                                <React.Fragment key={language.id}>
                                  <li
                                    onClick={() =>
                                      handleUpdatedLanguageName(
                                        language.languageName
                                      )
                                    }
                                  >
                                    <a className="dropdown-item">
                                      {language.languageName}
                                    </a>
                                  </li>
                                </React.Fragment>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="dropdown custom-dropdown mt-3 mb-3">
                          <label className="form-label">Language Level</label>
                          <button
                            className="btn btn-secondary dropdown-toggle w-100"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={
                              editLanguageClick === false ? "disabled" : ""
                            }
                          >
                            {updatedLanguagesObj.languageLevel === "" ||
                              editLanguageClick === false
                              ? "Select your Language Level"
                              : updatedLanguagesObj.languageLevel}
                          </button>
                          <ul className="dropdown-menu">
                            {languageLevelData.map((languageLevel) => {
                              return (
                                <React.Fragment key={languageLevel.id}>
                                  <li
                                    onClick={() =>
                                      handleUpdatedLanguageLevel(
                                        languageLevel.languageLevel
                                      )
                                    }
                                  >
                                    <a className="dropdown-item">
                                      {languageLevel.languageLevel}
                                    </a>
                                  </li>
                                </React.Fragment>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-2 ">
                        <button
                          type="button"
                          disabled={
                            editLanguageClick === false ? "disabled" : ""
                          }
                          className="btn btn-brand-color d-block ms-2"
                          onClick={(e) =>
                            handleUpdateLanguage(e, selectedLanguageId)
                          }
                        >
                          Update
                        </button>

                        {/* {editUpdateBtn ?
                            <button type="button" className="btn btn-brand-color d-block ms-2">Update</button>
                            :
                            <button type="button" className="btn btn-brand-color d-block ms-2 " onClick={() => handleAddSkill(skillsObj.skillName, skillsObj.skillLevel)}>Add Skill</button>
                          } */}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="grade" className="form-label">
                        Languages
                      </label>
                      <table className="table">
                        <tbody>
                          {languagesKnown.length === 0 ? (
                            <>
                              <tr className="ms-3 d-block text-grey border p-3 rounded-1 mt-2">
                                <td className="border-0 text-grey">
                                  No Languages found
                                </td>
                              </tr>
                            </>
                          ) : (
                            languagesKnown.map((language, index) => {
                              return (
                                <React.Fragment key={language.id}>
                                  <tr className="text-center">
                                    <td>{language.language_known}</td>
                                    <td>-</td>
                                    <td>{language.language_level}</td>
                                    <td className="text-center">
                                      <span className="mx-3">
                                        <FiEdit
                                          className="fs-4 react-icon fw-lighter"
                                          title="Edit Language"
                                          onClick={(e) =>
                                            handleEditLanguage(e, language.id)
                                          }
                                        />
                                      </span>
                                      <span>
                                        <LuTrash
                                          className="fs-4 react-icon"
                                          title="Delete Skill"
                                          onClick={(e) =>
                                            handleDeleteLanguage(e, language.id)
                                          }
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                </React.Fragment>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer border-top-0">
                <div className="container">
                  <div className="row float-end">
                    {/* <div className="col-lg-7">
                      <button type="button" className="btn btn-brand-color mx-2 my-2">Delete Skill</button>
                    </div> */}
                    {/* <div className="col-lg-12 d-flex justify-content-between">
                        <button type="button" className="btn btn-brand-color my-2 ms-2 px-3" data-bs-dismiss="modal" onClick={handleSaveSkill}>Save</button>
                        <button type="button" className="btn btn-outline-secondary my-2 px-3">Save</button>
                      </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Modal */}

        <div
          className="modal fade"
          id="additionalInformationModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Additional Information
                </h1>
                <button
                  type="button"
                  id="addAdditionalInformationClose"
                  className="btn-close"
                  onClick={() =>
                    setAdditionalInformationInputs({
                      additionalInfoTitle: "",
                      additionalInfoDescription: "",
                    })
                  }
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="additionalInfoTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="additionalInfoTitle"
                    id="addtionalInfoTitle"
                    maxLength="60"
                    aria-describedby="jobTitle"
                    placeholder="Enter your title"
                    value={additionalInformationInputs.additionalInfoTitle}
                    onChange={handleAdditionalInformationInputs}
                  />
                </div>
                <div className="container">
                  <div className="row mb-2 mt-3">
                    <div className="col-lg-12 d-flex justify-content-between">
                      <div>Description</div>
                      <div></div>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row">
                      <textarea
                        className="p-3 rounded-3"
                        name="additionalInfoDescription"
                        rows={10}
                        maxLength="200"
                        placeholder="Enter your text here.."
                        value={
                          additionalInformationInputs.additionalInfoDescription
                        }
                        onChange={handleAdditionalInformationInputs}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="container">
                  <button
                    type="button"
                    className="btn btn-brand-color w-100 my-2"
                    onClick={handleAdditionalInformationAdd}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Information Modal */}

        <div
          className="modal fade"
          id="editInformationModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Edit Additional Information
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  id="updateAdditionalInformationClose"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="additionalInfoTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="additionalInfoTitle"
                    id="addtionalInfoTitle"
                    aria-describedby="jobTitle"
                    placeholder="Enter your title"
                    value={editAdditionalInformationInputs.additionalInfoTitle}
                    onChange={handleEditAdditionalInformationInputs}
                  />
                </div>
                <div className="container">
                  <div className="row mb-2 mt-3">
                    <div className="col-lg-12 d-flex justify-content-between">
                      <div>Description</div>
                      <div></div>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row">
                      <textarea
                        className="p-3 rounded-3"
                        name="additionalInfoDescription"
                        rows={10}
                        placeholder="Enter your text here.."
                        value={
                          editAdditionalInformationInputs.additionalInfoDescription
                        }
                        onChange={handleEditAdditionalInformationInputs}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer  border-top-0 me-2">
                <button
                  type="submit"
                  className="btn btn-brand-color px-3"
                  onClick={(e) =>
                    handleAdditionalInformationUpdate(
                      e,
                      editAdditionalInformationInputs.id,
                      "Save"
                    )
                  }
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary mx-2 my-2"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteAdditionalInformationModal"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="deleteAdditionalInformationModal"
          aria-hidden="true"
          aria-labelledby="deleteSocialLinkModal"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deleteSocialLinkModal">
                  Delete Additional Information
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center pb-4">
                Are you sure you want to delete this information?
                <div className="text-center pt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >
                    {/* <ImCancelCircle className="me-2 fs-4" /> */}

                    <span>Cancel</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-brand-color mx-3 upload-btn"
                    data-bs-dismiss="modal"
                  >
                    {/* <MdDelete className="me-2 fs-4" /> */}
                    <label
                      className="custom-file-label upload-btn"
                      onClick={(e) =>
                        handleAdditionalInformationDelete(
                          e,
                          editAdditionalInformationInputs.id
                        )
                      }
                    >
                      Delete
                    </label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Social Link Modal */}

        <div
          className="modal fade"
          id="addSocialLinkModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Add Social Link
                </h1>
                <button
                  type="button"
                  id="addSocialLinkMediaClose"
                  className="btn-close"
                  onClick={() =>
                    setSocialMediaInputs({
                      socialMediaName: "",
                      url: "",
                    })
                  }
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body border-bottom-0">
                <div className="container">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="socialMediaName" className="form-label">
                        Social Media Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="socialMediaName"
                        id="socialMediaName"
                        aria-describedby="institution"
                        placeholder="Enter Social Media"
                        value={socialMediaInputs.socialMediaName}
                        onChange={handleSocialMediaInputs}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="url" className="form-label">
                        URL
                      </label>
                      <input
                        type="text"
                        className="form-control pb-4"
                        name="url"
                        id="url"
                        aria-describedby="degree"
                        placeholder="Enter URL"
                        value={socialMediaInputs.url}
                        onChange={handleSocialMediaInputs}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer border-top-0">
                <div className="container">
                  <div className="row float-end">
                    {/* <div className="col-lg-7">
                      <button type="button" className="btn btn-brand-color mx-2 my-2">Delete Social Link</button>
                    </div> */}
                    <div className="col-lg-12 ">
                      <button
                        type="submit"
                        className="btn btn-brand-color my-2 mx-2 px-3"
                        onClick={(e) =>
                          handleAddSocialMedia(e, "Save & Add another")
                        }
                      >
                        Save & Add another
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary my-2 px-3"
                        onClick={(e) => handleAddSocialMedia(e, "Save")}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Social Link Modal */}

        <div
          className="modal fade"
          id="editSocialLinkModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Edit Social Link
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  id="updateSocialLinkMediaClose"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body border-bottom-0">
                <div className="container">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="socialMediaName" className="form-label">
                        Social Media
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="socialMediaName"
                        id="institution"
                        aria-describedby="institution"
                        placeholder="Enter social media"
                        value={editSocialMediaData.socialMediaName}
                        onChange={handleEditSocialMediaData}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="url" className="form-label">
                        URL
                      </label>
                      <input
                        type="text"
                        className="form-control pb-4"
                        name="url"
                        id="url"
                        aria-describedby="degree"
                        placeholder="Enter URL"
                        value={editSocialMediaData.url}
                        onChange={handleEditSocialMediaData}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer  border-top-0 me-2">
                <button
                  type="submit"
                  className="btn btn-brand-color px-3"
                  onClick={(e) =>
                    handleUpdateSocialMedia(e, editSocialMediaData.id, "Save")
                  }
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary mx-2 my-2"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteSocialMediaLinkModal"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="modal fade" id="deleteSocialLinkModal" aria-hidden="true" aria-labelledby="deleteSocialLinkModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deleteSocialLinkModal">Delete Social Link</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-center pb-4">
                Are you sure to delete this social link details?
                <div className="text-center pt-4">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">

                    <span>Cancel</span>
                  </button>
                  <button type="button" className="btn btn-brand-color mx-3 upload-btn" data-bs-dismiss="modal" >
                    <label className="custom-file-label upload-btn" onClick={() => console.log("delete")}>Delete</label>
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div
          className="modal fade"
          id="deleteSocialMediaLinkModal"
          aria-hidden="true"
          aria-labelledby="deleteSocialMediaLinkModal"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5"
                  id="deleteSocialMediaLinkModal"
                >
                  Delete Social Media
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center pb-4">
                Are you sure you want to delete this information?
                <div className="text-center pt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >
                    {/* <ImCancelCircle className="me-2 fs-4" /> */}

                    <span>Cancel</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-brand-color mx-3 upload-btn"
                    data-bs-dismiss="modal"
                  >
                    {/* <MdDelete className="me-2 fs-4" /> */}
                    <label
                      className="custom-file-label upload-btn"
                      onClick={(e) =>
                        handleDeleteSocialMedia(e, editSocialMediaData.id)
                      }
                    >
                      Delete
                    </label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
