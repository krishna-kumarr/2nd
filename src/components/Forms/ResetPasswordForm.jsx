import React, { useRef, useState } from "react";
import Button from "../Button/Button";
import Label from "../Label/Label";
import InputGroup from "../Input/InputGroup";
import Input from "../Input/Input";
import { PiEnvelopeSimpleOpenThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import toast from "react-hot-toast";



const ResetPasswordForm = () => {
  const pageNavigate = useNavigate();
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({});
  const resetFormRef = useRef();
  const [loading, setLoading] = useState(false)

  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit(e)
    }
  }



  const handleSubmit = async (e) => {
   
    e.preventDefault()
    setErrors({})
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email address is required."
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      newErrors.email = 'Invalid email format.';
    }


    if (Object.keys(newErrors).length === 0) {      
      setLoading(true)
      try {


          await axios.post("https://devapi.2ndcareers.com/forgot_password", {
            email_id:email
          }, {
            headers:{
              Authorization: `Bearer ${localStorage.getItem("Token")}`
            }
          })
          .then((response) => {
            
            if(response.data.error_code === 0){
              toast.success(response.data.message);  
              // setEmail("")
              resetFormRef.current.reset();
              resetFormRef.current.value = ""
              setEmail("")

            }else {
              toast.error(response.data.message)
            }
          }).catch((error) => {
            console.log(error)
          })
          .finally(()=>{
            setLoading(false)
          })
      }catch(err){
        console.log(err)
      }
      // toast.success('An Email with a link has been sent to your Inbox to change the password')
      // setTimeout(() => {
      //   pageNavigate("/reset-password")
      // }, 3000)
    } else {
      setErrors(newErrors);
    }
  }




  return (
    <form onSubmit={handleSubmit} ref={resetFormRef}>

      <div className="input-group mb-3 login-form">
        <InputGroup
          className="login-input-group-text input-group-text border border-0"
          id="basic-addon1"
          reIcons={<PiEnvelopeSimpleOpenThin className="fs-3" />}
        />
        <Input
          type="text"
          className="form-control login-input border border-0 rounded-3"
          placeHolder="Email ID"
          ariaLabel="email"
          id="reset-email"
          testId="reset-email"
          name="email_id"
          functionOnchange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <Label className="py-2 text-danger col-12" title={errors.email} />}
      </div>

      <div className="d-grid mt-3">
        <Button
          className="btn btn-lg  btn-login fw-bold mb-2"
          title="Reset password"
          buttonType="submit"
          id="reset-button"
          testId="reset-button"
          disable={loading}
          btnKeyDown={handlekeydown}
        />
      </div>

    </form>
  );
};

export default ResetPasswordForm;
