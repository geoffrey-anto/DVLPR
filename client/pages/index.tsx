import type { NextPage } from 'next'
import Head from 'next/head'
import SideBar from '../components/SideBar'
import TweetFeed from '../components/TweetFeed'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Twitter</title>
      </Head>
      <div className='h-screen w-screen bg-black flex flex-row'>
        <SideBar />
        <TweetFeed />
      </div>
    </>
  )
}

export default Home
