"use server";

import {db} from "@/lib/db";
import {Etap1} from "@prisma/client";

export const fetchResults = async () => {
  try {
    const getEtap1: Array<Etap1> | null = await db.etap1.findMany({
      orderBy: [
        {
          liczba_glosow: 'desc',
        },
      ],
      include: {
        szkola: true
      }
    });

    if (getEtap1.length > 0) {
      return getEtap1;
    } else {
      return [];
    }
  } catch (e) {
    return null
  }
}