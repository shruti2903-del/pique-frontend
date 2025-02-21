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
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );

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

  // useEffect(() => {
  //   setSearchText(searchParams.get("search") || "");
  // }, [searchParams]);

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

  // const handleSuggestionClick = async (suggestion) => {
  //   const formattedName = suggestion.name.replace(/\s+/g, "_");
  //   setSearchQuery(suggestion.name);
  //   setShowSuggestions(false);

  //   const updatedParams = new URLSearchParams(searchParams);
  //   updatedParams.set("search", formattedName);
  //   updatedParams.set("category", suggestion.id);
  //   setSearchParams(updatedParams);

  //   setSelectedCategory(suggestion.id);
  //   await fetchEntertainers(suggestion.id);
  //   // updateFilters({
  //   //   category: suggestion.id,
  //   //   search: suggestion.name,
  //   //   entertainers: entertainers || [],
  //   // });
  // };

  const handleSuggestionClick = async (suggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    setSelectedCategory(suggestion.id);

    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("search", suggestion.name.replace(/\s+/g, "_"));
    updatedParams.set("category", suggestion.id);

    setSearchParams(updatedParams);

    // Fetch entertainers with category ID
    fetchEntertainers(suggestion.id);
  };

  // const handleSearchClick = () => {
  //   if (searchQuery.trim()) {
  //     const updatedParams = new URLSearchParams(searchParams);
  //     updatedParams.set("search", searchQuery);
  //     setSearchParams(updatedParams);
  //     navigate(`/user/entertainers?${updatedParams.toString()}`);
  //   }
  // };

  // const handleSearchClick = () => {
  //   const formattedQuery = searchQuery.trim().replace(/\s+/g, "_");
  //   const updatedParams = new URLSearchParams(searchParams);

  //   if (formattedQuery) {
  //     updatedParams.set("search", formattedQuery);
  //   } else {
  //     updatedParams.delete("search"); // Remove only if completely empty
  //   }

  //   if (selectedCategory) {
  //     updatedParams.set("category", selectedCategory);
  //   } else {
  //     updatedParams.delete("category");
  //   }

  //   setSearchParams(updatedParams);
  //   navigate(`/user/entertainers?${updatedParams.toString()}`);

  //   fetchEntertainers(selectedCategory);
  // };

  const handleSearchClick = () => {
    const formattedQuery = searchQuery.trim().replace(/\s+/g, "_");
    const updatedParams = new URLSearchParams();
  
    if (formattedQuery) {
      updatedParams.set("search", formattedQuery);
    }
  
    if (selectedCategory) {
      updatedParams.set("category", selectedCategory);
    }
  
    const queryString = updatedParams.toString();
    const newUrl = queryString ? `/user/entertainers?${queryString}` : `/user/entertainers`;
  
    setSearchParams(updatedParams);
    navigate(newUrl, { replace: true });
  
    console.log("Before fetching entertainers: ", updatedParams.toString());
    
    fetchEntertainers(selectedCategory, formattedQuery);
  };
  
  
  

  useEffect(() => {
    console.log("Current URL Params:", searchParams.toString());
  }, [searchParams]);

  // useEffect(() => {
  //   setSearchQuery(searchParams.get("search") || "");
  // }, []);

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
  }, [searchParams]);

  const fetchEntertainers = async (categoryId) => {
    const category = categoryId || searchParams.get("category");
    if (!category) return;

    const apiUrl = `${
      import.meta.env.VITE_API_URL
    }venues/search/category/${category}`;
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
          search: searchParams.get("search") || "",
          // entertainers: response.data.data,
        });
      } else {
        setEntertainers([]);
        updateFilters({
          category,
          search: searchParams.get("search") || "",
          // entertainers: [],
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

  // useEffect(() => {
  //   const categoryId = searchParams.get("category");
  //   if (categoryId) {
  //     fetchEntertainers(categoryId);
  //   }
  // }, [searchParams.get("category")]);

  return (
    <>
      <div className="container-fluid bg-light p-3">
        <div className="container">
          <div className="row search-bar gx-1">
            <div className="col-md-3">
              {/* <Select
                name="country"
                options={countries}
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                defaultOption="Any Location"
                className="form-control profile-font"
                icon="fa-solid fa-location-dot"
              /> */}
              <div className="row gx-1">
                <div className="col-md-6 position-relative">
                  <input
                    type="date"
                    className="form-control rounded-3 profile-font custom-date-input"
                    id="dateInput"
                    onFocus={(e) => (e.target.style.color = "#000")}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.style.color = "transparent";
                    }}
                  />
                  <label
                    htmlFor="dateInput"
                    className="position-absolute profile-font text-muted"
                    style={{
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                    }}
                  >
                    Date
                  </label>
                </div>
                <div className="col-md-6 position-relative">
                  <label
                    htmlFor="timeInput"
                    className="position-absolute profile-font text-muted"
                    style={{
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                    }}
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    className="form-control rounded-3 profile-font ps-5 custom-time-input"
                    id="timeInput"
                    onFocus={(e) => (e.target.style.color = "#000")}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.style.color = "transparent";
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <Input
                type="text"
                placeholder="Search artists"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                className="form-control profile-font rounded-3"
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul
                  className="dropdown-menu show position-absolute shadow"
                  style={{ width: "48%" }}
                >
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={suggestion.id || index}
                      className="dropdown-item profile-font"
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
                className="btn btn-dark w-100 rounded-3 profile-font"
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
