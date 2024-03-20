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
import {GET_COLAB} from "@/lib/sponsors";

const VotingList = ({schools, ip, etap, redirect}: { schools: any, ip: any, etap: 1|2 , redirect: string }) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(new Set());
  const router = useRouter();

  const colabList = GET_COLAB().partners.concat(GET_COLAB().sponsors);

  const rand = Math.floor(Math.random() * colabList.length);

  const onClick = (value: string, index: number) => {
    setLoading((prev) => new Set([prev, index]))
    vote(ip, parseInt(value), etap).then(r => {
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
    router.push(redirect);
  }

  return (
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