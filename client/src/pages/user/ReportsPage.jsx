import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Box,
    CircularProgress,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Delete } from "@mui/icons-material";

const statusSteps = ["pending", "under_review", "action_taken"];

const ReportsPage = () => {
    const [reports, setReports] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const deleteReport = (id) => {
        axios.delete(`http://localhost:5000/user/reports/${id}`).then((res) => {
            setReports((prevReports) =>
                prevReports.filter((report) => report._id !== id)
            );
        });

    }
    useEffect(() => {
        if (!user) return;

        const fetchReports = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/user/reports/${user.id}`);
                setReports(response.data.report);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchReports();
    }, [user]);

    if (!user) return <p>Please log in to view reports.</p>;

    // Carousel settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                My Reports
            </Typography>
            <div className="grid grid-cols-3 gap-4">
                {reports.length >= 0 ? (
                    reports.map((report) => (
                        <Card key={report._id} sx={{ marginBottom: 3, boxShadow: 3, maxWidth: 500 }}>
                            {/* Image Carousel */}
                            {report.supportingImages.length > 1 ? (
                                <Slider {...sliderSettings}>
                                    {report.supportingImages.map((image, index) => (
                                        <CardMedia
                                            key={index}
                                            component="img"
                                            image={image.path}
                                            alt={`Report Image ${index + 1}`}
                                            sx={{
                                                height: 200,
                                                width: "100%",
                                                objectFit: "cover",
                                                borderRadius: "4px 4px 0 0",
                                            }}
                                        />
                                    ))}
                                </Slider>
                            ) : (
                                report.supportingImages.length === 1 && (
                                    <CardMedia
                                        component="img"
                                        image={report.supportingImages[0].path}
                                        alt="Report Image"
                                        sx={{
                                            height: 200,
                                            width: "100%",
                                            objectFit: "cover",
                                            borderRadius: "4px 4px 0 0",
                                        }}
                                    />
                                )
                            )}

                            <CardContent>
                                <div className="flex justify-between">

                                    <Typography variant="h6">
                                        {report.reportType.replace("_", " ").charAt(0).toUpperCase() + report.reportType.replace("_", " ").slice(1)}
                                    </Typography>
                                    <button type="button" onClick={() => { deleteReport(report._id) }} className="cursor-pointer">
                                        <Delete />
                                    </button>
                                </div>
                                <Typography variant="body1">{report.reportDescription}</Typography>
                                <Typography variant="body2">
                                    <strong>Location:</strong> {report.reportLocation}
                                </Typography>

                                {/* Status Stepper */}
                                <Box sx={{ marginTop: 2 }}>
                                    <Stepper activeStep={statusSteps.indexOf(report.reportStatus)} alternativeLabel>
                                        {statusSteps.map((step) => (
                                            <Step key={step}>
                                                <StepLabel>{step.replace("_", " ")}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                        <CircularProgress />
                    </Box>
                )}
            </div>
        </Box>
    );
};

export default ReportsPage;
