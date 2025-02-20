import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";
import FilterSidebar from "../../components/Venue/FilterSideBar";
import SearchBar from "../../components/Venue/SearchBar";
import EntertainerCard from "../../components/Venue/EntertainerCard";
import FilterNavbar from "../../components/Venue/FilterNavbar";

export default function AllEntertainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [entertainers, setEntertainers] = useState([]);
  const [filteredEntertainers, setFilteredEntertainers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedEntertainer, setSelectedEntertainer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [pageSize, setPageSize] = useState(
    Number(searchParams.get("pageSize")) || 10
  );
  const [totalCount, setTotalCount] = useState(0);
  const [availability, setAvailability] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  // const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const availabilityFilter = searchParams.get("availability") || "";
  const categoryFilter = searchParams.get("category") || "";
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    if (searchTerm || availabilityFilter || categoryFilter) {
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
                availability: availabilityFilter || null,
                category: categoryFilter || null,
                search: searchTerm || null,
                page: pageIndex,
                pageSize: pageSize,
              },
            }
          );
          console.log("entertainers", response.data.entertainers);
          setEntertainers(response.data.entertainers || []);
          setTotalCount(response.data.totalCount || 0);
          setError(null);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };

      fetchEntertainers();
    }
  }, [searchParams, pageIndex, pageSize]);

  const updateFilters = (newFilters) => {
    const updatedParams = {
      availability: availability || null,
      category: selectedCategory || null,
      search: searchTerm || null,
      page: 1,
      pageSize: 10,
      ...newFilters,
    };

    Object.keys(updatedParams).forEach((key) => {
      if (!updatedParams[key] && updatedParams[key] !== 0)
        delete updatedParams[key];
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
      <div className="d-flex flex-column min-vh-100">
        <SearchBar updateFilters={(filters) => setSearchParams(filters)} />
        <div className="mt-3">
          <FilterNavbar updateFilters={updateFilters} />
        </div>
        <div className="container mt-3">
          <div className="row">
            {loading ? (
              <div className="d-flex justify-content-center my-5">
                <div className="spinner-grow text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : entertainers.length > 0 ? (
              entertainers.map((entertainer) => (
                <EntertainerCard
                  key={entertainer.id}
                  entertainer={entertainer}
                />
              ))
            ) : (
              <p className="text-center">No Entertainers Found.</p>
            )}
          </div>
        </div>
      </div>
      <PiqueFooter />
    </DashLayoutVenue>
  );
}
