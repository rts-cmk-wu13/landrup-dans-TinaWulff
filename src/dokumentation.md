# Landrup Dans wep app
Tina Wulff, WU13

**Valgfri opgave B: Registrering af ny bruger**

**Egne Valg**: Jeg har gjort mig enkelte egne valg i forbindelse med udviklingen og tilpaning i design: **Lavet link til aktiviteter på forsiden nederst i sektionen "holdtyper"**, for at have et link til aktiviteterne, da menuen ikke er synlig på forsiden. Alternativt kunne man ligge menuen på forsiden også men dette var mindre drastisk ændring af designet og bevarer en rolig forside, som ligger op til at se denne side først og guider brugeren igennem siden vha CTA knapper fremfor menu.
Jeg har desuden tilføjet enkelt ekstra ux vha modal eller dialog bokse, som ikke er direkte beskrevet i designet, fx i forbindelse med oprettelse af bruger og afmelding af hold.

## Tech stack

**Nextjs** er et Javascript framework, som er komponent-baseret. Frameworket har fil-baseret routing og giver mulighed for at afvikle kode og komponenter på serveren. Jeg har valgt at bruge netop dette framework fordi der allerede er taget en lang række strukturelle valg for mig, for eksempel måden at opbygge routeren på.  
Nextjs bygger ovenpå React, så jeg får alle fordelene ved Reacts komponent-tankegang og genbrugelighed, men med ekstra features som server-side rendering og nem routing.
Det gør det lettere at bygge større apps, fordi jeg ikke selv skal opfinde strukturen fra bunden. Nextjs er især godt at bruge, når man skal lave professionelle webapps, hvor man har brug for både server-side rendering, god SEO og hurtig performance. Det er også oplagt, hvis man forventer at projektet skal vokse, eller hvis flere udviklere skal arbejde sammen, fordi det giver en fast struktur og mange best practices fra starten.
Nextjs er blevet populært og det nye og mest populære Framework på markedet så der er et kæmpe community og masser af ressourcer, hvis man sidder fast. Det bygger som sagt ovenpå React og sproget er Javascript, som også er det mest moderne programmeringssprog i dag til webudvikling. Så alt i alt, Det er smart, praktisk, populært og efterspurgt. Det nye der bruges derude!

**React**
React er det bibliotek der bruges i Javascript, hvor vi kan bruge en masse elementer/kode som er bygget for os, som fx hooks og vi kan desuden undgå HTML baseret programmering og erstatte det med JSX, så vi kan opbygge komponentbaseret og gøre projekter mere overskuelige og nemmere at integrere html delen med javascript-funktionaliteterne.

**JavaScript**
JavaScript er grundlaget for både React og Next.js, og det er det sprog, der gør det muligt at lave dynamiske og interaktive webapps i browseren. Det er et højniveaussprog, hvorfor det er nemmere for mennesker at læse og skrive, da det indeholder en masse "indbygget teknisk kode" i sproget i sig selv. Det er derfor helt centralt i moderne webudvikling og meget populært hertil.

**API**
Jeg bruger et API til at hente og sende data mellem frontend og backend. Det er en standard måde at arbejde på i moderne webudvikling, hvor data og logik ofte ligger på en server, og frontend’en bare viser det for brugeren. Det gør det nemt at genbruge kode og udvide projektet med nye elementer/produkter, sektioner og lignende, da man blot kan opdatere dataen i API'et i dets struktur, når man har lavet dynamisk kode i et automatiseret genbrugeligt system, hvor der hentes ud fra API'et, fromfor statiske assets, hvor man det bliver mere besværligt at opdatere og vedligeholde siden hvis indholdet jævnligt skal udskiftes, fx produkter eller danseklasser som i dette projekt.

Dataen jeg henter fra API’et er i **JSON-format**, som er et letvægtsformat til at udveksle data mellem server og klient. Det gør det nemt at arbejde med data i JavaScript.

