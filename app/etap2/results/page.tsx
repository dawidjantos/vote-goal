import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ResultsTableEtap2 from "@/components/ResultsTableEtap2";
import {GET_COLAB} from "@/lib/sponsors";

import {getSchoolsResult} from "@/app/utils";
import ColabSlider from "@/components/ColabSlider";
import GroupTable from "@/components/GroupTable";

export const revalidate = 0;

const Results = async () => {
  const schools = await getSchoolsResult({etap: 2}).then(schools => {
    if (schools !== undefined && schools.length >= 0) {
      const schoolsMap = schools.map((school, index) => {
        if ((index + 1) === 1) {
          return {
            id: school.id,
            id_szkoly: school.id_szkoly,
            szkola: school.szkola,
            liczba_glosow: school.liczba_glosow,
            grupa: "A",
            gold_card: true,
          }
        } else if ((index + 1) === 3 || (index + 1) === 7 || (index + 1) === 8) {
          return {
            id: school.id,
            id_szkoly: school.id_szkoly,
            szkola: school.szkola,
            liczba_glosow: school.liczba_glosow,
            grupa: "A",
            gold_card: false,
          }
        } else if ((index + 1) === 2 || (index + 1) === 4 || (index + 1) === 5 || (index + 1) === 6) {
          return {
            id: school.id,
            id_szkoly: school.id_szkoly,
            szkola: school.szkola,
            liczba_glosow: school.liczba_glosow,
            grupa: "B",
            gold_card: false,
          }
        } else {
          return {
            id: school.id,
            id_szkoly: school.id_szkoly,
            szkola: school.szkola,
            liczba_glosow: school.liczba_glosow,
            grupa: "",
            gold_card: false,
          }
        }
      });
      return schoolsMap;
    }
    return []
  });
  const sponsorsList = GET_COLAB().sponsors;
  const partnersList = GET_COLAB().partners;

  return (
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-10 flex flex-col items-center justify-center'>
      <h2 className='mt-2 font-bold text-2xl text-blue-950 sm:text-3xl lg:text-4xl'>Tabela wyników Etap 2</h2>
      <h5 className='mt-5 w-full text-center text-blue-950'>Szkoła oznaczona kolorem <span
        className='bg-yellow-400'>złotym</span> posiada Złotą Kartę i jest w grupie A, szkoły oznaczone
        kolorem <span
          className='bg-blue-600/50'>niebieskim</span> są w grupie A, natomiast oznaczone kolorem <span
          className='bg-green-600/50'>zielonym</span> są w grupie B</h5>
      <h5 className='mt-5 w-full text-center text-blue-950'><span className='text-destructive'>Uwaga!</span> W rankingu
        uwzględnione są tylko szkoły, które mają co najmniej 1 głos</h5>
      <h5 className='mt-5 w-full text-center text-blue-950 font-bold'>Wszystkim szkołą składamy
        serdeczne GRATULACJE i życzymy powdzenia w turnieju.</h5>
      <ResultsTableEtap2 schoolsTab={schools}></ResultsTableEtap2>
      <h2 className='mt-2 mb-7 font-bold text-2xl text-blue-950 sm:text-3xl lg:text-4xl'>Składy grup</h2>
      <div className='w-full flex gap-5 mb-5'>
        <GroupTable schools={schools.filter(school => school.grupa === "A")} grupa={"A"}/>
        <GroupTable schools={schools.filter(school => school.grupa === "B")} grupa={"B"}/>
      </div>
      <ColabSlider title='Sponsorzy' data={sponsorsList} orientation='horizontal'/>
      <ColabSlider title='Partnerzy' data={partnersList} orientation='horizontal'/>
    </MaxWidthWrapper>
  )
}

export default Results;