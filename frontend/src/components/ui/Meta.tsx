import Head from "next/head";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from 'react';

import logoImage from "frontend\public\Amazon_logo.svg.png"

interface ISeo {
   title: string
   description?: string
   image?: string
}

export const titleMerge = (title: string) => `${title} | Boronilov Amazon`

const Meta: FC<PropsWithChildren<ISeo>> = ({
   title,
   description,
   image,
   children
}) => {
   const {asPath} = useRouter()
   const currentURL = `${process.env.APP_URL}/${asPath}`

   return (
      <>
         <Head>
            <title itemProp="headline">{titleMerge(title)}</title>
            {description ? (
               <>
                  <meta 
                     itemProp="description"
                     name="description"
                     content="description"
                  />
                  <link rel="canonical" href={currentURL} />
                  <meta property="og:locale" content="en" />
                  <meta property="og:title" content={titleMerge(title)} />
                  <meta property="og:url" content={currentURL} />
                  <meta property="og:image" content={image || "data:image/png;base64,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"} />
                  <meta property="og:description" content={description} />
               </>
            ) : (
               <meta name="robots" content="noindex, nofollow" />
            )}
         </Head>
         {children}
      </>
   )
}

export default Meta