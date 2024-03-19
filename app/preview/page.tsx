import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PreviewTable from "@/components/PreviewTable";
import ColabSlider from "@/components/ColabSlider";
import {GET_COLAB} from "@/lib/sponsors";

import {getSchoolsResult} from "@/app/utils";

export const revalidate = 0;

const Preview = async () => {
  const schools = await getSchoolsResult();
  const sponsorsList = GET_COLAB().sponsors;
  const partnersList = GET_COLAB().partners;

  return (
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-10 flex flex-col items-center justify-center'>
      <h2 className='mt-2 font-bold text-2xl text-blue-950 sm:text-3xl lg:text-4xl'>Tabela aktualnych wyników</h2>
      <h5 className='mt-5 w-full text-center text-blue-950'>Szkoły oznaczone kolorem <span
        className='bg-green-600/50'>zielonym</span> biorą udział w turnieju, natomiast oznaczone kolorem <span
        className='bg-gray-600/50'>szarym</span> są poza turniejem</h5>
      <h5 className='mt-5 w-full text-center text-blue-950'><span className='text-destructive'>Uwaga!</span> W rankingu
        uwzględnione są tylko szkoły, które mają co najmniej 1 głos</h5>
      <PreviewTable schoolsTab={schools}></PreviewTable>
      <ColabSlider title='Sponsorzy' data={sponsorsList} orientation='horizontal'/>
      <ColabSlider title='Partnerzy' data={partnersList} orientation='horizontal'/>
    </MaxWidthWrapper>
  )
}

export default Preview;