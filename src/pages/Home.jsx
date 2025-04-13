import React from "react";
import { MdOutlineEditNote } from "react-icons/md";
import { GiTwoCoins } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="flex text-gray-500 justify-center items-center p-8">
        <MdOutlineEditNote size={60} />
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
          Sentence Construction
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          User has to construct a sentence with random words by placing it in
          the correct order.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto my-10">
          <div className="text-center p-4 bg-white shadow rounded-md">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Time Per Question
            </h3>
            <p className="text-gray-500 text-lg">30 seconds</p>
          </div>
          <div className="text-center p-4 bg-white shadow rounded-md">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Total Questions
            </h3>
            <p className="text-gray-500 text-lg">10</p>
          </div>
          <div className="text-center p-4 bg-white shadow rounded-md">
            <h3 className="text-xl font-medium text-gray-700 mb-2">Coins</h3>
            <div className="text-gray-500 text-lg">
              <div className="flex justify-center items-center gap-3">
                <span className="text-yellow-500">
                  <GiTwoCoins />
                </span>
                20 coins
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-6 mt-16">
          <button className="bg-white cursor-pointer text-blue-600 border border-blue-600 font-semibold rounded-md py-3 px-8 text-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            Back
          </button>
          <Link to={"/quiz"}>
            <button className="bg-blue-600 cursor-pointer text-white font-semibold rounded-md py-3 px-8 text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              Start
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
