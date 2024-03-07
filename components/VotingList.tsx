"use client";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import {useEffect} from "react";
import {vote} from "@/actions/vote";
import {toast} from "sonner"


const VotingList = ({schools, ip}: { schools: any, ip: any }) => {
  const onClick = (value: string) => {
    vote(ip, parseInt(value)).then(r => {
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
        toast.success("Głos oddany poprawnie", {
          description: "Dziękujemy!",
        })
      }

    })

  }

  return (
    <div className='flex w-full mt-20 flex-col gap-5'>
      {schools ?
        schools.map((school: any) => {
          return (
            <Card className='flex w-full items-center justify-between bg-blue-50/50' key={school.id}>
              <CardHeader>
                <CardTitle>{school.name}</CardTitle>
              </CardHeader>
              <CardFooter className='flex pt-6 items-center justify-between'>
                <Button onClick={() => onClick(school.id)}>GŁOSUJ</Button>
              </CardFooter>
            </Card>
          )
        }) : ''
      }
    </div>
  );
};

export default VotingList