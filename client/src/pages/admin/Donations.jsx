import { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, Typography, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import axios from "axios";
import CustomButton from "../../utilities/CustomButton";
import AssignTaskModel from "./components/AssignTaskModel";

const BASE_URL = "http://localhost:5000/admin"; // Base URL for admin API

const Donation = () => {
    const [donations, setDonations] = useState([]);
    const [filter, setFilter] = useState("all"); // Filter state
    const [donationId, setDonationId] = useState('');
    const [showAssignTask, setShowAssignTask] = useState(false);
    const [userMail , setUserMail]  = useState(null)
    const assignTask = (id,mail) => {
        setDonationId(id);
        setShowAssignTask(true);
        setUserMail(mail);
    }
    // Fetch all donations
    useEffect(() => {
        axios.get(`${BASE_URL}/donations`)
            .then((res) => setDonations(res.data))
            .catch((err) => console.error("Error fetching donations:", err));
    }, []);

    // Handle status update (approve/reject)
    const updateStatus = (id, status) => {
        axios.put(`${BASE_URL}/donations/${id}`, { status })
            .then(() => {
                setDonations((prev) =>
                    prev.map((donation) => (donation._id === id ? { ...donation, status } : donation))
                );
            })
            .catch((err) => console.error("Error updating status:", err));
    };

    // Filter donations based on selection
    const filteredDonations = donations.filter((donation) => {
        if (filter === "all") return true;
        if (filter === "cash") return donation.donationType === "money";
        if (filter === "non-cash") return donation.donationType !== "money";
        return true;
    });

    return (

        <>
            <TableContainer component={Paper} sx={{ marginTop: 3, padding: 2 }}>
                <div className="flex justify-between" >
                    <Typography variant="h5" gutterBottom>Manage Donations</Typography>

                    {/* Filter Dropdown */}
                    <FormControl variant="standard" sx={{ minWidth: 200, marginBottom: 2 }}>
                        <InputLabel>Filter</InputLabel>
                        <Select variant="standard" value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="cash">Cash Transactions</MenuItem>
                            <MenuItem value="non-cash">Non-Cash Transactions</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Donor</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDonations.map((donation) => (
                            donation.paymentStatus === "pending" && donation.donationType === "money" ? null : (
                                <TableRow key={donation._id}>
                                    <TableCell>{donation.donorId?.name || "Anonymous"}</TableCell>
                                    <TableCell>{donation.donationType}</TableCell>
                                    <TableCell>{donation.itemName || "-"}</TableCell>
                                    <TableCell>{donation.quantity || "-"}</TableCell>
                                    <TableCell>{donation.amount ? `₹${donation.amount}` : "-"}</TableCell>
                                    <TableCell>{donation.status}</TableCell>
                                    <TableCell sx={{display:"flex",gap:2}} >
                                        {donation.status === "pending" && donation.type !== "money" ? (
                                            <>
                                                <CustomButton callBack={()=>{assignTask(donation._id,donation?.donorId?.email)}} Label={"Assign Task"} />
                                                <CustomButton callBack={()=>{updateStatus(donation._id, "rejected")}} Label={"Reject"} />
                                            </>
                                        ) : (
                                            <>Completed</>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                showAssignTask &&
                <AssignTaskModel userMail={userMail} updateStatus={updateStatus} closeModal={setShowAssignTask} donationId={donationId} />
            }
        </>
    );
};

export default Donation;