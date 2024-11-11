import React, { useEffect, useState } from "react";
import Sidebar from "./layout/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./styles/dashboard.css";
import AdminHeader from "./layout/AdminHeader";
import DataChart from "./DataChart";
import toast from "react-hot-toast";
import { getAllRegion12GPA, getAllAdmin, getAllSubsData, getAllUserData } from "../services/Apis";

const AdminDashboard = () => {
  const [usertype, setUsertype] = useState("superadmin");
  const [data, setData] = useState([]);
  // const handleAPiUsage = async () => {
  //   try {
  //     const response = await getAllRegion12GPA({
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     });

  //     if (response.success) {
  //       setData(response.data.data);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //   }
  // };

  // if (data === null) {
  //   return <div>Loading...</div>;
  // }
  const userTypes = [
    {
      label: "Government Users",
      region1Key: "govtUserData",
      region2Key: "govtUserData",
    },
    {
      label: "Private Users",
      region1Key: "privUserData",
      region2Key: "privUserData",
    },
    {
      label: "Academic Users",
      region1Key: "acadUserData",
      region2Key: "acadUserData",
    },
  ];
  const totalRegion1 = data.region1.total1 || 0;
  const totalRegion2 = data.region2.total2 || 0;
  const grandTotal = totalRegion1 + totalRegion2;
  
  const [adminData, setAdminData] = useState([]);
  const [regData, setRegData] = useState([]);
  const [subsData, setSubsData] = useState([]);

  const userDetailsType = [
    {
      userType: "Government Users",
      region1: 552,
      region2: 3343,
    },
    {
      userType: "Private Users",
      region1: 651,
      region2: 904,
    },
    {
      userType: "Academic Users",
      region1: 70,
      region2: 38,
    },
  ];

  const industryTypeDetails = [
    { IndustryTypes: "Agriculture", region1: 26, region2: 21 },
    { IndustryTypes: "Aviation", region1: 2, region2: 1 },
    {
      IndustryTypes: "Climatology And Earth Sciences",
      region1: 15,
      region2: 11,
    },
    { IndustryTypes: "Communication And Navigation", region1: 4, region2: 12 },
    { IndustryTypes: "Defence And Paramilitary", region1: 25, region2: 18 },
    { IndustryTypes: "Disaster Management", region1: 9, region2: 2 },
    { IndustryTypes: "Drone Based Services", region1: 102, region2: 173 },
    { IndustryTypes: "Engineering And Construction", region1: 23, region2: 49 },
    {
      IndustryTypes: "Fisheries And Maritime Activities",
      region1: 1,
      region2: 1,
    },
    { IndustryTypes: "Forest And Environment", region1: 13, region2: 14 },
    { IndustryTypes: "Geological And Geotechnical", region1: 40, region2: 26 },
    { IndustryTypes: "Geospatial Development", region1: 36, region2: 25 },
    { IndustryTypes: "Information Unavailable", region1: 148, region2: 302 },
    { IndustryTypes: "Land Survey And Mapping", region1: 737, region2: 3530 },
    { IndustryTypes: "Logistics", region1: 1, region2: 1 },
    { IndustryTypes: "Mining Industries", region1: 7, region2: 10 },
    { IndustryTypes: "Other", region1: 37, region2: 67 },
    {
      IndustryTypes: "Petroleum And Natural Gas Industries",
      region1: 5,
      region2: 3,
    },
    { IndustryTypes: "Remote Sensing Applications", region1: 9, region2: 4 },
    { IndustryTypes: "Research & Development", region1: 18, region2: 5 },
    { IndustryTypes: "Telecommunication", region1: 4, region2: 5 },
    { IndustryTypes: "Transportation", region1: 1, region2: 1 },
    { IndustryTypes: "Urban And Rural Development", region1: 10, region2: 4 },
  ];

  const admindetailsData = [
    {
      counts: adminData.length,
      message1: "Total",
      message2: "Admins",
      to: "all-admins",
    },
    {
      counts: adminData.filter((elem)=> elem.status==='Active').length,
      message1: "Total",
      message2: "Active Admins",
      to: "active-admins",
    },
    {
      counts: adminData.filter((elem)=> elem.status==='Blocked').length,
      message1: "Total",
      message2: "Blocked Admins",
      to: "admin-blocked",
    },
    {
      counts: adminData.filter((elem)=> elem.status==='Pending').length,
      message1: "Total",
      message2: "Pending Request",
      to: "admin-request",
    },
  ];

  const registrationCards = [
    {
      counts: "1243",
      message1: "Total",
      message2: "Request Recieved",
      to: "user-list",
    },
    {
      counts: "1243",
      message1: "Total",
      message2: "Request Accepted",
      to: "user-accepted-list",
    },
    {
      counts: "1243",
      message1: "Total",
      message2: "Request Rejected",
      to: "user-rejected-list",
    },
    {
      counts: "1243",
      message1: "Total",
      message2: "Request Pending",
      to: "user-pending-list",
    },
    {
      counts: "1243",
      message1: "Region-1",
      message2: "Registered Users",
      to: "user-r1-list",
    },
    {
      counts: "1243",
      message1: "Region-2",
      message2: "Registered Users",
      to: "user-r2-list",
    },
  ];

  const subcriptionCards = [
    {
      counts: "1243",
      message1: "Total",
      message2: "Request Recieved",
      to: "subscription-list",
    },
    {
      counts: "1243",
      message1: "Total",
      message2: "Request Accepted",
      to: "subscription-accepted-list",
    },
    {
      counts: "1243",
      message1: "Total",
      message2: "Request Rejected",
      to: "subscription-rejected-list",
    },
    {
      counts: "1243",
      message1: "Total",
      message2: "Request Pending",
      to: "subscription-pending-list",
    },
    {
      counts: "1243",
      message1: "Region-1",
      message2: "Request Accepted",
      to: "subscription-r1-list",
    },
    {
      counts: "1243",
      message1: "Region-2",
      message2: "Request Accepted",
      to: "subscription-r2-list",
    },
  ];

  const userDetailsTypeData = async()=> {
    
  }

  const admindetails = async()=> {
    try {
      let response = await getAllAdmin({
        Authorization: "Bearer " + localStorage.getItem("token"),
      });

      if(response.success){
        setAdminData(response.data.data)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Error in admindashboard");
    }
  }

  const registrationData = async()=> {
    try {
      let response = await getAllUserData({
        Authorization: "Bearer " + localStorage.getItem("token"),
      })
      if(response.success){
        setRegData(response.data.data)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Error in admin dashboard page");
    }
  }

  const subscriptionData = async()=> {
    try {
      let response = await getAllSubsData({
        Authorization: "Bearer " + localStorage.getItem("token"),
      })
      if(response.success){
        setSubsData(response.data.data)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Error in admin dashboard")
    }
  }
  useEffect(()=>{
    admindetails();
    // userDetailsTypeData();
    // industryTypeDetailsData();
    handleAPiUsage();
    registrationData();
    subscriptionData();
  },[])

  return (
    <>
      {usertype === "superadmin" && (
        <Sidebar>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">Admin Details</h2>
            </div>
            <div className="row">
              <div className="">
                <div
                  className="card-contents"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "15px",
                    marginBottom: "30px",
                  }}
                >
                  {admindetailsData.map((elem, idx) => {
                    return (
                      <div
                        className="cards"
                        key={idx}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <h2>{elem.counts}</h2>
                        <p>{elem.message1}</p>
                        <p>{elem.message2}</p>
                        <hr style={{ width: "100%", margin: "10px 0" }} />
                        <Link to={elem.to}>
                          View &emsp;
                          <i className="fa-solid fa-circle-arrow-right"></i>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="section_heading">
              <h2 className="title_heading">Registration Details</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card-div">
                  {registrationCards.map((elem, idx) => {
                    return (
                      <div className="cards" key={idx}>
                        <h2>{elem.counts}</h2>
                        <p>{elem.message1}</p>
                        <p>{elem.message2}</p>
                        <hr />
                        <Link to={`/admin/${elem.to}`}>
                          View &emsp;
                          <i className="fa-solid fa-circle-arrow-right"></i>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-6">
                <DataChart />
              </div>
            </div>
          </div>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">Subscription Details</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card-div">
                  {subcriptionCards.map((elem, idx) => {
                    return (
                      <div className="cards" key={idx}>
                        <h2>{elem.counts}</h2>
                        <p>{elem.message1}</p>
                        <p>{elem.message2}</p>
                        <hr />
                        <Link to={`/admin/${elem.to}`}>
                          View &emsp;
                          <i className="fa-solid fa-circle-arrow-right"></i>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-6">
                <DataChart />
              </div>
            </div>
          </div>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">User Details by Type...</h2>
            </div>
            <div>
              <div className="box_body">
                <table className="table table-bordered data_table">
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        User Types
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Region 1 Users
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Region 2 Users
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Grand Total
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* {userTypes.map((type, index) => {
                      const region1Data = data.region1[type.region1Key] || 0;
                      const region2Data = data.region2[type.region2Key] || 0;
                      const total = region1Data + region2Data;
                      return (
                        <tr key={index}>
                          <td>{type.label}</td>
                          <td>{region1Data}</td>
                          <td>{region2Data}</td>
                          <td>{total}</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        <strong>Grand Total</strong>
                      </td>
                      <td style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        {totalRegion1}
                      </td>
                      <td style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        {totalRegion2}
                      </td>
                      <td style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        {grandTotal}
                      </td>
                    </tr>
                    {userTypes===null?
                    // .every(
                    //   (type) =>
                    //     data.region1[type.region1Key] === 0 &&
                    //     data.region2[type.region2Key] === 0
                    // ) && 
                    (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No data available
                        </td>
                      </tr>
                    ):""} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">User Details by Industry...</h2>
            </div>
            <div>
              <div className=" table-div">
                <table
                  className="content-table"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th className="custom-th">Industry Types</th>
                      <th className="custom-th">Region 1 Users</th>
                      <th className="custom-th">Region 2 Users</th>
                      <th className="custom-th">Grand Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {industryTypeDetails.length > 0 ? (
                      industryTypeDetails.map((elem, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{elem.IndustryTypes}</td>
                            <td>{elem.region1}</td>
                            <td>{elem.region2}</td>
                            <td>{elem.region1 + elem.region2}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">
                Usage Details by User Type (In Hours)...
              </h2>
            </div>
            <div>
              <div className=" table-div">
                <table
                  className="content-table"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th className="custom-th">User Types</th>
                      <th className="custom-th">Region 1 Users</th>
                      <th className="custom-th">Region 2 Users</th>
                      <th className="custom-th">Grand Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      data.map((elem, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{elem.region1}</td>
                            <td>{elem.region2}</td>
                            <td>{elem.region1 + elem.region2}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Sidebar>
      )}
      {usertype === "admin" && (
        <Sidebar>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">Registration Details</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card-div">
                  {registrationCards.map((elem, idx) => {
                    return (
                      <div className="cards" key={idx}>
                        <h2>{elem.counts}</h2>
                        <p>{elem.message1}</p>
                        <p>{elem.message2}</p>
                        <hr />
                        <Link to={`/admin/${elem.to}`}>
                          View &emsp;
                          <i className="fa-solid fa-circle-arrow-right"></i>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-6">
                <DataChart />
              </div>
            </div>
          </div>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">Subscription Details</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card-div">
                  {subcriptionCards.map((elem, idx) => {
                    return (
                      <div className="cards" key={idx}>
                        <h2>{elem.counts}</h2>
                        <p>{elem.message1}</p>
                        <p>{elem.message2}</p>
                        <hr />
                        <Link to={`/admin/${elem.to}`}>
                          View &emsp;
                          <i className="fa-solid fa-circle-arrow-right"></i>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-6">
                <DataChart />
              </div>
            </div>
          </div>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">User Details by Type...</h2>
            </div>
            <div>
              <div className=" table-div">
                <table
                  className="content-table"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th className="custom-th">User Types</th>
                      <th className="custom-th">Region 1 Users</th>
                      <th className="custom-th">Region 2 Users</th>
                      <th className="custom-th">Grand Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDetailsType.length > 0 ? (
                      userDetailsType.map((elem, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{elem.userType}</td>
                            <td>{elem.region1}</td>
                            <td>{elem.region2}</td>
                            <td>{elem.region1 + elem.region2}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">User Details by Industry...</h2>
            </div>
            <div>
              <div className=" table-div">
                <table
                  className="content-table"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th className="custom-th">Industry Types</th>
                      <th className="custom-th">Region 1 Users</th>
                      <th className="custom-th">Region 2 Users</th>
                      <th className="custom-th">Grand Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {industryTypeDetails.length > 0 ? (
                      industryTypeDetails.map((elem, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{elem.IndustryTypes}</td>
                            <td>{elem.region1}</td>
                            <td>{elem.region2}</td>
                            <td>{elem.region1 + elem.region2}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">
                Usage Details by User Type (In Hours)...
              </h2>
            </div>
            <div>
              <div className=" table-div">
                <table
                  className="content-table"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th className="custom-th">User Types</th>
                      <th className="custom-th">Region 1 Users</th>
                      <th className="custom-th">Region 2 Users</th>
                      <th className="custom-th">Grand Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      data.map((elem, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{elem.region1}</td>
                            <td>{elem.region2}</td>
                            <td>{elem.region1 + elem.region2}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Sidebar>
      )}
      {usertype === "viewer" && (
        <div>
          <AdminHeader />
          <div className="clear" style={{ margin: "0px 60px " }}>
            <div className="section_heading">
              <h2 className="title_heading">Registration Details</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card-div">
                  {registrationCards.map((elem, idx) => {
                    return (
                      <div className="cards" key={idx}>
                        <h2>{elem.counts}</h2>
                        <p>{elem.message1}</p>
                        <p>{elem.message2}</p>
                        <hr />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-6">
                <DataChart />
              </div>
            </div>
          </div>
          <div className="clear" style={{ margin: "0px 60px" }}>
            <div className="section_heading">
              <h2 className="title_heading">Subscription Details</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card-div">
                  {subcriptionCards.map((elem, idx) => {
                    return (
                      <div className="cards" key={idx}>
                        <h2>{elem.counts}</h2>
                        <p>{elem.message1}</p>
                        <p>{elem.message2}</p>
                        <hr />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-6">
                <DataChart />
              </div>
            </div>
          </div>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">User Details by Type...</h2>
            </div>
            <div>
              <div className=" table-div">
                <table
                  className="content-table"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th className="custom-th">User Types</th>
                      <th className="custom-th">Region 1 Users</th>
                      <th className="custom-th">Region 2 Users</th>
                      <th className="custom-th">Grand Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDetailsType.length > 0 ? (
                      userDetailsType.map((elem, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{elem.userType}</td>
                            <td>{elem.region1}</td>
                            <td>{elem.region2}</td>
                            <td>{elem.region1 + elem.region2}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">User Details by Industry...</h2>
            </div>
            <div>
              <div className=" table-div">
                <table
                  className="content-table"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th className="custom-th">Industry Types</th>
                      <th className="custom-th">Region 1 Users</th>
                      <th className="custom-th">Region 2 Users</th>
                      <th className="custom-th">Grand Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {industryTypeDetails.length > 0 ? (
                      industryTypeDetails.map((elem, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{elem.IndustryTypes}</td>
                            <td>{elem.region1}</td>
                            <td>{elem.region2}</td>
                            <td>{elem.region1 + elem.region2}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">
                Usage Details by User Type (In Hours)...
              </h2>
            </div>
            <div>
              <div className=" table-div">
                <table
                  className="content-table"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th className="custom-th">User Types</th>
                      <th className="custom-th">Region 1 Users</th>
                      <th className="custom-th">Region 2 Users</th>
                      <th className="custom-th">Grand Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      data.map((elem, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{elem.region1}</td>
                            <td>{elem.region2}</td>
                            <td>{elem.region1 + elem.region2}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
