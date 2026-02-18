import Link from "next/link"
import Image from "next/image";

export default function ActivityCard({ activity }) {

return(
<Link href={`/activities/${activity.id}`} className="text-blue-500" aria-labelledby={"activity-card-" + activity.id}>
        <article className='my-8' key={activity.id}>     {/*keypropen bruges til at next kan skelne de forskellige posts fra hinanden, og det er vigtigt at den er unik, derfor bruger vi activity.id*/}
          <Image width={300} height={300} src={activity.asset.url} alt={activity.name} unoptimized/>
          <h2 id={"activity-card-" + activity.id}>{activity.name}</h2>
          <p>{activity.minAge} - {activity.maxAge}</p>
        </article>
</Link>
)
}