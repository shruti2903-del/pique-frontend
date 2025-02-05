import React from "react";
import { Helmet } from "react-helmet-async";
import PiqueNavbar from "../components/PiqueComponents/PiqueNavbar";
import PiqueFooter from "../components/PiqueComponents/PiqueFooter";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Pique Entertainment</title>
        <meta name="description" content="Welcome to our website." />
      </Helmet>
      <PiqueNavbar />
      <div className="enterWrap container">
          {/* <!-- <div className="row">
            <div className="col-md-10 offset-md-1 col-12 bannerTextWrap">
              <h1 className="heading">
                Turn your event vision into <br />
                <span className="fst-italic">reality</span> with the right venue
              </h1>
            </div>
          </div> --> */}
          <div className="row enterMargn position-relative">
            {/* <!-- For Entertainers --> */}
            <div className="col-md-12 visonWrap">
              <div className="aboutUser aboutUser1 enterMain" id="box1">
                <div className="row borderBH align-items-md-center">
                  <div className="col-md-6 order-2 order-md-1">
                    <div className="enterTXT">
                      <p className="paraTXT">Pique Entertainment For Venue</p>
                      <p className="paraTXT">
                        Lorem Ipsum has been the industry's <br />standard dummy
                        text ever since the <br />
                        1500s, when an unknown printer took <br />
                        a galley of type and scrambled it to
                      </p>

                      <a href="#" className="btn myBTNBB me-3 mb-2">
                        View <i className="fa-solid fa-arrow-up"></i>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6 order-1 order-md-2 ps-0 position-relative">
                    <img
                      src="src/assets/pique/image/venue-icon.png"
                      alt="venue-icon"
                      className="img-fluid venuiconBH a4"
                    />
                    <div className="enterImg">
                      <h3 className="heading a3">For Venues</h3>
                      <img
                        src="src/assets/pique/image/fireboX.gif"
                        alt="fireboX"
                        className="img-fluid fireIMG"
                      />
                      <img
                        src="src/assets/pique/image/venue.png"
                        alt="venue"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="aboutUser aboutUser2 enterMain" id="box2">
                <div className="row borderBH align-items-md-center">
                  <div className="col-md-6 order-2 order-md-1">
                    <div className="enterTXT">
                      <p className="paraTXT">
                        Pique Entertainment For Entertainers
                      </p>
                      <p className="paraTXT">
                        Lorem Ipsum has been the industry's <br />standard dummy
                        text ever since the <br />
                        1500s, when an unknown printer took <br />
                        a galley of type and scrambled it to
                      </p>

                      <a href="#" className="btn myBTNBB me-3 mb-2">
                        View <i className="fa-solid fa-arrow-up"></i>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6 order-1 order-md-2 ps-0 position-relative">
                    <img
                      src="src/assets/pique/image/entertainers-icon.png"
                      alt="venue-icon"
                      className="img-fluid venuiconBH"
                    />
                    <div className="enterImg">
                      <h3 className="heading a2">For Entertainers</h3>
                      <img
                        src="src/assets/pique/image/fireboX.gif"
                        alt="fireboX"
                        className="img-fluid fireIMG"
                      />
                      <img
                        src="src/assets/pique/image/enterprise.png"
                        alt="enterprise"
                        className="img-fluid"
                      />
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sliderWrapper">
      <div className="container">
        <div className="row align-items-center bannerBoxBG">
          <div className="col-md-12 col-12">
            <div className="dashboard-banner position-relative">
              {/* <!-- Background Image --> */}
              <img
                src="src/assets/pique/image/homeBanner.png"
                alt="dashboardImage"
                className="img-fluid w-100"
              />
              <div className="row">
                <div className="col-md-4">
                  <div className="rightSide">
                    <h3 className="heading">
                      Are you looking to <br />
                      book an Entertainer
                    </h3>
                    <a href="#" className="btn myBTN oR">
                      Click Here
                      <span>
                        <img
                          src="src/assets/pique/image/btnanimation.gif"
                          alt="btnanimation"
                          className="anmBTN"
                        />
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="slideImage">
                    <img
                      id="changingImage"
                      src="src/assets/pique/image/bannerperson2.png"
                      alt="bannerperson"
                      className="img-fluid personBH"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="leftSide">
                    <h3 className="heading">
                      Are you an <br />
                      Entertainer?
                    </h3>
                    <a href="#" className="btn myBTN">
                      <span>
                        <img
                          src="src/assets/pique/image/btnanimation.gif"
                          alt="btnanimation"
                          className="anmBTN"
                        />
                      </span>
                      Click Here
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        <PiqueFooter />
      
    </>
  );
}
