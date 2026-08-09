import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import orangeMarker from "../assets/marker-icon-orange.png";


// Restaurant Locations

const restaurant1 = [
  26.940043238752274,
  80.95726336642355,
];

const restaurant2 = [
  26.926712690513135,
  80.94298676642302,
];


const mapCenter = [
  26.933378,
  80.950125,
];


// Custom Marker Icon

const orangeIcon= new L.Icon({
   iconUrl: orangeMarker,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});


const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });


  const [submitted, setSubmitted] = useState(false);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = () => {

    if (
      formData.name &&
      formData.email &&
      formData.subject &&
      formData.message
    ) {

      setSubmitted(true);


      setTimeout(() => {

        setSubmitted(false);

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });


      },3000);

    }

  };


  return (

    <div className="min-h-screen bg-gray-50">


      {/* Hero Section */}

      <div
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage:
          "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200')",
        }}
      >

        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="text-center text-white">

            <h1 className="text-5xl font-bold mb-4">
              Get In Touch
            </h1>

            <p className="text-xl">
              We'd love to hear from you
            </p>

          </div>

        </div>

      </div>



      <div className="max-w-7xl mx-auto px-4 py-16">


        <div className="grid md:grid-cols-2 gap-12">



          {/* Contact Information */}


          <div>


            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Contact Information
            </h2>



            <div className="space-y-6">



              <div className="flex items-start space-x-4">

                <div className="bg-orange-500 p-3 rounded-lg">

                  <MapPin className="w-6 h-6 text-white"/>

                </div>


                <div>

                  <h3 className="font-semibold text-lg text-gray-800">
                    Address
                  </h3>


                  <p className="text-gray-600">

                    647N/P-001A, 19KH-525, Nahar Road, Madiyaon,
                    <br/>

                    Opposite JP Hospital, Jankipuram,
                    Lucknow, UP 226021

                  </p>

                </div>


              </div>





              <div className="flex items-start space-x-4">

                <div className="bg-orange-500 p-3 rounded-lg">

                  <Phone className="w-6 h-6 text-white"/>

                </div>


                <div>

                  <h3 className="font-semibold text-lg text-gray-800">
                    Phone
                  </h3>


                  <p className="text-gray-600">
                    Mobile:+91 8853928885
                  </p>

                  <p className="text-gray-600">
                    WhatsApp:+91 8853608585
                  </p>


                </div>


              </div>





              <div className="flex items-start space-x-4">


                <div className="bg-orange-500 p-3 rounded-lg">

                  <Mail className="w-6 h-6 text-white"/>

                </div>


                <div>

                  <h3 className="font-semibold text-lg text-gray-800">
                    Email
                  </h3>

                  <p className="text-gray-600">
                    vishwassweetsinfo@gmail.com
                  </p>


                </div>


              </div>






              <div className="flex items-start space-x-4">


                <div className="bg-orange-500 p-3 rounded-lg">

                  <Clock className="w-6 h-6 text-white"/>

                </div>


                <div>

                  <h3 className="font-semibold text-lg text-gray-800">
                    Opening Hours
                  </h3>


                  <p className="text-gray-600">
                    Monday - Sunday: 6:00 AM - 11:00 PM
                  </p>


                </div>


              </div>



            </div>





            {/* Interactive Map */}


            <div className="mt-8 rounded-lg overflow-hidden shadow-lg">


              <MapContainer

                center={mapCenter}

                zoom={14}

                scrollWheelZoom={false}

                style={{
                  height:"400px",
                  width:"100%",
                }}

              >


                <TileLayer

                  attribution="&copy; OpenStreetMap contributors"

                  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

                />





                {/* Restaurant 1 Marker */}


                <Marker

                  position={restaurant1}

                  icon={orangeIcon}

                >


                  <Popup>


                    <div>


                      <h3 className="font-bold text-lg">

                        Vishwas Sweets - Branch 1

                      </h3>


                      <p>

                        Near JP Hospital,
                        Jankipuram,
                        Lucknow

                      </p>


                      <a

                        href="https://maps.google.com/?q=26.940043238752274,80.95726336642355"

                        target="_blank"

                        rel="noreferrer"

                        className="text-orange-600 font-semibold"

                      >

                        📍 Get Directions

                      </a>


                    </div>


                  </Popup>


                </Marker>






                {/* Restaurant 2 Marker */}



                <Marker

                  position={restaurant2}

                  icon={orangeIcon}

                >


                  <Popup>


                    <div>


                      <h3 className="font-bold text-lg">

                        Vishwas Sweets - Branch 2

                      </h3>


                      <p>

                        Lucknow,
                        Uttar Pradesh

                      </p>


                      <a

                        href="https://maps.google.com/?q=26.926712690513135,80.94298676642302"

                        target="_blank"

                        rel="noreferrer"

                        className="text-orange-600 font-semibold"

                      >

                        📍 Get Directions

                      </a>


                    </div>


                  </Popup>


                </Marker>




              </MapContainer>



            </div>



          </div>







          {/* Contact Form */}


          <div className="bg-white rounded-lg shadow-lg p-8">


            <h2 className="text-3xl font-bold mb-6 text-gray-800">

              Send us a Message

            </h2>




            {submitted && (

              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">

                Thank you! Your message has been sent successfully.

              </div>

            )}





            <div>


              <input
                className="w-full mb-4 px-4 py-2 border rounded-lg"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />



              <input
                className="w-full mb-4 px-4 py-2 border rounded-lg"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />



              <input
                className="w-full mb-4 px-4 py-2 border rounded-lg"
                placeholder="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />



              <input
                className="w-full mb-4 px-4 py-2 border rounded-lg"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />



              <textarea

                className="w-full mb-6 px-4 py-2 border rounded-lg"

                rows="5"

                placeholder="Message"

                name="message"

                value={formData.message}

                onChange={handleChange}

              />





              <button

                onClick={handleSubmit}

                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2"

              >

                <Send className="w-5 h-5"/>

                Send Message


              </button>


            </div>



          </div>



        </div>


      </div>


    </div>

  );

};


export default Contact;