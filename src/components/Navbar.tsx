
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [user, setUser] = useState<{ name?: string; email: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      window.location.reload(); // Refresh after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full bg-gradient-to-r from-gray-900 to-gray-700 shadow-md py-4 px-4 md:px-12 fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src="/sitelogo.svg" alt="Site Logo" width={160} height={40} className="h-12 w-40 md:w-80" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white">
          <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link href="/products" className="hover:text-gray-300">Products</Link></li>

          {user ? (
            <>
              <li><Link href="/upload" className="hover:text-gray-300">Upload</Link></li>
              {/* User Dropdown */}
              <li className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
                  <span>{user.email}</span>
                  <span>▼</span>
                </button>
                {dropdownOpen && (
                  <ul className="absolute right-0 bg-gray-800 text-white py-2 w-40 mt-2 rounded-md shadow-lg">
                    {/* <li className="px-4 py-2">{user.email}</li> */}
                    <li>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-700">
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </>
          ) : (
            <li><Link href="/signin" className="hover:text-gray-300">Sign In</Link></li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col space-y-4 mt-4 text-white bg-gray-900 p-4 rounded-lg">
          <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link href="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
          {user ? (
            <>
              <li><Link href="/upload" onClick={() => setMenuOpen(false)}>Upload</Link></li>
              <li className="border-t border-gray-600 pt-2">{user.email}</li>
              <li>
                <button onClick={handleLogout} className="w-full text-left hover:text-red-400">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li><Link href="/signin" onClick={() => setMenuOpen(false)}>Sign In</Link></li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
