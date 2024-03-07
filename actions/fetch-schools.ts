"use server";

import {db} from "@/lib/db";

export const fetchSchools = async () => {
  try {
    const schools = await db.schools.findMany();

    return schools
  } catch (e) {
    return null;
  }

}