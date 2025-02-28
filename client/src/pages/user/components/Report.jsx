import React, { useState } from "react";
import { TextField, MenuItem, Button, Grid } from "@mui/material";
import { reportTypes, dehradunAreas } from "../../../libs/constants";
import axios from "axios";
import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import Loader2 from "../../../utilities/Loader2";
import { toast } from "react-toastify";

const ReportForm = ({ setShowReport }) => {
    const { user } = useSelector((s) => s.auth);
    const [loading,setLoading] = useState(false);
    const [formData, setFormData] = useState({
        userId: user.id,
        reportType: "",
        reportDescription: "",
        reportLocation: "",
        supportingImages: [],
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prevData) => ({
            ...prevData,
            supportingImages: [...prevData.supportingImages, ...files],
        }));
    };

    const handleRemoveImage = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            supportingImages: prevData.supportingImages.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "supportingImages" && formData.supportingImages.length > 0) {
                formData.supportingImages.forEach((file) => {
                    formDataObj.append("supportingImages", file);
                });
            } else {
                formDataObj.append(key, formData[key]);
            }
        });
        setLoading(true)
        try {
            await axios.post("http://localhost:5000/user/reports", formDataObj, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Report submitted successfully!");
            setFormData({
                userId: user.id,
                reportType: "",
                reportDescription: "",
                reportLocation: "",
                supportingImages: [],
            });
        } catch (error) {

            toast.error("Error submitting report");
            alert("Failed to submit report.");
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className="h-screen transition-opacity duration-200 w-screen z-50 fixed backdrop-blur-xs flex justify-center items-center top-0 left-0">
            <form className="bg-white w-md p-5 rounded-2xl shadow-2xs" onSubmit={handleSubmit}>
                <div className="flex justify-between mb-4">
                    <h1>Submit a Report</h1>
                    <button onClick={() => setShowReport(false)} type="button" className="cursor-pointer">
                        <Close />
                    </button>
                </div>

                <TextField label="User ID" name="userId" value={formData.userId} disabled fullWidth margin="normal" required />

                <TextField select label="Report Type" name="reportType" value={formData.reportType} onChange={handleChange} fullWidth margin="normal" required>
                    {reportTypes.map((type) => (
                        <MenuItem key={type} value={type}>{type.replace("_", " ")}</MenuItem>
                    ))}
                </TextField>

                <TextField label="Description" name="reportDescription" value={formData.reportDescription} onChange={handleChange} fullWidth multiline rows={4} margin="normal" required />

                <TextField select label="Location" name="reportLocation" value={formData.reportLocation} onChange={handleChange} fullWidth margin="normal" required>
                    {dehradunAreas.map((area) => (
                        <MenuItem key={area} value={area}>{area}</MenuItem>
                    ))}
                </TextField>

                <input type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ marginTop: "10px", display: "block" }} />

                <div className="mt-4 grid grid-cols-3 gap-2">
                    {formData.supportingImages.map((image, index) => (
                        <div key={index} className="relative">
                            <img src={URL.createObjectURL(image)} alt={`preview ${index}`} className="w-20 h-20 object-cover rounded-md" />
                            <button type="button" className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full" onClick={() => handleRemoveImage(index)}>X</button>
                        </div>
                    ))}
                </div>

                <Grid container justifyContent="center" marginTop={2}>
                    <Button fullWidth type="submit" variant="contained" color="primary">
                        Submit Report
                    </Button>
                </Grid>
            </form>
            {
                loading && <Loader2/>
            }
        </div>
    );
};

export default ReportForm;
