import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { acceptedData, updateUser } from "../../services/Apis"
import toast from 'react-hot-toast';
import Sidebar from '../layout/Sidebar';
import { BACKEND_URL } from "../../services/Helper";



const ApprovedForm = () => {
    const navigate = useNavigate();
    const { sno } = useParams();

    const [formData, setFormData] = useState({
        username: '',
        is_rejected: '',
        password: '',
        rejected_reason: '',
        application_no: '',
        mobile_no: '',
        region: '',
        photo_id_type: '',
        address: '',
        state: '',
        name: '',
        email: '',
        usertype: '',
        company_name: '',
        district: '',
        pincode: '',
        emptype: '',
        category: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await acceptedData(sno);
                setFormData(response.data.Data);
                console.log(response.data.Data)
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, [sno]);

    const getAndUpdateUser = async (isUpdate = false) => {
        try {
            const response = await updateUser(
                isUpdate ? formData : {}, sno
            );
            console.log(response.data)

            if (response.data.success === true) {
                if (isUpdate) {
                    toast.success(response.data.message);

                    navigate('/admin/dashboard');
                }
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getAndUpdateUser(true);
    };



    const renderPrivateUserData = () => (
        <div className="row">
            <div className="col-md-6">
                <div className="mb-3">
                    <label>Username:</label>
                    <input
                        name='username'
                        type="text"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Update Status:</label>
                    <select
                        className="form-select"
                        name="is_rejected"
                        value={formData.is_rejected}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label>Photo ID Proof:</label>
                    <Link to={`${BACKEND_URL}/public/users/${formData.idtype_doc}`} target="_blank">View Document</Link>  public/users


                </div>
                <div className="mb-3">
                    <label>Annexure:</label>
                    <Link to={`${BACKEND_URL}/public/users/${formData.upload_annexure}`} target="_blank">View Document</Link>

                </div>
                {formData.is_rejected === "Rejected" ?
                    (<div className="mb-3 col-md-6">
                        <label className="form-label">Reason:</label>
                        <select
                            className="form-select"
                            name="rejected_reason"
                            value={formData.rejected_reason}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Uploaded documents do not match with applicant details">Uploaded documents do not match with applicant details</option>
                            <option value="Uploaded documents are not legible">Uploaded documents are not legible</option>
                            <option value="Uploaded undertaking is not signed by applicant">Uploaded undertaking is not signed by applicant</option>
                            <option value="Uploaded undertaking is not countersigned by competent authority">Uploaded undertaking is not countersigned by competent authority</option>
                            <option value="Applicant do not qualify as Indian entity">Applicant do not qualify as Indian entity</option>
                            <option value="Uploaded documents are not proper">Uploaded documents are not proper</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Rejected">Rejected</option>

                        </select>
                    </div>)
                    : ''}

            </div>

            <div className="col-md-6">

                <div className="mb-3">
                    <label>Password:</label>
                    <input type="password" className="form-control" value={formData.password} name='password' onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Industry Type:</label>
                    <input type="text" className="form-control" value={formData.category} name='category' onChange={handleChange} readOnly />
                </div>

            </div>

        </div>

    );

    const renderGovernmentUserData = () => (
        <div className="row">
            <div className="col-md-6">
                <div className="mb-3">
                    <label>Username:</label>
                    <input
                        name='username'
                        type="text"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Update Status:</label>
                    <select
                        className="form-select"
                        name="is_rejected"
                        value={formData.is_rejected}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label>Photo ID Proof:</label>
                    <Link to={`${BACKEND_URL}/public/users/${formData.idtype_doc}`} target="_blank">View Document</Link>


                </div>
                <div className="mb-3">
                    <label>Annexure:</label>
                    <Link to={`${BACKEND_URL}/public/users/${formData.upload_annexure}`} target="_blank">View Document</Link>

                </div>
                {formData.is_rejected === "Rejected" ?
                    (<div className="mb-3 col-md-6">
                        <label className="form-label">Reason:</label>
                        <select
                            className="form-select"
                            name="rejected_reason"
                            value={formData.rejected_reason}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Uploaded documents do not match with applicant details">Uploaded documents do not match with applicant details</option>
                            <option value="Uploaded documents are not legible">Uploaded documents are not legible</option>
                            <option value="Uploaded undertaking is not signed by applicant">Uploaded undertaking is not signed by applicant</option>
                            <option value="Uploaded undertaking is not countersigned by competent authority">Uploaded undertaking is not countersigned by competent authority</option>
                            <option value="Applicant do not qualify as Indian entity">Applicant do not qualify as Indian entity</option>
                            <option value="Uploaded documents are not proper">Uploaded documents are not proper</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Rejected">Rejected</option>

                        </select>
                        {/* <textarea className="form-control" rows={2} value={formData. rejected_reason} name='address' onChange={handleChange} readOnly /> */}
                    </div>)
                    : ''}

            </div>

            <div className="col-md-6">
                <div className="mb-3">
                    <label>Employee Type:</label>
                    <input type="text" className="form-control" value={formData.emptype} name='emptype' onChange={handleChange} readOnly />
                </div>
                <div className="mb-3">
                    <label>Password:</label>
                    <input type="password" className="form-control" value={formData.password} name='password' onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Industry Type:</label>
                    <input type="text" className="form-control" value={formData.category} name='category' onChange={handleChange} readOnly />
                </div>
                <div className="mb-3">
                    <label>Dep.Id Card:</label>
                    <Link to={`${BACKEND_URL}/public/users/${formData.usertype_doc}`} target="_blank">View Document</Link>


                </div>
            </div>

        </div>
    );

    return (
        <Sidebar>
            <div className="container my-4">

                <h3 className="text-success mb-4">Approved</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label>Application No:</label>
                                <input type="text" className="form-control"
                                    name="application_no"
                                    value={formData.application_no}
                                    onChange={handleChange}
                                    readOnly />
                            </div>
                            <div className="mb-3">
                                <label>Mobile No:</label>
                                <input type="text" className="form-control"
                                    name="mobile_no"
                                    value={formData.mobile_no}
                                    onChange={handleChange}
                                    readOnly />
                            </div>
                            <div className="mb-3">
                                <label>Region:</label>
                                <input type="text" className="form-control" value={formData.region} name="region" onChange={handleChange} readOnly />
                            </div>
                            <div className="mb-3">
                                <label>ID Type:</label>
                                <input type="text" className="form-control" value={formData.photo_id_type} name='photo_id_type' onChange={handleChange} readOnly />
                            </div>
                            <div className="mb-3">
                                <label>Address:</label>
                                <textarea className="form-control" rows={2} value={formData.address} name='address' onChange={handleChange} readOnly />
                            </div>
                            <div className="mb-3">
                                <label>State:</label>
                                <input type="text" className="form-control" value={formData.state} name='state' onChange={handleChange} readOnly />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label>Name:</label>
                                <input type="text" className="form-control" value={formData.name} name='name' onChange={handleChange} readOnly />
                            </div>
                            <div className="mb-3">
                                <label>Email ID:</label>
                                <input type="email" className="form-control" value={formData.email} name='email' onChange={handleChange} readOnly />
                            </div>
                            <div className="mb-3">
                                <label>User Type:</label>
                                <input type="text" className="form-control" value={formData.usertype} name='usertype' onChange={handleChange} readOnly />
                            </div>
                            <div className="mb-3">
                                <label>Org Name:</label>
                                <input type="text" className="form-control" value={formData.company_name} name='company_name' onChange={handleChange} readOnly />
                            </div>
                            <div className="mb-3">
                                <label>District:</label>
                                <input type="text" className="form-control" value={formData.district} name='district' onChange={handleChange} readOnly />
                            </div>
                            <div className="mb-3">
                                <label>Pin Code:</label>
                                <input type="text" className="form-control" value={formData.pincode} name='pincode' onChange={handleChange} readOnly />
                            </div>
                        </div>
                    </div>

                    {formData.usertype === 'Private User' ? renderPrivateUserData() : renderGovernmentUserData()}

                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/admin/dashboard')}>
                        Cancel
                    </button>
                </form>

            </div>
        </Sidebar>
    );
};

export default ApprovedForm;






















