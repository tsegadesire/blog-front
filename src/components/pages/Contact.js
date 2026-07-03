import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

// The main App component is often used as the entry point in single-file React Immersives.
export default function App() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMessage('Thank you for your message! This is a demo; the message was not actually sent.');
    setFormData({ email: '', subject: '', message: '' });
    // In a real application, you would handle the API submission here.
    setTimeout(() => setStatusMessage(''), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-inter p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Contact Header - bg-blue-200 */}
        <header className="text-center py-12  rounded-2xl shadow-lg mb-8 md:mb-12 border border-blue-300">
          {/* text-3xl font-bold text-slate-800 flex items-center justify-center space-x-2 */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-3 tracking-tight flex items-center justify-center space-x-2">
            Contact   <img 
                src="/techethio-logo.png" 
                alt="TechEthio Logo" 
                className="h-8 md:h-9 object-contain" // Adjust height as needed
              />
          </h1>
          <p className="text-blue-600 text-lg max-w-2xl mx-auto px-4">
            Become even greater at what you do — we’re here to help you connect and grow.
          </p>
        </header>

        {statusMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg" role="alert">
            <p className="font-bold">Success!</p>
            <p>{statusMessage}</p>
          </div>
        )}

        {/* Main Content Grid: Details and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Contact Details Column (Middle Box - NOW bg-blue-200) */}
          <div className="lg:col-span-1 space-y-8 p-8 rounded-xl shadow-xl border border-blue-300 h-fit">
            
            <h2 className="text-2xl font-bold text-blue-700 flex items-center mb-6">
              <MapPin className="w-6 h-6 mr-3 text-blue-500" />
              Our Location
            </h2>

            <section className="space-y-4">
              {/* Inner detail box uses bg-blue-100 for subtle contrast */}
              <div className=" p-4 rounded-lg shadow-sm border border-blue-300">
                <h3 className="text-lg font-semibold text-slate-800 mb-1">Address</h3>
                <p className="text-slate-600 leading-relaxed">
                  Ethiopia 22, Hayahulet Mazoriya Road<br />
                  Tigat Building, Addis Ababa, Ethiopia
                </p>
              </div>

              {/* Inner detail box uses bg-blue-100 for subtle contrast */}
              <div className="p-4 rounded-lg shadow-sm border border-blue-300">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center mb-1">
                  <Phone className="w-4 h-4 mr-2 text-blue-500" />
                  Phone
                </h3>
                <ul className="text-slate-600 space-y-1">
                  <li><span className="font-medium text-slate-700">Domestic:</span> +251 116 363 801</li>
                  <li><span className="font-medium text-slate-700">Cell 1:</span> +251 911 430 924</li>
                  <li><span className="font-medium text-slate-700">Cell 2:</span> +251 911 522 902</li>
                  <li><span className="font-medium text-slate-700">International (US):</span> +1 404 988 4505</li>
                </ul>
              </div>

              {/* Inner detail box uses bg-blue-100 for subtle contrast */}
              <div className="p-4 rounded-lg shadow-sm border border-blue-300">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center mb-1">
                  <Mail className="w-4 h-4 mr-2 text-blue-500" />
                  Email
                </h3>
                <a href="mailto:contact@techethio.com" className="text-blue-600 hover:text-blue-800 transition duration-300 font-medium">
                  contact@techethio.com
                </a>
              </div>
            </section>
          </div>

          {/* Contact Form Column - bg-blue-200 */}
          <div className="lg:col-span-2 p-8  rounded-xl shadow-xl border border-blue-300">
            
            <h2 className="text-3xl font-bold text-slate-800 flex items-center mb-8">
              <MessageSquare className="w-7 h-7 mr-3 text-blue-600" />
              Send Us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@gmail.com"
                  required
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                />
              </div>

              {/* Subject Input */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Let us know how we can help you"
                  required
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Leave a comment or detailed inquiry..."
                  required
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 flex items-center justify-center transform hover:scale-[1.01]"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
