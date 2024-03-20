"use server";

import {db} from "@/lib/db";
import {Prisma} from "@prisma/client";

const schoolEtap1: Prisma.Etap1Include = {
  szkola: true,
}

const schoolEtap2: Prisma.Etap2Include = {
  szkola: true,
}

export const fetchResults = async ({etap}: { etap: 1 | 2 }) => {
  if (etap === 1) {
    const getEtap1 = await db.etap1.findMany({
      orderBy: [
        {
          liczba_glosow: 'desc',
        },
      ],
      include: schoolEtap1
    });

    if (getEtap1.length > 0) {
      return Prisma.validator<typeof getEtap1>()(getEtap1);
    } else {
      return [];
    }
  } else if (etap === 2) {
    const getEtap2= await db.etap2.findMany({
      orderBy: [
        {
          liczba_glosow: 'desc',
        },
      ],
      include: schoolEtap2
    });

    if (getEtap2.length > 0) {
      return Prisma.validator<typeof getEtap2>()(getEtap2);
    } else {
      return [];
    }
  }

}
