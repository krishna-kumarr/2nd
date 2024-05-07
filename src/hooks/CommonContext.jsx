import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CommonContext = createContext();

export const DataProvider = ({ children }) => {
  // home page states
  const RecordsPerPage = 10;
  const pageRender = useNavigate();
  const token = localStorage.getItem("Token");
  const [profilePicture, setProfilePicture] = useState("");
  const [disableProfilePictureDelete, setDisableProfilePictureDelete] =useState(false);
  const [isProfilePictureUploaded, setIsProfilePictureUploaded] =useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [gettingResponse, setGettingResponse] = useState(false);
  const [FilterArray, setFilterArray] = useState({});
  const [cardArray, setCardArray] = useState([]);
  const [cardArrayDuplicate, setCardArrayDuplicate] = useState([]);
  const [cardArrayDuplicateSearch, setCardArrayDuplicateSearch] = useState([]);
  const [selectedCardData, setSelectedCardData] = useState([]);
  const [answers, setAnswer] = useState([]);
  const [selectedSkeleton, setSelectedSkeleton] = useState(false);
  const [refreshId, setRefreshId] = useState(0);
  const [refreshAction, setRefreshAction] = useState(false);
  const [applyFilterResponse, setapplyFilterResponse] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [jobcardId, setJobcardId] = useState(0);
  const [selectedCardPath, setSelectedCardPath] = useState("");
  const [selectedCarrdLink, setSelectedCardLink] = useState("");
  const [reCall, setRecall] = useState(false);
  const [skillData, setSkillData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [sectorData, setSectorData] = useState([]);
  const [specialisationData, setSpecialisationData] = useState([]);
  const [reCallId, setRecallID] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterRefreshId, setFilterRefreshId] = useState(0);
  const [recommendedRefreshId, setRecommendedRefreshId] = useState(0);
  const [applyFilterCount, setApplyFilterCount] = useState(0);
  const [filteringObject, setFilteringObject] = useState({});
  const [editLocation, setEditLocation] = useState({
    city: "",
    country: "",
  });

  const getHomeAll = async () => {
    setAnswer([]);

    try {
      await axios
        .get("https://api.2ndcareers.com/professional_dashboard", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.data)
          setRefreshAction(false);
          if (res.data.error_code === 0) {
            setFilterArray(res.data.data);

            //skill data
            res.data.data.skill.map((v, i) => {
              setSkillData((prevState) => [
                ...prevState,
                {
                  value: i + 1,
                  label: v,
                },
              ]);
            });

            //location Data
            res.data.data.location.map((v, i) => {
              setLocationData((prevState) => [
                ...prevState,
                {
                  value: i + 1,
                  label: v,
                },
              ]);
            });

            //location Data
            res.data.data.sector.map((v, i) => {
              setSectorData((prevState) => [
                ...prevState,
                {
                  value: i + 1,
                  label: v,
                },
              ]);
            });

            //location Data
            res.data.data.specialisation.map((v, i) => {
              setSpecialisationData((prevState) => [
                ...prevState,
                {
                  value: i + 1,
                  label: v,
                },
              ]);
            });

            if (res.data.data.job_details.length > 0) {
              setSelectedCardLink(
                `https://app.2ndcareers.com/professional/home/all_jobs?job_id=${btoa(
                  res.data.data.job_details[0].id
                )}`
              );

              //checking device resolution
              if (isSmallDevice) {
                var filterNotAppliedJobs = res.data.data.job_details.filter(
                  (v) => {
                    return v.id === jobcardId;
                  }
                );
                setSelectedCardData(filterNotAppliedJobs);
              } else {
                var filterNotAppliedJobs = res.data.data.job_details.filter(
                  (v) => {
                    return v.applied_status === "not_applied";
                  }
                );

                if (filterNotAppliedJobs.length > 0) {
                  setCardArray(filterNotAppliedJobs);

                  //checking local storage null or not
                  var getLocalStorageId = localStorage.getItem("job_id");
                  if (getLocalStorageId !== null) {
                    var filterLocalStorageId = res.data.data.job_details.filter(
                      (v) => {
                        return v.id == atob(getLocalStorageId);
                      }
                    );
                    setSelectedCardData(filterLocalStorageId);
                    setCardArrayDuplicate(filterNotAppliedJobs);
                    setCardArrayDuplicateSearch(filterNotAppliedJobs);
                    localStorage.removeItem("job_id");
                  } else {
                    //checking searching input has any values
                    if (searchInput === "") {
                      setCardArrayDuplicate(filterNotAppliedJobs);
                      const firstIndex = RecordsPerPage * 0;
                      const LastIndex = RecordsPerPage * 0 + RecordsPerPage;

                      var jobCards = filterNotAppliedJobs.slice(
                        firstIndex,
                        LastIndex
                      );
                      setCardArrayDuplicateSearch(jobCards);

                      var refreshidd = refreshId - 10;
                      var findJob = filterNotAppliedJobs.filter((v) => {
                        return v.id === refreshidd;
                      });

                      if (findJob.length > 0) {
                        setSelectedCardData([
                          filterNotAppliedJobs[selectedCardIndex],
                        ]);

                        filterNotAppliedJobs[selectedCardIndex].questions.map(
                          (v) => {
                            setAnswer((prevState) => [
                              ...prevState,
                              { question_id: v.id, answer: "" },
                            ]);
                          }
                        );
                      } else {
                        setSelectedCardData([filterNotAppliedJobs[0]]);
                        filterNotAppliedJobs[0].questions.map((v) => {
                          setAnswer((prevState) => [
                            ...prevState,
                            { question_id: v.id, answer: "" },
                          ]);
                        });
                      }
                    } else {
                      const searchJobs = filterNotAppliedJobs.filter((v, i) => {
                        return (
                          v.job_title
                            .toLowerCase()
                            .match(searchInput.toLowerCase()) ||
                          v.job_overview
                            .toLowerCase()
                            .match(searchInput.toLowerCase()) ||
                          v.country
                            .toLowerCase()
                            .match(searchInput.toLowerCase()) ||
                          v.city.toLowerCase().match(searchInput.toLowerCase())
                        );
                      });
                      if (searchJobs.length > 0) {
                        setCardArrayDuplicate(searchJobs);
                        const firstIndex = RecordsPerPage * 0;
                        const LastIndex = RecordsPerPage * 0 + RecordsPerPage;

                        var jobCards = searchJobs.slice(firstIndex, LastIndex);
                        setCardArrayDuplicateSearch(jobCards);

                        console.log("searched jobs", jobCards);

                        var refreshidd = refreshId - 10;

                        var filterFindJob = filterNotAppliedJobs.filter((v) => {
                          return v.id === refreshidd;
                        });

                        if (filterFindJob.length > 0) {
                          setSelectedCardData([
                            filterNotAppliedJobs[selectedCardIndex],
                          ]);
                          filterNotAppliedJobs[selectedCardIndex].questions.map(
                            (v) => {
                              setAnswer((prevState) => [
                                ...prevState,
                                { question_id: v.id, answer: "" },
                              ]);
                            }
                          );
                        } else {
                          setSelectedCardData([filterNotAppliedJobs[0]]);
                          filterNotAppliedJobs[0].questions.map((v) => {
                            setAnswer((prevState) => [
                              ...prevState,
                              { question_id: v.id, answer: "" },
                            ]);
                          });
                        }
                      } else {
                        setCardArrayDuplicateSearch([]);
                        setSelectedCardData([]);
                      }
                    }
                  }
                } else {
                  setCardArray([]);
                  setAnswer([]);
                  setSelectedCardData([]);
                  setCardArrayDuplicate([]);
                  setCardArrayDuplicateSearch([]);
                  setGettingResponse(true);
                  setSelectedCardIndex(0);
                }
              }

              setGettingResponse(true);
              setSelectedCardIndex(0);
            } else {
              setCardArray([]);
              setAnswer([]);
              setSelectedCardData([]);
              setCardArrayDuplicate([]);
              setCardArrayDuplicateSearch([]);
              setGettingResponse(true);
              setSelectedCardIndex(0);
            }
          } else {
            setSelectedCardIndex(0);
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getRecommendedData = async () => {
    try {
      await axios({
        method: "get",
        url: "https://api.2ndcareers.com/professional_recommended",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setRefreshAction(false);
          console.log("recommeded", res.data.data.job_details);
          if (res.data.error_code === 0) {
            if (res.data.data.job_details.length > 0) {
              setSelectedCardLink(
                `https://app.2ndcareers.com/professional/home/all_jobs?job_id=${btoa(
                  res.data.data.job_details[0].id
                )}`
              );

              if (isSmallDevice) {
                var filterNotAppliedJobs = res.data.data.job_details.filter(
                  (v) => {
                    return v.id === jobcardId;
                  }
                );
                setSelectedCardData(filterNotAppliedJobs);
                setCardArray(res.data.data.job_details);
                setCardArrayDuplicate(res.data.data.job_details);
                setCardArrayDuplicateSearch(res.data.data.job_details);
              } else {
                var filterNotAppliedJobs = res.data.data.job_details.filter(
                  (v) => {
                    return v.applied_status === "not_applied";
                  }
                );

                if (filterNotAppliedJobs.length > 0) {
                  setCardArray(filterNotAppliedJobs);

                  if (searchInput === "") {
                    setCardArrayDuplicate(filterNotAppliedJobs);
                    setCardArrayDuplicateSearch(filterNotAppliedJobs);

                    var refreshidd = refreshId - 10;
                    var findJob = filterNotAppliedJobs.filter((v) => {
                      return v.id === refreshidd;
                    });

                    if (findJob.length > 0) {
                      setSelectedCardData([
                        filterNotAppliedJobs[selectedCardIndex],
                      ]);

                      filterNotAppliedJobs[selectedCardIndex].questions.map(
                        (v) => {
                          setAnswer((prevState) => [
                            ...prevState,
                            { question_id: v.id, answer: "" },
                          ]);
                        }
                      );
                    } else {
                      setSelectedCardData([filterNotAppliedJobs[0]]);
                      filterNotAppliedJobs[0].questions.map((v) => {
                        setAnswer((prevState) => [
                          ...prevState,
                          { question_id: v.id, answer: "" },
                        ]);
                      });
                    }
                  } else {
                    const searchJobs = filterNotAppliedJobs.filter((v, i) => {
                      return (
                        v.job_title
                          .toLowerCase()
                          .match(searchInput.toLowerCase()) ||
                        v.job_overview
                          .toLowerCase()
                          .match(searchInput.toLowerCase()) ||
                        v.country
                          .toLowerCase()
                          .match(searchInput.toLowerCase()) ||
                        v.city.toLowerCase().match(searchInput.toLowerCase())
                      );
                    });
                    setCardArrayDuplicate(searchJobs);
                    if (searchJobs.length > 0) {
                      setCardArrayDuplicateSearch(searchJobs);

                      var refreshidd = refreshId - 10;

                      var filterFindJob = filterNotAppliedJobs.filter((v) => {
                        return v.id === refreshidd;
                      });
                      console.log(
                        filterNotAppliedJobs[selectedCardIndex],
                        filterFindJob,
                        refreshId
                      );
                      if (filterFindJob.length > 0) {
                        setSelectedCardData([
                          filterNotAppliedJobs[selectedCardIndex],
                        ]);
                        filterNotAppliedJobs[selectedCardIndex].questions.map(
                          (v) => {
                            setAnswer((prevState) => [
                              ...prevState,
                              { question_id: v.id, answer: "" },
                            ]);
                          }
                        );
                      } else {
                        setSelectedCardData([filterNotAppliedJobs[0]]);
                        filterNotAppliedJobs[0].questions.map((v) => {
                          setAnswer((prevState) => [
                            ...prevState,
                            { question_id: v.id, answer: "" },
                          ]);
                        });
                      }
                    } else {
                      setCardArrayDuplicateSearch([]);
                      setSelectedCardData([]);
                    }
                  }
                } else {
                  setCardArray([]);
                  setAnswer([]);
                  setSelectedCardData([]);
                  setCardArrayDuplicate([]);
                  setCardArrayDuplicateSearch([]);
                  setGettingResponse(true);
                }
              }
              setGettingResponse(true);
            } else {
              setCardArray([]);
              setAnswer([]);
              setSelectedCardData([]);
              setCardArrayDuplicate([]);
              setCardArrayDuplicateSearch([]);
              setGettingResponse(true);
            }
            setSelectedCardIndex(0);
          } else {
            toast.error(res.data.message);
            setSelectedCardIndex(0);
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const getSavedDatas = async () => {
    try {
      await axios({
        method: "get",
        url: "https://api.2ndcareers.com/professional_saved_jobs",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.data.error_code === 0) {
            if (res.data.data.length > 0) {
              if (isSmallDevice) {
                var applysavedJob = res.data.data.filter((v) => {
                  return v.id === reCallId;
                });
                setSelectedCardData(applysavedJob);
              } else {
                const firstIndex = RecordsPerPage * 0;
                const LastIndex = RecordsPerPage * 0 + RecordsPerPage;
                var jobCards = res.data.data.slice(firstIndex, LastIndex);
                setCardArrayDuplicateSearch(jobCards);

                if (reCall === false) {
                  setCardArray(res.data.data);
                  setCardArrayDuplicate(res.data.data);
                  setSelectedCardData([res.data.data[0]]);
                  res.data.data[0].questions.map((v) => {
                    setAnswer((prevState) => [
                      ...prevState,
                      { question_id: v.id, answer: "" },
                    ]);
                  });
                  
                } else {
                  setCardArray(res.data.data);
                  setCardArrayDuplicate(res.data.data);
                  if (searchInput === "") {
                    const firstIndex = RecordsPerPage * 0;
                    const LastIndex = RecordsPerPage * 0 + RecordsPerPage;

                    var filterApplyjobs = res.data.data.slice(
                      firstIndex,
                      LastIndex
                    );
                    setCardArrayDuplicateSearch(filterApplyjobs);

                    var applysavedJob = filterApplyjobs.filter((v) => {
                      return v.id === reCallId;
                    });
                    setSelectedCardData(applysavedJob);
                  } else {
                    const searchJobs = res.data.data.filter((v, i) => {
                      return (
                        v.job_title
                          .toLowerCase()
                          .match(searchInput.toLowerCase()) ||
                        v.job_overview
                          .toLowerCase()
                          .match(searchInput.toLowerCase()) ||
                        v.country
                          .toLowerCase()
                          .match(searchInput.toLowerCase()) ||
                        v.city.toLowerCase().match(searchInput.toLowerCase())
                      );
                    });
                    setCardArrayDuplicate(searchJobs);

                    if (searchJobs.length > 0) {
                      const firstIndex = RecordsPerPage * 0;
                      const LastIndex = RecordsPerPage * 0 + RecordsPerPage;

                      var filterApplyjobs = searchJobs.slice(
                        firstIndex,
                        LastIndex
                      );
                      setCardArrayDuplicateSearch(filterApplyjobs);

                      var applysavedJob = res.data.data.filter((v) => {
                        return v.id === reCallId;
                      });
                      setSelectedCardData(applysavedJob);
                    } else {
                      setCardArrayDuplicateSearch([]);
                      setSelectedCardData([]);
                    }
                  }
                }

                setSelectedCardLink(
                  `https://app.2ndcareers.com/professional/home/all_jobs?job_id=${btoa(
                    res.data.data[0].id
                  )}`
                );
                setGettingResponse(true);
                setRecall(false);
              }
            } else {
              setCardArray([]);
              setCardArrayDuplicate([]);
              setCardArrayDuplicateSearch([]);
              setAnswer([]);
              setGettingResponse(true);
            }
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const handleApplyFilter = async ({ object }) => {
    var submitData = { ...object };
    if (object.location.length > 0) {
      var splitAndAddLocation = object.location.map((v) => {
        var splitLoc = v.split(",");
        var joinLoc = splitLoc.join("&&&&&");

        return joinLoc;
      });
      submitData.location = splitAndAddLocation;
    }

    try {
      await axios
        .post("https://api.2ndcareers.com/fetch_filter_results", submitData, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setGettingResponse(true);
          setapplyFilterResponse(false);
          if (res.data.error_code === 0) {
            if (res.data.data.job_details.length > 0) {
              var filterNotAppliedJobs = res.data.data.job_details.filter(
                (v) => {
                  return v.applied_status === "not_applied";
                }
              );

              setCardArray(filterNotAppliedJobs);
              setCardArrayDuplicate(filterNotAppliedJobs);

              if (filterNotAppliedJobs.length > 0) {
                if (searchInput === "") {
                  const firstIndex = RecordsPerPage * 0;
                  const LastIndex = RecordsPerPage * 0 + RecordsPerPage;

                  var filterApplyjobs = filterNotAppliedJobs.slice(
                    firstIndex,
                    LastIndex
                  );
                  setCardArrayDuplicateSearch(filterApplyjobs);

                  var refreshidd = filterRefreshId - 10;
                  var findJob = filterNotAppliedJobs.filter((v) => {
                    return v.id === refreshidd;
                  });

                  if (findJob.length > 0) {
                    setSelectedCardData([
                      filterNotAppliedJobs[selectedCardIndex],
                    ]);
                    filterNotAppliedJobs[selectedCardIndex].questions.map(
                      (v) => {
                        setAnswer((prevState) => [
                          ...prevState,
                          { question_id: v.id, answer: "" },
                        ]);
                      }
                    );
                  } else {
                    setSelectedCardData([filterNotAppliedJobs[0]]);
                    filterNotAppliedJobs[0].questions.map((v) => {
                      setAnswer((prevState) => [
                        ...prevState,
                        { question_id: v.id, answer: "" },
                      ]);
                    });
                  }
                } else {
                  const searchJobs = filterNotAppliedJobs.filter((v, i) => {
                    return (
                      v.job_title
                        .toLowerCase()
                        .match(searchInput.toLowerCase()) ||
                      v.job_overview
                        .toLowerCase()
                        .match(searchInput.toLowerCase()) ||
                      v.country
                        .toLowerCase()
                        .match(searchInput.toLowerCase()) ||
                      v.city.toLowerCase().match(searchInput.toLowerCase())
                    );
                  });
                  console.log(
                    filterNotAppliedJobs[selectedCardIndex],
                    filterNotAppliedJobs,
                    searchJobs
                  );

                  if (searchJobs.length > 0) {
                    setCardArrayDuplicate(searchJobs);
                    const firstIndex = RecordsPerPage * 0;
                    const LastIndex = RecordsPerPage * 0 + RecordsPerPage;

                    var filterApplyjobs = searchJobs.slice(
                      firstIndex,
                      LastIndex
                    );
                    setCardArrayDuplicateSearch(filterApplyjobs);

                    var refreshidd = filterRefreshId - 10;

                    var filterFindJob = filterNotAppliedJobs.filter((v) => {
                      return v.id === refreshidd;
                    });

                    if (filterFindJob.length > 0) {
                      setSelectedCardData([
                        filterNotAppliedJobs[selectedCardIndex],
                      ]);
                      filterNotAppliedJobs[selectedCardIndex].questions.map(
                        (v) => {
                          setAnswer((prevState) => [
                            ...prevState,
                            { question_id: v.id, answer: "" },
                          ]);
                        }
                      );
                    } else {
                      setSelectedCardData([filterNotAppliedJobs[0]]);
                      filterNotAppliedJobs[0].questions.map((v) => {
                        setAnswer((prevState) => [
                          ...prevState,
                          { question_id: v.id, answer: "" },
                        ]);
                      });
                    }
                  } else {
                    setCardArrayDuplicateSearch([]);
                    setSelectedCardData([]);
                  }
                }
              } else {
                setCardArray([]);
                setCardArrayDuplicate([]);
                setSelectedCardData([]);
                setCardArrayDuplicateSearch([]);
              }
            } else {
              setCardArray([]);
              setCardArrayDuplicate([]);
              setSelectedCardData([]);
              setCardArrayDuplicateSearch([]);
            }
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CommonContext.Provider
      value={{
        cardArray,setCardArray,
        FilterArray,setFilterArray,
        selectedCardData,setSelectedCardData,
        gettingResponse,setGettingResponse,
        cardArrayDuplicate,setCardArrayDuplicate,
        selectedSkeleton,setSelectedSkeleton,
        answers,setAnswer,
        refreshId,setRefreshId,
        refreshAction,setRefreshAction,
        applyFilterResponse,setapplyFilterResponse,
        cardArrayDuplicateSearch,setCardArrayDuplicateSearch,
        selectedCardIndex,setSelectedCardIndex,
        searchInput,setSearchInput,
        isSmallDevice,setIsSmallDevice,
        getHomeAll,
        RecordsPerPage,
        jobcardId,setJobcardId,
        selectedCardPath,setSelectedCardPath,
        getRecommendedData,
        profilePicture,setProfilePicture,
        selectedCarrdLink,setSelectedCardLink,
        getSavedDatas,
        reCall,setRecall,
        skillData,setSkillData,
        locationData,setLocationData,
        sectorData,setSectorData,
        specialisationData,setSpecialisationData,
        disableProfilePictureDelete,setDisableProfilePictureDelete,
        currentPage,setCurrentPage,
        reCallId,setRecallID,
        isProfilePictureUploaded,setIsProfilePictureUploaded,
        editLocation,setEditLocation,
        applyFilterCount,setApplyFilterCount,
        handleApplyFilter,
        filteringObject,setFilteringObject,
        filterRefreshId,setFilterRefreshId,
        recommendedRefreshId,setRecommendedRefreshId,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export default CommonContext;
