"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const ResultsTableEtap2 = ({schoolsTab}: { schoolsTab: any }) => {
  return (
    <Table className='mt-5 mb-7'>
      <TableHeader>
        <TableRow className='hover:'>
          <TableHead className='text-xl text-blue-950 font-bold text-center'>Miejsce w rankingu</TableHead>
          <TableHead className='text-xl text-blue-950 font-bold text-center'>Nazwa szkoły</TableHead>
          <TableHead className='text-xl text-blue-950 font-bold text-center'>Liczba głosów</TableHead>
          <TableHead className='text-xl text-blue-950 font-bold text-center'>Grupa</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schoolsTab ?
          schoolsTab.map((school: any, index: number) => {
            if (school.gold_card===true){
              return (
                <TableRow key={school.id} className='bg-yellow-400'>
                  <TableCell className="font-medium text-blue-950 text-center text-lg">{index + 1}</TableCell>
                  <TableCell className="font-medium text-blue-950 text-center text-lg">{school.szkola.name} - Złota Karta </TableCell>
                  <TableCell className="font-medium text-blue-950 text-center text-lg">{school.liczba_glosow}</TableCell>
                  <TableCell className="font-medium text-blue-950 text-center text-lg">{school.grupa}</TableCell>
                </TableRow>
              )
            } else if (school.grupa==="A"){
              return (
                <TableRow key={school.id} className='bg-blue-600/50'>
                  <TableCell className="font-medium text-blue-950 text-center text-lg">{index + 1}</TableCell>
                  <TableCell className="font-medium text-blue-950 text-center text-lg">{school.szkola.name}</TableCell>
                  <TableCell className="font-medium text-blue-950 text-center text-lg">{school.liczba_glosow}</TableCell>
                  <TableCell className="font-medium text-blue-950 text-center text-lg">{school.grupa}</TableCell>
                </TableRow>
              )
            }
            else if (school.grupa==="B"){
              return (
                <TableRow key={school.id} className='bg-green-600/50'>
                  <TableCell className="font-medium text-blue-950 text-center text-lg">{index + 1}</TableCell>
                  <TableCell className="font-medium text-blue-950 text-center text-lg">{school.szkola.name}</TableCell>
                  <TableCell className="font-medium text-blue-950 text-center text-lg">{school.liczba_glosow}</TableCell>
                  <TableCell className="font-medium text-blue-950 text-center text-lg">{school.grupa}</TableCell>
                </TableRow>
              )
            }
          }) : ''}
      </TableBody>
    </Table>
  )
}

export default ResultsTableEtap2;
