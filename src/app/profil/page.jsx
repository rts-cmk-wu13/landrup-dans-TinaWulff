//import { cookies } from 'next/headers';
//import { getUserDetails } from '../lib/dal';

import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '../lib/getAuthentificatedUser';
import { FaUserLarge } from "react-icons/fa6";
import InstructorProfile from './InstructorProfile';
import InstructorHeader from './InstructorHeader';
import Link from 'next/link';
import LogoutAction from './logOut-action';


export default async function ProfilPage() {

    const user = await getAuthenticatedUser(); //Hjælpefunktion til at få id'et på den der er logget ind og hente brugerdata.

    //console.log("user:", user);
    //console.log("token:", token?.value);
  
    if (user.role === "default") {
        // vis medlem-UI
        return (
            <section className='flex flex-col'>
                <h1 className='text-xl font-semibold text-center my-4'>Min profil</h1>
            
                <div className='bg-[#E9E9E9] text-[#003147] text-center py-4 flex flex-col items-center gap-2'>
                    <FaUserLarge size={50}/>
                    <p className='text-2xl font-semibold'>{user.firstname} {user.lastname}</p>
                    <p>Medlem</p>
                </div>

                <section className='m-4'>
                    <h2 className='text-xl font-semibold mt-8'>Tilmeldte hold</h2>
                    {user.activities.map(activity => (
                            <article className='my-4 bg-white/80 p-4 rounded-lg text-[#003147]'
                                key={activity.id}>
                                <h3 className='text-xl font-semibold'>{activity.name}</h3>
                                <p className='mb-3'>{activity.weekday.charAt(0).toUpperCase() + activity.weekday.slice(1)} kl. {activity.time}</p>
                                <Link className='bg-[#003147] text-white px-6 py-2 rounded-lg text-sm shadow-xl'
                                href={`/aktiviteter/${activity.id}`}>Vis hold</Link>
                            </article>
                        ))}
                </section>

                <form className='relative flex justify-center mr-4' action={LogoutAction}>
                <button className='flex-end align-end bg-white/80 px-10 py-2 rounded text-[#003147] absolute top-[50px]' type='submit'>log out</button>
                </form>
            </section>
        )
    }

    else if (user.role === "instructor") {
        // vis instruktør-UI'
        return (
            <>
                <InstructorHeader />

                <InstructorProfile userId={user.id} />
                
                <form className='relative flex justify-center mr-4' action={LogoutAction}>
                <button className='flex-end align-end bg-white/80 px-10 py-2 rounded text-[#003147] absolute top-[50px]' type='submit'>log out</button>
                </form>
            </>
        )
    }
}