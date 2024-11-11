import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function UserProfilePlans() {
    const navigate=useNavigate()
    const location = useLocation();
    const { cartItems, grandTotal,totalGST,totalSubscriptionCharges } = location.state || {};

  const [userData, setUserData] = useState({
    name: "",
    state_id:"",
    address: "",
    email: "",
    region: "",
    userId:"",
    pinCode:"",
    mobile:"",
    company:"",
  });


//   useEffect(() => {
//     const savedUserData = JSON.parse(localStorage.getItem("userProfile"));
//     if (savedUserData) {
//       setUserData({
//         name:savedUserData.name,
//         state_id:savedUserData.state,
//         address:savedUserData.address,
//         email:savedUserData.email,
//         region:savedUserData.region,
//         userId:savedUserData.username,
//         pinCode:savedUserData.pincode,
//         mobile:savedUserData.mobile_no,
//         company:savedUserData.company_name,
// });
//     }
//   }, []);

useEffect(() => {
  const savedUserData = localStorage.getItem("userProfile");
  if (savedUserData) {
    try {
      const parsedUserData = JSON.parse(savedUserData);
      setUserData({
        name: parsedUserData.name || '',
        state_id: parsedUserData.state || '',
        address: parsedUserData.address || '',
        email: parsedUserData.email || '',
        region: parsedUserData.region || '',
        userId: parsedUserData.username || '',
        pinCode: parsedUserData.pincode || '',
        mobile: parsedUserData.mobile_no || '',
        company: parsedUserData.company_name || ''
      });
    } catch (error) {
      console.error("Error parsing user profile data from localStorage:", error);
    }
  }
}, []);


    

const handleDataSend=()=>{
    navigate('/subscription1/selectP',  {state: {userData,cartItems, grandTotal,totalGST,totalSubscriptionCharges}})
}



  return (
    <div className="container mt-5">
      <h2 className="text-primary">
        <i className="bi bi-card-heading"></i> CORS Subscription Plan
      </h2>
      <h5 className="mt-4">User Profile</h5>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td><strong>Name:</strong></td>
            <td>{userData.name}</td>
            <td><strong>Region:</strong></td>
            <td>{userData.region}</td>
            <td><strong>User Id:</strong></td>
            <td>{userData.userId}</td>
          </tr>
          <tr>
            <td><strong>State:</strong></td>
            <td>{userData.state_id}</td>
            <td><strong>Pin Code:</strong></td>
            <td>{userData.pinCode}</td>
          </tr>
          <tr>
            <td><strong>Address:</strong></td>
            <td>{userData.address}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{userData.email}</td>
            <td><strong>Mobile:</strong></td>
            <td>{userData.mobile}</td>
            <td><strong>Company:</strong></td>
            <td>{userData.company}</td>
          </tr>
        </tbody>
      </table>

      <h5 className="mt-4">Selected Subscription Plan</h5>
      <table className="table table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>S.No</th>
            <th>Plan</th>
            <th>Description</th>
            <th>Subscription Charges</th>
            <th>GST</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((plan, index) => (
            <tr key={plan.id}>
              <td>{index + 1}</td>
              <td>{plan.cors_plan}</td>
              <td>{plan.cors_description}</td>
              <td>₹{" "}{plan.subscription_charges.toFixed(2)}</td>
              <td>₹{" "}{plan.GST_amt.toFixed(2)}</td>
              <td>₹{" "}{(plan.subscription_charges+plan.GST_amt).toFixed(2)}</td>
            </tr>
          ))}

          {/* {subscriptionPlan.length > 0 && (
            <tr className="fw-bold">
              <td colSpan="3">Total Subscription Plan Amount</td>
              <td>{subscriptionPlan.reduce((sum, plan) => sum + plan.subscriptionCharges, 0).toFixed(2)}</td>
              <td>{subscriptionPlan.reduce((sum, plan) => sum + plan.gst, 0).toFixed(2)}</td>
              <td>{subscriptionPlan.reduce((sum, plan) => sum + plan.total, 0).toFixed(2)}</td>
            </tr>
          )} */}

            <tr className="fw-bold">
              <td colSpan="3">Total Subscription Plan Amount</td>
              <td>₹{" "}{totalSubscriptionCharges}</td>
              <td>₹{" "}{totalGST}</td>
              <td>₹{" "}{grandTotal}</td>
            </tr>

          
        </tbody>
      </table>

      <div className="alert alert-danger text-center">
        Click here to Pay Rs. {grandTotal.toFixed(2)} on Bharat Kosh Portal using Supply of Geodetic Data purpose
      </div>

      <div className="alert alert-warning">
        <p>
          Select <strong>037 - SCIENCE AND TECHNOLOGY</strong> as Ministry/Department,
          <strong>Supply of Geodetic Data</strong> as Purpose and <strong>258381 - Geodetic & Research Branch Office, Dehradun</strong> as Drawing & Disbursing Officer (DDO) while making payment on <strong>Bharatkosh Portal</strong>
        </p>
      </div>

      <div className="text-success fw-bold text-center mb-3">
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#termsModal">
          Please accept Terms and Conditions to Continue!
        </button>
      </div>

      <div className="modal fade" id="termsModal" tabIndex="-1" aria-labelledby="termsModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="termsModalLabel">Terms and Conditions for CORS Website</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>1. Contents on this website is published, managed, and maintained by Survey of India...</p>
              <p>2. The Terms and Conditions contained herein shall apply to any person or entity ("User")...</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Reject</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDataSend}>Accept Terms and Conditions</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePlans;




