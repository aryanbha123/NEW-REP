import React from 'react';

const Loader1 = () => {
    return (
        <div className='fixed flex justify-center items-center h-screen w-screen' >
            <div className='animate-spin rounded-full h-8 w-8 border-t-gray-400 border-gray-900 border-4' ></div>
        </div>
    );
}

export default Loader1;
