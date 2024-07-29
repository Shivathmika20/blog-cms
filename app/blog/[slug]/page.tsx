import { client,urlFor } from '@/lib/client';
import { user } from '@/lib/interface';
import Image from 'next/image';
import React from 'react'


const getData=async (slug :string)=>{
  const query=`
    *[_type=='blog' && slug.current=="${slug}"]
{
  "currentSlug":slug.current,
    title,
    content,
    blogImage,
}[0] 
  `
  const data=await client.fetch(query)
  return data
}
export default async function page({params}: string) {
  // console.log(params.slug);
  const data: user=await getData(params.slug)
  // console.log(data);
  return (
    <div>
      <h1 className='text-center mt-4'>
        <span className='text-xl md:text-3xl font-bold leading-8 text-balance tracking-tighter'>{data.title}</span>
      </h1>
      <Image src={urlFor(data.blogImage).url()} alt="image" width={800} height={800} className="mt-8 rounded-md border w-11/12 mx-auto "/>

    </div>
  )
}
