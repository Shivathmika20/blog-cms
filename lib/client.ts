// client.ts
import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
export const client=createClient({
  projectId: 'p32tl05n', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  useCdn: false // `false` if you want to ensure fresh data
})


const builder= imageUrlBuilder(client);
export const urlFor=(source: any)=>builder.image(source)