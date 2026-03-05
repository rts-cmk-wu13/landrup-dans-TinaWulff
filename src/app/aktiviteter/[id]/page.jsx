//Detaljeside for holdet som hentes ud fra dets id
import { cookies } from 'next/headers';
import { getActivityDetails } from '../../lib/dal';
import { getUserDetails } from '../../lib/dal';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import AddActivityButton from '../AddActivityButton';
import Link from 'next/link';
import { IoChevronForward } from "react-icons/io5";


export default async function ActivityDetailPage({ params }) {
    const { id } = await params;
    const activityId = Number(id);
    const aktivitet = await getActivityDetails(activityId)

    console.log(aktivitet)

      if (aktivitet.succes === false) {
    return (
        <main> 
            <h1>Oops, something went wrong.</h1> 
            <p>{aktivitet.message}</p>
        </main>
    )
  }

  if (!aktivitet.name) return notFound();

    // Hent bruger-id fra cookie og brugerdata
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    const user = await getUserDetails(userId);

    console.log("user:", user);

    // Tjek om brugeren allerede er tilmeldt aktiviteten
    const alreadyJoined = user?.activities?.some(a => a.id === Number(activityId));

    return (
        <main>
            <article className='flex flex-col'>
                <div className='flex justify-end items-end relative'>
                    <Image className='w-full object-cover max-h-[700px]'
                    width={697} height={646} src={aktivitet.asset.url} alt={aktivitet.name} unoptimized/>
                    <AddActivityButton
                    userId={userId}
                    activityId={activityId}
                    alreadyJoined={alreadyJoined}
                />
                </div>
                <div className='mt-6 mx-6'>
                    <h1 className='text-2xl font-semibold'>{aktivitet.name}</h1>
                    <p className='leading-none mb-4 text-sm'>{aktivitet.minAge} - {aktivitet.maxAge} år</p>
                    <p>{aktivitet.description}</p>
                </div>

                {/* <Link className='text-white align-end self-end mx-2 relative bottom-[-50px] font-[700] flex items-center' href="/opret-bruger">
                    Opret din brugerprofil her <IoChevronForward size={25} className='mt-1'/>
                </Link> */}
            </article>
            
        </main>
    )
    
}