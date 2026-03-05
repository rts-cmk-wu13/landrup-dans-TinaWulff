//API route (Next.js): /api/search er en "API route".
// Til Fetch til API:
// "Client-side fetch", "API request", "asynkron search", "server-side search".
// FORDI: Det er mere effektivt og sikkert at søge på serveren,
// især hvis du har mange data eller vil beskytte data.

import { NextResponse } from 'next/server';
import { getActivities } from '../../lib/dal';
import { getUserDetails } from '../../lib/dal';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  // Hent data fra flere kilder
  const activities = await getActivities();
  //const activityDetails = await getActivityDetails(); // har kun instructør-id, ikke navn.

  //const userDetails = await getUserDetails(); Virker ikke, kan kun hente 1 af gangen på id med token:
  //tilføj evt flere datakilder via fx getUsersDetails, getActivityDetails(?) for at få nok data til søgningen,
  // (Søgekrav er på på aktivitetstitel, ugedag og intruktørnavn.)

  //   const users = await getUsers();

  // Filtrer data
  const activityResults = activities.filter(a =>
    a.name.toLowerCase().includes(query)
  );

  const weekdayResults = activities.filter(a =>
    a.weekday.toLowerCase().includes(query)
  );
  
  // ikke mulig skal hentes på specifikt id og kræver desuden token, så kun mulig at hente egne oplysninger ud på det fetch kald.
  // const InstructorResults = userDetails.filter(u =>
  //   u.firstname.toLowerCase().includes(query)
  // );

  return NextResponse.json({
    activities: activityResults,
    weekdays: weekdayResults,
    //instructors: InstructorResults,
  });
}