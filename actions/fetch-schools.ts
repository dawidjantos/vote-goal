"use server";

import {db} from "@/lib/db";


export const fetchSchoolsEtap1 = async () => {
  try {
    const schools = await db.schools.findMany();

    return schools
  } catch (e) {
    console.log(e)
    return null;
  }
}

export const fetchSchoolsEtap2 = async () => {
  try {
    const schools = await db.schools.findMany({
      where: {
        voting_etap2: true
      }
    });

    return schools
  } catch (e) {
    console.log(e)
    return null;
  }

}