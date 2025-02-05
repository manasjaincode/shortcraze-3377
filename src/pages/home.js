import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiLink, FiBarChart2, FiClock, FiShield, FiMoon, FiSun, FiKey, FiHash, FiTrendingUp, FiCalendar, FiShieldOff, FiPieChart } from "react-icons/fi";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <FiKey className="w-6 h-6" />,
      title: "Custom Keywords",
      description: "Create memorable, branded short links with your own custom keywords"
    },
    {
      icon: <FiHash className="w-6 h-6" />,
      title: "QR Generation",
      description: "Generate QR codes for your shortened links instantly"
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: "Trending Suggestions",
      description: "Get smart keyword suggestions based on current trends"
    },
    {
      icon: <FiCalendar className="w-6 h-6" />,
      title: "Custom Expiry",
      description: "Set expiration dates for temporary links and campaigns"
    },
    {
      icon: <FiShieldOff className="w-6 h-6" />,
      title: "AI Fraud Detection",
      description: "Advanced AI-powered protection against malicious links"
    },
    {
      icon: <FiPieChart className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Comprehensive click tracking and performance metrics"
    }
  ];

  return (
    <div className="min-h-screen dark:bg-gray-900 transition-colors duration-200">
      {/* Navbar */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-white/30 dark:bg-gray-900/30' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-xl font-bold gradient-text dark:gradient-text-dark">ShortCraze</span>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200"
              >
                {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>
              
              <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-full p-1">
                <button className="px-4 py-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                  Login
                </button>
                <button className="px-4 py-1 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full text-sm font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-200">
                  Signup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden bg-gray-50 dark:bg-gray-800 pt-32 pb-32 transition-colors duration-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-0 left-0 w-72 h-72 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-color filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-0 right-0 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-color filter blur-xl opacity-70"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            {...fadeIn}
          >
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Welcome to</span>
              <span className="block gradient-text dark:gradient-text-dark">ShortCraze</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Transform your long URLs into short, powerful links. Track, manage, and optimize your links with ease.
            </p>
          </motion.div>

          {/* URL Input Section */}
          <motion.div
            className="mt-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="url-input mt-1 flex rounded-md shadow-sm dark:bg-gray-800">
              <input
                type="text"
                name="url"
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-l-md sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-4"
                placeholder="Paste your long URL here..."
              />
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                Shorten
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-900 py-24 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Why Choose ShortCraze?
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Everything you need to manage and track your links in one place
            </p>
          </motion.div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flow-root bg-gray-50 dark:bg-gray-800 rounded-lg px-6 pb-8 transition-colors duration-200">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 dark:bg-indigo-600 text-white rounded-md shadow-lg">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;