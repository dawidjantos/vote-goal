"use client";

import {Card, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
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
import {useEffect, useState} from "react";
import {vote} from "@/actions/vote";
import {toast} from "sonner"
import {useRouter} from 'next/navigation'
import SponsorCard from "@/components/SponsorCard";
import {Loader2} from "lucide-react"
import {GET_COLAB} from "@/lib/sponsors";
import {GET_SETTINGS} from "@/lib/settings";
import Link from "next/link";

const VotingList = ({schools, ip, etap, redirect}: { schools: any, ip: any, etap: 1 | 2, redirect: string }) => {
  const settings = GET_SETTINGS();
  const [open, setOpen] = useState(false);
  const [startVoting, setStartVoting] = useState(false);
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(new Set());
  const router = useRouter();

  const colabList = GET_COLAB().partners.concat(GET_COLAB().sponsors);

  const rand = Math.floor(Math.random() * colabList.length);
  let interval: any;

  useEffect(() => {
    interval = setInterval(() => setTime(new Date()), 1000);
  }, []);

  useEffect(() => {
    if (time <= settings.voting.etap2.start || time >= settings.voting.etap2.end) {
      setStartVoting(false);
    } else {
      clearInterval(interval);
      setStartVoting(true);
    }
  }, [time]);

  const onClick = (value: string, index: number) => {
    setLoading((prev) => new Set([prev, index]))
    vote(ip, parseInt(value), etap).then(r => {
      setLoading((prev) => {
        const updated = new Set(prev);
        updated.delete(index);
        return updated;
      })

      if (r.info == "error0") {
        toast.error("Brak możliwośći głosowania. ", {
          description: "Głosowanie zakończone",
        })
        if (etap === 1) {
          router.push('/etap1/results')
        }
        if (etap === 2) {
          router.push('/etap2/results')
        }
      }

      if (r.info == "error") {
        toast.error("Brak możliwośći głosowania. ", {
          description: "Można oddać głos po upływie 30 minut od poprzedniego głosowania",
        })
      }
      if (r.info == "error1") {
        toast.error("Brak możliwośći głosowania. ", {
          description: "Zostałeś zablokowany",
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
    router.push(redirect);
  }

  return (
    !startVoting ?
      <div className='flex w-full mt-2 mb-7 flex-col gap-5 items-center'>
        <p className='text-center mt-10 font-bold text-4xl text-destructive sm:text-5xl'>
          {
            time <= settings.voting.etap2.start ? "Głosowanie rozpocznie się o 12:00:00" : ""
          }
          {
            time >= settings.voting.etap2.end ? "Głosowanie zakończone" : ""
          }
        </p>
        {time >= settings.voting.etap2.end && etap === 2 ?
          <Link href='/etap2/results'><Button className='mt-7 w-fit'>Zobacz wyniki</Button></Link>
          :
          null
        }
      </div>
      :
      <div className='flex w-full mt-2 mb-7 flex-col gap-5'>
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
                img={colabList[rand].img}
                title={colabList[rand].title}
                link={colabList[rand].link}
                width={colabList[rand].width}
                height={colabList[rand].height}
                benefits={colabList[rand].benefits}
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