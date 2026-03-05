
import { getActivities } from '../lib/dal';
import Link from 'next/link';
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";

export default async function InstructorProfile( { userId } ) {

const allActivities = await getActivities();
const instructorActivities = allActivities.filter(
  activity => activity.instructorId === Number(userId)
);

    return (
    <section className='m-4'>
        <div className='flex justify-between items-end'>
        <h2 className='text-xl font-semibold mt-8'>Mine hold</h2>
        <button className='bg-white text-[#003147] px-2 py-2 rounded-lg text-sm shadow-xl'><FaPlus size={20} /></button>
        </div>
        {instructorActivities.map(activity => (
            <article className='my-4 bg-white/80 p-4 rounded-lg text-[#003147]'
                key={activity.id}>
                <h3 className='text-xl font-semibold'>{activity.name}</h3>
                <p className='mb-2'>{activity.weekday.charAt(0).toUpperCase() + activity.weekday.slice(1)} kl. {activity.time}</p>
                            
                <div className='flex justify-between'>
                    <p className='mb-3'>Max. deltagere: {activity.maxParticipants}</p>
                    <p className='mb-3'>Tilmeldte: {activity.users.length}</p>
                </div>
                
                <div className='flex justify-between'>
                <Link className='bg-[#003147] text-white px-6 py-2 rounded-lg text-sm shadow-xl'
                href={`/deltagerliste/${activity.id}`}>Deltagerliste</Link> {/* Opdateret link til deltagerliste */}
                    <div className='flex gap-4'>
                        <button className='bg-[#003147] text-white px-2 py-2 rounded-lg text-sm self-end'><FiEdit size={20} /></button>
                        <button className='bg-[#003147] text-white px-2 py-2 rounded-lg text-sm self-end'><AiOutlineDelete size={20} /></button>
                    </div>
                </div>
            </article>
        ))}
    </section>
    )
}

// tilføj funktionalitet til opret nyt hold, redigerings- og slet-knapperne.
// create, patch og delete requests.. og formularer til oprettelse og redigering af hold.