// import React, { useEffect, useState } from "react";
// import { Modal, Button } from "react-bootstrap";

// function UserProfilePlans() {
//   const [userData, setUserData] = useState({
//     name: "",
//     state: "",
//     address: "",
//     email: "",
//     region: "",
//     userId: "",
//     pinCode: "",
//     mobile: "",
//     company: "",
//   });
  
//   const [subscriptionPlan, setSubscriptionPlan] = useState([]);
//   const [showModal, setShowModal] = useState(false); // State for modal visibility

//   useEffect(() => {
//     const savedUserData = JSON.parse(localStorage.getItem("userProfile"));
//     if (savedUserData) {
//       setUserData(savedUserData);
//     }

//     const res = ForData()
//       .then((response) => {
//         setSubscriptionPlan(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching subscription plan:", error);
//       });
//   }, []);

//   // Function to handle modal visibility
//   const handleModal = () => setShowModal(!showModal);

//   return (
//     <div className="container mt-5">
//       <h2 className="text-primary">
//         <i className="bi bi-card-heading"></i> CORS Subscription Plan
//       </h2>
//       <h5 className="mt-4">User Profile</h5>
//       <table className="table table-bordered">
//         <tbody>
//           <tr>
//             <td><strong>Name:</strong></td>
//             <td>{userData.name}</td>
//             <td><strong>Region:</strong></td>
//             <td>{userData.region}</td>
//             <td><strong>User Id:</strong></td>
//             <td>{userData.userId}</td>
//           </tr>
//           <tr>
//             <td><strong>State:</strong></td>
//             <td>{userData.state}</td>
//             <td><strong>Pin Code:</strong></td>
//             <td>{userData.pinCode}</td>
//           </tr>
//           <tr>
//             <td><strong>Address:</strong></td>
//             <td>{userData.address}</td>
//           </tr>
//           <tr>
//             <td><strong>Email:</strong></td>
//             <td>{userData.email}</td>
//             <td><strong>Mobile:</strong></td>
//             <td>{userData.mobile}</td>
//             <td><strong>Company:</strong></td>
//             <td>{userData.company}</td>
//           </tr>
//         </tbody>
//       </table>

//       <h5 className="mt-4">Selected Subscription Plan</h5>
//       <table className="table table-striped table-bordered">
//         <thead className="table-primary">
//           <tr>
//             <th>S.No</th>
//             <th>Plan</th>
//             <th>Description</th>
//             <th>Subscription Charges</th>
//             <th>GST</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subscriptionPlan.map((plan, index) => (
//             <tr key={plan.id}>
//               <td>{index + 1}</td>
//               <td>{plan.plan}</td>
//               <td>{plan.description}</td>
//               <td>{plan.subscriptionCharges}</td>
//               <td>{plan.gst}</td>
//               <td>{plan.total}</td>
//             </tr>
//           ))}
//           {subscriptionPlan.length > 0 && (
//             <tr className="fw-bold">
//               <td colSpan="3">Total Subscription Plan Amount</td>
//               <td>{subscriptionPlan.reduce((sum, plan) => sum + plan.subscriptionCharges, 0).toFixed(2)}</td>
//               <td>{subscriptionPlan.reduce((sum, plan) => sum + plan.gst, 0).toFixed(2)}</td>
//               <td>{subscriptionPlan.reduce((sum, plan) => sum + plan.total, 0).toFixed(2)}</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <div className="alert alert-danger text-center">
//         Click here to Pay Rs. 14,538.00 on Bharat Kosh Portal using Supply of Geodetic Data purpose
//       </div>

//       <div className="alert alert-warning">
//         <p>
//           Select <strong>037 - SCIENCE AND TECHNOLOGY</strong> as Ministry/Department,
//           <strong>Supply of Geodetic Data</strong> as Purpose and <strong>258381 - Geodetic & Research Branch Office, Dehradun</strong> as Drawing & Disbursing Officer (DDO) while making payment on <strong>Bharatkosh Portal</strong>
//         </p>
//       </div>

