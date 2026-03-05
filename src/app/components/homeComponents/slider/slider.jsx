'use client'
import useEmblaCarousel from 'embla-carousel-react';
import { getTestimonials } from "./slider-fetch";
import { useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { IoChevronBackCircleOutline } from "react-icons/io5";
import { IoChevronForwardCircleOutline } from "react-icons/io5";


export default function Slider() {

//   const [emblaRef, emblaApi] = useEmblaCarousel();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]); // npm install embla-carousel-autoplay

  const [testimonials, setTestimonials] = useState([]);


  useEffect(() => {
  if (emblaApi) {
    // eslint-disable-next-line no-console
    console.log('emblaApi:', emblaApi);
  }
}, [emblaApi]);

    useEffect(() => {
        async function fetchTestimonials() {
            const testimonials = await getTestimonials();
            setTestimonials(testimonials);
        }
        fetchTestimonials();
    }, []);

    // const goToPrev = () => emblaApi?.goToPrev() //nyere version, men kan ikke installere den i min react-version
    // const goToNext = () => emblaApi?.goToNext() //nyere version, men kan ikke installere den i min react-version
    // ældre version er scrollPrev/scrollNext, og hjælp til sammenligning mellem versioner: https://github.com/davidjerleke/embla-carousel/discussions/1080

    // Brug scrollPrev/scrollNext, da din emblaApi ikke har goToPrev/goToNext
    const goToPrev = () => emblaApi && typeof emblaApi.scrollPrev === 'function' && emblaApi.scrollPrev();
    const goToNext = () => emblaApi && typeof emblaApi.scrollNext === 'function' && emblaApi.scrollNext();

    return (
        <section className="embla bg-blue-950 flex flex-col items-center py-12">
            <h2 className="mx-6 text-3xl w-[60%] text-center font-[500] mb-6">Det siger vores kunder om os</h2>
            <div className="embla w-full overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex" >
                    {testimonials.map((testimonial, idx) => (
                        <article className="embla__slide flex-[0_0_100%] flex flex-col items-center justify-center" key={idx}>
                            <p className="mx-6 text-m w-full max-w-xl text-center font-[400] mb-4  px-16">{testimonial.content}</p>
                            <p className="mx-6 text-xl w-full max-w-xl text-center font-[700]">{testimonial.name}</p>
                            <p className="mx-6 text-xs w-full max-w-xl text-center font-[500] mb-4">{testimonial.occupation}</p>
                        </article>
                    ))}
                </div>
            </div>
            <div className='flex mt-6 cursor-pointer'>
            <button disabled={!emblaApi} className="embla__prev" onClick={goToPrev}><IoChevronBackCircleOutline size={50}/></button>
            <button disabled={!emblaApi} className="embla__next" onClick={goToNext}><IoChevronForwardCircleOutline size={50}/></button>
            </div>
        </section>
    )

}