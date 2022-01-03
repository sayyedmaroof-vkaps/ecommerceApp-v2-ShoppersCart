import Head from 'next/head'

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <title>{title}</title>
    </Head>
  )
}

Meta.defaultProps = {
  title: 'Shoppers Cart',
  keywords:
    'ecommerce, shopping cart, online shopping, products, nextjs, nodejs, react',
  description: 'Browse the huge products delivered to your doorstep',
}

export default Meta
