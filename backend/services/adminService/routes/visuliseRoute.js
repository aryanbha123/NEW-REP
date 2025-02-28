import express from "express";
import { Report } from "models-pms"; // Adjust the path based on your project structure

const router = express.Router();

// GET reports in the required format
router.get("/reports", async (req, res) => {
  try {
    // Get the total count of reports
    const totalReports = await Report.countDocuments();

    // Aggregate reports by location
    const reportsByLocation = await Report.aggregate([
      { 
        $group: { 
          _id: "$reportLocation", 
          count: { $sum: 1 } 
        }
      },
      { 
        $project: { 
          location: "$_id", 
          count: 1, 
          _id: 0 
        } 
      }
    ]);

    // Aggregate report breakdown by type
    const reportBreakdown = await Report.aggregate([
      { 
        $group: { 
          _id: "$reportType", 
          count: { $sum: 1 } 
        }
      },
      { 
        $project: { 
          type: "$_id", 
          count: 1, 
          _id: 0 
        } 
      }
    ]);

    // Aggregate status counts
    const statusCounts = await Report.aggregate([
      { 
        $group: { 
          _id: "$reportStatus", 
          count: { $sum: 1 } 
        }
      },
      { 
        $project: { 
          status: "$_id", 
          count: 1, 
          _id: 0 
        } 
      }
    ]);

    // Aggregate reports over time (by day) with date coercion
    const reportsOverTime = await Report.aggregate([
      // Coerce reportDate to Date if it's not already a valid Date
      {
        $addFields: {
          reportDate: { $toDate: "$reportDate" } // This ensures reportDate is treated as a Date
        }
      },
      {
        $group: {
          _id: { 
            $dateToString: { format: "%Y-%m-%d", date: "$reportDate" }
          },
          count: { $sum: 1 }
        }
      },
      { 
        $sort: { "_id": 1 } 
      },
      { 
        $project: { 
          date: "$_id", 
          count: 1, 
          _id: 0 
        } 
      }
    ]);

    // Send the aggregated data back to the client
    res.status(200).json({
      totalReports,
      reportsByLocation,
      reportBreakdown,
      statusCounts,
      reportsOverTime
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Error fetching reports", error });
  }
});

export default router;
