import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PlantationDrive from "./PlantationDrive"; // Assuming you have this component for plantation drive details
import axios from "axios";
import CustomButton from "../../utilities/CustomButton";

const DonationPage = () => {
    const [plantationDrives, setPlantationDrives] = useState([]);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        // Fetch plantation drives - Replace with your actual data fetching logic
        // Example: This could be an axios call to your API to get plantation drives
        const fetchPlantationDrives = async () => {
            try {
                const response = await axios.get("http://localhost:5000/admin/drive"); // Fetch the plantation drives
                setPlantationDrives(response.data); // Assuming the data is in the response
            } catch (error) {
                console.error("Failed to fetch plantation drives", error);
                toast.error("Failed to fetch plantation drives.");
            }
        };

        fetchPlantationDrives();
    }, []);
    const handleEnroll = (driveId) => {
        // Assuming you have an enrollment logic here
        // You will need to send a request to the backend to enroll the user in the drive
        try {
            // Add the user to the participants array of this plantation drive
            axios.post('http://localhost:5000/user/drive/enroll/' + driveId, {
                userId: user.id
            });
            toast.success("Successfully enrolled in the plantation drive!");
        } catch (error) {
            toast.error("Failed to enroll in the plantation drive.");
        }
    };

    return (
        <Box>
            <Typography variant="h6" component="h6" sx={{ mb: 2 }}>
                Plantation Drives
            </Typography>

            {plantationDrives.length > 0 ? (
                plantationDrives.map((drive) => {
                    const isEnrolled = drive.participants.includes(user.id); // Check if the user is already a participant

                    return (
                        <Paper key={drive._id} sx={{ p: 2, mb: 2, borderRadius: 2, boxShadow: 3 }}>
                            <Typography variant="h6">{drive.title}</Typography>
                            <Typography variant="body2" sx={{ color: "gray" }}>
                                Location: {drive.location}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "gray" }}>
                                Date: {new Date(drive.date).toLocaleDateString()}
                            </Typography>
                            <div className="mt-4" ></div>
                            {/* Show the enroll button only if the user is not already enrolled */}
                            {drive.participants.filter((i) => i._id == user.id).length == 0 ? <><CustomButton Label={"Enroll"}
                                callBack={() => handleEnroll(drive._id)}
                                variant="contained"
                                sx={{ mt: 2 }}
                            >
                                Enroll in Drive
                            </CustomButton></> : <CustomButton Label={"Enrolled"}></CustomButton>}
                        </Paper>
                    );
                })
            ) : (
                <Typography>No plantation drives found.</Typography>
            )}
        </Box >
    );
};

export default DonationPage;
