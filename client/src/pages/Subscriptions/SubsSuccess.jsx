import React from 'react'
import { useLocation } from "react-router-dom";
import HeaderLayout from '../../components/HeaderLayout';

const SubsSuccess = () => {
    const location = useLocation();
    const { ack_no } = location.state || {};


    return (
        <HeaderLayout>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center mb-4">CORS SErvices Subscription Plan!</h2>
                        <div className="card p-4 success-card">
                            <div className="row align-items-center">
                                <div className="col-2 text-center">
                                    <span className="check-icon text-success">&#10003;</span>
                                </div>
                                <div className="col-10">
                                    <h4>Submitted Successful!</h4>
                                    <p className="mb-0">
                                        Your order for the purchase of CORS Product Services has been submitted successfully.
                                        The order Acknowledgement Number is <strong>{ack_no}</strong>.
                                        Please Keep this number for future correspondence.
                                        On successful verification of payment details,your subscription will be activated
                                        within 24 working hours.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HeaderLayout>

    )
}

export default SubsSuccess