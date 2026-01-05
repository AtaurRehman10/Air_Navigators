import { useState, useEffect } from 'react';
import heroImage from './assets/bgImg.png';
import airplaneImage from './assets/image2.png';
import footerImage from './assets/logo.jpg';
import videoFile from './assets/video.mp4';
// Removed footerImage as we are building the footer in code

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const toggleSubmenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getFormattedTime = (offset) => {
    // Convert current time to UTC then add offset
    const utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
    const date = new Date(utc + (offset * 3600000));
    const day = date.getDate().toString().padStart(2, '0');
    // Force HH:mm:ss format
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-montserrat flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-auto md:h-[38vh] shrink-0 z-50 flex flex-col md:block">

        {/* Navigation Bar - Moved down to match horizon */}
        <nav className="relative md:absolute md:top-[85%] w-full z-50 bg-transparent transition-all duration-300">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex justify-between items-center p-6">
            <span className="text-white font-bold text-lg tracking-widest">Air Navigators</span>
            <div className="flex justify-end">
              <button
                onClick={toggleMobileMenu}
                className="text-white focus:outline-none relative z-[70]"
              >
                {isMobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                )}
              </button>
            </div>
          </div>

          {/* Wrapper for Desktop/Mobile */}
          <div
            className={`absolute top-full left-0 w-full 
  bg-black/10 backdrop-blur-lg 
  overflow-hidden transition-all duration-500 ease-in-out
  ${isMobileMenuOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'}
  md:static md:max-h-full md:opacity-100 md:bg-transparent md:backdrop-blur-0
  md:flex-row md:h-auto md:inset-auto md:overflow-visible`}
          >
            <ul className={`flex ${isMobileMenuOpen ? 'flex-col gap-4 py-6 text-sm' : 'flex-row gap-6 md:gap-10 text-[10px] sm:text-xs'} items-center justify-center text-white font-medium tracking-[0.2em] transition-all duration-300`}>

              <li className="relative cursor-pointer group text-center">
                <span className="pb-1">HOME</span>
                <span className={`absolute bottom-[-8px] left-0 h-[2px] bg-[#E31E24] ${isMobileMenuOpen ? 'w-full' : 'w-full'}`}></span>
              </li>

              <li className="relative cursor-pointer group text-center">
                <span className="pb-1 hover:text-gray-300 transition-colors">ABOUT US</span>
                <span className="absolute bottom-[-8px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover:w-full"></span>
              </li>

              <li className="relative cursor-pointer group text-center">
                <span className="pb-1 hover:text-gray-300 transition-colors">VISION & MISSION</span>
                <span className="absolute bottom-[-8px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover:w-full"></span>
              </li>

              <li className={`relative cursor-pointer group flex flex-col items-center ${isMobileMenuOpen ? '' : ''}`}>
                <span
                  className="pb-1 hover:text-gray-300 transition-colors flex items-center gap-1"
                  onClick={() => isMobileMenuOpen && toggleSubmenu('expertise')}
                >
                  EXPERTISE
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    viewBox="0 0 24 24"
                    fill="white"
                    className={`mt-[2px] transition-transform duration-300 ${expandedMenus['expertise'] ? 'rotate-180' : ''}`}
                  >
                    <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z" />
                  </svg>
                </span>
                <span className="absolute bottom-[-8px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover:w-full hidden md:block"></span>

                {/* Dropdown Menu */}
                <ul className={`
                  ${isMobileMenuOpen
                    ? `relative bg-transparent w-auto mt-2 pl-4 text-center overflow-hidden transition-all duration-300 ${expandedMenus['expertise'] ? 'max-h-[800px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`
                    : 'absolute top-full left-0 mt-4 w-max bg-[#0a0a0a] rounded-lg shadow-[0_4px_30px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pt-2 pb-2 border border-white/5'
                  } 
                   z-50 flex flex-col text-[11px] tracking-widest text-gray-300 whitespace-nowrap
                `}>
                  <li className="px-5 py-3 md:text-left uppercase group/item cursor-pointer">
                    <span className="relative group-hover/item:text-white transition-colors">
                      Flight Dispatch
                      <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover/item:w-full"></span>
                    </span>
                  </li>
                  <li className="px-5 py-3 md:text-left uppercase group/item cursor-pointer">
                    <span className="relative group-hover/item:text-white transition-colors">
                      Flight Clearances
                      <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover/item:w-full"></span>
                    </span>
                  </li>
                  <li className="px-5 py-3 md:text-left uppercase group/item cursor-pointer">
                    <span className="relative group-hover/item:text-white transition-colors">
                      Special Permits
                      <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover/item:w-full"></span>
                    </span>
                  </li>

                  {/* Nested Dropdown: US Operations */}
                  <li className={`
                    relative group/sub px-5 py-3 hover:text-white transition-colors flex flex-col md:flex-row md:justify-between items-center md:items-center uppercase
                  `}>
                    <div
                      className="flex items-center justify-between w-full md:w-auto gap-2 cursor-pointer"
                      onClick={(e) => {
                        if (isMobileMenuOpen) {
                          e.stopPropagation();
                          toggleSubmenu('us_ops');
                        }
                      }}
                    >
                      <span className="relative">
                        US Operations
                        <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover/sub:w-full"></span>
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className={`${isMobileMenuOpen && expandedMenus['us_ops'] ? 'rotate-0' : '-rotate-90'} md:-rotate-90 text-gray-500 group-hover/sub:text-white transition-transform duration-300`}>
                        <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z" />
                      </svg>
                    </div>

                    {/* Nested Sub-Menu */}
                    <ul className={`
                      ${isMobileMenuOpen
                        ? `relative bg-transparent w-full mt-2 pl-4 text-center overflow-hidden transition-all duration-300 ${expandedMenus['us_ops'] ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`
                        : 'absolute top-0 left-full mt-0 w-max bg-[#0a0a0a] rounded-lg shadow-[0_4px_30px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 pt-2 pb-2 border border-white/5'
                      } 
                      flex flex-col whitespace-nowrap
                    `}>
                      <li className="px-5 py-3 md:text-left uppercase group/item cursor-pointer">
                        <span className="relative group-hover/item:text-white transition-colors">
                          TSA Waiver
                          <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover/item:w-full"></span>
                        </span>
                      </li>
                      <li className="px-5 py-3 md:text-left uppercase group/item cursor-pointer">
                        <span className="relative group-hover/item:text-white transition-colors">
                          FAA Special Route Authorization
                          <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover/item:w-full"></span>
                        </span>
                      </li>
                      <li className="px-5 py-3 md:text-left uppercase group/item cursor-pointer">
                        <span className="relative group-hover/item:text-white transition-colors">
                          US eAPIS Filing
                          <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover/item:w-full"></span>
                        </span>
                      </li>
                      <li className="px-5 py-3 md:text-left uppercase group/item cursor-pointer">
                        <span className="relative group-hover/item:text-white transition-colors">
                          Border Overflight Exemption (BOE)
                          <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover/item:w-full"></span>
                        </span>
                      </li>
                    </ul>
                  </li>

                  <li className="px-5 py-3 md:text-left uppercase group/item cursor-pointer">
                    <span className="relative group-hover/item:text-white transition-colors">
                      APIS
                      <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover/item:w-full"></span>
                    </span>
                  </li>
                  <li className="px-5 py-3 md:text-left uppercase group/item cursor-pointer">
                    <span className="relative group-hover/item:text-white transition-colors">
                      Re-fueling
                      <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover/item:w-full"></span>
                    </span>
                  </li>
                </ul>
              </li>

              <li className="relative cursor-pointer group text-center">
                <span className="pb-1 hover:text-gray-300 transition-colors">TRAININGS</span>
                <span className="absolute bottom-[-8px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover:w-full"></span>
              </li>

              <li className="relative cursor-pointer group text-center">
                <span className="pb-1 hover:text-gray-300 transition-colors">MISSION ACTIVATION</span>
                <span className="absolute bottom-[-8px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover:w-full"></span>
              </li>

              <li className="relative cursor-pointer group text-center">
                <span className="pb-1 hover:text-gray-300 transition-colors">CAREERS</span>
                <span className="absolute bottom-[-8px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover:w-full"></span>
              </li>

              <li className="relative cursor-pointer group text-center">
                <span className="pb-1 hover:text-gray-300 transition-colors">CONTACT US</span>
                <span className="absolute bottom-[-8px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover:w-full"></span>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile World Time Display - Moved after Nav per request */}
        <div className="block md:hidden bg-[#0a0a0a] w-full py-4 px-2 font-digital border-b border-white/10 z-40 relative">
          <div className="grid grid-cols-1 gap-y-2 text-[13px] font-bold text-gray-300 w-full pl-2">

            {/* Row 1: Dallas and UTC */}
            <div className="flex justify-between w-full max-w-sm mx-auto">
              <div className="flex gap-2 whitespace-nowrap">
                <span className="text-gray-300">DALLAS</span>
                <span className="text-gray-300">{getFormattedTime(-6)}</span>
              </div>
              <div className="flex gap-2 whitespace-nowrap text-right">
                <span className="text-green-500">UTC</span>
                <span className="text-green-500">{getFormattedTime(0)}</span>
              </div>
            </div>

            {/* Row 2: Istanbul and Dubai */}
            <div className="flex justify-between w-full max-w-sm mx-auto">
              <div className="flex gap-2 whitespace-nowrap">
                <span className="text-[#00BFFF]">ISTANBUL</span>
                <span className="text-[#00BFFF]">{getFormattedTime(3)}</span>
              </div>
              <div className="flex gap-2 whitespace-nowrap text-right">
                <span className="text-[#00BFFF]">DUBAI</span>
                <span className="text-[#00BFFF]">{getFormattedTime(4)}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Background Elements Container - Prevents horizontal scroll from animations */}
        <div className="relative h-[250px] md:h-full md:absolute md:inset-0 w-full overflow-hidden z-0 pointer-events-none">
          {/* Background Image */}
          <img
            src={heroImage}
            alt="Earth from space"
            className="absolute top-0 md:top-[45%] left-0 w-full object-cover z-0"
          />

          {/* Animated Airplanes Overlay */}
          {/* Plane 1 - Main */}
          <img
            src={airplaneImage}
            alt="Airplane 1"
            className="absolute top-[25%] left-1/3 -translate-x-1/2 w-[100px] h-auto z-10 airplane-vibrate drop-shadow-[0_0_20px_rgba(0,150,255,0.3)] md:w-[315px]"
          />

          {/* Plane 2 - Secondary (Smaller & Faster) */}
          {/* <img
          src={airplaneImage}
          alt="Airplane 2"
          className="absolute top-[18%] left-0 w-[120px] h-auto z-10 airplane-fly drop-shadow-[0_0_20px_rgba(0,150,255,0.3)] md:w-[80px]"
          style={{ animationDuration: '14s', animationDelay: '3s' }}
        /> */}

        </div>



        {/* World Time Display */}
        <div className="absolute top-[10%] left-[10%] z-30 font-digital text-[16px] sm:text-xs font-bold leading-tight drop-shadow-md text-right hidden md:block">
          <div className="grid grid-cols-[max-content_max-content_max-content] gap-x-4 gap-y-1 items-center justify-end">
            {/* Dallas */}
            <span className="text-gray-300">DALLAS</span>
            <span className="text-gray-300">{getFormattedTime(-6)}</span>
            <span></span>

            {/* UTC */}
            <span className="text-green-500">UTC</span>
            <span className="text-green-500">{getFormattedTime(0)}</span>
            <span className="text-yellow-400 pl-2">TMI 363</span>

            {/* Istanbul */}
            <span className="text-[#00BFFF]">ISTANBUL</span>
            <span className="text-[#00BFFF]">{getFormattedTime(3)}</span>
            <span></span>

            {/* Dubai */}
            <span className="text-[#00BFFF]">DUBAI</span>
            <span className="text-[#00BFFF]">{getFormattedTime(4)}</span>
            <span></span>

            {/* Tokyo */}
            <span className="text-gray-500">TOKYO</span>
            <span className="text-gray-500">{getFormattedTime(9)}</span>
            <span></span>
          </div>
        </div>

      </section>

      {/* Video Section */}
      <section className="relative w-full h-screen overflow-hidden shrink-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-[-10%] left-0 w-full h-[120%] object-cover z-0"
        >
          <source src={videoFile} type="video/mp4" />
        </video>

        {/* Overlay to darken video for text readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>


      </section>

      {/* Footer Section */}
      <footer className="w-full bg-black text-gray-400 py-12 border-t border-white/10 relative shrink-0">
        {/* Top Glow */}
        <div className="absolute top-16 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr] gap-x-4 gap-y-4 md:gap-10 items-start mb-6">
            {/* Logo Column - Full width on mobile, 1st col on desktop */}
            <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
              <img src={footerImage} alt="Air Navigators Logo" className="max-w-[450px] " />


            </div>

            {/* Contact Info Column */}
            <div className="col-span-1 flex flex-col  text-[13px] leading-relaxed w-full">
              <div className="flex flex-col space-y-3 md:grid md:grid-cols-[max-content_1fr] md:gap-x-8 md:items-center md:space-y-0 lg:mt-16">
                <div className="flex flex-col md:contents">
                  <span className="font-bold text-white text-[12px] md:text-right">Phone Main</span>
                  <span className="text-gray-400 font-light tracking-wide text-[13px]">+92 51 55 70 123</span>
                </div>
                <div className="flex flex-col md:contents">
                  <span className="font-bold text-white text-[12px] md:text-right">Email</span>
                  <span className="text-gray-400 font-light break-all tracking-wide text-[13px] min-w-0">Info@AirNavigators.aero</span>
                </div>
              </div>

              <div className="flex flex-col  md:grid md:grid-cols-[max-content_1fr] md:gap-x-8 md:items-center md:space-y-0 md:gap-y-1 md:pt-4">
                <div className="flex flex-col md:contents">
                  <span className="font-bold text-white text-[12px] md:text-right">Phone FMC</span>
                  <span className="text-gray-400 font-light tracking-wide text-[13px]">+92 51 55 70 124</span>
                </div>
                <div className="flex flex-col md:contents">
                  <span className="font-bold text-white text-[14px] md:text-right">Email</span>
                  <span className="text-gray-400 font-light break-all tracking-wide text-[13px] min-w-0">FMC@AirNavigators.aero</span>
                </div>
              </div>
            </div>

            {/* Address Column */}
            <div className="col-span-1 flex flex-col text-[12px] leading-relaxed w-full lg:mt-16">
              <div className="flex flex-col md:grid md:grid-cols-[max-content_1fr] md:gap-x-12 md:items-start">
                <span className="font-bold text-white text-[12px] mb-1 md:mb-0 md:text-right md:mt-1 md:ml-2.5">Address</span>
                <div className="flex flex-col text-gray-400 font-light tracking-wide text-[13px]">
                  <span className="text-gray-200 font-semibold uppercase mb-0.5 leading-snug">AIR NAVIGATORS (PVT)<br className="md:hidden" /> LTD</span>
                  <span>Emirates Tower - Level II</span>
                  <span>Sector F-7, Markaz</span>
                  <span>Islamabad - PAKISTAN</span>
                </div>
              </div>

              <div className="flex flex-col pt-2 md:grid md:grid-cols-[max-content_1fr] md:gap-x-12 md:items-start md:pt-4">
                <span className="font-bold text-white text-[12px] mb-1 md:mb-0 md:text-right">Mail us on</span>
                <div className="flex flex-col text-gray-400 font-light tracking-wide text-[13px]">
                  <span>P.O Box: 1176</span>
                  <span>Islamabad 44000</span>
                  <span>PAKISTAN</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[100%] mx-auto h-[2px] bg-white/20"></div>





          {/* Bottom Copyright Section */}
          <div className="w-full flex flex-col items-center gap-2 text-[11px] text-white font-light tracking-wider pt-4 relative">

            {/* Social Follow - Moved here */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-white text-[15px] font-normal tracking-wide">Follow us on</span>
              <div className="flex items-center gap-3">
                {/* X (Formerly Twitter) */}
                <a href="#" className="text-white hover:text-gray-300 transition-colors group">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.21-.43-2-1.52-2A1.6 1.6 0 0012.92 14c-.06.28-.06.56-.06.84V19h-3v-9h3v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 4.04z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
              <span className="hover:text-gray-400 cursor-pointer transition-colors">Copyrights</span>
              <span>|</span>
              <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacy Policy</span>
              <span>|</span>
              <span className="hover:text-gray-400 cursor-pointer transition-colors">Terms and Conditions</span>
              <span>|</span>
              <span className="hover:text-gray-400 cursor-pointer transition-colors">AML /CTF Statement</span>
              <span>|</span>
              <span className="hover:text-gray-400 cursor-pointer transition-colors">Environment</span>
              <span>|</span>
              <span className="hover:text-gray-400 cursor-pointer transition-colors">Careers</span>
            </div>
            <p className="mt-2 text-[10px]">AIR NAVIGATORS (PVT) LTD © 2012-2022 All rights reserved</p>
            <p>D-U-N-S Number <span className="text-gray-100">64-583-5179</span></p>

            {/* Digital Time Display */}
            <div className="md:absolute md:right-0 md:bottom-2 font-digital text-xl text-white mt-4 md:mt-0 tracking-widest" style={{ textShadow: "2px 2px 0px rgba(0, 255, 255, 0.5), -2px -2px 0px rgba(255, 0, 0, 0.5)" }}>
              {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 hover:scale-110 transition-transform duration-300 group"
      >
        <div className="bg-[#25D366] p-2 rounded-full shadow-lg shadow-black/30 group-hover:shadow-[#25D366]/40">
          <svg
            className="w-8 h-8 text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461 1.993 0 3.866.778 5.275 2.188a7.432 7.432 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.149.224-.579.73-.709.88-.131.149-.261.168-.486.056-.224-.112-.953-.351-1.815-1.12-.667-.594-1.117-1.329-1.248-1.554-.131-.224-.014-.345.099-.457.101-.099.224-.262.336-.393.112-.131.149-.224.224-.374.075-.149.038-.281-.019-.393-.056-.112-.504-1.214-.69-1.662-.181-.435-.366-.377-.504-.383-.131-.006-.28-.006-.43-.006-.149 0-.393.056-.599.28-.205.225-.785.767-.785 1.871 0 1.104.804 2.171.916 2.32.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.147 1.413.089.43-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.205-.149-.43-.261" />
          </svg>
        </div>
      </a>
    </div>
  );
}

export default App;
