import { Link } from 'react-router-dom'
import HeaderLayout from '../components/HeaderLayout';

const Guidelines = () => {
  return (
    <HeaderLayout>
      <div className="container clear">
      <div className="row">
        <div className="col-md-12">
            {/* SECTION HEADING START */}
            <div className="section_heading">
              <h2 className="title_heading">Guidelines & Operating Procedure</h2>
            </div>
            {/* SECTION HEADING END*/}
            <div className="table-div">
              <table
                className="content-table"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    <th scope="col">S No.</th>
                    <th scope="col">Description</th>
                    <th scope="col" style={{ width: "18%" }}>
                      Document
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">1</td>
                    <td>
                      <Link
                        to="policies/CORS_Data_Downloading_Region-1.pdf"
                        target="_blank"
                        className='content-table-link'
                       
                      >
                        &nbsp; &nbsp;CORS Data Downloading for Region-1
                      </Link>
                    </td>
                    <td>
                      <Link
                        to="policies/CORS_Data_Downloading_Region-1.pdf"
                        target="_blank"
                         className='content-table-link'
                      >
                        <i
                          className="fa-regular fa-file-lines"
                          style={{ fontSize: "24px", color: "red" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">2</td>
                    <td>
                      <Link
                        to="policies/VRS_Data_Downloading_Region-1.pdf"
                        target="_blank"
                         className='content-table-link'
                      >
                        &nbsp; &nbsp;VRS Data Downloading for Region-1
                      </Link>
                    </td>
                    <td>
                      <Link
                        to="policies/VRS_Data_Downloading_Region-1.pdf"
                        target="_blank"
                         className='content-table-link'
                      >
                        <i
                          className="fa-regular fa-file-lines"
                          style={{ fontSize: "24px", color: "red" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">3</td>
                    <td>
                      <Link
                        to="policies/Online_Post_Processing-Region-1.pdf"
                        target="_blank"
                         className='content-table-link'
                      >
                        &nbsp; &nbsp;Online Post Processing for Region-1
                      </Link>
                    </td>
                    <td>
                      <Link
                        to="policies/Online_Post_Processing-Region-1.pdf"
                        target="_blank"
                         className='content-table-link'
                      >
                        <i
                          className="fa-regular fa-file-lines"
                          style={{ fontSize: "24px", color: "red" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">4</td>
                    <td>
                      <Link
                        to="policies/CORS_Data_Downloading_Region-2.pdf"
                        target="_blank"
                         className='content-table-link'
                      >
                        &nbsp; &nbsp;CORS Data Downloading for Region-2
                      </Link>
                    </td>
                    <td>
                      <Link
                        to="policies/CORS_Data_Downloading_Region-2.pdf"
                        target="_blank"
                         className='content-table-link'
                      >
                        <i
                          className="fa-regular fa-file-lines"
                          style={{ fontSize: "24px", color: "red" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">5</td>
                    <td>
                      <Link
                        to="policies/VRS_Data_Downloading_Region-2.pdf"
                        target="_blank"
                         className='content-table-link'
                      >
                        &nbsp; &nbsp;VRS Data Downloading for Region-2
                      </Link>
                    </td>
                    <td>
                      <Link
                        to="policies/VRS_Data_Downloading_Region-2.pdf"
                        target="_blank"
                         className='content-table-link'
                      >
                        <i
                          className="fa-regular fa-file-lines"
                          style={{ fontSize: "24px", color: "red" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">6</td>
                    <td>
                      <Link
                        to="policies/Online_Post_Processing-Region-2.pdf"
                        target="_blank"
                         className='content-table-link'
                      >
                        &nbsp; &nbsp;Online Post Processing for Region-2
                      </Link>
                    </td>
                    <td>
                      <Link
                        to="policies/Online_Post_Processing-Region-2.pdf"
                        target="_blank"
                         className='content-table-link'
                      >
                        <i
                          className="fa-regular fa-file-lines"
                          style={{ fontSize: "24px", color: "red" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">7</td>
                    <td>
                      <Link
                        to="policies/guidelines-for-network-rtk-survey-7.pdf"
                        target="_blank"
                         className='content-table-link'
                      >
                        &nbsp; &nbsp;Guidelines for Network RTK Survey
                      </Link>
                    </td>
                    <td>
                      <Link
                        to="policies/guidelines-for-network-rtk-survey-7.pdf"
                        target="_blank"
                         className='content-table-link'
                      >
                        <i
                          className="fa-regular fa-file-lines"
                          style={{ fontSize: "24px", color: "red" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">8</td>
                    <td>
                    <Link to="policies/doc-mop-1-8.pdf" target="_blank"
                     className='content-table-link'>
                     &nbsp; &nbsp;Model Operating Procedure-1
                    </Link>
                    </td>
                    <td>
                    <Link to="policies/doc-mop-1-8.pdf" target="_blank"
                     className='content-table-link'>
                        <i
                          className="fa-regular fa-file-lines"
                          style={{ fontSize: "24px", color: "red" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">9</td>
                    <td>
                    <Link to="policies/doc-mop-2-9.pdf" target="_blank"
                     className='content-table-link'>
                     &nbsp; &nbsp;Model Operating Procedure-2
                    </Link>
                    </td>
                    <td>
                    <Link to="policies/doc-mop-2-9.pdf" target="_blank"
                     className='content-table-link'>
                        <i
                          className="fa-regular fa-file-lines"
                          style={{ fontSize: "24px", color: "red" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">10</td>
                    <td>
                    <Link to="policies/doc-mop-3-10.pdf" target="_blank"
                     className='content-table-link'>
                     &nbsp; &nbsp;Model Operating Procedure-3
                    </Link>
                    </td>
                    <td>
                    <Link to="policies/doc-mop-3-10.pdf" target="_blank"
                     className='content-table-link'>
                        <i
                          className="fa-regular fa-file-lines"
                          style={{ fontSize: "24px", color: "red" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">11</td>
                    <td>
                    <Link to="policies/doc-mop-4-11.pdf" target="_blank"
                     className='content-table-link'>
                     &nbsp; &nbsp;Model Operating Procedure-4
                    </Link>
                    </td>
                    <td>
                    <Link to="policies/doc-mop-4-11.pdf" target="_blank"
                     className='content-table-link'>
                        <i
                          className="fa-regular fa-file-lines"
                          style={{ fontSize: "24px", color: "red" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">12</td>
                    <td>
                    <Link to="policies/registration_sop.pdf" target="_blank"
                     className='content-table-link'>
                     &nbsp; &nbsp;Registration SOP
                    </Link>
                    </td>
                    <td>
                    <Link to="policies/registration_sop.pdf" target="_blank"
                     className='content-table-link'>
                        <i
                          className="fa-regular fa-file-lines"
                          style={{ fontSize: "24px", color: "red" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">13</td>
                    <td>
                    <Link to="policies/subscription_sop.pdf" target="_blank"
                     className='content-table-link'>
                     &nbsp; &nbsp;Purchase of CORS Subscription Plans SOP
                    </Link>
                    </td>
                    <td>
                    <Link to="policies/subscription_sop.pdf" target="_blank"
                     className='content-table-link'>
                        <i
                          className="fa-regular fa-file-lines"
                          style={{ fontSize: "24px", color: "red" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
      </div>
    </div>
    </HeaderLayout>
  );
};

export default Guidelines;
