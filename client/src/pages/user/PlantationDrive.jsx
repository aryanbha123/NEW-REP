import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomButton from "../../utilities/CustomButton";
import { EngineeringOutlined } from "@mui/icons-material";

const PlantationDrive = () => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/drive");
      setDrives(response.data);
    } catch (error) {
      console.error("Error fetching plantation drives:", error);
    } finally {
      setLoading(false);
    }
  };

  const enrollDrive = async (id) => {
    try {
      await axios.post(`http://localhost:5000/user/drive/enroll/${id}/`, {}, { withCredentials: true });
      alert("Successfully enrolled in the plantation drive!");
      fetchDrives(); // Refresh the list after enrolling
    } catch (error) {
      console.error("Error enrolling in plantation drive:", error);
      alert("Failed to enroll. Please try again.");
    }
  };

  if (loading) return <p>Loading drives...</p>;

  return (
    <div>
      <h2>Upcoming Plantation Drives</h2>
      {drives.length === 0 ? (
        <p>No drives available</p>
      ) : (
        <>
          {drives.map((drive) => (
            <li key={drive._id}>
              <h3>{drive.title}</h3>
              <p>Location: {drive.location}</p>
              <p>Date: {new Date(drive.date).toLocaleDateString()}</p>
              <p>{drive.description}</p>
            </li>
          ))}
        </>
      )}
    </div>
  );
};

export default PlantationDrive;