import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SponsorsSlider from "@/components/SponsorsSlider";
import {GET_SPONSORS} from "@/lib/sponsors";

import {getSchoolsResult} from "@/app/utils";
import ResultsTable from "@/components/ResultsTable";

export const revalidate = 0;

const Results = async () => {
  const schools = await getSchoolsResult({etap: 1});
  const sponsorsList = GET_SPONSORS();

  return (
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-10 flex flex-col items-center justify-center'>
      <h2 className='mt-2 font-bold text-2xl text-blue-950 sm:text-3xl lg:text-4xl'>Tabela wyników Etap 1</h2>
      <h5 className='mt-5 w-full text-center text-blue-950'>Szkoły oznaczone kolorem <span
        className='bg-green-600/50'>zielonym</span> biorą udział w turnieju, natomiast oznaczone kolorem <span
        className='bg-destructive/50'>czerwonym</span> są poza turniejem</h5>
      <h5 className='mt-5 w-full text-center text-blue-950'><span className='text-destructive'>Uwaga!</span> W rankingu
        uwzględnione są tylko szkoły, które mają co najmniej 1 głos</h5>
      <h5 className='mt-5 w-full text-center text-blue-950 font-bold'>Szkołą, które się zakwalifikowały składamy serdeczne GRATULACJE i życzymy powdzenia w drugim etapie głosowania.</h5>
      <ResultsTable schoolsTab={schools}/>
      <SponsorsSlider sponsors={sponsorsList} orientation='horizontal'/>
    </MaxWidthWrapper>
  )
}

export default Results;