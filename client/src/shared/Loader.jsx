import React from 'react';

const Loader = () => {
    return (
        <div className="justify-center flex gap-2 h-screen items-center mx-auto w-screen">
        <div className="animate-bounce h-3 w-3 bg-[#252121] rounded-full"></div>
        <div className="animate-bounce h-3 w-3 bg-[#252121] rounded-full" style={{ animationDelay: "200ms" }}></div>
        <div className="animate-bounce h-3 w-3 bg-[#252121] rounded-full" style={{ animationDelay: "400ms" }}></div>
      </div>
    );
}

export default Loader;
