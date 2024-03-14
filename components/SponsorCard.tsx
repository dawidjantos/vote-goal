"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import Image from "next/image";
import Link from "next/link";

const SponsorCard = ({img, title, link, width, height}: {
  img: string,
  title: string,
  link: string,
  width: number,
  height: number
}) => {
  return (
    <div>
      <Card className="border-none shadow-none">
        <CardContent className="flex flex-col items-center justify-center p-6 bg-blue-100 border-none">
          <Image src={img} alt={`${title}_img`} width={width} height={height}/>
          <Link href={link} className='w-full flex-col items-center justify-center'>
            <h2 className='font-bold text-lg text-blue-950 text-center pt-6 hover:text-blue-700'>{title}</h2>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default SponsorCard;