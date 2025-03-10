import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashLayout from "../../DashLayout";
import CustomTable from "../../../components/CustomTable";
import { DELETE_EVENT, GET_ALL_EVENTS } from "../../../../constants";

const EventsList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    fetchEvents(pagination.current, pagination.pageSize, search);
  }, [pagination.current, pagination.pageSize, search, flag]);

  const fetchEvents = async (page, pageSize, search) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}${GET_ALL_EVENTS}`,
        {
          params: { page, pageSize, search },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data && response.data.records) {
        setEvents(response.data.records);
        setPagination((prev) => ({ ...prev, total: response.data.total }));
      }
    } catch (err) {
      setError("Failed to load events");
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    console.log("Edit event:", record);
    navigate("/admin/editevent", { state: record });
  };
  const deleteEvent = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}${DELETE_EVENT}${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        toast.success(`Event has been deleted successfully.`, {
          autoClose: 1000,
        },
      setFlag(!flag))
        
      }
    } catch (error) {
      console.error(
        `Failed to delete event with ID ${id}:`,
        error.response?.data || error.message
      );
    }
  };
  const handleDelete = async (record) => {
    console.log("Delete event:", record);
    deleteEvent(record.id);
    
  };

  const handleView = (record) => {
    console.log("View event:", record);
    navigate("/admin/viewevent", { state: record });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/admin/viewevent", { state: record });
          }}
          className=" text-primary"
        >
          {text}
        </a>
      ),
    },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (text) =>
        new Date(text).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (text) =>
        new Date(text).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          style={{ fontSize: "8px" }}
          className={`badge text-uppercase ${
            status === "pending" ? "bg-pending" : "bg-success"
          }`}
        >
          {status}
        </span>
      ),
    },
    { title: "Actions", key: "actions", actions: true },
  ];

  return (
    <DashLayout>
      <h5 className="text-secondary text-center mb-4">Events List</h5>
      <ToastContainer />
      <button
        onClick={() => navigate("/admin/createevent")}
        className="btn btn-primary float-end d-flex align-items-center mb-4 m-2"
      >
        <i className="fa fa-add" style={{ marginRight: "8px" }}></i>
        Create Event
      </button>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="table">
          <div className="table overflow-scroll">
            <CustomTable
              data={events}
              columns={columns}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
              pagination={pagination}
              onTableChange={(pagination) => {
                fetchEvents(pagination.current, pagination.pageSize, search);
              }}
              search={search}
              onSearchChange={(value) => {
                setSearch(value);
                fetchEvents(1, pagination.pageSize, value);
              }}
            />
          </div>
        </div>
      )}
    </DashLayout>
  );
};

export default EventsList;
