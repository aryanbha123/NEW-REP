import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Button,
  Modal,
  Box
} from '@mui/material'
import { ADMIN_MAIL, MAIL_URL } from '../../config/config'

const TaskManager = () => {
  const [tasks, setTasks] = useState([])
  const { user } = useSelector(s => s.auth)
  const [open, setOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  // Fetch tasks
  useEffect(() => {
    axios
      .get(`http://localhost:5000/member/user/${user.id}`)
      .then(res =>
        setTasks(res.data.filter(task => task.status !== 'completed'))
      )
      .catch(err => console.error('Error fetching tasks:', err))
  }, [user.id])

  // Update task status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.post(`http://localhost:5000/member/${taskId}/status`, {
        status: newStatus
      })
      toast.success('Task status updated!')
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      )
      axios.post(`${MAIL_URL}`, {
        mailto: `${user.email}`,
        mailcode: 3
      })
      axios.post(`${MAIL_URL}`, {
        mailto: `${ADMIN_MAIL}`,
        mailcode: 1
      })
    } catch (error) {
      console.log(error)
      toast.error('Failed to update task status!')
    }
  }

  // Open Modal
  const handleOpen = task => {
    setSelectedTask(task)
    setOpen(true)
  }

  // Close Modal
  const handleClose = () => {
    setOpen(false)
    setSelectedTask(null)
  }

  return (
    <div className='container'>
      <Typography variant='h4' gutterBottom>
        Task Management
      </Typography>
      <ToastContainer />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Task ID</strong>
              </TableCell>
              <TableCell>
                <strong>Assigned To</strong>
              </TableCell>
              <TableCell>
                <strong>Phone</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Update Status</strong>
              </TableCell>

              <TableCell>
                <strong>Info</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map(task => (
              <TableRow key={task._id}>
                <TableCell>{task._id}</TableCell>
                <TableCell>{task.assignedTo?.name || 'Unassigned'}</TableCell>
                <TableCell>
                  {task?.donationId?.donorId?.phone || 'N/A'}
                </TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select
                      value={task.status}
                      onChange={e => updateTaskStatus(task._id, e.target.value)}
                      size='small'
                    >
                      <MenuItem value='todo'>To-Do</MenuItem>
                      <MenuItem value='pending'>Pending</MenuItem>
                      <MenuItem value='completed'>Completed</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => handleOpen(task)}
                  >
                    Info
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Task Details Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          <Typography variant='h6' gutterBottom>
            Task Details
          </Typography>
          {selectedTask ? (
            <>
              <Typography>
                <strong>Task ID:</strong> {selectedTask._id}
              </Typography>
              <Typography>
                <strong>Assigned To:</strong>{' '}
                {selectedTask.assignedTo?.name || 'Unassigned'}
              </Typography>
              {/* <Typography><strong>Address:</strong> {selectedTask.address || "N/A"}</Typography> */}
              <Typography>
                <strong>Status:</strong> {selectedTask.status}
              </Typography>
              <Typography>
                {selectedTask.donationId?.donorId?.address?.street || 'N/A'}{' '}
                <br />
                {selectedTask.donationId?.donorId?.address?.city || 'N/A'}{' '}
                <br />
                {selectedTask.donationId?.donorId?.address?.zip || 'N/A'} <br />
              </Typography>
              <Typography>
                {' '}
                <strong>Task : Collect Donation</strong>
              </Typography>
            </>
          ) : (
            <Typography>No details available.</Typography>
          )}
          <Button variant='contained' sx={{ mt: 2 }} onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  )
}

export default TaskManager
