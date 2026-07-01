import React from "react";
import { Link } from "react-router-dom";
import Desunlogo from "../../assets/Desun Logo_.png";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-16 border-t bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        {/* LOGO + ABOUT */}
        <div>
          <img src={Desunlogo} alt="logo" className="w-40 mb-3" />
          <p className="text-sm text-gray-600">
            Build your skills, participate in contests, and grow with real-world
            challenges at Desun Academy.
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Navigation
          </h3>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-[#82C600]">
              Home
            </Link>
            <Link to="/contest" className="hover:text-[#82C600]">
              Contests
            </Link>
            <Link to="/my-contests" className="hover:text-[#82C600]">
              My Contests
            </Link>
            <Link to="/winners" className="hover:text-[#82C600]">
              Winners
            </Link>
          </div>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Support</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <Link to="#" className="hover:text-[#82C600]">
              Contact Us
            </Link>
            <Link to="#" className="hover:text-[#82C600]">
              Help Center
            </Link>
            <Link to="#" className="hover:text-[#82C600]">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-[#82C600]">
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Follow Us
          </h3>
          <div className="flex gap-3">
            <div className="p-2 bg-gray-100 rounded-lg hover:bg-[#82C600] hover:text-white cursor-pointer transition">
              <FaFacebookF />
            </div>
            <div className="p-2 bg-gray-100 rounded-lg hover:bg-[#82C600] hover:text-white cursor-pointer transition">
              <FaInstagram />
            </div>
            <div className="p-2 bg-gray-100 rounded-lg hover:bg-[#82C600] hover:text-white cursor-pointer transition">
              <FaLinkedinIn />
            </div>
            <div className="p-2 bg-gray-100 rounded-lg hover:bg-[#82C600] hover:text-white cursor-pointer transition">
              <FaTwitter />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Desun Academy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
