import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav
      className='h-28 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-blue-400/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-28 gap-x-20 items-center justify-items-start border-b border-zinc-200'>
          <Link href="/" className='z-40 font-semibold hidden sm:flex'>
            <Image src="/images/logo_bezp-szkola.png" alt='logo' height={110} width={190}/>
          </Link>
          <h1 className='max-w-5xl text-3xl font-bold text-blue-950 md:text-5xl lg:text-5xl'>Platforma do głosowania</h1>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;