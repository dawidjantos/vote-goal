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
import {saveMatchDateAction, saveMatchResultAction} from "@/actions/mecze-actions";
import {toast} from "sonner";


const MatchTable = ({mecze, grupa}: { mecze: Array<any>, grupa: string }) => {
  const {isAuthenticated} = useKindeBrowserClient();
  const [openResultDialog, setOpenResultDialog] = useState(false);
  const [openDateDialog, setOpenDateDialog] = useState(false);
  const [matchDetails, setMatchDetails] = useState(mecze[0]);
  const [matchDate, setMatchDate] = useState(mecze[0]);
  const [wynikSzkola1, setWynikSzkola1] = useState(Number);
  const [wynikSzkola2, setWynikSzkola2] = useState(Number);
  const [date, setDate] = useState(Date);

  const editMatchResultDialog = (match: any) => {
    setMatchDetails(match);
    setOpenResultDialog(prevState => !prevState)
  }

  const editMatchDateDialog = (match: any) => {
    setMatchDate(match);
    setOpenDateDialog(prevState => !prevState)
  }

  const saveMatchResult = () => {
    saveMatchResultAction({
      id: matchDetails.id,
      wynik_szkola1: wynikSzkola1,
      wynik_szkola2: wynikSzkola2,
    }).then(res => {
      if (res.info === "success") {
        setOpenResultDialog(prevState => !prevState);
        toast.success("Zapisano wynik meczu")
      } else {
        setOpenResultDialog(prevState => !prevState);
        toast.error("Nie udało się zapisać wyniku meczu");
      }
    })
  }

  const saveMatchDate = () => {
    saveMatchDateAction({
      id: matchDate.id,
      date: new Date(date)
    }).then(res => {
      if (res.info === "success") {
        setOpenDateDialog(prevState => !prevState);
        toast.success("Zapisano datę meczu")
      } else {
        setOpenDateDialog(prevState => !prevState);
        toast.error("Nie udało się zapisać daty meczu");
      }
    })
  }

  return (
    <>
      <Table className='mb-7'>
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
              return (
                <TableRow key={mecz.id}
                          className={mecz.wynik_szkola1 !== null ? grupa === "A" ? 'bg-blue-600/30' : 'bg-green-600/30' : grupa === "A" ? 'bg-blue-600/20' : 'bg-green-600/20'}>
                  <TableCell
                    className={`font-medium ${grupa === "A" ? 'text-blue-950' : 'text-green-950'} text-center text-lg`}>{index + 1}</TableCell>
                  <TableCell
                    className={`font-medium ${grupa === "A" ? 'text-blue-950' : 'text-green-950'} text-center text-lg`}>{mecz.mecz_id_szkola1.skrot} - {mecz.mecz_id_szkola2.skrot}
                  </TableCell>
                  <TableCell
                    className={`font-medium ${grupa === "A" ? 'text-blue-950' : 'text-green-950'} text-center text-lg`}>{mecz.data_meczu ? `${mecz.data_meczu.toLocaleDateString()} ${mecz.data_meczu.toLocaleTimeString()}` : '-'}
                  </TableCell>
                  <TableCell
                    className={`font-bold ${grupa === "A" ? 'text-blue-950' : 'text-green-950'} text-center text-lg`}>
                    {mecz.wynik_szkola1 === null || mecz.wynik_szkola2 === null ?
                      "-"
                      :
                      `${mecz.wynik_szkola1} : ${mecz.wynik_szkola2}`
                    }
                  </TableCell>
                  {isAuthenticated ?
                    <TableCell
                      className="flex flex-col gap-y-3 text-blue-950 text-center text-lg font-bold">
                      <Button variant={grupa === "A" ? 'default' : 'green'} onClick={() => editMatchResultDialog(mecz)}>Edytuj
                        wynik</Button>
                      <Button variant={grupa === "A" ? 'default' : 'green'} onClick={() => editMatchDateDialog(mecz)}>Edytuj
                        datę</Button>
                    </TableCell>
                    : null}
                </TableRow>
              )
            }) : ''}
        </TableBody>
      </Table>
      <Dialog open={openResultDialog} onOpenChange={setOpenResultDialog}>
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
      <Dialog open={openDateDialog} onOpenChange={setOpenDateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edytuj datę meczu</DialogTitle>
            <DialogDescription>
              Wprowadź datę meczu i zatwierdź przyciskiem Zapisz
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="date_metch" className="text-center">
                {matchDate ? matchDate.mecz_id_szkola1.skrot + " - " + matchDate.mecz_id_szkola2.skrot : null}
              </Label>
              <Input
                type='datetime-local'
                id="date_metch"
                className="col-span-3 text-center grid"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Anuluj
              </Button>
            </DialogClose>
            <Button type="submit" onClick={() => saveMatchDate()}>Zapisz</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MatchTable;