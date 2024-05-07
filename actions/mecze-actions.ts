"use server";

import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";

export const meczeActions = async ({faza, grupa}: { faza: string, grupa: string }) => {
  const mecze = await db.mecze.findMany({
      orderBy: [
        {
          id: "asc"
        }
      ],
      where: {
        faza: faza,
        grupa: grupa
      },
      include: {
        mecz_id_szkola1: true,
        mecz_id_szkola2:
          true
      }
    })
  ;

  return mecze;

}

export const saveMatchResultAction = async ({id, wynik_szkola1, wynik_szkola2}: {
  id: number,
  wynik_szkola1: number,
  wynik_szkola2: number
}) => {
  try {
    const res = await db.mecze.update({
      where: {
        id: id
      },
      data: {
        wynik_szkola1: wynik_szkola1,
        wynik_szkola2: wynik_szkola2
      }
    });
    revalidatePath('/turniej')
    return {info: "success"}
  } catch (e) {
    return {info: "error"}
  }
}

export const saveMatchDateAction = async ({id, date}: {
  id: number,
  date: Date
}) => {
  try {
    const res = await db.mecze.update({
      where: {
        id: id
      },
      data: {
        data_meczu: date
      }
    });
    revalidatePath('/turniej')
    return {info: "success"}
  } catch (e) {
    return {info: "error"}
  }
}