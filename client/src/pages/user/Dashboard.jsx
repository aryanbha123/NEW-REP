import React, { useState } from 'react'
// import data from "./data/sample.json";
import { Add, Message } from '@mui/icons-material'
import { Chip, Tooltip } from '@mui/material'
import Payment from './components/Payment'
import Donation from './components/Donations'
import Report from './components/Report'
import Chatbot from './Chatbot'
import Stepper from './components/Stepper'
import EnvReportSection from './components/EnvReport'
import DonationRequest from './components/DonationRequest'
const Dashboard = () => {
  const data = []
  const [showReport, setShowReport] = useState(false)
  const [showDonation, setShowDonation] = useState(false)
  return (
    <>
      <header className='bg-teal-600 text-white p-6 shadow-md text-center'>
        <h1 className='text-3xl font-bold'>Welcome to the Dashboard</h1>
        <p className='mt-2 text-teal-100'>
          Manage your donations, payments, and reports all in one place.
        </p>
      </header>
      <section className='relative flex flex-col gap-4'>
        <div className='relative bg-white mb-10 flex  items-center w-full h-auto '>
            <EnvReportSection setShowReport={setShowReport}/>
          <div></div>
        </div>
        <div className='flex py-10 items-center w-full h-auto'>
          <Donation />
          <Stepper />
          <img
            className='absolute -z-10 -right-96 object-right'
            src='/2203.i402.003.S.m004.c13.Donation and volunteer work flat composition.jpg'
            alt=''
          />
        </div>

        <div className='shadow-sm justify-between pr-36 w-full flex '>
            <DonationRequest/>
          <Payment />
        </div>
      </section>

      {/* Main Section */}
      <section className='p-4'>

        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {data.map((i, _) => (
            <div key={_} className='bg-white shadow-md p-4 rounded-lg'>
              <h2 className='text-lg font-semibold'>{i.reportType}</h2>
              <p className='text-gray-600'>{i.reportDescription}</p>
              {i.supportingImages.length > 0 && (
                <img
                  src={i.supportingImages[0]}
                  alt={i.reportType}
                  className='mt-2 w-full h-40 object-cover rounded-md'
                />
              )}
            </div>
          ))}
        </section>
      </section>
      <Chatbot />
      {showReport && (
        <>
          <Report setShowReport={setShowReport} />
        </>
      )}
    </>
  )
}

export default Dashboard
