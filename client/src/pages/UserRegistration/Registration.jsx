import HeaderLayout from "../../components/HeaderLayout";
import "../general-info.css";
import "../registration.css";
import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { loadCaptchaEnginge, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import toast from 'react-hot-toast';
// import {regiMob} from "../services/Apis"
import {regiMob} from "../../services/Apis"




const Registration = () => {
  const navigate = useNavigate();

  const [region, setRegion] = useState("");
  const [mobile_no, setMobileNo] = useState("");

  // const [token] = useState(""); // Replace this with actual token generation logic
  const [captchaValue, setCaptchaValue] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(null);

  useEffect(() => {
    loadCaptchaEnginge(6, "#ccebff"); 
  }, []);


  const handleCaptchaChange = (e) => {
    setCaptchaValue(e.target.value);
  };


  const handleCaptchaValidation = () => {
    if (validateCaptcha(captchaValue)) {
      setIsCaptchaValid(true);
    } else {
      setIsCaptchaValid(false);
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();


    const data = { region, mobile_no };
    console.log(data)

    try {
        const response = await regiMob(data);
        console.log(response)
        console.log("Form submitted successfully:", response.data);
        localStorage.setItem(`otp`, response.data.otp)
        localStorage.setItem('otpExpiry', response.data.otpExpiry)
        if (response.data.success === true) {
            toast.success(response.data.message)
            navigate('/reg', { state: { region, mobile_no } })

        }
        else if(response.success===false){
          toast.error(response.data.message)

        }


    } catch (error) {
        console.log("Error submitting form:", error);
        // if (error.response.data.success === false) {
        //     toast.error(error.response.data.message)
        // }

    }
};

  const checkMob = (value) => {
    // Perform any validation logic for mobile number here
    console.log("Mobile input value:", value);
  };

  const checkRegion = () => {
    // Function for handling region selection changes
    console.log("Region selected:", region);
  };
  return (
    <>
      <HeaderLayout>
        <div className="container clear">
          <div className="section_heading mx-2">
            <h2 className="title_heading ">CORS Registration</h2>
          </div>
          <div className="row">
            <div className="col-md-6" style={{marginTop:'50px'}}>
              <form
                name="frm1"
                onSubmit={handleSubmit}
                style={{
                  fontSize: "15px",
                  color: "black",
                  padding: "0px 20px",
                }}
              >
                {/* <h5>Select Region</h5>
                <input className="custom_input"  type="hidden" name="token" value={token} /> */}
                <label>Region</label>
                <span className="ic-span">
                  <i className="fa-solid fa-earth-asia fa-xl form-icon"></i>
                  <select
                    name="region"
                    className="custom_input"
                    id="regionID"
                    required
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    // onBlur={checkRegion}
                  >
                    <option value="">Select Region</option>
                    <option value="region-1">Region-1</option>
                    <option value="region-2">Region-2</option>
                  </select>
                </span>
                <br />
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                  to="/images/region.jpg"
                >
                  Click here to know your Region
                </Link>
                <br />
                <HashLink
                  smooth
                  to={"/subscription#cors-services"}
                  className="link"
                >
                  Click here to know the Availability of CORS Services
                </HashLink>
                <br />
                <br />
                <label>Mobile</label>
                <span className="ic-span">
                  <i className="fa-solid fa-mobile-retro fa-xl form-icon"></i>
                  <input className="custom_input" 
                    type="text"
                    name="mobile_no"
                    placeholder="Enter Mobile No for OTP"
                    minLength="10"
                    maxLength="10"
                    required
                    value={mobile_no}
                    onChange={(e) =>
                      setMobileNo(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    // onKeyUp={() => checkMob(mobileNo)}
                  />
                </span>
                <label>Captcha</label>
                <div className="row">
                  <div className="col-md-7">
                    <span className="ic-span">
                      <i className="fa-solid fa-microchip fa-xl form-icon"></i>
                      <input className="custom_input" 
                        type="text"
                        required
                        value={captchaValue}
                        onChange={handleCaptchaChange}
                      />
                    </span>
                  </div>
                  <div className="col-md-5">
                    <LoadCanvasTemplateNoReload className="captcha-canvas" />
                  </div>
                    {isCaptchaValid === false && <p className="text-danger">Captcha is incorrect !!</p>}
                </div>
                <input 
                  type="submit"
                  className="btn custom-sub-btn btn-lg"
                  value="Proceed"
                  id="submit-btn"
                  onClick={handleCaptchaValidation}
                />
              </form>
            </div>
            <div className="col-md-6">
              <div className="mt-4">
                <h5>Documents required during the registration process!</h5>
                <div
                  style={{
                    border: "1px solid #1050a2",
                    padding: "10px 20px",
                    marginTop: "15px",
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius:'10px'
                  }}
                >
                  <p><b>Photo Id Proof:</b> Voter ID/Driving Licence/Aadhar Card/Pan Card.</p>
                  <p><b>Departmental ID card:</b> For Govt and Academics users only.</p>
                  <p><b>Download Annexure Form</b></p>
                  <div style={{overflowX:'auto'}}>
                    <table className="content-table w-100">
                      <thead> 
                        <tr>
                          <th>S.No </th>
                          <th>Annexure Form</th>
                          <th>Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{textAlign:'center'}}> 1.</td>
                          <td>
                            Central / State / U.T. Govt Users
                          </td>
                          <td>
                            <center>
                              <Link to="/policies/govt.pdf" target="_blank">
                                <i className="fa-solid fa-download fa-xl text-success"></i>
                              </Link>
                            </center>
                          </td>
                        </tr>
                        <tr>
                          <td style={{textAlign:'center'}}>2.</td>
                          <td>
                            Private / PSU Users
                          </td>
                          <td>
                            <center>
                              <Link to="/policies/private.pdf" target="_blank">
                                <i className="fa-solid fa-download fa-xl text-success"></i>
                              </Link>
                            </center>
                          </td>
                        </tr>
                        <tr>
                          <td style={{textAlign:'center'}}>3.</td>
                          <td>
                            Academic / Institutional Users
                          </td>
                          <td>
                            <center>
                              <Link to="/policies/academic.pdf" target="_blank">
                                <i className="fa-solid fa-download fa-xl text-success"></i>
                              </Link>
                            </center>
                          </td>
                        </tr>
                      </tbody>
                    </table>                   
                  </div>
                  <p className="text-danger" style={{ marginTop: "15px",fontSize:'15px' }}>
                    * Please download and fill the details in the annexure form
                    for further process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeaderLayout>
    </>
  );
};

export default Registration;
