import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FinalSubsPayment } from "../../services/Apis";
import HeaderLayout from "../../components/HeaderLayout";
// import { toast } from "react-toastify"; 

const MAX_FILE_SIZE = 750 * 1024; 

function BharatKoshForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { userData, cartItems, grandTotal, totalGST, totalSubscriptionCharges } = location.state || {};

  const [formData, setFormData] = useState({
    subs_recieptNo: "",  // Transaction Ref. No.
    subs_recieptAmt: "", // Amount
    name: userData.name, // Depositor Name
    email: userData.email, // Depositor Email
    mobile: userData.mobile, // Depositor Mobile
    address: userData.address, // Depositor Address
    state_id: userData.state_id, // State
    gstInvoice: "", // Yes/No
    region_name: userData.region,
    cors_plan: cartItems.cors_plan,
    sub_gst: cartItems.GST_amt === totalGST ? cartItems.GST_amt : totalGST,
    subscription_charges: cartItems.subscription_plan === totalSubscriptionCharges ? cartItems.subscription_plan : totalSubscriptionCharges,
    GST_name: "",
    GST_number: "",
    path_sub_pdf: null,  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > MAX_FILE_SIZE) {
      alert("File size exceeds the maximum allowed size of 750 KB.");
      return;
    }

    setFormData({
      ...formData,
      path_sub_pdf: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("subs_recieptNo", formData.subs_recieptNo);
    data.append("subs_recieptAmt", formData.subs_recieptAmt);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("mobile", formData.mobile);
    data.append("address", formData.address);
    data.append("state_id", formData.state_id);
    data.append("gstInvoice", formData.gstInvoice);

    if (formData.path_sub_pdf) {
      data.append("path_sub_pdf", formData.path_sub_pdf);
    }

    data.append("subscription_charges", formData.subscription_charges);
    data.append("sub_gst", formData.sub_gst);
    data.append("cors_plan", formData.cors_plan);
    data.append("userId", userData.userId);
    data.append("region_name", userData.region_name);

    try {
      const response = await FinalSubsPayment(data);
      console.log(response.data)

      if (response.data.success === true) {
        let ack_no = response.data.data.ack_no;

        // toast.success("Form submitted successfully!");
        navigate("/subs-success", { state: { ack_no } });
      }
    } catch (error) {
      console.error("Error:", error);
      // toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <HeaderLayout>
      <div className="container mt-5">
        <div className="text-success fw-bold text-center mb-3">
          <span className="check-icon text-success">&#10003;</span> Terms and Conditions Accepted!
        </div>

        <form onSubmit={handleSubmit}>
          <h4 className="text-primary text-center mb-4">Depositor and BharatKosh Payment Details</h4>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Upload Bharatkosh Receipt <span className="text-danger">(* PDF file Only!)</span></label>
                <input type="file" className="form-control" accept="application/pdf" onChange={handleFileChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">Enter Transaction Ref. No. (As per Bharatkosh Receipt)</label>
                <input type="text" className="form-control" name="subs_recieptNo" placeholder="Enter Reference Number" value={formData.subs_recieptNo} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Enter Amount</label>
                <input type="number" className="form-control" name="subs_recieptAmt" value={formData.subs_recieptAmt} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Depositor Name</label>
                <input type="text" className="form-control" name="name" value={formData.name} readOnly />
              </div>

              <div className="mb-3">
                <label className="form-label">Depositor Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} readOnly />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Depositor Mobile</label>
                <input type="tel" className="form-control" name="mobile" value={formData.mobile} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">Depositor Address</label>
                <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">State</label>
                <input type="text" className="form-control" name="state_id" value={formData.state_id} readOnly />
              </div>

              <div className="mb-3">
                <label className="form-label">Do you want GST invoice?</label>
                <select className="form-select" name="gstInvoice" value={formData.gstInvoice} onChange={handleChange}>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              {formData.gstInvoice === "Yes" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Name as per GST</label>
                    <input type="text" className="form-control" name="GST_name" value={formData.GST_name} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">GST Number</label>
                    <input type="text" className="form-control" name="GST_number" value={formData.GST_number} onChange={handleChange} required />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </HeaderLayout>
  );
}

export default BharatKoshForm;



// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {FinalSubsPayment} from "../../services/Apis"
// import HeaderLayout from "../../components/HeaderLayout";

// function BharatKoshForm() {
//   const navigate = useNavigate()
//   const location = useLocation();

//   const { userData, cartItems, grandTotal, totalGST, totalSubscriptionCharges } = location.state || {};



//   const [formData, setFormData] = useState({
//     subs_recieptNo: "",  //transactionRefNo
//     subs_recieptAmt: "",         //amount
//     name: userData.name,         //depositorName:
//     email: userData.email,  //depositorEmail
//     mobile: userData.mobile,  //depositorMobile
//     address: userData.address,  //depositorAddress
//     state_id: userData.state_id,  //state
//     gstInvoice: "",  //yes/no
//     region_name: userData.region,
//     cors_plan: cartItems.cors_plan,
//     sub_gst: cartItems.GST_amt === totalGST ? cartItems.GST_amt : totalGST,
//     subscription_charges: cartItems.subscription_plan === totalSubscriptionCharges ? cartItems.subscription_plan : totalSubscriptionCharges,

//     GST_name: "",
//     GST_number: "",
//     path_sub_pdf: null,   //pdf
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       path_sub_pdf: e.target.files[0],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("subs_recieptNo", formData.subs_recieptNo);
//     data.append("subs_recieptAmt", formData.subs_recieptAmt);
//     data.append("name", formData.name);
//     data.append("email", formData.email);
//     data.append("mobile", formData.mobile);
//     data.append("address", formData.address);
//     data.append("state_id", formData.state_id);
//     data.append("gstInvoice", formData.gstInvoice);
//     if (formData.path_sub_pdf) {
//       data.append("path_sub_pdf", formData.path_sub_pdf);
//     }
//     data.append("subscription_charges", formData.subscription_charges);
//     data.append("sub_gst", formData.sub_gst);
//     data.append("cors_plan", formData.cors_plan);
//     data.append("userId", userData.userId);
//     data.append("region_name", userData.region_name);






//     try {
//       const response = await FinalSubsPayment(data)

//       if (response.data.data.success === true) {
//         let ack_no = response.data.data.ack_no

//         toast.success("Form submitted successfully!");
//         navigate("/subs-success", { state: { ack_no } })

//         console.log(response.data);
//       } 
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <HeaderLayout>
//     <div className="container mt-5">
//       <div className="text-success fw-bold text-center mb-3">
//         <span className="check-icon text-success">&#10003;</span>Terms and Conditions Accepted!
//       </div>

//       <form onSubmit={handleSubmit}>
//         <h4 className="text-primary text-center mb-4">Depositor and BharatKosh Payment Details</h4>

//         <div className="row">
//           <div className="col-md-6">
//             <div className="mb-3">
//               <label className="form-label">Upload Bharatkosh Receipt <span className="text-danger">(* PDF file Only!)</span></label>
//               <input type="file" className="form-control" accept="application/pdf" onChange={handleFileChange} />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Enter Transaction Ref. No. (As per Bharatkosh Receipt)</label>
//               <input type="text" className="form-control" name="subs_recieptNo" placeholder="Enter Reference Number" value={formData.subs_recieptNo} onChange={handleChange} required />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Enter Amount</label>
//               <input type="number" className="form-control" name="subs_recieptAmt" value={formData.subs_recieptAmt}  onChange={handleChange} required />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Depositor Name</label>
//               <input type="text" className="form-control" name="name" value={formData.name} readOnly />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Depositor Email</label>
//               <input type="email" className="form-control" name="email" value={formData.email} readOnly />
//             </div>
//           </div>

//           <div className="col-md-6">
//             <div className="mb-3">
//               <label className="form-label">Depositor Mobile</label>
//               <input type="tel" className="form-control" name="mobile" value={formData.mobile} onChange={handleChange} />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Depositor Address</label>
//               <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">State</label>
//               <input type="text" className="form-control" name="state_id" value={formData.state_id} readOnly />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Do you want GST invoice?</label>
//               <select className="form-select" name="gstInvoice" value={formData.gstInvoice} onChange={handleChange}>
//                 <option value="No">No</option>
//                 <option value="Yes">Yes</option>
//               </select>
//             </div>
//             {formData.gstInvoice === "Yes" ?
//               (<> <div className="mb-3">
//                 <label className="form-label">Name as per Gst</label>
//                 <input type="text" className="form-control" name="depositorMobile" value={formData.GST_name} onChange={handleChange} required />
//               </div>
//                 <div className="mb-3">
//                   <label className="form-label">Gst Number</label>
//                   <input type="text" className="form-control" name="depositorMobile" value={formData.GST_number} onChange={handleChange}  required/>
//                 </div>  </>) : ""

//             }
//           </div>
//         </div>

//         <div className="text-center mt-4">
//           {/* <Link to={"/"} > */}
//           <button type="submit" className="btn btn-primary">Submit</button>
//           {/* </Link> */}
//         </div>
//       </form>
//     </div>
//     </HeaderLayout>

//   );
// }

// export default BharatKoshForm;






// import React, { useEffect, useState } from "react";
// import HeaderLayout from "../../components/HeaderLayout";
// import { useParams } from "react-router-dom";


// const SelectedPlans = () => {
//     const { sno } = useParams();

//     const [cartItems, setCartItems] = useState([]);


//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await acceptedData(sno);
//                 setFormData(response.data.Data);
//                 console.log(response.data.Data)
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//             }
//         };
//         fetchData();
//     }, [sno]);

//     // const totalSubscriptionCharges = cartItems.reduce((acc, item) => acc + item.subscriptionCharges, 0);
//     // const totalGST = cartItems.reduce((acc, item) => acc + item.gst, 0);
//     // const grandTotal = totalSubscriptionCharges + totalGST;

//     // const handleDelete = (index) => {
//     //     setCartItems(cartItems.filter((_, i) => i !== index));
//     // };

//     return (
//         <HeaderLayout>
//             <div className="container mt-4">
//                 <h3 className="mb-3">Cart Details</h3>
//                 <table className="table table-bordered">
//                     <thead>
//                         <tr style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
//                             <th>Plan</th>
//                             <th>Subscription Charges</th>
//                             <th>GST</th>
//                             <th>Total</th>
//                             <th>Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {cartItems.map((item, index) => (
//                             <tr key={index}>
//                                 <td>{item.plan}</td>
//                                 <td>{item.subscriptionCharges.toFixed(2)}</td>
//                                 <td>{item.gst.toFixed(2)}</td>
//                                 <td>{(item.subscriptionCharges + item.gst).toFixed(2)}</td>
//                                 <td>
//                                     <button
//                                         className="btn btn-link text-danger"
//                                         onClick={() => handleDelete(index)}
//                                     >
//                                         <i className="fa-solid fa-trash-can"></i>

//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                         <tr style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
//                             <td>Total</td>
//                             <td>{totalSubscriptionCharges.toFixed(2)}</td>
//                             <td>{totalGST.toFixed(2)}</td>
//                             <td>{grandTotal.toFixed(2)}</td>
//                             <td></td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <div className="text-center">
//                     <button className="btn btn-primary">Next</button>
//                 </div>
//             </div>
//         </HeaderLayout>
//     );
// };

// export default SelectedPlans;
