import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Footer = () => {
  return (
    <footer className='absolute inset-x-0 bottom-0 h-14 z-30 w-full border-t border-gray-200 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='h-14 flex items-center justify-center border-t border-zinc-200'>
          &copy; Przybylski Security Systems Sp. z o.o.
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;