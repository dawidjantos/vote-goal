"use client";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {vote} from "@/actions/vote";
import {toast} from "sonner"
import {useRouter} from 'next/navigation'
import SponsorCard from "@/components/SponsorCard";
import {Loader2} from "lucide-react"

const VotingList = ({schools, ip}: { schools: any, ip: any }) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(new Set());
  const router = useRouter();

  const sponsorsList = [
    {
      img: '/images/sponsors/1c.png',
      title: 'SYSTEMY ZABEZPIECZEŃ',
      desc: '',
      link: 'http://tprzybylski.pl',
      width: 260,
      height: 94
    },
    {
      img: '/images/sponsors/2c.png',
      title: 'Reklama na monitorach LCD w komunikacji miejskiej',
      desc: '',
      link: 'http://www.dv-box.pl/',
      width: 240, height: 85
    },
    {
      img: '/images/sponsors/9c.png',
      title: 'Klub piłkarski Wisła Kraków S.A.',
      desc: '',
      link: 'https://wislakrakow.com/',
      width: 117, height: 150
    },
    {
      img: '/images/sponsors/10c.png',
      title: 'Piłkarska liga dla firm',
      desc: '',
      link: 'http://www.biznesliga.com.pl',
      width: 300,
      height: 100
    },
  ];

  const rand = Math.floor(Math.random() * sponsorsList.length);

  const onClick = (value: string, index: number) => {
    setLoading((prev) => new Set([prev, index]))
    vote(ip, parseInt(value)).then(r => {
      setLoading((prev) => {
        const updated = new Set(prev);
        updated.delete(index);
        return updated;
      })

      if (r.info == "error") {
        toast.error("Brak możliwośći głosowania. ", {
          description: "Można oddać głos po upływie 30 minut od poprzedniego głosowania",
        })
      }
      if (r.info == "error2") {
        toast.error("Błąd głosowania. ", {
          description: "Proszę spróbować później",
        })
      }
      if (r.info == "success") {
        setOpen(prevState => !prevState);
      }
    });
  };

  const closeDialog = () => {
    setOpen(prevState => !prevState);
    router.push('http://tprzybylski.pl/');
  }

  return (
    <div className='flex w-full mt-20 flex-col gap-5'>
      {schools ?
        schools.map((school: any, index: number) => {
          return (
            <Card className='flex w-full items-center justify-between bg-blue-100/80' key={index}>
              <CardHeader>
                <CardTitle>{school.name}</CardTitle>
              </CardHeader>
              <CardFooter className='flex pt-6 items-center justify-between'>
                <Button className='w-[90px]' onClick={() => onClick(school.id, index)}
                        disabled={loading.has(index)}>{loading.has(index) ?
                  <Loader2 className="mr-2 h-5 w-5 animate-spin"/> : 'GŁOSUJ'}</Button>
              </CardFooter>
            </Card>
          )
        }) : ''
      }
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className='bg-blue-100 border-blue-900 sm:text-center'>
          <AlertDialogHeader className='sm:text-center'>
            <AlertDialogTitle className='text-2xl text-blue-950'>Dziękujemy za oddany głos !!!</AlertDialogTitle>
            <AlertDialogDescription className='text-lg text-gray-700'>
              Sponsorem VIII edycji turnieju piłkarskiego &quot;Bezpieczna szkoła za gola&quot; jest:
            </AlertDialogDescription>
            <SponsorCard
              img={sponsorsList[rand].img}
              title={sponsorsList[rand].title}
              link={sponsorsList[rand].link}
              width={sponsorsList[rand].width}
              height={sponsorsList[rand].height}
            />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => closeDialog()}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default VotingList