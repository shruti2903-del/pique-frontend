import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import BookModal from "../../components/Venue/BookModal";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";

export default function AllEntertainer() {
  const [entertainers, setEntertainers] = useState([]);
  const [filteredEntertainers, setFilteredEntertainers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedEntertainer, setSelectedEntertainer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0); // Track the current page
  const [pageSize, setPageSize] = useState(5); // Records per page
  const [totalCount, setTotalCount] = useState(0); // Total number of records
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const availabilityFilter = searchParams.get("availability") || "";
  const typeFilter = searchParams.get("type") || "";
  const search = searchParams.get("search") || "";

  const entertainerTypes = [
    { value: "Musicians/Bands", label: "Musicians/Bands" },
    { value: "Dancers", label: "Dancers" },
    { value: "Magicians", label: "Magicians" },
    { value: "Theatre Performers", label: "Theatre Performers" },
    { value: "Speakers/Hosts", label: "Speakers/Hosts" },
  ];

  useEffect(() => {
    const fetchEntertainers = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}venues/search/entertainers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: {
              availability: availabilityFilter,
              type: typeFilter,
              search: search,
              page: pageIndex + 1, 
              pageSize: pageSize,
            },
          }
        );
        setEntertainers(response.data.entertainers || []);
        setTotalCount(response.data.totalCount || 0); 
        setError(null);
      } catch (err) {
        setError("Failed to fetch entertainers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEntertainers();
  }, [searchParams, pageIndex, pageSize]); 

  const updateFilters = (newFilters) => {
    const updatedParams = {
      availability: availabilityFilter,
      type: typeFilter,
      search: search,
      ...newFilters,
    };

    Object.keys(updatedParams).forEach((key) => {
      if (!updatedParams[key]) delete updatedParams[key];
    });

    setSearchParams(updatedParams);
  };

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  useEffect(() => {
    setFilteredEntertainers(entertainers);
  }, [entertainers]);

  return (
    <DashLayoutVenue
      title="All Entertainers"
      description="View and book your preferred entertainer"
    >
        <div className="container-fluid d-flex flex-column min-vh-100 mt-5">

      <div className="row mt-5">
        <div className="col-md-12">
          <h2 className="text-secondary text-center mb-4">All Entertainers</h2>
          <div className="mb-4 mt-5">
            <div className="row">
              <div className="col-md-2 ms-4">
                <select
                  className="form-select"
                  onChange={(e) =>
                    updateFilters({ availability: e.target.value })
                  }
                  value={availabilityFilter}
                >
                  <option value="">Select Availability</option>
                  <option value="yes">Available</option>
                  <option value="no">Not Available</option>
                </select>
              </div>
              <div className="col-md-2">
                <select
                  className="form-select"
                  onChange={(e) => updateFilters({ type: e.target.value })}
                  value={typeFilter}
                >
                  <option value="">Select Type</option>
                  {entertainerTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => updateFilters({ search: e.target.value })}
                />
              </div>
            </div>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {loading ? (
            <div className="text-center">
              <p>Loading entertainers...</p>
            </div>
          ) : (
            <div className="col-12">
              <div className="rounded h-100 p-4">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Sr.No.</th>
                        <th>Entertainer Name</th>
                        <th>Type</th>
                        <th>Contact No.</th>
                        <th>Performance Role</th>
                        <th>Availability</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEntertainers.map((entertainer, index) => (
                        <tr key={entertainer.id}>
                          <td>{index + 1 + pageIndex * pageSize}</td>
                          <td>{entertainer.name}</td>
                          <td>{entertainer.type}</td>
                          <td>{entertainer.phone1}</td>
                          <td>{entertainer.performanceRole}</td>
                          <td>{entertainer.availability}</td>
                          <td>
                            <Button
                              className="btn btn-primary"
                              onClick={() => {setSelectedEntertainer(entertainer); 
                                setIsModalOpen(true);}}
                              label="View"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Button
                    className="btn btn-secondary"
                    label="Previous"
                    onClick={() => handlePageChange(pageIndex - 1)}
                    disabled={pageIndex === 0}
                  />
                  <span>
                    Page {pageIndex + 1} of {Math.ceil(totalCount / pageSize)}
                  </span>
                  <Button
                    className="btn btn-secondary"
                    label="Next"
                    onClick={() => handlePageChange(pageIndex + 1)}
                    disabled={pageIndex >= Math.ceil(totalCount / pageSize) - 1}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedEntertainer && (
        <BookModal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          entertainer={selectedEntertainer}
        />
      )}
      </div>
      <PiqueFooter/>
    </DashLayoutVenue>
  );
}
