import React from "react"
import Link from "next/link"
import { Github, Linkedin, Briefcase, Mail } from "lucide-react"

function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* App Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-7 h-7 text-white" />
              <h3 className="text-2xl font-bold">TrackMyJobs</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Track your job applications with ease. Stay organized, 
              monitor progress, and move one step closer to your career goals.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="block text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard" 
                  className="block text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/applications" 
                  className="block text-gray-400 hover:text-white text-sm transition-colors"
                >
                  My Applications
                </Link>
              </li>
              <li>
                <Link 
                  href="/resources" 
                  className="block text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Career Resources
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="block text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                <span>iqbal.mashal077@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                <span>jermy@gmail.com</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Connect with the Developers</p>
              <div className="flex space-x-3">
                <Link
                  href="https://github.com/IqbalMashal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 bg-white text-black hover:bg-gray-200 rounded-lg transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 bg-white text-black hover:bg-gray-200 rounded-lg transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <p className="text-sm text-gray-500">
              © 2025 TrackMyJobs. Built with ❤️ by Iqbal & Jeremy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
