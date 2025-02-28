import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button, Card, CardContent, TextField,
    Dialog, DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import { Autocomplete } from "@mui/material"; 
import CustomButton from "../../utilities/CustomButton";
import { Delete, Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { dehradunAreas as locationOptions} from '../../libs/constants'

const AdminPlantationDrive = () => {
    const { user } = useSelector(s => s.auth);
    const [drives, setDrives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        createdBy: user.id, title: "", location: "", date: "", description: ""
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchDrives();
    }, []);

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
            <div className="flex justify-end">
                <Button variant="contained" color="primary" className="mb-4" onClick={() => handleOpen()}>
                    Create New Drive
                </Button>
            </div>
            <h2 className="text-xl font-bold text-start mb-4">Manage Plantation Drives</h2>
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
