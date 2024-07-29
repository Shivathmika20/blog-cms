import Navbar from "@/components/Navbar";
import Image from "next/image";

import { client, urlFor } from "@/lib/client";
import { user } from "@/lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const getData = async () => {
  const query=`*[_type == 'blog'] | order(_createdAt desc)
{
  title,
    smallDescription,
     'currentSlug':slug.current,
     blogImage
}`;

const data = await client.fetch(query);
return data
}
export default async function Home() {
  const data : user[]= await getData()
  // console.log(data)
  return (
    <div className=" grid grid-cols-1  md:grid-cols-2 mt-6 gap-8 ">
     
      {data.map((post,idx)=>(
        <Card key={idx} className="" >
            <Image src={urlFor(post.blogImage).url()} alt="image" width={500} height={500} className="rounded-t-lg object-cover"/>
            <CardContent>
              <h3 className="text-lg md:text-xl mt-3 line-clamp-2 font-bold">{post.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gary-300 mt-2 line-clamp-3">{post.smallDescription}</p>
              <Button className="w-full mt-3 bg-blue-500">
                <Link href={`/blog/${post.currentSlug}`}>Read more</Link>
              </Button>
            </CardContent>
        </Card>
      ))}
    </div>
  );
}
