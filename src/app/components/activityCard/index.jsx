import Link from "next/link"
import Image from "next/image";


export default function ActivityCard({ activity }) {
return(
<Link href={`/aktiviteter/${activity.id}`} className="text-white" aria-labelledby={"activity-card-" + activity.id}>
        <article className='my-8 mx-6 flex flex-col relative' key={activity.id}>     {/*keypropen bruges til at next kan skelne de forskellige posts fra hinanden, og det er vigtigt at den er unik, derfor bruger vi activity.id*/}
          <Image className="rounded-tr-4xl rounded-tl-4xl rounded-bl-4xl w-full max-w-full object-cover aspect-[1/1]"
          width={300} height={300} src={activity.asset.url} alt={activity.name} unoptimized/>
          <div className="py-6 h-[96px] bg-[#003147]/75 flex flex-col absolute bottom-0 z-10 self-end rounded-tr-4xl  rounded-bl-4xl w-full">
             <h2 className="px-6 text-xl font-bold" id={"activity-card-" + activity.id}>
            {activity.name}
            </h2>
             <p className="pt-1 pb-2 px-6">
            {activity.minAge}-{activity.maxAge} år
            </p>
          </div>
        </article>

</Link>
)
}