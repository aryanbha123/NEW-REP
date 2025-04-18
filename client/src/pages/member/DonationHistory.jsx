import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    Modal,
    Box
} from "@mui/material";

const DonationHistory = () => {
    const [donations, setDonations] = useState([]);
    const { user } = useSelector((s) => s.auth);
    const [open, setOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    // Fetch completed tasks
    useEffect(() => {
        axios
            .get(`http://localhost:5000/member/user/${user.id}`)
            .then((res) => setDonations(res.data.filter(task => task.status === "completed"))) // Show only completed tasks
            .catch((err) => console.error("Error fetching donations:", err));
    }, [user.id]);

    // Open Modal
    const handleOpen = (task) => {
        setSelectedTask(task);
        setOpen(true);
    };

    // Close Modal
    const handleClose = () => {
        setOpen(false);
        setSelectedTask(null);
    };

    return (
        <div className="container">
            <Typography variant="h4" gutterBottom>
                Donation History
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Task ID</strong></TableCell>
                            <TableCell><strong>Assigned To</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Info</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {donations.map((task) => (
                            <TableRow key={task._id}>
                                <TableCell>{task._id}</TableCell>
                                <TableCell>{task.assignedTo?.name || "Unassigned"}</TableCell>
                                <TableCell>{task.status}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleOpen(task)}>
                                        Info
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal for Donor Address */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Donor Details
                    </Typography>
                    {selectedTask ? (
                        <>
                            <Typography><strong>Task ID:</strong> {selectedTask._id}</Typography>
                            <Typography><strong>Assigned To:</strong> {selectedTask.assignedTo?.name || "Unassigned"}</Typography>
                            <Typography><strong>Donor Address:</strong></Typography>
                            <Typography>
                                {selectedTask.donationId?.donorId?.address?.street || "N/A"} <br />
                                {selectedTask.donationId?.donorId?.address?.city || "N/A"} <br />
                                {selectedTask.donationId?.donorId?.address?.zip || "N/A"} <br />
                            </Typography>
                        </>
                    ) : (
                        <Typography>No details available.</Typography>
                    )}
                    <Button variant="contained" sx={{ mt: 2 }} onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default DonationHistory;
