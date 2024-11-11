import HeaderLayout from "../components/HeaderLayout";
import "./general-info.css";
import "./home.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllSubsData } from "../services/Apis";
import toast from "react-hot-toast";

const Home = () => {
  const [groupedItems, setGroupedItems] = useState([]);
  // const [data,setData] = useState([]);


  // Function to group items based on the screen size
  const groupItems = () => {
    const screenWidth = window.innerWidth;
    let itemsPerGroup = 3;
    if (screenWidth < 576) {
      itemsPerGroup = 2;
    } else if (screenWidth < 992) {
      itemsPerGroup = 2;
    }

    const newGroupedItems = arr.reduce((acc, elem, idx) => {
      if (idx % itemsPerGroup === 0) {
        acc.push([]);
      }
      acc[acc.length - 1].push(elem);
      return acc;
    }, []);

    setGroupedItems(newGroupedItems);
  };

  const getCardItems = async() =>{
     try {
      const response = await getAllSubsData();
      if(response.data.success){
        setData(response.data.data);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    
  }

  useEffect(() => {
    getCardItems();
    groupItems();
    window.addEventListener("resize", groupItems);
    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", groupItems);
  }, []);

  const arr = [
    {
      id: 1,
      cors_plan: "RTK1",
      cors_description:
        "1 Month Unlimited Subscription of Real Time Kinematic Correction Services",
      subscription_charges: 5000,
      GST_amt: 900,
      cors_active: 1,
    },
    {
      id: 2,
      cors_plan: "RTK3",
      cors_description:
        "3 Months Unlimited Subscription of Real Time Kinematic Correction Services",
      subscription_charges: 15000,
      GST_amt: 2700,
      cors_active: 1,
    },
    {
      id: 3,
      cors_plan: "RTK6",
      cors_description:
        "6 Months Unlimited Subscription of Real Time Kinematic Correction Services",
      subscription_charges: 30000,
      GST_amt: 5400,
      cors_active: 1,
    },
    {
      id: 4,
      cors_plan: "RTK12",
      cors_description:
        "1 Year Unlimited Subscription of Real Time Kinematic Correction Services",
      subscription_charges: 60000,
      GST_amt: 10800,
      cors_active: 1,
    },
    {
      id: 5,
      cors_plan: "DGNSS1",
      cors_description:
        "1 Month Unlimited Subscription of Differential GNSS Correction Services",
      subscription_charges: 2000,
      GST_amt: 360,
      cors_active: 1,
    },
    {
      id: 6,
      cors_plan: "DGNSS3",
      cors_description:
        "3 Months Unlimited Subscription of Differential GNSS Correction Services",
      subscription_charges: 6000,
      GST_amt: 1080,
      cors_active: 1,
    },
    {
      id: 7,
      cors_plan: "DGNSS6",
      cors_description:
        "6 Months Unlimited Subscription of Differential GNSS Correction Services",
      subscription_charges: 12000,
      GST_amt: 2160,
      cors_active: 1,
    },
    {
      id: 8,
      cors_plan: "DGNSS12",
      cors_description:
        "1 Year Unlimited Subscription of Differential GNSS Correction Services",
      subscription_charges: 24000,
      GST_amt: 4320,
      cors_active: 1,
    },
    {
      id: 9,
      cors_plan: "RDS1",
      cors_description:
        "CORS/VRS Data Download Subscription limited to 36,000 epoch (equivalent to 10 Hrs Data with 1 Sec frequency) valid for 1 Month",
      subscription_charges: 48,
      GST_amt: 9,
      cors_active: 1,
    },
    {
      id: 10,
      cors_plan: "RDS3",
      cors_description:
        "CORS/VRS Data Download Subscription limited to 1,08,000 epoch (equivalent to 30 Hrs Data with 1 Sec frequency) valid for 3 Months",
      subscription_charges: 144,
      GST_amt: 26,
      cors_active: 1,
    },
    {
      id: 11,
      cors_plan: "RDS6",
      cors_description:
        "CORS/VRS Data Download Subscription limited to 3,60,000 epoch (equivalent to 100 Hrs Data with 1 Sec frequency) valid for 6 Months",
      subscription_charges: 480,
      GST_amt: 86,
      cors_active: 1,
    },
    {
      id: 12,
      cors_plan: "RDS20",
      cors_description:
        "CORS/VRS Data Download Subscription limited to 7,20,000 epoch (equivalent to 200 Hrs Data with 1 Sec frequency) valid for 1 Year",
      subscription_charges: 960,
      GST_amt: 173,
      cors_active: 1,
    },
    {
      id: 13,
      cors_plan: "RDS50",
      cors_description:
        "CORS/VRS Data Download Subscription limited to 18,00,000 epoch (equivalent to 500 Hrs Data with 1 Sec frequency) valid for 1 Year",
      subscription_charges: 2400,
      GST_amt: 432,
      cors_active: 1,
    },
    {
      id: 14,
      cors_plan: "OPS1",
      cors_description:
        "Online GNSS Processing Subscription limited to 36,000 epoch (equivalent to 10 Hrs Data with 1 Sec frequency) valid for 1 Month",
      subscription_charges: 180,
      GST_amt: 32,
      cors_active: 1,
    },
    {
      id: 15,
      cors_plan: "OPS3",
      cors_description:
        "Online GNSS Processing Subscription limited to 1,08,000 epoch (equivalent to 30 Hrs Data with 1 Sec frequency) valid for 3 Months\u003C/p\u003E\r\n",
      subscription_charges: 540,
      GST_amt: 97,
      cors_active: 1,
    },
    {
      id: 16,
      cors_plan: "OPS6",
      cors_description:
        "Online GNSS Processing Subscription limited to 3,60,000 epoch (equivalent to 100 Hrs Data with 1 Sec frequency) valid for 6 Months",
      subscription_charges: 1800,
      GST_amt: 324,
      cors_active: 1,
    },
    {
      id: 17,
      cors_plan: "OPS20",
      cors_description:
        "Online GNSS Processing Subscription limited to 7,20,000 epoch (equivalent to 200 Hrs Data with 1 Sec frequency) valid for 1 Year",
      subscription_charges: 3600,
      GST_amt: 648,
      cors_active: 1,
    },
    {
      id: 18,
      cors_plan: "OPS50",
      cors_description:
        "Online GNSS Processing Subscription limited to 18,00,000 epoch (equivalent to 500 Hrs Data with 1 Sec frequency) valid for 1 Year",
      subscription_charges: 9000,
      GST_amt: 1620,
      cors_active: 1,
    },
    {
      id: 19,
      cors_plan: "RTKRDS1",
      cors_description:
        "Unlimited Subscription of Real Time Kinematic Correction Services and CORS/VRS Data Download Subscription limited to 36,000 epoch (equivalent to 10 Hrs Data with 1 Sec frequency) valid for 1 Month",
      subscription_charges: 5032,
      GST_amt: 906,
      cors_active: 1,
    },
    {
      id: 20,
      cors_plan: "RTKRDS3",
      cors_description:
        "Unlimited Subscription of Real Time Kinematic Correction Services and CORS/VRS Data Download Subscription limited to 1,08,000 epoch (equivalent to 30 Hrs Data with 1 Sec frequency) valid for 3 Months",
      subscription_charges: 15096,
      GST_amt: 2717,
      cors_active: 1,
    },
    {
      id: 21,
      cors_plan: "RTKRDS6",
      cors_description:
        "Unlimited Subscription of Real Time Kinematic Correction Services and CORS/VRS Data Download Subscription limited to 3,60,000 epoch (equivalent to 100 Hrs Data with 1 Sec frequency) valid for 6 Months\u003C/p\u003E\r\n",
      subscription_charges: 30320,
      GST_amt: 5458,
      cors_active: 1,
    },
    {
      id: 22,
      cors_plan: "RTKRDS12",
      cors_description:
        "Unlimited Subscription of Real Time Kinematic Correction Services and CORS/VRS Data Download Subscription limited to 7,20,000 epoch (equivalent to 200 Hrs Data with 1 Sec frequency) valid for 1 Year",
      subscription_charges: 60640,
      GST_amt: 10915,
      cors_active: 1,
    },
    {
      id: 23,
      cors_plan: "DGNSSOPS1",
      cors_description:
        "Unlimited Subscription of Differential GNSS Correction Services and Online GNSS Processing Subscription limited to 36,000 epoch (equivalent to 10 Hrs Data with 1 Sec frequency) valid for 1 Month",
      subscription_charges: 2164,
      GST_amt: 390,
      cors_active: 1,
    },
    {
      id: 24,
      cors_plan: "DGNSSOPS3",
      cors_description:
        "Unlimited Subscription of Differential GNSS Correction Services and Online GNSS Processing Subscription limited to 1,08,000 epoch (equivalent to 30 Hrs Data with 1 Sec frequency) valid for 3 Months\u003C/p\u003E",
      subscription_charges: 6492,
      GST_amt: 1169,
      cors_active: 1,
    },
    {
      id: 25,
      cors_plan: "DGNSSOPS6",
      cors_description:
        "Unlimited Subscription of Differential GNSS Correction Services and Online GNSS Processing Subscription limited to 3,60,000 epoch (equivalent to 100 Hrs Data with 1 Sec frequency) valid for 6 Months\u003C/p\u003E",
      subscription_charges: 13640,
      GST_amt: 2455,
      cors_active: 1,
    },
    {
      id: 26,
      cors_plan: "DGNSSOPS12",
      cors_description:
        "Unlimited Subscription of Differential GNSS Correction Services and Online GNSS Processing Subscription limited to 7,20,000 epoch (equivalent to 200 Hrs Data with 1 Sec frequency) valid for 1 Year",
      subscription_charges: 27280,
      GST_amt: 4910,
      cors_active: 1,
    },
    {
      id: 27,
      cors_plan: "RDS300",
      cors_description:
        "CORS/VRS Data Download Subscription limited to 1,08,00,000 epoch (equivalent to 3000 Hrs Data with 1 Sec frequency) valid for 1 Year",
      subscription_charges: 14400,
      GST_amt: 2592,
      cors_active: 1,
    },
    {
      id: 28,
      cors_plan: "RTKOPS1",
      cors_description:
        "Unlimited Subscription of Real Time Kinematic Correction Services and Online GNSS Processing Subscription limited to 36,000 epoch (equivalent to 10 Hrs Data with 1 Sec frequency) valid for 1 Month\u003C/p\u003E",
      subscription_charges: 5164,
      GST_amt: 930,
      cors_active: 1,
    },
    {
      id: 29,
      cors_plan: "RTKOPS3",
      cors_description:
        "Unlimited Subscription of Real Time Kinematic Correction Services and Online GNSS Processing Subscription limited to 1,08,000 epoch (equivalent to 30 Hrs Data with 1 Sec frequency) valid for 3 Months",
      subscription_charges: 15492,
      GST_amt: 2789,
      cors_active: 1,
    },
    {
      id: 30,
      cors_plan: "RTKOPS6",
      cors_description:
        "Unlimited Subscription of Real Time Kinematic Correction Services and Online GNSS Processing Subscription limited to 3,60,000 epoch (equivalent to 100 Hrs Data with 1 Sec frequency) valid for 6 Months",
      subscription_charges: 31640,
      GST_amt: 5695,
      cors_active: 1,
    },
    {
      id: 31,
      cors_plan: "RTKOPS12",
      cors_description:
        "Unlimited Subscription of Real Time Kinematic Correction Services and Online GNSS Processing Subscription limited to 7,20,000 epoch (equivalent to 200 Hrs Data with 1 Sec frequency) valid for 1 Year",
      subscription_charges: 63280,
      GST_amt: 11390,
      cors_active: 1,
    },
    {
      id: 32,
      cors_plan: "DGNSSRDS1",
      cors_description:
        "Unlimited Subscription of Differential GNSS Correction Services and CORS/VRS Data Download Subscription limited to 36,000 epoch (equivalent to 10 Hrs Data with 1 Sec frequency) valid for 1 Month",
      subscription_charges: 2032,
      GST_amt: 366,
      cors_active: 1,
    },
    {
      id: 33,
      cors_plan: "DGNSSRDS3",
      cors_description:
        "Unlimited Subscription of Differential GNSS Correction Services and CORS/VRS Data Download Subscription limited to 1,08,000 epoch (equivalent to 30 Hrs Data with 1 Sec frequency) valid for 3 Months",
      subscription_charges: 6096,
      GST_amt: 1097,
      cors_active: 1,
    },
    {
      id: 34,
      cors_plan: "DGNSSRDS6",
      cors_description:
        "Unlimited Subscription of Differential GNSS Correction Services and CORS/VRS Data Download Subscription limited to 3,60,000 epoch (equivalent to 100 Hrs Data with 1 Sec frequency) valid for 6 Months",
      subscription_charges: 12320,
      GST_amt: 2218,
      cors_active: 1,
    },
    {
      id: 35,
      cors_plan: "DGNSSRDS12",
      cors_description:
        "Unlimited Subscription of Differential GNSS Correction Services and CORS/VRS Data Download Subscription limited to 7,20,000 epoch (equivalent to 200 Hrs Data with 1 Sec frequency) valid for 1 Year",
      subscription_charges: 24640,
      GST_amt: 4435,
      cors_active: 1,
    },
  ];
  
  return (
    <HeaderLayout>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/images/img_b7.jpg"
              className="d-block w-100 cr-img"
              alt="slide1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/img_b2.jpg"
              className="d-block w-100 cr-img"
              alt="slide1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/img_b3.jpg"
              className="d-block w-100 cr-img"
              alt="slide1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/img_b4.jpeg"
              className="d-block w-100 cr-img"
              alt="slide1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/img_b5.jpeg"
              className="d-block w-100 cr-img"
              alt="slide1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/img_b6.jpg"
              className="d-block w-100 cr-img"
              alt="slide1"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-8 col-md-3 mb-3 ">
            <Link to="/registration">
              <button className="btn btn-lg btn-block custom-btn">
                <i className="fa-regular fa-newspaper"></i>
                <span className="ms-2">Registration</span>
              </button>
            </Link>
          </div>
          <div className="col-8 col-md-3 mb-3">
            <Link to="/login">
              <button className="btn btn-lg btn-block custom-btn">
                <i className="fa-solid fa-right-to-bracket"></i>
                <span className="ms-2">Log In</span>
              </button>
            </Link>
          </div>
          <div className="col-8 col-md-3 mb-3">
            <Link to="/subscription">
              <button className="btn btn-lg btn-block custom-btn">
                <i className="fa-regular fa-hand-pointer"></i>
                <span className="ms-2">Buy Subscription</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <hr />

      <div className="container-fluid">
        <div className="container clear">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="section_heading">
                <h2 className="title_heading">
                  Introduction to Continuously Operating Reference Stations
                </h2>
              </div>
              <p className="text-content">
                Global Navigation Satellite Systems (GNSS) has revolutionized
                our ability to access location information. In nutshell it
                measures its distances from a bunch of satellites hovering over
                the earth in predefined orbits, through radio signals and
                estimates its own position on earth. However these systems have
                their own share of errors due to Orbit errors, Satellite Clock
                error, Receiver noise, Ionospheric and Tropospheric delays,
                Satellite Geometry over receiver and multipath etc, which causes
                dilution in its precision up to 10 -11 meters. To overcome this
                accuracy limit, various Surveying techniques such as DGNSS,
                Static GPS/GNSS surveying, RTK, SBAS, GBAS, and PPP are being
                used by Geospatial community. Each of these method works own
                principle of taking GNSS measurement. In most of GNSS
                applications where precise positioning is required, users
                usually pair their GNSS instruments with other GNSS
                instruments...
              </p>
              <Link
                to={"/introduction"}
                type="submit"
                className="btn mb-4 read-btn"
              >
                Read More
              </Link>
            </div>
            <div className="col-md-4 contain-update ">
              <div className=" w-100">
                <h3 className=" text-center p-2">Latest Updates</h3>
                <div className="marquee-container">
                  <div className="marquee">
                    <div className="Latest-update">
                      <img src="/images/youtube.png" alt="youtube" />{" "}
                      <Link
                        href="https://www.youtube.com/watch?v=jgc_ALf2LMU"
                        target="_blank"
                      >
                        सी ओ आर एस (CORS) क्या है?
                      </Link>
                    </div>
                    <div className="Latest-update">
                      <img src="/images/youtube.png" alt="youtube" />{" "}
                      <Link
                        href="https://www.youtube.com/watch?v=sxMXPO5L_ZU"
                        target="_blank"
                      >
                        Introduction to CORS?
                      </Link>
                    </div>
                    <div className="Latest-update">
                      <img
                        style={{ width: "32px", height: "32px" }}
                        src="/images/blink.gif"
                        alt="general-info"
                      />{" "}
                      <Link
                        href="https://www.youtube.com/watch?v=sxMXPO5L_ZU"
                        target="_blank"
                      >
                        Click here to know the Details of CORS Services?
                      </Link>
                    </div>
                    <div className="Latest-update">
                      <img
                        style={{ width: "32px", height: "32px" }}
                        src="/images/blink.gif"
                        alt="youtube"
                      />{" "}
                      <Link
                        href="https://www.youtube.com/watch?v=sxMXPO5L_ZU"
                        target="_blank"
                      >
                        Click here for CORS Registration
                      </Link>
                    </div>
                    <div className="Latest-update">
                      <img
                        style={{ width: "32px", height: "32px" }}
                        src="/images/blink.gif"
                        alt="youtube"
                      />{" "}
                      <Link
                        href="https://www.youtube.com/watch?v=sxMXPO5L_ZU"
                        target="_blank"
                      >
                        Click here for Revised SOP for CORS Registration
                      </Link>
                    </div>
                    <div className="Latest-update">
                      <img
                        style={{ width: "32px", height: "32px" }}
                        src="/images/blink.gif"
                        alt="youtube"
                      />{" "}
                      <Link
                        href="https://www.youtube.com/watch?v=sxMXPO5L_ZU"
                        target="_blank"
                      >
                        Click here to know the Details of CORS Subscription Plan
                      </Link>
                    </div>
                    <div className="Latest-update">
                      <img
                        style={{ width: "32px", height: "32px" }}
                        src="/images/blink.gif"
                        alt="youtube"
                      />{" "}
                      <Link
                        href="https://www.youtube.com/watch?v=sxMXPO5L_ZU"
                        target="_blank"
                      >
                        Click here to know your CORS Region
                      </Link>
                    </div>
                    <div className="Latest-update">
                      <img
                        style={{ width: "32px", height: "32px" }}
                        src="/images/blink.gif"
                        alt="youtube"
                      />{" "}
                      <Link
                        href="https://www.youtube.com/watch?v=sxMXPO5L_ZU"
                        target="_blank"
                      >
                        Click here to know the Real Time Positioning Services
                        Operational Area
                      </Link>
                    </div>
                    <div className="Latest-update">
                      <img
                        style={{ width: "32px", height: "32px" }}
                        src="/images/blink.gif"
                        alt="youtube"
                      />{" "}
                      <Link
                        href="https://www.youtube.com/watch?v=sxMXPO5L_ZU"
                        target="_blank"
                      >
                        Click here to know the Reference Data Services
                        Operational Area
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="container clear">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="section_heading">
                <h2 className="title_heading">
                  CORS Registration and Subscription
                </h2>
              </div>
              <p className="text-content">
                Registration for CORS services is free of cost and can be
                availed by all Indian entities by a simple online registration
                and KYC process. Link and SoP for registration are available in
                CORS services portal
                <Link to="https://cors.surveyofindia.gov.in">
                  https://cors.surveyofindia.gov.in
                </Link>
                . After successful Registration to avail CORS services user need
                to acquire subscription for one or more service as per their
                choice.
              </p>
              <p className="text-content">
                Subscriptions are available free of charge basis to (1) Central
                Govt. users, (2) State Govt. users, (3) Govt. academic
                institutions. For rest of the categories, Subscriptions are
                available on the chargeable basis. Link for subscription
                purchase and rates of subscription packages are available in
                CORS service portal.
              </p>
            </div>
            <div className="col-md-12 col-lg-4">
              <div className=" w-100">
                <img src="/images/region.jpg" alt="..." width={"100%"}></img>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Starts here */}
      <div className="container-fluid">
        <div className="container mt-5 clear">
          <div className="section_heading">
            <h2 className="title_heading">Subscription Charges</h2>
          </div>
          <div
            id="carouselExample"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {groupedItems.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  className={`carousel-item ${
                    groupIndex === 0 ? "active" : ""
                  } bg-white`}
                  
                >
                  <div className="row">
                    {group.map((elem, idx) => {
                      const modalId = `exampleModalCenter${
                        groupIndex * 3 + idx
                      }`;
                      return (
                        <div
                          key={idx}
                          className={`col-12 ${
                            group.length === 1
                              ? "col-sm-4"
                              : group.length === 2
                              ? "col-md-6"
                              : "col-lg-4"
                          } mb-3`}
                        >
                          <button
                            type="button"
                            className="btn"
                            data-bs-toggle="modal"
                            data-bs-target={`#${modalId}`}
                            style={{
                              display: "flex",
                              width: "100%",
                              height: "200px",
                              justifyContent: "space-between",
                              alignItems: "center",
                              backgroundColor: "#ECF3F9",
                              boxShadow:
                                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                            }}
                          >
                            <img
                              src="/images/search.png"
                              alt="image"
                              style={{ width: "100px", height: "100px" }}
                            />
                            <section>
                              <p className="subs-desc">
                                {elem.cors_description}
                              </p>
                              <p>₹ {elem.subscription_charges} + GST</p>
                            </section>
                          </button>

                          {/* Modal */}
                          <div
                            className="modal fade"
                            id={modalId}
                            tabIndex="-1"
                            aria-labelledby={`exampleModalCenterTitle${
                              groupIndex * 3 + idx
                            }`}
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id={`exampleModalLongTitle${
                                      groupIndex * 3 + idx
                                    }`}
                                  >
                                    Plan Id : {elem.cors_plan}
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div
                                  className="modal-body"
                                  style={{ overflowX: "auto" }}
                                >
                                  <table className="table table-bordered w-100">
                                    <thead>
                                      <tr>
                                        <th scope="col">Plan</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Charges</th>
                                        <th scope="col">GST</th>
                                        <th scope="col">Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th scope="row">{elem.cors_plan}</th>
                                        <td>{elem.cors_description}</td>
                                        <td>₹{elem.subscription_charges}</td>
                                        <td>₹{elem.GST_amt}</td>
                                        <td>
                                          ₹
                                          {elem.subscription_charges +
                                            elem.GST_amt}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-success"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon bg-dark"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon bg-dark"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      {/* Modal Ends here */}

      <div className="container-fluid">
        <div className="container clear">
          <div className="row">
            <div className="col-md-12 text-content">
              <div className="section_heading">
                <h2 className="title_heading">Application Process</h2>
              </div>
              <p className="text-content">
                User can register himself by filling the Online Application Form
                available on the website. For this user needs to fill the
                personal information, viz., Name, Address, Mobile Number, Email
                id, Organization name, etc. Along with this, the user needs to
                download hardcopy of Annexures available in .pdf format on the
                web site and upload duly filled copy along with personal and
                organizational ID card copy during the registration process.
              </p>
              <div className="section_heading">
                <h2 className="title_heading">Limitations</h2>
              </div>
              <p className="text-content">
                Each login entitles the subscriber to access one stream from the
                CORS servers anywhere in the Network at any time (but not for
                concurrent streams from two or more devices, to do so requires
                multiple-login subscriptions). Both type of Real time
                positioning Services, Network RTK and D-GNSS, surveys can only
                achieve relative positioning with desired precision when
                following a set of best practices. There are several important
                factors that need to be accounted for when doing RTK/RTN
                surveys. Many of these are common to other types of GNSS surveys
                and include: equipment calibration, atmospheric errors,
                multipath, satellite geometry, reference system integration,
                redundancy, and validation.
              </p>
              <p className="text-content">
                Due to the rapidly changing environment of Global Navigation
                Satellite System (GNSS) positioning, Standard Operating Services
                will be dynamic, improvements to GNSS hardware and software,
                increased wireless communication capabilities, new signals, and
                additional satellite constellations will yield significantly
                easier, faster and more accurate RT positioning in the near
                future. Hence the users are advised to keep abreast themselves
                with guidelines and best practice documents made available on
                CORS Service Portal website as well as issued by their
                equipment’s manufacturer.
              </p>
              <div className="section_heading">
                <h2 className="title_heading">
                  No Warranties, Limitation of Liability
                </h2>
              </div>
              <p className="text-content">
                The Survey of India provides services on an 'as is' basis. There
                is no representation or warranty of merchantability or fitness
                for a particular purpose. CORS Services and information related
                thereto are subject to change without prior notice.
                Notwithstanding any provision to the contrary, in no event shall
                any party be liable to another party for any incidental,
                consequential, special, exemplary or indirect damages, lost
                business profits or lost data arising out of or in any way
                related to the usages of CORS data or services.
              </p>
              <div className="section_heading">
                <h2 className="title_heading">Connection Settings</h2>
              </div>
              <p className="text-content">
                To access the CORS real time and post processing services, the
                user will need:
              </p>
              <ul>
                <li>Username and password,</li>
                <li>Internet access,</li>
                <li>Connection details:</li>
              </ul>
              <h4 className="content-heading">IP Address and Port:</h4>
              <p>
                <b>For Region 1:</b> IP: 103.205.244.106, Port: 2101
                <br />
                <b>For Region 2:</b> IP: 43.240.5.42, Port: 2105
              </p>
            </div>
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
};

export default Home;
