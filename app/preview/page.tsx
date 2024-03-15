"use server";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PreviewTable from "@/components/PreviewTable";
import {fetchResults} from "@/actions/fetch-results";
import SponsorsSlider from "@/components/SponsorsSlider";
import {GET_SPONSORS} from "@/lib/sponsors";

const Preveiw = async () => {
  const schools = await fetchResults().then(r => {
    return r;
  })
  const sponsorsList = GET_SPONSORS();
  return (
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-10 flex flex-col items-center justify-center'>
      <h2 className='mt-2 font-bold text-2xl text-blue-950 sm:text-3xl lg:text-4xl'>Tabela aktualnych wyników</h2>
      <h5 className='mt-5 w-full text-center text-blue-950'>Szkoły oznaczone kolorem <span
        className='bg-green-600/50'>zielonym</span> biorą udział w turnieju, natomiast oznaczone kolorem <span
        className='bg-gray-600/50'>szarym</span> są poza turniejem</h5>
      <h5 className='mt-5 w-full text-center text-blue-950'><span className='text-destructive'>Uwaga!</span> W rankingu uwzględnione są tylko szkoły, które mają co najmniej 1 głos</h5>
      <PreviewTable schoolsTab={schools}/>
      <SponsorsSlider sponsors={sponsorsList} orientation='horizontal'/>
    </MaxWidthWrapper>
  )
}

export default Preveiw;