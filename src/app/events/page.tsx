import Image from 'next/image';
import React from 'react';
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';


const AllEvents = async() => {
const res = await fetch('http://localhost:5000/events')
const data = await res.json()
console.log(data)


    return (
        <div className='grid grid-cols-3 mt-20 gap-4 p-4'>
  
          {data.map((e:any)=>(

            <div key={e._id} >
                           <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video " />
        
      <img src={e.image} alt={e.title} className="w-full h-50 rounded-lg" />
    
      <CardHeader>
        <CardAction>
        </CardAction>
        <CardTitle>{e.title}</CardTitle>
        <CardDescription>
        {e.description}
        </CardDescription>
        <h2>{e.maxVolunteers}</h2>
        <h2>{e.type}</h2>
        <h2>{e.date}</h2>
        <h2>{e.location}</h2>
      </CardHeader>
      <CardFooter>
<Link href={`/events/${e._id}`}>
        <Button className="w-full">View Event</Button>
</Link>
      </CardFooter>
    </Card>
               
               
          
            </div>
          ))}
           
        </div>
    );
};

export default AllEvents;