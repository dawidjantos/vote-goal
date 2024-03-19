import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PreviewTableEtap2 from "@/components/PreviewTableEtap2";
import SponsorsSlider from "@/components/SponsorsSlider";
import {GET_SPONSORS} from "@/lib/sponsors";

import {getSchoolsResult} from "@/app/utils";

export const revalidate = 0;

const Preview = async () => {
  const schools = await getSchoolsResult({etap: 2}).then(schools => {
    if (schools !== undefined && schools.length >= 0) {
      const schoolsMap = schools.map((school, index) => {
        if ((index + 1) === 1) {
          return {
            id: school.id,
            id_szkoly: school.id_szkoly,
            szkola: school.szkola,
            grupa: "A",
            gold_card: true,
          }
        } else if ((index + 1) === 3 || (index + 1) === 7 || (index + 1) === 8) {
          return {
            id: school.id,
            id_szkoly: school.id_szkoly,
            szkola: school.szkola,
            grupa: "A",
            gold_card: false,
          }
        } else if ((index + 1) === 2 || (index + 1) === 4 || (index + 1) === 5 || (index + 1) === 6) {
          return {
            id: school.id,
            id_szkoly: school.id_szkoly,
            szkola: school.szkola,
            grupa: "B",
            gold_card: false,
          }
        } else {
          return school
        }
      });
      return schoolsMap;
    }
    return []
  });
  const sponsorsList = GET_SPONSORS();

  return (
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-10 flex flex-col items-center justify-center'>
      <h2 className='mt-2 font-bold text-2xl text-blue-950 sm:text-3xl lg:text-4xl'>Tabela aktualnych wyników</h2>
      <h5 className='mt-5 w-full text-center text-blue-950'>Szkoła oznaczone kolorem <span
        className='bg-yellow-400'>złotym</span> jest aktualnym liderem w głosowaniu o Złotą Kartę.</h5>
      <h5 className='mt-5 w-full text-center text-blue-950'><span className='text-destructive'>Uwaga!</span> W rankingu
        uwzględnione są tylko szkoły, które mają co najmniej 1 głos</h5>
      <PreviewTableEtap2 schoolsTab={schools}></PreviewTableEtap2>
      <SponsorsSlider sponsors={sponsorsList} orientation='horizontal'/>
    </MaxWidthWrapper>
  )
}

export default Preview;