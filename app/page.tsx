import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-10 flex flex-col items-center justify-center'>
      <div className='w-full flex justify-center gap-x-10'>
        <Link href='/etap1'><Button>Głosowanie ETAP 1</Button></Link>
        <Link href='/etap1/preview'><Button>Podgląd wyników ETAP 1</Button></Link>
        <Link href='/sponsors'><Button>Sponsorzy</Button></Link>
      </div>
    </MaxWidthWrapper>
  );
}
export default Home;