"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import Image from "next/image";
import Link from "next/link";

const SponsorCard = ({img, title, desc, link}: { img: string, title: string, desc: string, link: string }) => {
  return (
    <div className="p-1">
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Link href={link}><Image src={img} alt={`${title}_img`} width={600} height={600}/></Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default SponsorCard;