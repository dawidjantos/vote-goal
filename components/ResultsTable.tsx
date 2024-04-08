"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";


const ResultsTable = ({schoolsTab}: { schoolsTab: any }) => {
  const {isAuthenticated} = useKindeBrowserClient()
  return (
    <Table className='mt-5 mb-7'>
      <TableHeader>
        <TableRow className='hover:'>
          <TableHead className='text-xl text-blue-950 font-bold text-center'>Miejsce w rankingu</TableHead>
          <TableHead className='text-xl text-blue-950 font-bold text-center'>Nazwa szkoły</TableHead>
          {isAuthenticated ?
            <TableHead className='text-xl text-blue-950 font-bold text-center'>Liczba głosów</TableHead> : null}
        </TableRow>
      </TableHeader>
      <TableBody>
        {schoolsTab ?
          schoolsTab.map((school: any, index: number) => (
            index <= 7 ?
              <TableRow key={school.id} className='bg-green-600/50'>
                <TableCell className="font-medium text-blue-950 text-center text-lg">{index + 1}</TableCell>
                <TableCell className="font-medium text-blue-950 text-center text-lg">{school.szkola.name}</TableCell>
                {isAuthenticated ? <TableCell
                  className="font-medium text-blue-950 text-center text-lg">{school.liczba_glosow}</TableCell> : null}
              </TableRow>
              :
              <TableRow key={school.id} className='bg-destructive/50'>
                <TableCell className="font-medium text-blue-950 text-center text-lg">{index + 1}</TableCell>
                <TableCell className="font-medium text-blue-950 text-center text-lg">{school.szkola.name}</TableCell>
                {isAuthenticated ? <TableCell
                  className="font-medium text-blue-950 text-center text-lg">{school.liczba_glosow}</TableCell> : null}
              </TableRow>
          )) : ''}
      </TableBody>
    </Table>
  )
}

export default ResultsTable;
