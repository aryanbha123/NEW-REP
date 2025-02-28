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
                return 2;
            case "rejected":
                return 3;
            default:
                return 0; // Initiated
        }
    };

    return (
        <Box>
            <Typography variant="h6" component="h6" sx={{ mb: 2 }}>
                Donation History
            </Typography>

            {donations.length > 0 ? (
                donations.map((donation, index) => {
                    // Skip donations with money type and "pending" payment status
                    if (donation.donationType === "money" && donation.paymentStatus === 'pending') return;

                    // Define the status steps dynamically based on donation type
                    const statusSteps = donation.donationType === "money"
                        ? ["Initiated", "Pending", "Success", "Failed"]
                        : ["Initiated", "Pending", "Approved", "Rejected"];

                    return (
                        <Paper key={index} sx={{ p: 2, mb: 2, borderRadius: 2, boxShadow: 3 }}>
                            <p className="text-md">
                                {donation.donationType === "money"
                                    ? `Money Donation - ₹${donation.amount}`
                                    : `${donation.itemName} - ${donation.quantity}`}
                            </p>
                            <p className="text-sm text-gray-600">
                                Priority: <>{donation.priority}</>
                            </p>
                            <p className="text-sm text-gray-600">
                                Status: <>{donation.status.toUpperCase()}</>
                            </p>

                            {/* Order tracking stepper */}
                            <Stepper activeStep={
                                donation.donationType === "money"
                                    ? getMoneyStepIndex(donation.paymentStatus)
                                    : getOtherDonationStepIndex(donation.status)
                            } alternativeLabel>
                                {statusSteps.map((label, index) => {
                                    return (
                                        <Step key={index}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    )
                                })}
                            </Stepper>

                            {/* Show Razorpay Transaction ID if it's a money donation */}
                            {donation.donationType === "money" && donation.transactionId && (
                                <Typography sx={{ fontSize: 14, mt: 2, color: "green" }}>
                                    Transaction ID: {donation.transactionId}
                                </Typography>
                            )}
                        </Paper>
                    );
                })
            ) : (
                <Typography>No donations found.</Typography>
            )}
        </Box>
    );
};

export default DonationPage;
