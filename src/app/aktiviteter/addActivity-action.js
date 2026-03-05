'use server';
import { cookies } from 'next/headers';
import { getUserDetails, getActivityDetails } from '../lib/dal';

export async function AddUserToActivity(prevState, formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken');
  if (!token) {
    return {
      success: false,
      message: 'Du skal logge ind for at tilmelde dig. <a href="/login" style="color:#003147;text-decoration:underline;">Log ind</a>'
    };
  }

  // Tjek om token er udløbet
  try {
    const payload = JSON.parse(Buffer.from(token.value.split('.')[1], 'base64').toString('utf8'));
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return {
        success: false,
        message: 'OBS! Du skal <a href="/login" style="text-decoration:underline; font-weight:bold;">logge ind</a> igen.'
      };
    }
  } catch (e) {
    return {
      success: false,
      message: 'OBS! Ugyldig token. <a href="/login" style="text-decoration:underline; font-weight:bold;">Log ind igen</a>.'
    };
  }
  

  const userId = formData.get('userId');
  const activityId = formData.get('activityId');
  const action = formData.get('action'); // hidden input: tilmeld eller afmeld

  const method = action === "tilmeld" ? "POST" : action === "afmeld" ? "DELETE"  : (() => { throw new Error("Ugyldig handling") })();


  // Hent bruger og aktivitet for ekstra tjek på ugedag og alder, før vi tilføjer brugeren til aktiviteten
  const user = await getUserDetails(userId);
  const activity = await getActivityDetails(activityId);

  // 1. Tjek for overlap på ugedag
  const sameWeekday = user.activities?.some(a => a.weekday === activity.weekday);
  if (sameWeekday && method === "POST") {
    return { success: false, message: "Du kan ikke tilmelde dig to aktiviteterder foregår samme ugedag." };
  }

  // 2. Tjek for aldersbegrænsning
  const userAge = user.age; // Brug direkte age property
  if ((userAge < activity.minAge || userAge > activity.maxAge) && method === "POST") {
    return { success: false, message: "Du opfylder ikke alderskravet for denne aktivitet." };
  }

  const response = await fetch(`http://localhost:4000/api/v1/users/${userId}/activities/${activityId}`, {
    method: method,
    headers: {
      'Authorization': `Bearer ${token.value}`
    }
  });

  if (!response.ok) {
    return { success: false, message: "Tilmelding fejlede, prøv senere" };
  }
  return { success: true, message: action === "tilmeld" ? "Du er nu tilmeldt holdet!" : "Du er nu afmeldt holdet!"  };
}


