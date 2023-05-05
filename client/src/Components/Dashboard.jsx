import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="bg-gray-200 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-semibold text-gray-700">
              {/* <img src={logo} className="h-8" alt="Logo" /> */}
              Dashboard
            </Link>
            <button
              className="md:hidden rounded-lg focus:outline-none focus:shadow-outline-purple"
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M2.5 4.75A.75.75 0 013.25 4h13.5a.75.75 0 010 1.5H3.25a.75.75 0 01-.75-.75zM3.25 9h13.5a.75.75 0 010 1.5H3.25a.75.75 0 110-1.5zM.75 13.25A.75.75 0 011.5 13h17a.75.75 0 010 1.5h-17a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <nav className="hidden md:flex md:flex-grow">
            <ul className="flex flex-col md:flex-row md:ml-auto">
              <li className="mt-3 md:mt-0 md:mr-4">
                <Link
                  to="/account"
                  className="block text-gray-700 font-semibold hover:text-purple-500 px-2 py-1 md:px-4 md:py-2"
                >
                  Profile
                </Link>
              </li>
              <li className="mt-3 md:mt-0 md:mr-4">
                <Link
                  to="/billing"
                  className="block text-gray-700 font-semibold hover:text-purple-500 px-2 py-1 md:px-4 md:py-2"
                >
                  Account
                </Link>
              </li>
              <li className="mt-3 md:mt-0 md:mr-4">
                <Link
                  to="/settings"
                  className="block text-gray-700 font-semibold hover:text-purple-500 px-2 py-1 md:px-4 md:py-2"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">Account Dashboard</h1>
        <div className="bg-white shadow-md rounded-lg px-4 py-4">
          <p className="text-gray-700">Welcome to your account dashboard!</p>
        </div>
      </main>

    </div>
  )}
