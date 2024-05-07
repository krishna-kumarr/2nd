import React, { useContext, useEffect, useState } from "react";
import CardWithImage from "../../components/Cards/CardWithImage";
import { FaDownload } from "react-icons/fa";
import axios from "axios";

const LearningPage = () => {
  const learningCards = ["dummy"];

  const [learningData, setLearningData] = useState([]);
  const [learningLoading, setlearningLoading] = useState(false);
  const [modalApiContent, setModalApiContent] = useState([]);

  const token = localStorage.getItem("Token");

  useEffect(() => {
    setModalApiContent([]);
    setlearningLoading(false);

    const getlearningDatas = async () => {
      try {
        await axios({
          method: "get",
          url: "https://api.2ndcareers.com/professional_learning",
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
          console.log(response.data.data);

            setlearningLoading(true);

            // getModalData();
            if (response.data.error_code === 0) {
              setLearningData(response.data.data);
            }
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };
    (async () => getlearningDatas())();
  }, []);

  const getModalData = async (modalId) => {
    let learningParams = {
      id: modalId,
    };
    try {
      await axios
        .post(
          "https://api.2ndcareers.com/get_detailed_description_learning",
          learningParams,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.data);
          setModalApiContent(response.data.data[0].detailed_description);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
        <div className="learning-page-height learning-page-bg overflow-scroll">
          <div className="container pt-5">
            {learningLoading ? (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-0 mb-4">
                {learningData.map((value, index) => {
                  return (
                    <div className="col" key={index}>
                      <CardWithImage
                        cardImage={value.image}
                        cardTitle={value.title}
                        cardTitleStyle="learningTitle"
                        imageClassName="rounded-4 img-fluid learning-img-height"
                        cardText={value.short_description}
                        cardKey={index}
                        cardParaTestId="professionalTestId"
                        cardButtonTestId="cardButton"
                        role="learningAndCommunity"
                        firstButton_Name="Download"
                        secondButton_Name="Learn"
                        icon={<FaDownload className="me-2" />}
                        firstCardColor="outline-secondary"
                        secondCardColor="brand-color"
                        modalContent={modalApiContent}
                        leftLearnUrl={value.attached_file}
                        rightLearnUrl={value.url}
                        getModalData={getModalData}
                        modalId={value.id}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              learningCards.map((v, i) => {
                return (
                  <div className="col-12 col-md-6 col-lg-4" key={i}>
                    <div
                      className="card border-0 p-0 rounded-3 overflow-hidden placeholder-glow"
                      aria-hidden="true"
                      key={i}
                    >
                      <div className="col-12">
                        <span className="placeholder col-12 py-4 rounded-top"></span>
                        <span className="placeholder col-12 py-4"></span>
                        <span className="placeholder col-12 py-4"></span>
                        <span className="placeholder col-12 py-4 rounded-bottom"></span>
                      </div>
                      <div className="card-body p-0">
                        <div className="p-3 py-4">
                          <h5 className="card-title ">
                            <span className="placeholder col-6 py-3 rounded-3"></span>
                          </h5>
                          <p className="card-text">
                            <span className="placeholder col-12 py-2 rounded "></span>
                            <span className="placeholder col-12 py-2 rounded"></span>
                            <span className="placeholder col-12 py-2 rounded"></span>
                            <span className="placeholder col-8 py-2 rounded"></span>
                          </p>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                          <button className="btn btn-outline-secondary placeholder col-5"></button>
                          <button className="btn btn-outline-secondary placeholder col-5"></button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
    </>
  );
};

export default LearningPage;
