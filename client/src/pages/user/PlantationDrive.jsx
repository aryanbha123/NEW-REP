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
      <DrivesPromo/>
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
function DrivesPromo() {
  return (
    <div className="container mx-auto py-9 md:py-12 px-4 md:px-6">
      <div className="flex items-stretch justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
        {/* Main Drive Promotion */}
        <div className="flex flex-col md:flex-row items-stretch justify-between bg-gray-50 dark:bg-gray-800 py-6 px-6 md:py-12 lg:px-12 md:w-8/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12">
          <div className="flex flex-col justify-center md:w-1/2">
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">
              Upcoming Drive
            </h1>
            <p className="text-base lg:text-xl text-gray-800 dark:text-white mt-2">
              Join our next <span className="font-bold">Education Drive</span> and make a difference!
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
            <img
              src="https://i.ibb.co/J2BtZdg/Rectangle-56-1.png"
              alt="Drive Image"
              className=""
            />
          </div>
        </div>
        
        {/* Secondary Drive Promotion */}
        <div className="md:w-4/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 bg-gray-50 dark:bg-gray-800 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">
              Volunteer Now
            </h1>
            <p className="text-base lg:text-xl text-gray-800 dark:text-white">
              Be a part of our <span className="font-bold">Social Impact</span> drives!
            </p>
          </div>
          <div className="flex justify-end md:absolute md:bottom-4 md:right-4 lg:bottom-0 lg:right-0">
            <img
              src="https://i.ibb.co/rGfP7mp/Rectangle-59-1.png"
              alt="Volunteer Image"
              className="md:w-20 md:h-20 lg:w-full lg:h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
