'use server'; //der er en serveraction, så skal der stå 'use server' øverst i filen. Det er en slags "marker" for Next.js, så den ved at det her er en serveraction.

import { z }from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const loginSchema = z.object({
    username: z.string("indtast gyldig brugernavn"),
    password: z.string().min(4, "Adgangskode skal være mindst 4 tegn")
});

export async function loginUser(prevState, formData) { // når vi laver en action og kobler den med et actionstate skal to argumenter med: forrige state (prevState) og formData (formdataen fra formularen)

    const cookieStore = await cookies(); //await fjernet

    const username = formData.get("username");
    const password = formData.get("password");

    // console.log(username, password);

    if (username === prevState.values.username && password === prevState.values.password) {
        return prevState;
    } // hvis det er samme values der indsættes og forsøges at logge ind med flere gange,
    // så returnerer vi bare den forrige state, så vi ikke starter hele login-processen forfra
    // og dermed ikke laver unødvendige kald til serveren.

    const result = loginSchema.safeParse({ username, password });

    if (!result.success) {
        console.log(z.flattenError(result.error).fieldErrors);  
        return {
            values: { username, password },
            errors: z.flattenError(result.error).fieldErrors 
        }
    }
    // z.flattenError er en zod-funktion, der "flader" fejlene ud, så de er nemmere at arbejde med i vores form. Det gør det nemmere at vise de rigtige fejlmeddelelser ved siden af de rigtige inputfelter i formularen.
    // fieldErrors er en del af det objekt, som z.flattenError returnerer, det er her z.objektets fejlbesker ligger og vi her med .fieldErrors får adgang til dem, så vi kan sende dem tilbage til vores form og vise dem for brugeren.

    const response = await fetch("http://localhost:4000/auth/token", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
     },
        body: JSON.stringify({ username, password }) //konstruerer json body/objekt
    });

    if (!response.ok) {
    // hvis det ikke er ok, altså hvis der er en fejl, så returnerer vi den her state, som indeholder de værdier brugeren indtastede (så de ikke skal indtaste det hele igen) og en form-fejl.
    return { 
        values: { username, password },
        errors: { form: ["forkert brugernavn eller adgangskode."]}
    }
    }

    const data = await response.json();
    console.log("login response data:", data);

    cookieStore.set("accessToken", data.token);
    // cookieStore.set("accessToken", data.token, {remember ? 'maxAge:60*60*24' : null})
    // find ud af det rigtige der skal stå her, hvis jeg vil have at den husker token længere, så kan jeg sætte en udløbstid på den cookie, og det kan jeg gøre ved at tilføje et tredje argument til cookieStore.set, hvor jeg kan specificere maxAge (i sekunder) eller expires (en dato). Hvis jeg ikke sætter nogen udløbstid, så vil cookien være en session-cookie, som betyder at den kun varer indtil brugeren lukker browseren.
    cookieStore.set("username", data.name);
    cookieStore.set("userId", String(data.userId));

    return redirect("/profil")// når login er succesfuldt, så redirecter vi brugeren til profil-siden.
}