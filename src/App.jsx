import { useState, useEffect } from 'react';
import heroImage from './assets/image1.jpg';
// import airplaneImage from './assets/Airplane.png';
import footerImage from './assets/image3.png';
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

        {/* Navigation Bar - Moved to Top for Mobile Stacking */}
        <nav className="relative md:absolute md:top-0 lg:top-[100%] w-full z-50 bg-[#0a0a0a] md:bg-transparent">
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
                <span className="pb-1 hover:text-gray-300 transition-colors">Other Services</span>
                <span className="absolute bottom-[-8px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover:w-full"></span>
              </li>

              <li className="relative cursor-pointer group text-center">
                <span className="pb-1 hover:text-gray-300 transition-colors">Training</span>
                <span className="absolute bottom-[-8px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover:w-full"></span>
              </li>

              <li className="relative cursor-pointer group text-center">
                <span className="pb-1 hover:text-gray-300 transition-colors">Missions</span>
                <span className="absolute bottom-[-8px] left-0 w-0 h-[2px] bg-[#E31E24] transition-all duration-300 ease-out group-hover:w-full"></span>
              </li>

              <li className="relative cursor-pointer group text-center">
                <span className="pb-1 hover:text-gray-300 transition-colors">Contact Us</span>
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
        <div className="relative h-[25vh] md:h-full md:absolute md:inset-0 w-full overflow-hidden z-0 pointer-events-none">
          {/* Background Image */}
          <img
            src={heroImage}
            alt="Earth from space"
            className="absolute top-0 left-0 w-full  z-0"
          />

          {/* Animated Airplanes Overlay */}
          {/* Plane 1 - Main */}
          {/* <img
          src={airplaneImage}
          alt="Airplane 1"
          className="absolute top-[12%] left-0 w-[160px] h-auto z-10 airplane-fly drop-shadow-[0_0_20px_rgba(0,150,255,0.3)] md:w-[110px]"
          style={{ animationDuration: '18s' }}
        /> */}

          {/* Plane 2 - Secondary (Smaller & Faster) */}
          {/* <img
          src={airplaneImage}
          alt="Airplane 2"
          className="absolute top-[18%] left-0 w-[120px] h-auto z-10 airplane-fly drop-shadow-[0_0_20px_rgba(0,150,255,0.3)] md:w-[80px]"
          style={{ animationDuration: '14s', animationDelay: '3s' }}
        /> */}

        </div>



        {/* World Time Display */}
        <div className="absolute top-[8%] left-[10%] z-30 font-digital text-[16px] sm:text-xs font-bold leading-tight drop-shadow-md text-right hidden md:block">
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
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={videoFile} type="video/mp4" />
        </video>

        {/* Overlay to darken video for text readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>


      </section>

      {/* Footer Section */}
      <footer className="w-full bg-black text-gray-400 py-12 border-t border-white/10 relative shrink-0">
        {/* Top Glow */}
        <div className="absolute top-0 left-0 w-full  from-transparent via-white/20 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr] gap-x-4 gap-y-8 md:gap-10 items-start mb-6">
            {/* Logo Column - Full width on mobile, 1st col on desktop */}
            <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
              <img src={footerImage} alt="Air Navigators Logo" className="max-w-[240px] md:max-w-[280px] mb-2" />
            </div>

            {/* Contact Info Column */}
            <div className="col-span-1 flex flex-col  text-[13px] leading-relaxed w-full">
              <div className="flex flex-col space-y-3 md:grid md:grid-cols-[max-content_1fr] md:gap-x-8 md:items-center md:space-y-0 ">
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
            <div className="col-span-1 flex flex-col text-[12px] leading-relaxed w-full">
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

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>

          {/* Bottom Copyright Section */}
          <div className="w-full flex flex-col items-center gap-2 text-[11px] text-white font-light tracking-wider pt-8">
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
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
