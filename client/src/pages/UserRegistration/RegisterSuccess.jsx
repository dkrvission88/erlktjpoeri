import React from 'react'
import { useLocation } from "react-router-dom";

import './registrationForm.css'
import HeaderLayout from '../../components/HeaderLayout';


const RegisterSuccess = () => {
    const location = useLocation();
    const { appNum } = location.state || {};


    return (
        <>
            <HeaderLayout>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <h2 className="text-center mb-4">Thanks for Registration!</h2>
                            <div className="card p-4 success-card">
                                <div className="row align-items-center">
                                    <div className="col-2 text-center">
                                        <span className="check-icon text-success">&#10003;</span>
                                    </div>
                                    <div className="col-10">
                                        <h4>Registration Successful!</h4>
                                        <p className="mb-0">
                                            Your application for CORS Services is submitted successfully.
                                            Your application no is <strong>{appNum}</strong>.
                                            Keep this number for future correspondence regarding your application.
                                            On successful verification of documents, your account will be activated
                                            within 24 working hours.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </HeaderLayout>

        </>

    )
}

export default RegisterSuccess