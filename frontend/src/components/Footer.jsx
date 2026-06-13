import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-40">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500">
            Vishwas Sweets
          </h2>
          <p className="mt-4 text-gray-400">
            Serving authentic Indian sweets and delicious meals with love and
            tradition.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center gap-2">
              
              <FaMapMarkerAlt />
              Nahar Road Jankipuram Lucknow, Uttar Pradesh
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt />
              +91 8853928885
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope />
             vishwassweetsinfo@gmail.com
            </li>
          </ul>
        </div>
          < div>
          <h3 className="text-lg font-semibold mb-4">Our Branch</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center gap-2">
              
              <FaMapMarkerAlt />
              60 feet  Road Jankipuram Lucknow, Uttar Pradesh
            </li>
            
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <div className="flex gap-4 mt-5">
            <a
              href="https://www.facebook.com/photo/?fbid=1019734216443643&set=a.103378721412535"
              className="bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/vishwas_sweets/"
              className="bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://wa.link/qfmjqp"
              className="bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
   

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-400">
        <p>
          © {new Date().getFullYear()} Vishwas Sweets. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;