**Tailwind & CSS** 
 Jeg har valgt at bruge Tailwind til styling, fordi det er hurtigt at arbejde med og gør det nemt at lave responsivt design direkte i mine komponenter. Jeg slipper for at skrive så meget klassisk CSS, og det er nemt at se, hvilke styles der gælder hvor.
 Jeg bruger lidt global CSS til helt enkelte ting, man kunne med fordel bruge lidt mere global CSS, til flere gennemgående ting, som farver og skriftstørelser, for at undgå for lange lister Tailwind klasser. I dette projekt hvor jeg styler hurtigt, og hen af vejen har jeg lagt mere i Tailwind, da det gør det hurtigt for mig og jeg hele tiden kan se præcis hvad der er sat på hvert element.

**INGEN Typescript**
Jeg har ikke brugt Typescript, fordi det ville gøre projektet mere komplekst og tungt at arbejde med alene, og det er unødvendigt i dette mindre projekt, hvor jeg arbejder alene. Derfor ikke behov for det ekstra lag af sikkerhed i udviklingen. Typescript giver mest mening, hvis man er flere om et større projekt, hvor det hjælper til at undgå fejl og gøre koden mere overskuelig for alle og undgå fejl i udviklignen. Her er hele koden min, og jeg har overblikket selv, hvilket bevares bedst uden brug af Typescript, som desuden ikke var en del af vores undervisning.

**Andet**
Alle mine dependencies styres via package.json, hvor jeg blandt andet har installeret React, Next.js, Tailwind og react-icons. Tailwind er for at kunne lave min Tailwind styling og react-icons hjælper mig så jeg nemt kan importere ikoner til brug i projectet uden at uploade ikonerne som billed-filer i assets.
jeg har også instaalleret Embla Carousel for at lave moderne slider. Jeg har desuden til dette søgt hjælp her, pga min react version ikke understøttede nyeste goToNext function. 
scrollPrev/scrollNext, bruges i tidligere versioner som min er; 8.6, og hjælp til sammenligning af versioner fundet: https://github.com/davidjerleke/embla-carousel/discussions/1080 .


## Kodeeksempel

[NewLetter.jsx](./app/components/homeComponents/NewLetter.jsx)

```javascript
'use client';
import { useActionState } from "react";
import { registerEmail } from "./action";   

const initialState = {
    values: {
        email: ''
    },
    errors: undefined
};

export default function NewLetter() {
 const [state, formAction, isPending] = useActionState(registerEmail, initialState);

    return (
        <section className="mx-6 mt-4 mb-12">
            <h2 className="text-4xl mb-4">Nyhedsbrev</h2>

            <p className="text-m leading-[1.2] mb-6">Få direkte besked når vi har sæsonstart eller afholder arrangementer.</p>

            {state.success && (
            <p className="mb-4 text-green-400">Tak for din tilmelding til nyhedsbrevet, du vil snart modtage mails fra os.</p>
            )}
            <form className="flex w-full gap-4" action={formAction}>
                <div className="bg-[#E9E9E9] w-full p-3">
                    <label htmlFor="email"></label>
                    <input className="text-black w-full text-m" type="text" name="email" defaultValue={state.values.email} placeholder="Email"/>
                </div>
                <div>
                    <button className="text-[#003147] bg-[#E9E9E9] self-end p-3 rounded w-fit-content text-m" type="submit" disabled={isPending}>{ isPending ? "regitrerer mail..." : "Tilmeld" }</button>
                </div>
            </form>
            { state.errors?.form && (<p className="text-red-500">{state.errors.form}</p>) }
            { state.errors?.email && (<p className="text-red-500">{state.errors.email[0]}</p>)}
        </section>
    )
}
```


Jeg har lavet et **client-component**, der håndterer tilmelding til nyhedsbrevet.
Dette er et client-component fordi den skal håndteres via interaktivitet med brugeren og kører i browseren. Jeg bruger altså elementer som skal **håndteres af brugeren i browseren, så det er nødt til at være et client-compoenent** som så taler med serveren når der submittes på formen. 

