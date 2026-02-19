// src/app/api/search/route.js
import { NextResponse } from 'next/server';
import { getActivities } from '../../lib/dal';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  // Hent data fra flere kilder
  const activities = await getActivities();
  //tilføj evt flere datakilder måske via getUsers og getActivityDetails hvis det er nødvendigt for at få nok data til søgningen
//   const users = await getUsers();

  // Filtrer data
  const activityResults = activities.filter(a =>
    a.name.toLowerCase().includes(query)
  );
//   const userResults = users.filter(u =>
//     u.username.toLowerCase().includes(query)
//   );

  return NextResponse.json({
    activities: activityResults,
    // users: userResults,
  });
}