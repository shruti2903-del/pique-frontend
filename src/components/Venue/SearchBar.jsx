import React, { useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import axios from "axios";
import Select from "../Select";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchBar({ updateFilters }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [searchText, setSearchText] = useState(
    searchParams.get("search") || ""
  );
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [entertainers, setEntertainers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}location/countries`
        );
        // console.log(response);
        const formattedCountries = response.data.countries.map((country) => ({
          value: country.id,
          label: country.name,
        }));
        setCountries(formattedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    setSearchText(searchParams.get("search") || "");
  }, [searchParams]);

  const fetchSuggestions = async (query) => {
    if (!query.trim() || query.length < 1) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}venues/search/suggestion/cat`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: { q: query },
        }
      );
      console.log(response.data.data);
      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        setSuggestions(response.data.data);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSuggestions(query);

    if (query.trim() === "") {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.delete("search");
      setSearchParams(updatedParams);

      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);

    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("search", suggestion.name);
    updatedParams.set("category", suggestion.id);
    setSearchParams(updatedParams);

    setSelectedCategory(suggestion.id);
    await fetchEntertainers(suggestion.id);
    updateFilters({
      category: suggestion.id,
      search: suggestion.name,
      entertainers: entertainers || [],
    });
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.set("search", searchQuery);
      setSearchParams(updatedParams);
      navigate(`/user/entertainers?${updatedParams.toString()}`);
    }
  };

  const fetchEntertainers = async (categoryId) => {
    if (!categoryId) return;

    const apiUrl = `${
      import.meta.env.VITE_API_URL
    }venues/search/category/${categoryId}`;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("entertainers", response.data);
      if (Array.isArray(response.data.data)) {
        setEntertainers(response.data.data);
        updateFilters({
          category: categoryId,
          search: searchQuery,
          entertainers: response.data.data,
        });
      } else {
        setEntertainers([]);
        updateFilters({
          category: categoryId,
          search: searchQuery,
          entertainers: [],
        });
      }
    } catch (error) {
      console.error(
        "Error fetching entertainers:",
        error.response?.status,
        error.response?.data
      );
      setEntertainers([]);
    }
  };

  return (
    <>
      <div className="container-fluid bg-light py-3 mt-5">
        <div className="container">
          <div className="row search-bar">
            <div className="col-md-3">
              <Select
                name="country"
                options={countries}
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                defaultOption="Any Location"
                icon="fa-solid fa-location-dot"
              />
            </div>

            <div className="col-md-7">
              <Input
                type="text"
                placeholder="Search artists"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="dropdown-menu show position-absolute w-50 shadow">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={suggestion.id || index}
                      className="dropdown-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                      style={{ cursor: "pointer" }}
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="col-md-2">
              <Button
                className="btn btn-dark w-100 rounded-lg"
                onClick={handleSearchClick}
              >
                <i className="fa fa-search me-3"></i>
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
