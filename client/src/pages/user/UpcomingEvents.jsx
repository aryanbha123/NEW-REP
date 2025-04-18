import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import PlantationDrive from './PlantationDrive' // Assuming you have this component for plantation drive details
import axios from 'axios'
import CustomButton from '../../utilities/CustomButton'
import { Dvr } from '@mui/icons-material'
import { ADMIN_MAIL, MAIL_URL } from '../../config/config'

const DonationPage = () => {
  const [plantationDrives, setPlantationDrives] = useState([])
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    // Fetch plantation drives - Replace with your actual data fetching logic
    // Example: This could be an axios call to your API to get plantation drives
    const fetchPlantationDrives = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/drive') // Fetch the plantation drives
        setPlantationDrives(response.data) // Assuming the data is in the response
      } catch (error) {
        console.error('Failed to fetch plantation drives', error)
        toast.error('Failed to fetch plantation drives.')
      }
    }

    fetchPlantationDrives()
  }, [])
  const handleEnroll = async (driveId) => {
    // Assuming you have an enrollment logic here
    // You will need to send a request to the backend to enroll the user in the drive
    try {
      // Add the user to the participants array of this plantation drive
       axios.post('http://localhost:5000/user/drive/enroll/' + driveId, {
        userId: user.id
      })
       axios.post(`${MAIL_URL}`, {
        mailto: `${user.email}`,
        mailcode: 4
      })
       axios.post(`${MAIL_URL}`, {
        mailto: `${ADMIN_MAIL}`,
        mailcode: 2
      })

      toast.success('Successfully enrolled in the plantation drive!')
    } catch (error) {
      toast.error('Failed to enroll in the plantation drive.')
    }
  }

  return (
    <Box>
      <DrivesPromo />
      <Typography variant='h6' component='h6' sx={{ mb: 2 }}>
        Plantation Drives
      </Typography>

      {plantationDrives.length > 0 ? (
        plantationDrives.map(drive => {
          const isEnrolled = drive.participants.includes(user.id) // Check if the user is already a participant

          return (
            <Paper
              key={drive._id}
              sx={{ p: 2, mb: 2, borderRadius: 2, boxShadow: 3 }}
            >
              <Typography variant='h6'>{drive.title}</Typography>
              <Typography variant='body2' sx={{ color: 'gray' }}>
                Location: {drive.location}
              </Typography>
              <Typography variant='body2' sx={{ color: 'gray' }}>
                Date: {new Date(drive.date).toLocaleDateString()}
              </Typography>
              <div className='mt-4'></div>
              {/* Show the enroll button only if the user is not already enrolled */}
              {drive.participants.filter(i => i._id == user.id).length == 0 ? (
                <>
                  <CustomButton
                    Label={'Enroll'}
                    callBack={() => handleEnroll(drive._id)}
                    variant='contained'
                    sx={{ mt: 2 }}
                  >
                    Enroll in Drive
                  </CustomButton>
                </>
              ) : (
                <CustomButton Label={'Enrolled'}></CustomButton>
              )}
            </Paper>
          )
        })
      ) : (
        <Typography>No plantation drives found.</Typography>
      )}
    </Box>
  )
}

export default DonationPage

function DrivesPromo () {
  return (
    <div className='container  py-9 md:py-5 '>
      <div className='flex items-stretch justify-start flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8'>
        {/* Main Drive Promotion */}
        <div className='flex flex-col md:flex-row items-stretch justify-between bg-gray-50 dark:bg-gray-800 py-6 px-6 md:py-12 lg:px-12 md:w-8/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12'>
          <div className='flex flex-col justify-center md:w-1/2'>
            <h1 className='text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white'>
              Upcoming Drive
            </h1>
            <p className='text-base lg:text-xl text-gray-800 dark:text-white mt-2'>
              Join our next <span className='font-bold'>Education Drive</span>{' '}
              and make a difference!
            </p>
          </div>
          <div className='md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end'>
            <img
              src='https://img.freepik.com/free-vector/hand-drawn-people-planting-tree-illustration_23-2149214943.jpg?uid=R128329910&ga=GA1.1.1460744493.1740725947&semt=ais_hybrid'
              alt='Drive Image'
              className='h-64 w-64'
            />
          </div>
        </div>

        {/* Secondary Drive Promotion */}
        <div className=' bg-gray-50 dark:bg-gray-800 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative'>
          <div className='flex flex-col justify-center'>
            <h1 className='text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white'>
              Volunteer Now
            </h1>
            <p className='text-base lg:text-xl text-gray-800 dark:text-white'>
              Be a part of our <span className='font-bold'>Social Impact</span>{' '}
              drives!
            </p>
          </div>
          <div className='flex justify-end md:absolute md:bottom-4 md:right-4 lg:bottom-0 lg:right-0'>
            <img
              src='https://img.freepik.com/free-vector/hand-drawn-people-planting-tree-illustrated_23-2149214944.jpg?uid=R128329910&ga=GA1.1.1460744493.1740725947&semt=ais_hybrid'
              alt='Volunteer Image'
              className='h-1 w-1 lg:w-full lg:h-full'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
