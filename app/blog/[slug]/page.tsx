import { client,urlFor } from '@/lib/client';
import { user } from '@/lib/interface';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import React from 'react'


export const revalidate = 30 // revalidate at most every 30 sec

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
export default async function page({params}:{params: {slug:string}}) {
  // console.log(params.slug);
  const data: user=await getData(params.slug)
  // console.log(data);
  return (
    <div>
      <h1 className='text-center mt-6'>
        <span className='text-xl md:text-3xl font-bold leading-8 tracking-tighter'>{data.title}</span>
      </h1>
      <Image src={urlFor(data.blogImage).url()} alt="image" width={800} height={800} className="mt-6 rounded-md border mx-auto "/>
      <div className='mt-12 prose-lg prose-headings:font-bold max-w-2xl mx-auto  '>
        <PortableText value={data.content}/>
      </div>
    </div>
  )
}
