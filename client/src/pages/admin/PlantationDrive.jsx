import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardContent, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Autocomplete } from "@mui/material";
import CustomButton from "../../utilities/CustomButton";
import { Delete, Edit, AddCircleOutline, Visibility } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { dehradunAreas as locationOptions } from '../../libs/constants';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const AdminPlantationDrive = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      };
    const { user } = useSelector((s) => s.auth);
    const [drives, setDrives] = useState([]);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false); // Toggle for suggestions
    const [formData, setFormData] = useState({
        createdBy: user.id, title: "", location: "", date: "", description: "",
    });
    const [editId, setEditId] = useState(null);
    const [suggestedDrives, setSuggestedDrives] = useState([]);

    useEffect(() => {
        fetchDrives();
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/admin/reports`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setReports(response.data);
            generateSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    };

    const fetchDrives = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/admin/drive");
            setDrives(data);
        } catch (error) {
            toast.error("Failed to fetch drives.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const generateSuggestions = (reports) => {
        const locations = [...new Set(reports.map(report => report.reportLocation))];

        const suggested = locations.map(location => ({
            title: `Plantation Drive at ${location}`,
            location,
            date: "",
            description: `A plantation drive is suggested at ${location} due to recent reports.`,
        }));

        setSuggestedDrives(suggested);
    };
    useEffect(() => {
        // generateSuggestions();
    }, [])
    const handleSubmit = async () => {
        try {
            if (editId) {
                await axios.put(`http://localhost:5000/admin/drive/${editId}`, formData);
                toast.success("Drive updated successfully!");
            } else {
                await axios.post("http://localhost:5000/admin/drive", formData);
                toast.success("New drive created!");
            }
            fetchDrives();
            handleClose();
        } catch (error) {
            toast.error("Error saving drive.");
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/admin/drive/${id}`);
            toast.success("Drive deleted successfully!");
            fetchDrives();
        } catch (error) {
            toast.error("Error deleting drive.");
            console.error(error);
        }
    };

    const handleOpen = (drive = null) => {
        if (drive) {
            setFormData({ ...drive, createdBy: drive.createdBy || user.id });
            setEditId(drive._id);
        } else {
            setFormData({ createdBy: user.id, title: "", location: "", date: "", description: "" });
            setEditId(null);
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    if (loading) return <p className="text-center text-lg font-semibold">Loading drives...</p>;

    return (
        <div className="mx-auto">
            <div className="flex justify-between items-center mb-4">
                <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                    Create New Drive
                </Button>


                {/* Button to toggle suggestions */}

            </div>
            {/* {showSuggestions && ( */}

            <Slider {...settings} >
                {suggestedDrives.map((drive, index) => (
                   <div className="p-3">

<div key={index} className="bg-white shadow-md rounded-lg p-4 m-4">
                        <h3 className="text-lg font-semibold text-gray-800">{drive.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            <span className="font-semibold">Location:</span> {drive.location}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{drive.description}</p>
                        <button onClick={() => handleOpen()} className="mt-4 flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-md shadow hover:bg-green-700 transition-all">
                            <AddCircleOutline fontSize="small" /> Create Drive
                        </button>
                    </div>
                   </div>
                ))}
            </Slider>


            <h2 className="text-xl font-bold text-start my-5">Manage Plantation Drives</h2>

            {/* Show suggestions only when toggled on */}
            {showSuggestions && suggestedDrives.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Suggested Drives</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {suggestedDrives.map((drive, index) => (
                            <Card key={index} className="shadow-md">
                                <CardContent>
                                    <p className="font-bold">{drive.title}</p>
                                    <p className="text-sm text-gray-600">Location: {drive.location}</p>
                                    <p className="text-sm text-gray-600">Description: {drive.description}</p>
                                    <div className="flex items-center space-x-2 mt-4">
                                        <CustomButton Icon={<AddCircleOutline sx={{ fontSize: 15 }} />} Label="Create Drive" callBack={() => handleOpen(drive)} />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {drives.length === 0 ? (
                <p className="text-center text-gray-600">No drives available</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {drives.map((drive) => (
                        <Card key={drive._id} className="shadow-md">
                            <CardContent>
                                <p className="font-bold">{drive.title}</p>
                                <p className="text-sm text-gray-600">Location: {drive.location}</p>
                                <p className="text-sm text-gray-600">Date: {new Date(drive.date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-600">Description: {drive.description}</p>
                                <div className="flex items-center space-x-2 mt-4">
                                    <CustomButton Icon={<Edit sx={{ fontSize: 15 }} />} Label="Edit" callBack={() => handleOpen(drive)} />
                                    <CustomButton Icon={<Delete sx={{ fontSize: 15 }} />} Label="Delete" callBack={() => handleDelete(drive._id)} />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editId ? "Edit Drive" : "Create Drive"}</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} margin="normal" />

                    <Autocomplete
                        fullWidth
                        options={locationOptions}
                        value={formData.location}
                        onChange={(event, newValue) => setFormData({ ...formData, location: newValue })}
                        renderInput={(params) => <TextField {...params} label="Location" margin="normal" />}
                    />

                    <TextField fullWidth label="Date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} margin="normal" InputLabelProps={{ shrink: true }} />
                    <TextField fullWidth label="Description" multiline rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} margin="normal" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminPlantationDrive;
