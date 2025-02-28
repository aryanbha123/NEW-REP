import React from "react";

const CTA = () => {
    return (
        <div>
            <div className="relative overflow-hidden bg-emerald-600 text-white rounded-2xl m-16">
                <div className="px-16 py-8 sm:px-8 lg:px-16 lg:py-14">
                    <div className="md:flex md:items-center md:space-x-12 lg:space-x-24">
                        {/* Content */}
                        <div className="max-w-2xl">
                            <h2 className="text-3xl font-bold">
                                Support Eco Bloom Plantation
                            </h2>
                            <p className="mt-4 text-lg">
                                Join us in making the world greener! Your contribution helps us
                                plant trees, restore biodiversity, and promote sustainable farming.
                            </p>

                            {/* Feature List */}
                            <ul className="mt-6 space-y-3 text-base font-medium">
                                {[
                                    "Tree Plantation Drives",
                                    "Sustainable Agriculture",
                                    "Eco-friendly Initiatives",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2 text-yellow-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Donate Button */}

                        </div>

                        {/* Decorative SVG */}
                        <div className="hidden md:block">
                            <svg
                                className="w-4 h-auto text-green-600"
                                viewBox="0 0 16 123"
                                fill="none"
                                stroke="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {[...Array(8)].map((_, i) => (
                                    <line
                                        key={i}
                                        y1="-0.5"
                                        x2="18.0278"
                                        y2="-0.5"
                                        transform={`matrix(-0.83205 -0.5547 -0.5547 0.83205 15 ${11 + i * 14
                                            })`}
                                    />
                                ))}
                            </svg>

                        </div>
                        <button className="mt-6 px-6 py-3 text-lg font-semibold bg-yellow-500 rounded-lg hover:bg-yellow-600 transition">
                            Donate Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTA;
