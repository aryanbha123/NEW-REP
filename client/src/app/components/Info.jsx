import React from "react";
import { motion } from "framer-motion";

const Info = () => {
  return (
    <div className="w-full p-10 py-20 text-center">
      <h2 className="text-3xl font-bold mb-10">How to Donate</h2>
      <div className="relative flex justify-center items-center space-x-6">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-green-500 text-white flex items-center justify-center rounded-full text-lg font-bold shadow-lg">
            1
          </div>
          <p className="text-xl mt-2">Contribute your donation</p>
        </div>

        {/* Wavy Line 1 */}
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
          className="w-20 h-6"
        >
          <svg width="100%" height="100%">
            <path
              d="M 0 15 Q 10 0, 20 15 T 40 15 T 60 15 T 80 15"
              stroke="gray"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray="5 5"
            />
          </svg>
        </motion.div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-green-500 text-white flex items-center justify-center rounded-full text-lg font-bold shadow-lg">
            2
          </div>
          <p className="text-xl mt-2">Our member will come to receive</p>
        </div>

        {/* Wavy Line 2 */}
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
          className="w-20 h-6"
        >
          <svg width="100%" height="100%">
            <path
              d="M 0 15 Q 10 0, 20 15 T 40 15 T 60 15 T 80 15"
              stroke="gray"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray="5 5"
            />
          </svg>
        </motion.div>

        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-green-500 text-white flex items-center justify-center rounded-full text-lg font-bold shadow-lg">
            3
          </div>
          <p className="text-xl mt-2">Your donation supports growth</p>
        </div>
      </div>
    </div>
  );
};

export default Info;
