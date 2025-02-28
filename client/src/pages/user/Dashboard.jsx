import React, { useState } from "react";
// import data from "./data/sample.json";
import { Add } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import Payment from "./components/Payment";
import Donation from './components/Donations';
import Report from './components/Report';
const Dashboard = () => {
    const data = []
    const [showReport, setShowReport] = useState(false);
    const [showDonation, setShowDonation] = useState(false);
    return (
        <>
            <section className="grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="shadow-sm flex justify-center items-center w-full h-auto bg-gray-50">
                    <Tooltip title="Create a report" >
                        <Add onClick={() => setShowReport(true)} sx={{
                            fontSize: 30,
                            cursor: "pointer",
                            color: 'gray',
                        }} />
                    </Tooltip>
                </div>
                <div className="shadow-sm flex justify-center items-center w-full h-auto bg-gray-50">
                   <Donation/>
                </div>
               
                <div className="shadow-sm w-full  bg-gray-50">
                    <Payment />
                </div>
            </section>

            {/* Main Section */}
            <section className="p-4">
                <h1 className="text-2xl font-bold text- mb-6">Users Reports</h1>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((i, _) => (
                        <div key={_} className="bg-white shadow-md p-4 rounded-lg">
                            <h2 className="text-lg font-semibold">{i.reportType}</h2>
                            <p className="text-gray-600">{i.reportDescription}</p>
                            {i.supportingImages.length > 0 && (
                                <img
                                    src={i.supportingImages[0]}
                                    alt={i.reportType}
                                    className="mt-2 w-full h-40 object-cover rounded-md"
                                />
                            )}
                        </div>
                    ))}
                </section>
            </section>

            {showReport && <><Report setShowReport={setShowReport} /></>}
        </>
    );
};

export default Dashboard;
