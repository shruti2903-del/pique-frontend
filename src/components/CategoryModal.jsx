import React, { useEffect, useState } from "react";
import axios from "axios";
import { UPDATE_CATEGORY } from "../../constants";

export default function CategoryModal(props) {
  const { data, done, err } = props;
  const [categoryName, setCategoryName] = useState(data.name);

  // Update categoryName if data changes (if props.data is updated)
  useEffect(() => {
    setCategoryName(data.name);
  }, [data]);

  const handleUpdateCategory = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}${UPDATE_CATEGORY}`,
        {
          id: data.id,
          name: categoryName,
        }
      );

      // Handle success
      done("Category updated successfully");
      console.log("Response:", response.data);
    } catch (error) {
      // Handle error
      err("Error updating category");
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div
      className="modal fade"
      style={{ marginTop: "10%" }}
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Update Category
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* Form inside modal for category update */}
            <div className="mb-3">
              <label htmlFor="categoryName" className="form-label">
                Category Name
              </label>
              <input
                type="text"
                className="form-control"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleUpdateCategory}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
