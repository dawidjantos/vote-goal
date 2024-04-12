"use client";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {Button} from "@/components/ui/button";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useState} from "react";
import {saveMatchResultAction} from "@/actions/mecze-actions";
import {toast} from "sonner";


const MatchTable = ({mecze, grupa}: { mecze: Array<any>, grupa: string }) => {
  const {isAuthenticated} = useKindeBrowserClient();
  const [open, setOpen] = useState(false);
  const [matchDetails, setMatchDetails] = useState(mecze[0]);
  const [wynikSzkola1, setWynikSzkola1] = useState(Number);
  const [wynikSzkola2, setWynikSzkola2] = useState(Number);
  const editMatchResultDialog = (match: any) => {
    setMatchDetails(match);
    setOpen(prevState => !prevState)
  }

  const saveMatchResult = () => {
    saveMatchResultAction({
      id: matchDetails.id,
      wynik_szkola1: wynikSzkola1,
      wynik_szkola2: wynikSzkola2,
    }).then(res => {
      if (res.info === "success") {
        setOpen(prevState => !prevState);
        toast.success("Zapisano wynik meczu")
      } else {
        setOpen(prevState => !prevState);
        toast.error("Nie udało się zapisać wyniku meczu");
      }
    })
  }

  return (
    <>
      <Table>
        <TableHeader>
          {grupa === "A" ?
            <TableRow className='bg-blue-600/50'>
              <TableHead className='text-xl text-blue-950 font-bold text-center'>Lp.</TableHead>
              <TableHead className='text-xl text-blue-950 font-bold text-center'>Mecz</TableHead>
              <TableHead className='text-xl text-blue-950 font-bold text-center'>Data meczu</TableHead>
              <TableHead className='text-xl text-blue-950 font-bold text-center'>Wynik</TableHead>
              {isAuthenticated ?
                <TableHead className='text-xl text-blue-950 font-bold text-center'>Akcja</TableHead> : null}
            </TableRow>
            : grupa === "B" ?
              <TableRow className='bg-green-600/50'>
                <TableHead className='text-xl text-green-950 font-bold text-center'>Lp.</TableHead>
                <TableHead className='text-xl text-green-950 font-bold text-center'>Mecz</TableHead>
                <TableHead className='text-xl text-green-950 font-bold text-center'>Data meczu</TableHead>
                <TableHead className='text-xl text-green-950 font-bold text-center'>Wynik</TableHead>
                {isAuthenticated ?
                  <TableHead className='text-xl text-green-950 font-bold text-center'>Akcja</TableHead> : null}
              </TableRow>
              : null
          }
        </TableHeader>
        <TableBody>
          {mecze ?
            mecze.map((mecz: any, index: number) => {
              if (grupa === "A")
                return (
                  <TableRow key={mecz.id} className='bg-blue-600/30'>
                    <TableCell className="font-medium text-blue-950 text-center text-lg">{index + 1}</TableCell>
                    <TableCell
                      className="font-medium text-blue-950 text-center text-lg">{mecz.mecz_id_szkola1.skrot} - {mecz.mecz_id_szkola2.skrot}
                    </TableCell>
                    <TableCell
                      className="font-medium text-blue-950 text-center text-lg">{mecz.data_meczu ? mecz.data_meczu: '-'}
                    </TableCell>
                    <TableCell
                      className="text-blue-950 text-center text-lg font-bold">
                      {mecz.wynik_szkola1 === null || mecz.wynik_szkola2 === null ?
                        "-"
                        :
                        `${mecz.wynik_szkola1} : ${mecz.wynik_szkola2}`
                      }
                    </TableCell>
                    {isAuthenticated ?
                      <TableCell
                        className="flex flex-col gap-y-3 text-blue-950 text-center text-lg font-bold">
                        <Button onClick={() => editMatchResultDialog(mecz)}>Edytuj wynik</Button>
                      </TableCell>
                      : null}
                  </TableRow>
                )
              if (grupa === "B")
                return (
                  <TableRow key={mecz.id} className='bg-green-600/30'>
                    <TableCell className="font-medium text-green-950 text-center text-lg">{index + 1}</TableCell>
                    <TableCell
                      className="font-medium text-green-950 text-center text-lg">{mecz.mecz_id_szkola1.skrot} - {mecz.mecz_id_szkola2.skrot}
                    </TableCell>
                    <TableCell
                      className="font-medium text-green-950 text-center text-lg">{mecz.data_meczu ? mecz.data_meczu: '-'}
                    </TableCell>
                    <TableCell
                      className="text-green-950 text-center text-lg font-bold">
                      {mecz.wynik_szkola1 === null || mecz.wynik_szkola2 === null ?
                        "-"
                        :
                        `${mecz.wynik_szkola1} : ${mecz.wynik_szkola2}`
                      }
                    </TableCell>
                    {isAuthenticated ?
                      <TableCell
                        className="flex flex-col gap-y-3 text-green-950 text-center text-lg font-bold">
                        <Button variant='green' onClick={() => editMatchResultDialog(mecz)}>Edytuj wynik</Button>
                      </TableCell>
                      : null}
                  </TableRow>
                )
            }) : ''}
        </TableBody>
      </Table>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edytuj wynik meczu</DialogTitle>
            <DialogDescription>
              Wprowadź poprawny wynik meczu i zatwierdź przyciskiem Zapisz
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="szkola1" className="text-right">
                {matchDetails ? matchDetails.mecz_id_szkola1.skrot : 'Szkola1'}
              </Label>
              <Input
                type='number'
                id="szkola1"
                className="col-span-3"
                onChange={(e) => setWynikSzkola1(parseInt(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="szkola2" className="text-right">
                {matchDetails ? matchDetails.mecz_id_szkola2.skrot : 'Szkola2'}
              </Label>
              <Input
                type='number'
                id="szkola2"
                className="col-span-3"
                onChange={(e) => setWynikSzkola2(parseInt(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Anuluj
              </Button>
            </DialogClose>
            <Button type="submit" onClick={() => saveMatchResult()}>Zapisz</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MatchTable;