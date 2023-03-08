import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '@/components/common/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='w-5/6 mx-auto'>
      <Head>
        <title>View and Buy NFTs</title>
        <meta name='description' content='View and Buy NFTs' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
