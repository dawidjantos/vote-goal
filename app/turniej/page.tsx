import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {meczeActions} from "@/actions/mecze-actions";
import MatchTable from "@/components/MatchTable";

const TurniejPage = async () => {
  const grupaA = await meczeActions({faza: "grupa", grupa: "A"});
  const grupaB = await meczeActions({faza: "grupa", grupa: "B"});

  return (
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-10 flex flex-col items-center justify-center'>
      <h2 className='mt-2 font-bold text-4xl text-blue-950 sm:text-5xl'>Turniej - rozgrywki</h2>
      <h3 className='mt-10 font-bold text-xl text-blue-950 pb-2'>Faza grupowa</h3>
      <h3 className='mt-10 w-full text-center font-bold text-xl text-blue-950 pb-2 pt-2 bg-blue-600/50'>Grupa A</h3>
      <MatchTable mecze={grupaA} grupa="A"/>
      <h3 className='mt-10 w-full text-center font-bold text-xl text-green-950 pb-2 pt-2 bg-green-600/50'>Grupa B</h3>
      <MatchTable mecze={grupaB} grupa="B"/>
    </MaxWidthWrapper>
  );
};

export default TurniejPage;
