import React, { useState } from 'react';
import { UserRegister } from "../../services/Apis"
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from "react-router-dom";
import HeaderLayout from '../../components/HeaderLayout';

// import { Link } from 'react-router-dom'


// const API_URL = `http://localhost:8000/api/addUser/cors-register`;

const RegistrationForm = () => {
    const location = useLocation();
    const navigate = useNavigate();


    const { region, mobile_no } = location.state || {};

    const [files, setFiles] = useState({
        idtype_doc: null,
        upload_annexure: null,
        usertype_doc: null,
    });
    const [loginData, setLoginData] = useState({
        region: region,
        mobile_no: mobile_no,
        // region: "",
        // mobile_no:"",
        name: '',
        company_name: '',
        email: '',
        address: '',
        district: '',
        state: '',
        pincode: '',
        usertype: '',
        photo_id_type: '',
        category: '',
        idtype_doc: '',
        usertype_doc: '',
        emptype: '',
        upload_annexure: '',
    });

    // const handleChange = (e) => {
    //     const { name, value, files } = e.target;
    //     setLoginData({
    //         ...loginData,
    //         [name]: files ? files[0] : value,
    //     });
    // };



    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        Object.keys(loginData).forEach((key) => form.append(key, loginData[key]));
        Object.keys(files).forEach((key) => {
            if (files[key]) form.append(key, files[key]);
        });
        try {
            const response = await UserRegister(form)

            console.log(response.data);
            setLoginData({
                region: '',
                mobile_no: '',
                name: '',
                company_name: '',
                email: '',
                address: '',
                district: '',
                state: '',
                pincode: '',
                usertype: '',
                photo_id_type: '',
                category: '',
                idtype_doc: '',
                usertype_doc: '',
                emptype: '',
                upload_annexure: '',
            });
            if (response.data.success === true) {
                // funSuccess(response.data.data.application_no)
                let appNum = response.data.data.application_no
                toast.success(response.data.message || "Data submitted successfully!!!");
                navigate('/register-success', { state: { appNum } })

            }
        } catch (error) {
            console.error(error);
            toast.error("Submission failed");
        }
    };

    const renderPrivateUserForm = () => (
        <>
            <div className="mb-3">
                <label className="form-label">Photo ID Type</label>
                <select
                    className="form-select"
                    name="photo_id_type"
                    value={loginData.photo_id_type}
                    onChange={handleChange}
                >
                    <option>Select Photo ID Type</option>
                    <option value="Aadhar">Aadhar</option>
                    <option value="PAN">PAN</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Upload Photo ID Proof</label>
                <input
                    type="file"
                    className="form-control"
                    name="idtype_doc"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Upload Annexure</label>
                <input
                    type="file"
                    className="form-control"
                    name="upload_annexure"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                />
                <a href="#" className="text-decoration-none">Download Annexure Form</a>
            </div>
        </>
    );

    const renderGovtOrAcademicUserForm = () => (
        <>
            <div className="mb-3">
                <label className="form-label">Employee Type</label>
                <select
                    className="form-select"
                    name="emptype"
                    value={loginData.emptype}
                    onChange={handleChange}
                >
                    <option>Select</option>
                    <option value="Regular Employee">Regular Employee</option>
                    <option value="Hired directly on Payroll">Hired directly on Payroll</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Photo ID Type</label>
                <select
                    className="form-select"
                    name="photo_id_type"
                    value={loginData.photo_id_type}
                    onChange={handleChange}
                >
                    <option>Select Photo ID Type</option>
                    <option value="Aadhar">Aadhar</option>
                    <option value="PAN">PAN</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Upload Photo ID Proof</label>
                <input
                    type="file"
                    className="form-control"
                    name="idtype_doc"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Department ID card</label>
                <input
                    type="file"
                    className="form-control"
                    name="usertype_doc"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Upload Annexure</label>
                <input
                    type="file"
                    className="form-control"
                    name="upload_annexure"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                />
                <a to="#" className="text-decoration-none">Download Annexure Form</a>
            </div>
        </>
    );

    return (
        <HeaderLayout>
            <div className="container mt-5">
                <h3>CORS Registration Form</h3>
                <p className="text-muted">Personal Information</p>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Region</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="region"
                                    value={loginData.region}
                                    onChange={handleChange}
                                    // disabled
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Mobile</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="mobile_no"
                                    value={loginData.mobile_no}
                                    onChange={handleChange}
                                    // disabled

                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={loginData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Company/Institute/Organization Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="company_name"
                                    value={loginData.company_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    value={loginData.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">District</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="district"
                                    value={loginData.district}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">State</label>
                                <select
                                    className="form-select"
                                    name="state"
                                    value={loginData.state}
                                    onChange={handleChange}
                                >
                                    <option>Select State</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="West Bengal">West Bengal</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Pincode</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="pincode"
                                    value={loginData.pincode}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">User Type</label>
                                <select
                                    className="form-select"
                                    name="usertype"
                                    value={loginData.usertype}
                                    onChange={handleChange}
                                >
                                    <option>Select User Type</option>
                                    <option value="Govt User">Government</option>
                                    <option value="Research/Academic User">Research/Academic User</option>
                                    <option value="Private User">Private</option>
                                </select>
                            </div>
                            {loginData.usertype === 'Private User'
                                ? renderPrivateUserForm()
                                : renderGovtOrAcademicUserForm()}

                            <div className="mb-3">
                                <label className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    name="category"
                                    value={loginData.category}
                                    onChange={handleChange}
                                >
                                    <option>Select Category</option>
                                    <option value="Category1">Category 1</option>
                                    <option value="Category2">Category 2</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-30">Submit</button>
                </form>
            </div>
        </HeaderLayout>
    );
};

export default RegistrationForm;















