import Image from 'next/image';
import React from 'react';

const EventDetailsPage = async({params}) => {
    const {id} = await params

const res = await fetch(`http://localhost:5000/events/${id}`)
const data = await res.json()


    return (
        <div className='relative'>
           <div >
            <img src={data.image} alt={data.name} height={300} width={600} />
           </div>
           <div className='absolute bottom-0 left-0 p-4 text-white'>
             <h1>{data.type}</h1>
             <div className='flex gap-10'>
                <p>{data.location}</p>
              <p>{data.date}</p>
             </div>
           </div>
        </div>
    );
};

export default EventDetailsPage;