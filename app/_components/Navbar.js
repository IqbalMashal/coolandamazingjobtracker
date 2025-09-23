"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { FileUser, LogOut, ChevronDown } from "lucide-react"
import { readToken, removeToken } from "@/lib/authenticate"
import { useRouter, usePathname } from "next/navigation"

function Navbar() {
  const [token, setToken] = useState(null)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const router = useRouter()
  const pathname = usePathname()

  const checkAuthStatus = useCallback(() => {
    try {
      const currentToken = readToken()
      setToken(currentToken)
    } catch (error) {
      console.error("Error checking auth status:", error)
      setToken(null)
    }
  }, [])

  useEffect(() => {
    checkAuthStatus()

    const handleStorageChange = () => checkAuthStatus()

    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false)
      }
    }

    const handleKey = (e) => {
      if (e.key === "Escape") setUserDropdownOpen(false)
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("authStatusChanged", checkAuthStatus)
    document.addEventListener("mousedown", handleOutsideClick)
    document.addEventListener("keydown", handleKey)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("authStatusChanged", checkAuthStatus)
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("keydown", handleKey)
    }
  }, [checkAuthStatus])

  const logout = async () => {
    try {
      await removeToken()
      window.dispatchEvent(new Event("authStatusChanged"))
      setToken(null)
      setUserDropdownOpen(false)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const userName = token?.userName ?? token?.email ?? "User"

  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      {/* Logo */}
      <Link href={"/"}>
        <div className="flex items-center gap-2 cursor-pointer">
          <FileUser size={40} />
          <h1 className="text-base font-bold md:text-2xl">TrackMyJob</h1>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        {!token ? (
          <>
            <Link href={"/login"}>
              <button className="w-24 md:w-32 rounded-lg bg-black px-6 py-2 font-medium text-white transition hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                Login
              </button>
            </Link>
            <Link href={"/signup"}>
              <button className="w-24 md:w-32 rounded-lg bg-black px-6 py-2 font-medium text-white transition hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3 relative" ref={dropdownRef}>
            {pathname === "/" ? (
              <Link href={"/dashboard"}>
                <button className="w-24 md:w-32 rounded-lg bg-black px-6 py-2 font-medium text-white transition hover:-translate-y-0.5 hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  Dashboard
                </button>
              </Link>
            ) : (
              <Link href={"/"}>
                <button className="w-24 md:w-32 rounded-lg bg-black px-6 py-2 font-medium text-white transition hover:-translate-y-0.5 hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  Home
                </button>
              </Link>
            )}

            {/* User Avatar / Dropdown */}
            <button
              onClick={() => setUserDropdownOpen((s) => !s)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                {userName[0]?.toUpperCase() || <FileUser className="w-4 h-4" />}
              </div>
              <p className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-100 max-w-32 truncate">
                {userName}
              </p>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 dark:text-gray-300 transition-transform ${
                  userDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {userDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setUserDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                  <div className="py-1">
                    <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                      Signed in as
                      <div className="font-medium text-gray-900 dark:text-gray-100 truncate mt-1">
                        {userName}
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-600 hover:text-red-600 dark:hover:text-white flex items-center transition-colors border-t border-gray-100 dark:border-gray-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
