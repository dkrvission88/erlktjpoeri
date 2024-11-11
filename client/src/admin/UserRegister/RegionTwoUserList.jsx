import React, { useEffect, useState } from 'react';
import { getAllRegion2Data } from "../../services/Apis"

import { Link } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';

const RegionTwoUserList = () => {
  const [applications, setApplications] = useState([]);
  const [inputs, setInputs] = useState('');
  const [count, setCount] = useState(10);

  const filteredUsers = applications.filter(user =>
    [user.name, user.email, user.username, user.mobile_no, user.region].some(field =>
      field.toLowerCase().includes(inputs.toLowerCase())
    )
  ).slice(0, count)

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await getAllRegion2Data()
      console.log(response.data.Region2Data)
      setApplications(response.data.Region2Data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleChange = (e) => {
    setCount(parseInt(e.target.value, 10));
  };
  return (

    <Sidebar>
      <div className="clear">
        <div className="section_heading">
          <h2 className="title_heading">CORS Registration List</h2>
        </div>
        <div className="mb-4"></div>
        <div>
          <div className="box_header">
            <div style={{ padding: "5px 0px" }}>
              <i className="fa-regular fa-rectangle-list mx-3"></i>&nbsp; Total Region-2 Users: <b>{applications.length}</b>
            </div>
          </div>
          <div>
            <div className="box_body">
              <form
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <label className="col-md-10">Records:</label>
                  <div className="col-md-8">
                    <select
                      className="form-select"
                      value={count}
                      onChange={handleChange}
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>

                    </select>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <input
                    type="text"
                    value={inputs}
                    onChange={e => setInputs(e.target.value)}

                    placeholder="Search here ..."
                    style={{ borderRight: "none", padding: "0px 10px", outline: "none" }}
                  />
                  <button style={{ borderLeft: "none", }}><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
              </form>
              
              <table className=" table table-striped table-bordered table-hover">

                <thead className="table-dark">
                  <tr>
                    <th>SNo</th>
                    <th>Application No</th>
                    <th>Reg. Date/Time</th>
                    <th>User Information</th>
                    <th>Account Status</th>
                    <th>Update By</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((app, index) => (
                      <tr key={app.application_no}>
                        <td>{index + 1}</td>
                        <td>{app.application_no}</td>
                        <td>{app.date_created}</td>
                        <td>
                          <div>
                            <strong>Name:</strong> {app.name} <br />
                            <strong>Email:</strong> {app.email} <br />
                            <strong>Phone:</strong> {app.mobile_no} <br />
                            <strong>User Type:</strong> {app.usertype} <br />
                            <strong>Organization:</strong> {app.emptype} <br />
                            <strong>Region:</strong> {app.region} <br />
                          </div>
                        </td>
                        <td><div>{app.is_rejected}</div><div>{app.rejected_reason}</div></td>
                        <td>{app.updatedBy}</td>
                        <td>
                          <button className="btn btn-outline-primary btn-sm">
                            <Link to={`/admin/approved/${app.sno}`} className="text-decoration-none text-dark">
                              <i className="fa-solid fa-pen-to-square"></i>

                            </Link>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="d-md-flex d-sm-block justify-content-between mt-2">

            </div>
          </div>
        </div>
      </div>
    </Sidebar>


  );
};

export default RegionTwoUserList;



