import React from 'react';

const Loader2 = () => {
    return (
        <div className='flex h-screen justify-center items-center w-screen fixed top-0 z-50 backdrop-blur-xs ' >
            <div className='flex  bg-gray-50 justify-center items-center h-[100px] w-[230px]'>
                Loading ... <div className='animate-spin h-5 w-5 ml-2 border-4 rounded-full border-t-gray-500 border-gray-600' ></div>
            </div>
        </div>
    );
}

export default Loader2;
