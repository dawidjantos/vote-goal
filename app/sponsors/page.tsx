"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {Card} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const SponsorsPage = () => {
  return (
    <MaxWidthWrapper className='bg-gray-200'>
      <div className="w-full flex flex-col">
        <h2 className='mt-10 mb-7 font-bold text-4xl text-blue-950 sm:text-5xl text-center'>Sponsorzy</h2>
        <div className='w-full grid gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
          <Card className='p-7 flex flex-col items-center justify-center basis-1/4'>
            <Link href='http://tprzybylski.pl/' target='_blank'>
              <Image src="/images/sponsors/1c.png" alt="img_przybylski" width={260} height={94}/>
            </Link>
            <Link href='http://tprzybylski.pl/' target='_blank'>
              <h2 className='text-md text-blue-950 text-center pt-6 font-bold hover:text-blue-600'>SYSTEMY
                ZABEZPIECZEŃ</h2>
            </Link>
          </Card>
          <Card className='p-7 flex flex-col items-center justify-center basis-1/4'>
            <Link href='http://www.dv-box.pl/' target='_blank'>
              <Image src="/images/sponsors/2c.png" alt="img_dvbox" width={240} height={85}/>
            </Link>
            <Link href='http://www.dv-box.pl/' target='_blank'>
              <h2 className='text-md text-blue-950 text-center pt-6 font-bold hover:text-blue-600'>Reklama na monitorach
                LCD w komunikacji
                miejskiej</h2>
            </Link>
          </Card>
          <Card className='p-7 flex flex-col items-center justify-center basis-1/4'>
            <Link href='https://wislakrakow.com/' target='_blank'>
              <Image src="/images/sponsors/9c.png" alt="img_wisla" width={117} height={150}/>
            </Link>
            <Link href='https://wislakrakow.com/' target='_blank'>
              <h2 className='text-md text-blue-950 text-center pt-6 font-bold hover:text-blue-600'>Klub piłkarski Wisła
                Kraków S.A.</h2>
            </Link>
          </Card>
          <Card className='p-7 flex flex-col items-center justify-center basis-1/4'>
            <Link href='http://www.biznesliga.com.pl' target='_blank'>
              <Image src="/images/sponsors/10c.png" alt="img_biznesliga" width={300} height={100}/>
            </Link>
            <Link href='http://www.biznesliga.com.pl' target='_blank'>
              <h2 className='text-md text-blue-950 text-center pt-6 font-bold hover:text-blue-600'>Piłkarska liga dla
                firm</h2>
            </Link>
          </Card>
          <Card className='p-7 flex flex-col items-center justify-center basis-1/4'>
            <Link href='https://tanszemedia.pl/' target='_blank'>
              <Image src="/images/sponsors/13c.png" alt="img_tanszemedia" width={300} height={200}/>
            </Link>
            <Link href='https://tanszemedia.pl/' target='_blank'>
              <h2 className='text-md text-blue-950 text-center pt-6 font-bold hover:text-blue-600'>Tańsze Media</h2>
            </Link>
          </Card>
        </div>
        <h2 className='mt-10 mb-5 font-bold text-4xl text-blue-950 sm:text-5xl text-center'>Partnerzy</h2>
        <div className='w-full grid gap-5 mb-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2'>
          <Card className='p-7 flex flex-col items-center justify-center basis-1/2'>
            <Link href='https://booksy.com/pl-pl/192329_peaky-blades-barber-shop-zablocie_barber-shop_8820_krakow'
                  target='_blank'>
              <Image src="/images/sponsors/11c.png" alt="img_peakly" width={170} height={163}/>
            </Link>
            <Link href='https://booksy.com/pl-pl/192329_peaky-blades-barber-shop-zablocie_barber-shop_8820_krakow'
                  target='_blank'>
              <h2 className='text-md text-blue-950 text-center pt-6 font-bold hover:text-blue-600'>Peaky Blades
                Barbershop</h2>
            </Link>
            <div className='w-full flex flex-col'>
              <p className='text-md text-blue-950 pt-6 text-center'>Na hasło <span
                className='font-bold'>BEZPIECZNASZKOLAZAGOLA</span> rabat 20%</p>
            </div>
          </Card>
          <Card className='p-7 flex flex-col items-center justify-center basis-1/2'>
            <Link href='https://www.krakowskapalarniakawy.pl'
                  target='_blank'>
              <Image src="/images/sponsors/12c.png" alt="img_kpk" width={200} height={200}/>
            </Link>
            <Link href='https://www.krakowskapalarniakawy.pl'
                  target='_blank'>
              <h2 className='text-md text-blue-950 text-center pt-6 font-bold hover:text-blue-600'>Krakowska Palarnia
                Kawy</h2>
            </Link>
            <div className='w-full flex flex-col'>
              <p className='text-md text-blue-950 pt-6 text-center'>Z kodem <span
                className='font-bold'>iaPiBP20</span> 20% rabatu na zakupy w sklepie.
                Kupon nie działa na produktu już objęte promocją.</p>
            </div>
          </Card>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default SponsorsPage;
