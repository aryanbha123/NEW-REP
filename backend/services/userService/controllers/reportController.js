import { Report } from "models-pms";

// @desc Create a new report
// @route POST /api/reports
export const createReport = async (req, res) => {
  try {
    console.log(req.body)
    // console.log(req.)
    const { userId, reportType, reportDescription, reportLocation, supportingImages, severityLevel, userContact } = req.body;

    const newReport = new Report({
      userId,
      reportType,
      reportDescription,
      reportLocation,
      supportingImages:req.files,
      severityLevel,
      userContact
    });

    await newReport.save();
    res.status(201).json({ success: true, message: "Report submitted successfully", report: newReport });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating report", error: error.message });
  }
};

// @desc Get all reports
// @route GET /api/reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate("userId", "name email"); // Populate user details
    res.status(200).json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching reports", error: error.message });
  }
};

// @desc Get a single report by ID
// @route GET /api/reports/:id
export const getReportById = async (req, res) => {
  try {
    const report = await Report.find({userId:req.params.id});
    if (!report) return res.status(404).json({ success: false, message: "Report not found" });

    res.status(200).json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching report", error: error.message });
  }
};

// @desc Update report status
// @route PATCH /api/reports/:id/status
export const updateReportStatus = async (req, res) => {
  try {
    const { reportStatus, adminAction } = req.body;
    const report = await Report.findById(req.params.id);
    
    if (!report) return res.status(404).json({ success: false, message: "Report not found" });

    report.reportStatus = reportStatus || report.reportStatus;
    report.adminAction = adminAction || report.adminAction;

    await report.save();
    res.status(200).json({ success: true, message: "Report status updated", report });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating report", error: error.message });
  }
};

// @desc Delete a report
// @route DELETE /api/reports/:id
export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) return res.status(404).json({ success: false, message: "Report not found" });

    res.status(200).json({ success: true, message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting report", error: error.message });
  }
};
