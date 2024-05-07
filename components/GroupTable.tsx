"use client"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const GroupTable = ({schools, grupa}: { schools: any, grupa: string }) => {
  return (
    <div className='w-full flex flex-col'>
      <h2 className={`mt-2 mb-7 font-bold text-xl ${grupa === "A" ? 'text-blue-950' :'text-green-950'} sm:text-2xl lg:text-3xl text-center`}>Grupa {grupa}</h2>
      <Table>
        <TableHeader>
          <TableRow className={grupa === "A" ? 'bg-blue-600/50' : 'bg-green-600/50'}>
            <TableHead
              className={`text-xl ${grupa === "A" ? 'text-blue-950' : 'text-green-950'} font-bold text-center`}>Lp.</TableHead>
            <TableHead
              className={`text-xl ${grupa === "A" ? 'text-blue-950' : 'text-green-950'} font-bold text-center`}>Nazwa
              szkoły</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schools ?
            schools.map((school: any, index: number) => {
              return (
                <TableRow key={school.id}
                          className={grupa === "A" ? school.gold_card ? 'bg-yellow-400' : 'bg-blue-600/50' : 'bg-green-600/50'}>
                  <TableCell
                    className={`font-medium ${grupa === "A" ? school.gold_card ? 'text-yellow-900' : 'text-blue-950' : 'text-green-950'} text-center text-lg`}>{index + 1}</TableCell>
                  <TableCell
                    className={`font-medium ${grupa === "A" ? school.gold_card ? 'text-yellow-900' : 'text-blue-950' : 'text-green-950'} text-center text-lg`}>{school.szkola.name}</TableCell>
                </TableRow>
              )
            }) : ''}
        </TableBody>
      </Table>
    </div>
  )
}

export default GroupTable;