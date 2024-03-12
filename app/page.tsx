"use server";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import VotingList from "@/components/VotingList";
import {fetchSchools} from "@/actions/fetch-schools";
import {headers} from 'next/headers'

const Home = async () => {
  const schools = await fetchSchools()
    .then((values) => {
      return values;
    });
  const header = headers()
  const ip = process.env.NODE_ENV !== "production" ? (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0] : (header.get('x-forwarded-for') ?? '127.0.0.1');

  console.log(ip);

  return (
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-10 flex flex-col items-center justify-center'>
      <h2 className='mt-2 font-bold text-4xl text-blue-950 sm:text-5xl'> Etap 1</h2>
      <div className='w-full flex flex-col gap-x-14 justify-center items-center'>
        <VotingList schools={schools} ip={ip}/>
      </div>
    </MaxWidthWrapper>
  );
}
export default Home;