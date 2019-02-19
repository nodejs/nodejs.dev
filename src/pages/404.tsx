import React from 'react'
import Layout from '../components/layout'

const title = 'NOT FOUND 404'
const description =
  'You just hit a route that doesn&#39;t exist... the sadness.'

const NotFoundPage = () => (
  <Layout title={title} description={description}>
    <h1>{title}</h1>
    <p>{description}</p>
  </Layout>
)

export default NotFoundPage
