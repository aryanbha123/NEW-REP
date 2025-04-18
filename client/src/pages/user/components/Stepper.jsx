const Stepper = () => {
    const steps = [
        {
            title: "Step 1",
            description: "Donate: Select from the left side."
        },
        {
            title: "Step 2",
            description: "Admin will approve it."
        },
        {
            title: "Step 3",
            description: "Member will receive the donation."
        }
    ];

    return (
        <div className="p-4 flex-1  mx-auto ">
            <h2 className="font-heading text-gray-800 mb-8 text-3xl font-bold lg:text-4xl">
                Donation Process Steps
            </h2>
            {steps.map((step, index) => (
                <div className="flex" key={index}>
                    <div className="mr-4 flex flex-col items-center">
                        <div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className="h-6 w-6 text-teal-600 ">
                                    <path d="M12 5v14"></path>
                                    <path d="M18 13l-6 6"></path>
                                    <path d="M6 13l6 6"></path>
                                </svg>
                            </div>
                        </div>
                        {index !== steps.length - 1 && <div className="h-full w-px bg-gray-300 dark:bg-slate-500"></div>}
                    </div>
                    <div className="pt-1 pb-8">
                        <p className="mb-2 text-xl font-bold text-gray-900 ">{step.title}</p>
                        <p className="text-gray-600 ">{step.description}</p>
                    </div>
                </div>
            ))}
            <div className="flex">
                <div className="mr-4 flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900 bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="h-6 w-6 text-teal-400 ">
                            <path d="M5 12l5 5l10-10"></path>
                        </svg>
                    </div>
                </div>
                <div className="pt-1">
                    <p className="mb-2 text-xl font-bold text-gray-800">Done</p>
                </div>
            </div>

        </div>
    );
};

export default Stepper;