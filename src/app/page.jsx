import HeroComp from "./components/homeComponents/Hero";
import TeamTypes from "./components/homeComponents/TeamTypes";
import NewLetter from "./components/homeComponents/NewLetter";
import Slider from "./components/homeComponents/slider/slider";
import ContactForm from "./components/homeComponents/ContactForm";

// HoldTyper - Images & objekts til holdtyperne på forsiden.
import boerneDans from "../assets/boernedans.jpg";
import seniorDans from "../assets/seniordans.jpg";
import moderneDans from "../assets/modernedans.jpg";
import streetDans from "../assets/streethiphop.jpg";

import Link from "next/link";

const articles = [
  { title: "Børnehold", img: boerneDans, text: "På børneholdene leger vi os ind i dansens verden gennem musik, bevægelse og fantasi. Undervisningen styrker motorik, rytme og kropsbevidsthed i trygge rammer. Fokus er på danseglæde, fællesskab og aktiv bevægelse, hvor alle kan være med."},
  { title: "Selskabs- og seniordans", img: seniorDans, text: "Selskabs- og seniordans kombinerer hyggeligt samvær med skånsom motion. Vi danser klassiske pardanse i et tempo, hvor alle kan følge med. Undervisningen styrker balance, koordination og kondition, samtidig med at fællesskabet og danseglæden er i centrum." },
  { title: "Moderne dans og ballet", img: moderneDans, text: "Moderne dans og ballet forener teknik, kropskontrol og musikalsk udtryk. Træningen forbedrer styrke, smidighed og holdning gennem varierede øvelser. Undervisningen foregår i en positiv atmosfære, hvor bevægelsesglæde og koncentration skaber både fordybelse og effektiv motion." },
  { title: "Streetdance og hiphop", img: streetDans, text: "Streetdance og hiphop er energifyldt træning med fokus på rytme, attitude og fællesskab. Vi arbejder med grooves, koreografier og grundtrin, der styrker kondition og koordination. Stemningen er uformel og motiverende, så motion og danseglæde går hånd i hånd." },
];


 export default function Home() {
   return (
    <>
      <HeroComp />

      <section id="TeamTypesSection" className="my-8 flex flex-col items-center gap-1 mb-12">
        <h1 className="mx-6 text-4xl mb-6 self-start">Vores holdtyper</h1>
        {articles.map((item, idx) => (
          <TeamTypes key={idx} title={item.title} text={item.text} img={item.img} />
        ))}

        <Link href="/aktiviteter" className="flex justify-center w-[60%] align-center bg-gray-300 text-[#003147] px-6 py-2 rounded-xl text-lg shadow-lg font-medium">Se holdoversigt</Link>

      </section>


      <NewLetter />

      <Slider />

      <ContactForm />

    </>
   );
 }
