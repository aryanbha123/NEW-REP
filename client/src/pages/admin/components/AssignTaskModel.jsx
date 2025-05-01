import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  IconButton
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { MAIL_URL } from '../../../config/config'

const AssignTaskModel = ({userMail, donationId, closeModal, updateStatus }) => {
  const [data, setData] = useState([])
  // alert(donationId)
  useEffect(() => {
    axios
      .get('http://localhost:5000/member/tasks/count')
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const assignTask = async member => {
    try {
      const res = await axios.post('http://localhost:5000/member/tasks/', {
        donationId: donationId,
        assignedTo: member._id, // Match with backend
        status: 'todo' // Provide a default status if required
      })
      updateStatus(donationId, 'assigned', 'assigned')

      axios.post(`${MAIL_URL}`, {
        mailto: `${member.email}`,
        mailcode: 3
      })
      axios.post(`${MAIL_URL}`, {
        mailcode:6,
        mailto:`${userMail}`
      });
      toast.success('Task assigned successfully:')
    } catch (error) {
      console.error(
        'Error assigning task:',
        error.response ? error.response.data : error.message
      )
    }
  }

  return (
    <section className='h-screen flex justify-center items-center fixed top-0 left-0 z-50 backdrop-blur-md w-screen'>
      <div className='bg-white shadow-md p-7 rounded-2xl w-3/5 max-h-[80vh] overflow-auto'>
        <div className='flex justify-between'>
          <Typography variant='h6' fontWeight='bold' gutterBottom>
            Assign Task
          </Typography>
          <IconButton
            onClick={() => {
              closeModal(false)
            }}
          >
            <Close />
          </IconButton>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell align='center'>
                  <strong>Todo</strong>
                </TableCell>
                <TableCell align='center'>
                  <strong>Pending</strong>
                </TableCell>
                <TableCell align='center'>
                  <strong>Completed</strong>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map(member => (
                  <TableRow key={member._id} hover>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell align='center'>
                      {member.taskCount.todo}
                    </TableCell>
                    <TableCell align='center'>
                      {member.taskCount.pending}
                    </TableCell>
                    <TableCell align='center'>
                      {member.taskCount.completed}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          assignTask(member)
                        }}
                        variant='contained'
                        color='primary'
                        size='small'
                      >
                        Assign
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align='center'>
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  )
}

export default AssignTaskModel
