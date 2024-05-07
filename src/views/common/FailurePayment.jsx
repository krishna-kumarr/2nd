import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


const FailurePayment = () => {
  const [message, setMessage] = useState("");

  const [timeLeft, setTimeLeft] = useState(null);
  useEffect(() => {
    
    if (timeLeft === 0) {
      setTimeLeft(null);
      return navigate("/professional/home/all_jobs", { replace: true })
      // Navigate("/professional/home/all_jobs", { replace: true });
      
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
    
  }, [timeLeft]);

  const navigate = useNavigate();

  const from = "professional/home/all_jobs";

  const getUserPaymentStatus = async (id) => {
    const getCheckOutParameter = {
      flag: "failure",
      id: id,
    };

    try {
      await axios
        .post(
          "https://devapi.2ndcareers.com/update_checkout_status",
          getCheckOutParameter
        )
        .then((response) => {
          if (response.data.error_code === 0) {
            setMessage(response.data.message);
            setTimeLeft(10)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  if (id !== null) {
    console.log(id);
    var uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
      var clean_uri = uri.substring(0, uri.indexOf("?"));
      window.history.replaceState({}, document.title, clean_uri);
    }
    getUserPaymentStatus(id);
  }
  return (
    <section className="container text-center">
      <section className="row align-items-center justify-content-center vh-100">
        <div className="email-verified ">
          <h1 className="text-danger symbolSize">
            <FaRegCircleXmark />
          </h1>
          <h3>Payment Failed</h3>
          <p>{message}</p>
          <p>You will be redirected into home page within {timeLeft}s</p>
          <p>
            Back to
            <a
              href="https://devapp.2ndcareers.com/professional/home/all_jobs"
              className="link brand-color fw-bold ms-2"
            >
              2nd Careers portal
            </a>
          </p>
        </div>
      </section>
    </section>
  );
};

export default FailurePayment;
