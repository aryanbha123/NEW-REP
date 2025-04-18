import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Select, MenuItem, TextField, Dialog, DialogActions, DialogContent,
  DialogTitle, Typography, Grid
} from "@mui/material";

const API_BASE_URL = "http://localhost:5000/admin"; // Change according to backend

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [adminAction, setAdminAction] = useState("");
  const [openActionDialog, setOpenActionDialog] = useState(false);
  const [openInfoDialog, setOpenInfoDialog] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleStatusChange = async (reportId, status) => {
    try {
      await axios.put(
        `${API_BASE_URL}/reports/${reportId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchReports();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const openActionDialogHandler = (report) => {
    setSelectedReport(report);
    setOpenActionDialog(true);
  };

  const openInfoDialogHandler = (report) => {
    setSelectedReport(report);
    setOpenInfoDialog(true);
  };

  const handleAdminAction = async () => {
    if (!adminAction.trim()) return;
    try {
      await axios.put(
        `${API_BASE_URL}/reports/${selectedReport._id}/action`,
        { action: adminAction },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchReports();
      setOpenActionDialog(false);
      setAdminAction("");
    } catch (error) {
      console.error("Error taking admin action:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard - Reports Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report._id}>
                <TableCell>{report.userId?.name || "Unknown"}</TableCell>
                <TableCell>{report.reportType}</TableCell>
                <TableCell>{report.reportDescription}</TableCell>
                <TableCell>
                  <Select
                    value={report.reportStatus}
                    onChange={(e) => handleStatusChange(report._id, e.target.value)}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="under_review">Under Review</MenuItem>
                    <MenuItem value="action_taken">Action Taken</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => openActionDialogHandler(report)}>Take Action</Button>
                  <Button
                    variant="outlined"
                    color="info"
                    style={{ margin: "10px" }}
                    onClick={() => openInfoDialogHandler(report)}
                  >
                    Info
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Dialog */}
      <Dialog open={openActionDialog} onClose={() => setOpenActionDialog(false)}>
        <DialogTitle>Take Admin Action</DialogTitle>
        <DialogContent>
          <TextField
            label="Action Description"
            fullWidth
            multiline
            rows={3}
            value={adminAction}
            onChange={(e) => setAdminAction(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenActionDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAdminAction}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Info Dialog */}
      <Dialog open={openInfoDialog} onClose={() => setOpenInfoDialog(false)}>
        <DialogTitle>Supporting Images</DialogTitle>
        <DialogContent>
          {selectedReport?.supportingImages?.length > 0 ? (
            <Grid container spacing={2}>
              {selectedReport.supportingImages.map((image, index) => (
                <Grid item xs={6} key={index}>
                  <img
                    src={image.path}
                    alt={`Supporting ${index + 1}`}
                    style={{ width: "100%", borderRadius: "5px" }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No supporting images available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInfoDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
