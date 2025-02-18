import React from "react";
import Input from "../Input";
import Select from "../Select";

export default function ProfileCard() {
  return (
    <>
      <p className="fw-bold modal-font">PROFILE</p>
      <hr />
      <p className="profile-font">
        This information will be shared with entertainers who are booked for
        Pique.{" "}
      </p>
      <div className="row mb-2 profile-font">
        <div className="col-md-6 col-sm-12">
          <label className="fw-semibold">First Name*</label>
          <Input
            type="text"
            name="firstName"
            className="form-control profile-font"
            placeholder="Enter your first Name"
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <label className="fw-semibold">Last Name*</label>
          <Input
            type="text"
            className="form-control profile-font"
            name="lstName"
            placeholder="Enter your last Name"
          />
        </div>
      </div>

      <div className="row mb-2 profile-font">
        <div className="col-md-6 col-sm-12">
          <label className=" fw-semibold">Address Line 1</label>
          <p className="text-secondary mb-0">Street Address, P.O.box,c/o</p>
          <Input
            type="text"
            name="firstName"
            className="form-control profile-font"
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <label className="fw-semibold">Address Line 2</label>
          <p className="text-secondary mb-0">
            Apartment,suite,unit,building,floor,etc.
          </p>
          <Input
            type="text"
            className="form-control profile-font"
            name="lstName"
          />
        </div>
      </div>

      <div className="row mb-3 profile-font">
        <div className="col-md-6 col-sm-12">
          <label className="fw-semibold">Country</label>
          <Select
            name="country"
            // options={countries}
            // value={formData.country || ""}
            // onChange={(selectedOption) =>
            //   handleChange("country", selectedOption.value)
            // }
            defaultOption="--Select Country--"
            className="form-control profile-font"
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <label className="fw-semibold">State</label>
          <Select
            name="state"
            // options={countries}
            // value={formData.country || ""}
            // onChange={(selectedOption) =>
            //   handleChange("country", selectedOption.value)
            // }
            defaultOption="--Select State--"
            className="form-control profile-font"
          />
        </div>
      </div>

      <div className="row mb-2 profile-font">
        <div className="col-md-6 col-sm-12">
          <label className="fw-semibold">City</label>
          <Select
            name="city"
            // options={countries}
            // value={formData.country || ""}
            // onChange={(selectedOption) =>
            //   handleChange("country", selectedOption.value)
            // }
            defaultOption="--Select City--"
            className="form-control profile-font"
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <label className="fw-semibold">ZIP/Postal Code</label>
          <Input
            name="zipCode"
            className="form-control profile-font"
            placeholder="Enter zip code"
          />
        </div>
      </div>

      <div className="row profile-font">
      <div className="col-md-6 col-sm-12">
          <label className=" fw-semibold">Phone Number</label>
          <Input
            type="text"
            name="phone"
            className="form-control profile-font"
            placeholder="Enter phone number"
          />
        </div>
      </div>
    </>
  );
}
