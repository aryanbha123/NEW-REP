import { Step, StepLabel, Stepper, Typography, Paper, Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const DonationPage = () => {
    const [donations, setDonations] = useState([]);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user?.id) return;

        axios.get(`http://localhost:5000/user/donations/${user.id}`)
            .then((res) => {
                setDonations(res.data);
                // toast.success("Donation history fetched successfully!");
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to fetch donation history.");
            });
    }, [user?.id]);

    // Function to determine step index from donation status for money donations
    const getMoneyStepIndex = (status) => {
        switch (status) {
            case "pending":
                return 1;
            case "success":
                return 2;
            case "failed":
                return 3;
            default:
                return 0; // Initiated
        }
    };

    // Function to determine step index from donation status for other donations
    const getOtherDonationStepIndex = (status) => {
        switch (status) {
            case "pending":
                return 1;
            case "approved":
                return 3;
            case "assigned":
                return 4;
            case "rejected":
                return 4;
            default:
                return 0; // Initiated
        }
    };

    return (
        <Box>
            <Typography variant="h6" component="h6" sx={{ mb: 2 }}>
                Donation History
            </Typography>

            {donations.map((donation, index) => {
                const isMoneyDonation = donation.donationType === "money";
                if (isMoneyDonation && donation.paymentStatus == "pending") return;
                // Define steps based on donation type
                const statusSteps = isMoneyDonation
                    ? ["Initiated", "Pending", "Success"]
                    : ["Initiated", "Pending", "Approved" , "Assigned", "Rejected"];

                // Filter steps so that only one final step (either "Approved" OR "Rejected") is included
                const filteredSteps = statusSteps.filter((label, _, arr) => {
                    if (donation.status == "rejected" && label == "Assigned") return false; // Remove Approved if Rejected exists
                    if (donation.status == "rejected" && label == "Approved") return false; // Remove Approved if Rejected exists
                    if((donation.status == "approved" || donation.status == "assigned") && label=="Rejected")   return false;
        
                    return true;
                });

                return (
                    <Paper key={index} sx={{ p: 2, mb: 2, borderRadius: 2, boxShadow: 3 }}>
                        <p className="text-md">
                            {isMoneyDonation
                                ? `Money Donation - ₹${donation.amount}`
                                : `${donation.itemName} - ${donation.quantity}`}
                        </p>
                        <p className="text-sm text-gray-600">Priority: {donation.priority}</p>
                        <p className="text-sm text-gray-600">Status: {donation.status.toUpperCase()}</p>

                        {/* Stepper */}
                        <Stepper
                            activeStep={
                                isMoneyDonation
                                    ? getMoneyStepIndex(donation.paymentStatus)
                                    : getOtherDonationStepIndex(donation.status)
                            }
                            alternativeLabel
                        >
                            {filteredSteps.map((label, i) => (
                                <Step key={i}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Paper>
                );
            })}

        </Box>
    );
};

export default DonationPage;
