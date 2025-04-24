import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user }  = useSelector(s=>s.auth);
    useEffect(() => {
        axios.get("http://localhost:5000/member/tasks")
            .then((res) => {
                // Only keep tasks assigned to the current user
                console.log(user.id)
                console.log(res.data )
                const userTasks = res.data.filter(task => task.assignedTo._id === user.id);
                setTasks(userTasks);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching tasks:", err);
                setLoading(false);
            });
    }, [user._id]); // make sure useEffect runs when user is loaded
    

    // Count status categories
    const statusCounts = tasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
    }, {});

    // Count priority levels
    const priorityCounts = tasks.reduce((acc, task) => {
        const priority = task.donationId?.priority || "Unknown";
        acc[priority] = (acc[priority] || 0) + 1;
        return acc;
    }, {});

    // Format Data for Charts
    const statusData = Object.keys(statusCounts).map(status => ({
        name: status.charAt(0).toUpperCase() + status.slice(1),
        count: statusCounts[status]
    }));

    const priorityData = Object.keys(priorityCounts).map(priority => ({
        name: priority,
        count: priorityCounts[priority]
    }));

    const COLORS = ["#14b8a6", "#0d9488", "#0f766e", "#115e59"];

    return (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="h4" color="teal" fontWeight="bold">📊 Dashboard</Typography>

            {loading ? (
                <CircularProgress sx={{ color: "teal" }} />
            ) : (
                <>
                    {/* Task Status Chart */}
                    <Card sx={{ bgcolor: "teal.50", p: 2 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" color="teal.700">Task Status Distribution</Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={statusData}>
                                    <XAxis dataKey="name" stroke="teal" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#14b8a6" barSize={50} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Task Priority Chart */}
                    <Card sx={{ bgcolor: "teal.50", p: 2 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" color="teal.700">Priority Breakdown</Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={priorityData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={120}
                                        fill="#14b8a6"
                                        dataKey="count"
                                    >
                                        {priorityData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </>
            )}
        </Box>
    );
};

export default Dashboard;
