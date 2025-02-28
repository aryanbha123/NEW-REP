import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import AssignTaskModel from "./components/AssignTaskModel";
import { Try } from "@mui/icons-material";
import axios from "axios";

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/member/tasks")
            .then(data => setTasks(data.data))
            .catch(err => console.log(err))
    }, []);
    // Group tasks by status
    const groupedTasks = tasks.reduce((acc, task) => {
        acc[task.status] = acc[task.status] || [];
        acc[task.status].push(task);
        return acc;
    }, {});

    const donationData = [
        { name: "Seed", value: 5 },
        { name: "Plant", value: 3 },
        { name: "Other", value: 2 },
        { name: "Money", value: 7 },
    ];

    const donationTrend = [
        { month: "January", donations: 10 },
        { month: "February", donations: 15 },
        { month: "March", donations: 20 },
        { month: "April", donations: 25 },
        { month: "May", donations: 30 },
    ];

    const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"];

    return (
        <>
            <div className="">
                <div className="grid grid-cols-3 ">
                    {["todo", "pending", "completed"].map((status) => (
                        <div key={status} className=" p-4 overflow-y-scroll max-h-[340px] rounded-sm shadow-xs">
                            <h2 className="text-lg font-semibold mb-3 capitalize">
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </h2>
                            <div className="space-y-3">
                                {groupedTasks[status]?.map((task) => (
                                    <div key={task._id} className="p-1 flex justify-between border-b-[1px] border-gray-100 rounded-md">
                                        <div>
                                            <h3 className="text-xs">{task.assignedTo.name}</h3>
                                            <p className="text-xs text-gray-600">
                                                {/* Assigned At: {task.assignedAt.toDateString()} */}
                                                to collect {task.donationId.itemName} x {task.donationId.quantity} <br />
                                                from {task.donationId.donorId.name}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs">
                                                Priority { " "}
                                                {task.donationId.priority}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-white p-4 shadow-md rounded-md">
                        <h2 className="text-xl font-semibold mb-3">Donations by Type</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={donationData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    {donationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white p-4 shadow-md rounded-md">
                        <h2 className="text-xl font-semibold mb-3">Donation Trends</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={donationTrend}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="donations" stroke="#36A2EB" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskPage;
