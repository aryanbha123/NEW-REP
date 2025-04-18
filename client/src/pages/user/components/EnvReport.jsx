import React from "react";

const EnvReportSection = ({setShowReport}) => {
  return (
    <section className="overflow-hidden bg-white py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-teal-600">Take Action</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Submit Environmental Reports</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Help us track environmental issues in your area by submitting reports on pollution, deforestation, and other concerns.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-teal-600">
                      <path d="M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z"></path>
                    </svg>
                    Easy Submission
                  </dt>
                  <dd className="inline">Quickly report environmental concerns with a simple form.</dd>
                </div>
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-teal-600">
                      <path d="M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z"></path>
                    </svg>
                    Verified Reports
                  </dt>
                  <dd className="inline">Our team reviews and verifies all reports to ensure accuracy.</dd>
                </div>
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-teal-600">
                      <path d="M14.5 10a4.5 4.5 0 004.284-5.882c-.105-.324-.51-.391-.752-.15L15.34 6.66a.454.454 0 01-.493.11 3.01 3.01 0 01-1.618-1.616.455.455 0 01.11-.494l2.694-2.692c.24-.241.174-.647-.15-.752a4.5 4.5 0 00-5.873 4.575c.055.873-.128 1.808-.8 2.368l-7.23 6.024a2.724 2.724 0 103.837 3.837l6.024-7.23c.56-.672 1.495-.855 2.368-.8.096.007.193.01.291.01z"></path>
                    </svg>
                    Community Impact
                  </dt>
                  <dd className="inline">Your reports help drive real change and environmental action.</dd>
                </div>
              </dl>
            </div>
            <div className="mt-10 flex items-center gap-x-6">
              <a onClick={setShowReport} className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
                Submit a Report
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-700">
                {/* Learn More <span aria-hidden="true">→</span> */}
              </a>
            </div>
          </div>
                      <img className='' src="/27802.jpg" alt="" />
          
          {/* <img src="https://images.unsplash.com/photo-1521747116042-5a810fda9664" alt="Environmental concern" className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width="2432" height="1442" /> */}
        </div>
      </div>
    </section>
  );
};

export default EnvReportSection;