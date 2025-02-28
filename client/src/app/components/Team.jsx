import React from 'react';

const Team = () => {
    return (
        <div>
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-10">
                    <h1 class="text-3xl font-bold">Meet Our Team</h1>
                    <p class="text-gray-600 dark:text-gray-400">Our dedicated team of professionals is here to help you succeed.</p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white  shadow-lg rounded-lg overflow-hidden">
                        <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk2.webp" alt="Team Member 1" class="w-full h-48 object-cover" />
                        <div class="p-6">
                            <h2 class="text-xl font-semibold">John Doe</h2>
                            <p class="text-gray-600 dark:text-gray-400">Full-Stack Developer</p>
                           
                        </div>
                    </div>

                    <div class="bg-white  shadow-lg rounded-lg overflow-hidden">
                        <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk3.webp" alt="Team Member 2" class="w-full h-48 object-cover" />
                        <div class="p-6">
                            <h2 class="text-xl font-semibold">Jane Smith</h2>
                            <p class="text-gray-600 dark:text-gray-400">UI/UX Designer</p>
                            
                        </div>
                    </div>

                    <div class="bg-white  shadow-lg rounded-lg overflow-hidden">
                        <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722163/AbhirajK/Abhirajk%20mykare.webp" alt="Team Member 3" class="w-full h-48 object-cover" />
                        <div class="p-6">
                            <h2 class="text-xl font-semibold">Alex Johnson</h2>
                            <p class="text-gray-600 dark:text-gray-400">Project Manager</p>
                           
                        </div>
                    </div>
                </div>


            </div>

        </div>
    );
}

export default Team;