Når brugeren indtaster sin email og trykker på "Tilmeld"(på submit knappen), sendes et **POST-request til API'et** via en action-function (registerEmail), som jeg har importeret fra action.js. Det sker gennem **formAction**, der er koblet på formularen. Formålet er at sende emailen som data til backend via API'et, så den bliver gemt og kan bruges til at sende nyhedsbreve ud senere.

Jeg bruger **useActionState-hooket** til at holde styr på state i komponentet; fx om der er fejl, om tilmeldingen er i gang, og om den er gennemført. Det gør det nemt at vise feedback til brugeren, fx en succesbesked eller fejlmeddelelser, alt efter hvad der sker, når man prøver at tilmelde sig. Samtidig gør det koden mere overskuelig, fordi alt state og logik omkring formularen samles ét sted.
useActionState er fungerer godt at bruge til denne slags formularer, fordi den arbejder sammen med en asynkron server action (registerEmail), og automatisk håndterer loading, fejl og succes, når data sendes til backend. Det gør så man slipper for selv at styre  de forskellige state-typer, og kan give brugeren feedback på en moderne og effektiv måde.

I komponentet sætter jeg en **initialState**, hvor email-feltet er tomt og der ikke er nogen fejl. Det gør, at inputfeltet starter med at være tomt, og at vi har et klart udgangspunkt for state. Når brugeren skriver i inputfeltet, opdateres state automatisk, så vi altid har adgang til det aktuelle input.
For at inputfeltet altid viser den nyeste værdi fra state, bruger jeg **defaultValue på inputfeltet**, som sættes til fx "state.values.email". Det gør, at hvis der opstår en fejl (hvis emailen ikke er gyldig), så bevares det, brugeren har skrevet, og inputfeltet opdateres med den aktuelle værdi fra state. På den måde hænger initialState og defaultValue sammen og sikrer, at brugerens input ikke forsvinder, selv hvis der opstår fejl.
Det gør det nemt at give feedback og sikre en god brugeroplevelse. Samtidig kan vi vise en succesbesked, hvis tilmeldingen lykkes, fordi state også holder styr på, om handlingen er gennemført.

Når brugeren indsender formularen, opdateres state automatisk med enten en succesbesked eller en fejlbesked, afhængigt af serverens svar. Det vises direkte i UI’et, så brugeren får feedback med det samme. Det gør det nemt at forstå, om tilmeldingen er lykkedes, eller om der skal rettes noget.

**isPending** bruges til at holde styr på loading-status og er en variabel, der viser om handlingen (registreringen) er i gang. Når isPending er true, vises en loading-besked, og knappen bliver disabled, så brugeren ikke kan trykke flere gange. Det sikrer, at man ikke sender flere requests og giver en bedre brugeroplevelse.

Jeg har stylet med Tailwind-klasser for overskuelighed og hurtig styling direkte i koden. Det gør det nemt at se hurtigt hvad der egentligt er sat på af styling og hvis man vil ændre noget kan man hurtigt få overblik og ændre uden at skulle lede i seperate css-filer.


## Perspektivering
Jeg har valgt at strukturere projektet med små, genbrugelige komponenter og funktioner, fordi det gør koden mere overskuelig og nem at vedligeholde. Det følger moderne best practice i React/Next.js, hvor man undgår store og uoverskuelige filer, men i stedet deler logik og UI op i mindre dele.
Navngivningskonventioner er vigtige for at gøre koden overskuelig og let at forstå for både én selv og andre udviklere. Jeg har derfor brugt beskrivende navne på både komponenter og funktioner.
Projektet er bygget med tanke på, at det skal kunne køre i et rigtigt production-miljø, hvor struktur, genbrug og overskuelighed er afgørende for både performance og videreudvikling.
