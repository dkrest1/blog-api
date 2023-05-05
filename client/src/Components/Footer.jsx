import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <p className="text-gray-400 text-sm">
            {/* © {new Date().getFullYear()} My Tech Blog. <br/>All Rights Reserved. */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
