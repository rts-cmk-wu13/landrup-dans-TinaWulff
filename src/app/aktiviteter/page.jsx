//hent ind lisetevisning med aktiviteter/hold med fetch og ved klik på aktiviteten gå til detaljesiden/den aktivitets id -> /aktiviteter/[id]


import { getActivities } from '../lib/dal';
import Link from 'next/link';
import ActivityCard from '../components/activityCard';
import Search from '../components/search/search';

export default async function ActivitiesPage () {
  const activities = await getActivities();

  if (activities.succes === false) {
    return (
        <main> 
            <h1>Oops, something went wrong.</h1> 
            <p>{activities.message}</p>
        </main>
    )
  }

  return (
    <>
    <header>
      <Search />
    </header>
    <main>
    <section >
     <h1 className='mx-8 my-4 text-4xl'>Aktiviteter</h1>

     { activities.map(activity => (
    <ActivityCard activity={activity} key={activity.id}/>
     ))}
    </section>
    </main>
    </>
  );
}