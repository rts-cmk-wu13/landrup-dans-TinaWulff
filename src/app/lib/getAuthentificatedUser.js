import { cookies } from 'next/headers';
import { getUserDetails } from '../lib/dal';
import { redirect } from 'next/navigation';

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('accessToken');
  const token = tokenCookie?.value;

  if (!token) {
    redirect('/login');
  }

  // Decode JWT and check expiry
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8')); // Decode payload from JWT and parse as JSON 
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      redirect('/login');
    }
  } catch (e) {
    // If decoding fails, treat as invalid token
    redirect('/login');
  }

  const userIdCookie = cookieStore.get("userId");
  const userId = userIdCookie?.value;

  const user = await getUserDetails(userId);
  return user;
}



// payload er et JavaScript-objekt, som du har får ved at dekode og parse JWT-tokenens payload-del.
// Det indeholder alle de felter (claims), der blev lagt ind i tokenen, fx bruger-id, rolle, og udløbstidspunkt.
// Eksempel:
// Base64-tekst: eyJzdWIiOiIxMjMiLCJleHAiOjEyMzQ1Nn0=
// Efter dekodning og tolkning som UTF-8: {"sub":"123","exp":123456}
// .exp er så udløbstidspunktet for tokenen i Unix-tid (sekunder siden 1. januar 1970).
// "exp" er altså den key i payload-objektet, som indeholder udløbstidspunktet for tokenen.

// Detaljer:
// Base64 er en måde at omskrive binære data
// (fx billeder, filer eller vilkårlig tekst) til almindelige bogstaver og tal, så det kan sendes som tekst (fx i en JWT).

// Buffer.from(data, encoding) laver en buffer (en slags “beholder” for rå data) ud fra en tekststreng og en angivet kodning.

// Når du laver .toString('utf8'), siger du: “Lav denne buffer om til en almindelig tekststreng, hvor tegnene tolkes som UTF-8.”
