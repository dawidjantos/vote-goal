"use server";

import {db} from "@/lib/db";
import {Logger} from "next-axiom";

const log = new Logger();


export const fetchSchoolsEtap1 = async () => {
  try {
    const schools = await db.schools.findMany({
      where: {
        voting_etap1: true
      }
    });

    return schools
  } catch (e) {
    log.error("fetchSchoolsEtap1",{error: e})
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
    log.error("fetchSchoolsEtap2",{error: e})
    return null;
  }

}