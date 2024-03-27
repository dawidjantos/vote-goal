"use server";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import VotingList from "@/components/VotingList";
import {fetchSchoolsEtap1} from "@/actions/fetch-schools";
import {headers} from 'next/headers'
import {GET_COLAB} from "@/lib/sponsors";
import ColabSlider from "@/components/ColabSlider";

const Etap1 = async () => {
  const schools = await fetchSchoolsEtap1()
    .then((values) => {
      return values;
    });
  const colabList = GET_COLAB();
  const header = headers()
  const ip = process.env.NODE_ENV !== "production" ? (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0] : (header.get('x-forwarded-for') ?? '127.0.0.1');

  return (
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-10 flex flex-col items-center justify-center'>
      <h2 className='mt-2 font-bold text-4xl text-blue-950 sm:text-5xl'> Etap 1</h2>
      <div className='w-full flex flex-col pt-16'>
        <h3 className='font-bold text-xl text-blue-950 pb-2'>Jak głosować?</h3>
        <ul className='text-lg text-blue-950 pb-2'>
          <li>1. Głos na daną szkołę można oddać poprzez naciśnięcie przycisku GŁOSUJ przy danej szkole</li>
          <li>2. Kolejny głos można oddać dopiero po upływie <span
            className='text-destructive font-bold'>30 minut</span></li>
          <li>3. <span className='text-destructive font-bold'>UWAGA!</span> Wszelkie próby automatyzacji procesu
            głosowanie będą skutkowały dyskwalifikacją szkoły na która głosy będą oddawane
          </li>
        </ul>
      </div>
      <div className='w-full flex flex-col gap-x-14 justify-center items-center'>
        <h3 className='w-full mt-5 font-bold text-xl text-blue-950 pb-2'>Lista szkół biorących udział w
          głosowaniu: </h3>
        <div className='w-full flex flex-col lg:flex-row gap-x-3'>
          <VotingList schools={schools} ip={ip} etap={1} redirect='/etap1/preview'/>
          <ColabSlider title='Sponsorzy' data={colabList.sponsors} orientation='vertical'
                       className='w-fit max-w-fit'/>
        </div>
        <ColabSlider title='Partnerzy' data={colabList.partners} orientation='horizontal'/>
      </div>
    </MaxWidthWrapper>
  );
}
export default Etap1;