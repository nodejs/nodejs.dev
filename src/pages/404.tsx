import React from 'react';
import Hero from '../components/Hero';
import Layout from '../components/Layout';

export default function NotFoundPage(): JSX.Element {
  const title = 'page not found';
  const description = 'You have hit a route that does not exist.';

  return (

    <Layout title={title} description={description} >

      <div style={{textTransform:'uppercase'}} >
      <Hero title={title} />
      </div> 
      
      <main style={{ width:'60%', textAlign :'center', margin:'auto'}} className="article-reader"  >
        <p>
          The page you&apos;re trying to access does not exist. Go back to the
          Homepage or find what you&apos;re looking for in the menu.
        </p>
        <p>
          Take me back to the <a href="/"> Homepage</a>
        </p>
      </main>
     
      </Layout>
  );
}
