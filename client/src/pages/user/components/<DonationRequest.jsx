import React from 'react'

export default function DonationRequest () {
  return (
    <>
      <section class='flex-[0.7]overflow-hidden bg-white py-8 px-5 sm:py-16'>
          <div class='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none '>
            <div class='lg:pr-8 lg:pt-4'>
              <div class='lg:max-w-lg'>
                <h2 class='text-base font-semibold leading-7 text-teal-600'>
                  Make a Difference
                </h2>
                <p class='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                  Support Our Cause
                </p>
                <p class='mt-6 text-lg leading-8 text-gray-600'>
                  Your donation helps us provide essential resources and support
                  to those in need. Every contribution counts.
                </p>
                <dl class='mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none'>
                  <div class='relative pl-9'>
                    <dt class='inline font-semibold text-gray-900'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        class='absolute left-1 top-1 h-5 w-5 text-teal-600'
                      >
                        <path d='M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z'></path>
                        <path d='M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z'></path>
                        <path d='M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z'></path>
                      </svg>
                      Every Contribution Matters
                    </dt>
                    <dd class='inline'>
                      Your donation, big or small, makes a significant impact in
                      helping those in need.
                    </dd>
                  </div>
                  <div class='relative pl-9'>
                    <dt class='inline font-semibold text-gray-900'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        class='absolute left-1 top-1 h-5 w-5 text-teal-600'
                      >
                        <path
                          fill-rule='evenodd'
                          d='M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z'
                          clip-rule='evenodd'
                        ></path>
                      </svg>
                      Safe & Secure
                    </dt>
                    <dd class='inline'>
                      We ensure your donation is processed securely and used for
                      the right cause.
                    </dd>
                  </div>
                  <div class='relative pl-9'>
                    <dt class='inline font-semibold text-gray-900'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        class='absolute left-1 top-1 h-5 w-5 text-teal-600'
                      >
                        <path
                          fill-rule='evenodd'
                          d='M14.5 10a4.5 4.5 0 004.284-5.882c-.105-.324-.51-.391-.752-.15L15.34 6.66a.454.454 0 01-.493.11 3.01 3.01 0 01-1.618-1.616.455.455 0 01.11-.494l2.694-2.692c.24-.241.174-.647-.15-.752a4.5 4.5 0 00-5.873 4.575c.055.873-.128 1.808-.8 2.368l-7.23 6.024a2.724 2.724 0 103.837 3.837l6.024-7.23c.56-.672 1.495-.855 2.368-.8.096.007.193.01.291.01zM5 16a1 1 0 11-2 0 1 1 0 012 0z'
                          clip-rule='evenodd'
                        ></path>
                      </svg>
                      Transparent & Accountable
                    </dt>
                    <dd class='inline'>
                      We maintain complete transparency in fund utilization for
                      the benefit of the community.
                    </dd>
                  </div>
                </dl>
              </div>
              <div class='mt-10 flex items-center gap-x-6'>
               
              </div>
            </div>
            {/* <img
              className='absolute -z-10'
              src='https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxjb21wdXRlcnxlbnwwfDB8fHwxNjkxODE2NjY3fDA&ixlib=rb-4.0.3&q=80&w=1080'
              alt='Donation campaign'
              class='w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0'
              width='2432'
              height='1442'
            /> */}
          </div>
      </section>
    </>
  )
}
