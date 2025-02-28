import {Report} from "models-pms";

// Get all reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate("userId", "name email");
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get a report by ID
export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate("userId", "name email");
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update report status
export const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "under_review", "action_taken", "resolved", "rejected"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { reportStatus: status },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Report status updated", report: updatedReport });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Take action on a report
export const takeAdminAction = async (req, res) => {
  try {
    const { action } = req.body;

    if (!action) {
      return res.status(400).json({ message: "Action is required" });
    }

    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { adminAction: action, reportStatus: "action_taken" },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Admin action updated", report: updatedReport });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Delete a report
export const deleteReport = async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);

    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