//       <div className="text-success fw-bold text-center mb-3">
//         <button onClick={handleModal} className="btn btn-primary">Please accept Terms and Conditions to Continue!</button>
//       </div>

//       <Modal show={showModal} onHide={handleModal} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Terms and Conditions for CORS Website</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>1. Contents on this website is published, managed, and maintained by Survey of India...</p>
//           <p>2. The Terms and Conditions contained herein shall apply to any person or entity ("User")...</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleModal}>Reject</Button>
//           <Button variant="primary" onClick={() => { handleModal(); alert("Accepted Terms and Conditions"); }}>Accept, Terms and Condition</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default UserProfilePlans;







// import React, { useEffect, useState } from "react";

// function UserProfilePlans() {
//   const [userData, setUserData] = useState({
//     name: "",
//     state: "",
//     address: "",
//     email: "",
//     region: "",
//     userId: "",
//     pinCode: "",
//     mobile: "",
//     company: "",
//   });

//   const [subscriptionPlan, setSubscriptionPlan] = useState([]);

//   useEffect(() => {
//     const savedUserData = JSON.parse(localStorage.getItem("userProfile"));
//     if (savedUserData) {
//       setUserData(savedUserData);
//     }

//     const res= ForData()

//       .then((response) => {
//         setSubscriptionPlan(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching subscription plan:", error);
//       });
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2 className="text-primary">
//         <i className="bi bi-card-heading"></i> CORS Subscription Plan
//       </h2>
//       <h5 className="mt-4">User Profile</h5>
//       <table className="table table-bordered">
//         <tbody>
//           <tr>
//             <td><strong>Name:</strong></td>
//             <td>{userData.name}</td>
//             <td><strong>Region:</strong></td>
//             <td>{userData.region}</td>
//             <td><strong>User Id:</strong></td>
//             <td>{userData.userId}</td>
//           </tr>
//           <tr>
//             <td><strong>State:</strong></td>
//             <td>{userData.state}</td>
//             <td><strong>Pin Code:</strong></td>
//             <td>{userData.pinCode}</td>
//           </tr>
//           <tr>
//             <td><strong>Address:</strong></td>
//             <td>{userData.address}</td>
//           </tr>
//           <tr>
//             <td><strong>Email:</strong></td>
//             <td>{userData.email}</td>
//             <td><strong>Mobile:</strong></td>
//             <td>{userData.mobile}</td>
//             <td><strong>Company:</strong></td>
//             <td>{userData.company}</td>
//           </tr>
//         </tbody>
//       </table>

//       <h5 className="mt-4">Selected Subscription Plan</h5>
//       <table className="table table-striped table-bordered">
//         <thead className="table-primary">
//           <tr>
//             <th>S.No</th>
//             <th>Plan</th>
//             <th>Description</th>
//             <th>Subscription Charges</th>
//             <th>GST</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subscriptionPlan.map((plan, index) => (
//             <tr key={plan.id}>
//               <td>{index + 1}</td>
//               <td>{plan.plan}</td>
//               <td>{plan.description}</td>
//               <td>{plan.subscriptionCharges}</td>
//               <td>{plan.gst}</td>
//               <td>{plan.total}</td>
//             </tr>
//           ))}
//           {subscriptionPlan.length > 0 && (
//             <tr className="fw-bold">
//               <td colSpan="3">Total Subscription Plan Amount</td>
//               <td>{subscriptionPlan.reduce((sum, plan) => sum + plan.subscriptionCharges, 0).toFixed(2)}</td>
//               <td>{subscriptionPlan.reduce((sum, plan) => sum + plan.gst, 0).toFixed(2)}</td>
//               <td>{subscriptionPlan.reduce((sum, plan) => sum + plan.total, 0).toFixed(2)}</td>
//             </tr>
//           )}
//         </tbody>
//       </table>


//       <div className="alert alert-danger text-center">
//         Click here to Pay Rs. 14,538.00 on Bharat Kosh Portal using Supply of Geodetic Data purpose
//       </div>

//       <div className="alert alert-warning">
//         <p>
//           Select <strong>037 - SCIENCE AND TECHNOLOGY</strong> as Ministry/Department,
//           <strong>Supply of Geodetic Data</strong> as Purpose and <strong>258381 - Geodetic & Research Branch Office, Dehradun</strong> as Drawing & Disbursing Officer (DDO) while making payment on <strong>Bharatkosh Portal</strong>
//         </p>
//       </div>

//       <div className="text-success fw-bold text-center mb-3">
//         Please accept Terms and Conditions to Continue!
//       </div>










//     </div>
//   );
// }

// export default UserProfilePlans;

// in this after clicking on "Please accept Terms and Conditions to Continue!" show this popup

