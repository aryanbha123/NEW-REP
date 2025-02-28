import { useState, useEffect } from "react";
import {
    Typography, Grid, Paper, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, LineChart, Line
} from "recharts";
import { reportTypes } from "../../libs/constants"; // Assuming dehradunAreas is now dynamic
import axios from "axios";

const sampleData = {
    "totalReports": 0,
    "reportsByLocation": [
        // Sample data structure
        // { "location": "Rajpur", "count": 10 },
        // { "location": "Prem Nagar", "count": 15 },
    ],
    "reportBreakdown": [],
    "statusCounts": [],
    "reportsOverTime": []
};

const DashBoard = () => {
    const [allReports, setAllReports] = useState(sampleData);
    const [reportStats, setReportStats] = useState(sampleData);
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedReportType, setSelectedReportType] = useState("");

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get("http://localhost:5000/admin/data/reports/");
                setAllReports(response.data);
                setReportStats(response.data);  // Ensure initial state is populated
            } catch (err) {
                console.error("Failed to fetch data", err);
            }
        };

        fetchReports();
    }, []);

    useEffect(() => {
        let filteredData = { ...allReports };

        // Filter reports by location
        if (selectedArea) {
            filteredData.reportsByLocation = allReports.reportsByLocation.filter(
                (report) => report.location === selectedArea || selectedArea === ""
            );
        }

        // Filter report breakdown by type
        if (selectedReportType) {
            filteredData.reportBreakdown = allReports.reportBreakdown.filter(
                (report) => report.type === selectedReportType || selectedReportType === ""
            );
        }

        setReportStats(filteredData);
    }, [selectedArea, selectedReportType, allReports]);

    const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#D32F2F"];

    // Extract locations dynamically from the response data
    const locations = [...new Set(reportStats.reportsByLocation.map(report => report.location))];
    const problems = [...new Set(reportStats.reportBreakdown.map(report => report.type))];

    return (
        <>
            {/* Filters */}
            <section className="flex gap-5 mb-5">
                {/* Total Reports */}
                <div className="p-3 flex-1 shadow-sm bg-white">
                    <p>Total Reports: {reportStats.totalReports}</p>
                </div>

                <div className="flex">
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel>Select Area</InputLabel>
                        <Select
                            label="Location"
                            sx={{ width: "200px" }}
                            variant="standard"
                            value={selectedArea}
                            onChange={(e) => setSelectedArea(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            {locations.map((area) => (
                                <MenuItem key={area} value={area}>
                                    {area}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel>Select Problem</InputLabel>
                        <Select
                            sx={{ width: "200px" }}
                            variant="standard"
                            value={selectedReportType}
                            onChange={(e) => setSelectedReportType(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            {problems.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type.replace("_", " ")}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </section>

            <section className="flex gap-5">
                {/* Bar Chart - Reports Breakdown */}
                <div className="flex-1">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={reportStats.reportBreakdown}>
                            <XAxis dataKey="type" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#1976D2" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-center font-bold">Reports by Type</p>
                </div>

                {/* Pie Chart - Report Status */}
                <div className="flex-1">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={reportStats.statusCounts}
                                dataKey="count"
                                nameKey="status"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {reportStats.statusCounts.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                    <p className="text-center font-bold">Report Status Distribution</p>
                </div>

                {/* Pie Chart - Reports by Location */}
                <div className="flex-1">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={reportStats.reportsByLocation}
                                dataKey="count"
                                nameKey="location"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {reportStats.reportsByLocation.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                    <p className="text-center font-bold">Reports by Location</p>
                </div>
            </section>

            {/* Line Chart - Reports Over Time */}
            <section>
                <ResponsiveContainer className="pr-5" width="100%" height={300}>
                    <LineChart data={reportStats.reportsOverTime}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
                <p className="text-center font-bold">Reports Over Time</p>
            </section>
        </>
    );
};

export default DashBoard;
