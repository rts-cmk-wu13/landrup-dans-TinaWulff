    
    'use client';
    import { useEffect, useState } from "react";
    import Link from "next/link";
    import Image from "next/image";
    import heroImg from "../../../assets/heroimg.jpg";
    import landrupLogo from "../../../assets/landrup-logo.png";
    import { BsChevronDoubleDown } from "react-icons/bs";


    export default function HeroComp() {
    
    // Tjek for om der er en accessToken-cookie, og om den er gyldig (ikke udløbet)
    //find cookie, der hedder accessToken, og giv mig dens indhold
    function isTokenExpired() {
        const match = document.cookie.match(/accessToken=([^;]+)/);
        if (!match) return true; // ingen token = ikke logget ind

        const token = match[1]; // index 1 af match er det faktiske token, det efter "accessToken="
        try {
        const payload = JSON.parse(atob(token.split('.')[1])); // decode payload-delen af JWT'en og parse den som JSON - atob() er en browserfunktion, der dekoder en base64-kodet streng
        if (!payload.exp) return true;
        return Date.now() / 1000 > payload.exp;
        } catch {
        return true;
        }
    }

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(document.cookie.includes('accessToken=') && !isTokenExpired());
    }, []);


    return (
    <section className="flex flex-col h-[100vh] justify-between z-full max-w-full">
        <Image width={1499} height={1000} className="absolute h-[100vh] w-full object-cover" src={heroImg} alt="Hero Image" />
        <Image width={600} height={400} className="relative z-10 mt-20 max-w-[90%]" src={landrupLogo} alt="Landrup Logo" />
        <div className="flex flex-col mx-20">
        {!loggedIn ? (
          <Link href="/login"
            className="flex justify-center bg-[#E9E9E9] text-[#003147] text-lg items-center p-4 rounded-lg z-10 h-[53px] w-full max-w-[300px] self-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] leading-none relative align-end">
            Log ind her
          </Link>
        ) : (
          <Link href="/profil"
            className="flex justify-center bg-[#E9E9E9] text-[#003147] text-lg items-center p-4 rounded-lg z-10 h-[53px] w-full max-w-[300px] self-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] leading-none relative align-end">
            Gå til profil
          </Link>
        )}
        <a href="#TeamTypesSection" className="z-10 relative self-center"><BsChevronDoubleDown size={70} className="text-[#003147] font-extralight mt-6 mb-4" /></a>
        </div>
     </section>
    )

    }