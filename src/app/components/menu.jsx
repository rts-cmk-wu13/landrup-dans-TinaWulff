'use client'

import { FiHome } from "react-icons/fi";
import { FaListUl } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";

function isActive(path, currentPath) {
    return path === currentPath ? "text-black" : "text-[#6F6F6F]";
}

export default function Menu() {

    const pathname = usePathname();

    const [loggedIn, setLoggedIn] = useState(false);

    // useEffect(() => {
    //     setLoggedIn(document.cookie.includes('accessToken='));
    // }, []);
    // const profilMenuText = loggedIn ? "Profil" : "Log ind";

    return (
    <nav className="w-full flex justify-center bg-[#E9E9E9] h-[66px] fixed bottom-0 z-100">
        <ul className="flex items-center justify-between w-full p-6">
            <li>
                <Link className={`flex flex-col items-center text-center ${isActive("/", pathname)}`} href="/"><FiHome />Home</Link>
            </li>
            <li>
                <Link className={`flex flex-col items-center text-center ${isActive("/aktiviteter", pathname)}`} href="/aktiviteter"><FaListUl />Aktiviteter</Link>
            </li>
            <li>
                <Link className={`flex flex-col items-center text-center ${isActive("/profil", pathname)}`} href="/profil"><FaUser />Profil</Link> {/* Fjernet: { profilMenuText } - Skift mellem "Profil" og "Log ind" baseret på loginstatus */}
             </li>
        </ul>
     </nav>   
    )

}