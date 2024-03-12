"use client";

import SponsorCard from "@/components/SponsorCard";
import {useRef} from "react";
import Autoplay from "embla-carousel-autoplay";

import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";

const Sponsors = () => {
  const sponsorsList = [
    {img: '/sponsors/1c.png', title: 'SYSTEMY ZABEZPIECZEŃ', desc: ''},
    {img: '/sponsors/2c.png', title: 'Reklama na monitorach LCD w komunikacji miejskiej', desc: ''},
    {img: '/sponsors/5c.png', title: 'Autoryzowany dealer Volvo', desc: ''},
    {
      img: '/sponsors/16c2.png',
      title: 'Firma Profix to wiodący krajowy generalny wykonawca obiektów przemysłowych.',
      desc: ''
    },
    {img: '/sponsors/9c.png', title: 'Klub piłkarski Wisła Kraków S.A.', desc: ''},
    {img: '/sponsors/11c.png', title: 'Centrum dystrybucji napoi i wód', desc: ''},
    {img: '/sponsors/10c.png', title: 'Piłkarska liga dla firm', desc: ''},
    {img: '/sponsors/13c.png', title: 'SYSTEMY ZABEZPIECZEŃ', desc: ''},
  ];

  const plugin = useRef(
    Autoplay({delay: 4000, stopOnInteraction: true})
  )
  return (
    <div className="flex flex-col items-center pt-20">
      <h1 className='mt-2 font-bold text-2xl text-blue-950'>Imprezę wspierają</h1>
      <div className="flex">
        {sponsorsList.map((item, index) => (
          <div className="p-1" key={index}>
            <Card className="bg-blue-400/75">
              <CardContent className="flex items-center justify-center p-6">
                <Image src={item.img} alt={`${item.title}_img`} width={300} height={300}/>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Sponsors;