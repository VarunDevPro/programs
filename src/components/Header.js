import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

export default function Header() {
  const { pathname } = useLocation();

  if (!pathname || !pathname.startsWith("/post")) {
    return null;
  }

  return (
    <header className="flex justify-between items-center py-10">
      <div className="text-base leading-5">
        <Link to="/" className="font-medium text-gray-500 hover:text-gray-700">
          Home
        </Link>
      </div>
    </header>
  );
}
