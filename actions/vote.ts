"use server";

import {db} from "@/lib/db"

export const vote = async (ip: string, schoolId: number) => {
  const isPossibile = await isPossibileToVote(ip);

  if (!isPossibile) {
    return {info: "error"}
  }

  const isVoted = voting(schoolId);

  if (isVoted === null) {
    return {info: "error2"}
  }

  const findIp = await db.ips.findMany({
    where: {
      ip: ip
    }
  });

  if (findIp.length > 0) {
    await db.ips.updateMany({
      where: {
        ip: ip
      },
      data: {
        data_glosowania: new Date().toISOString(),
      }
    })
  } else {
    addIp(ip);
  }

  return {info: "success"};
}

const isPossibileToVote = async (ip: string) => {
  const result = await db.ips.findMany({
    where: {
      ip: ip
    }
  });

  const d = new Date();
  const newTime = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - 30, d.getSeconds(), d.getMilliseconds());

  return !(result.length > 0 && (result[0].data_glosowania > newTime));

}

const addIp = async (ip: any) => {
  const result = await db.ips.create({
    data: {
      ip,
      data_glosowania: new Date().toISOString(),
    }
  });

  return result;

}

const get_school_votes = async (school_id: number) => {
  const votes = await db.etap1.findMany({
    where: {
      id_szkoly: school_id
    }
  });

  return votes;
}

const voting = async (school_id: number) => {
  const school_votes = await get_school_votes(school_id);

  if (school_votes.length == 0) {
    try {
      const res = await db.etap1.create({
        data: {
          id_szkoly: school_id,
          liczba_glosow: 1
        }
      });

      return res;
    } catch (e) {
      return null;
    }

  } else {
    try {
      const res = await db.etap1.update({
        where: {
          id_szkoly: school_id,
        },
        data: {
          id_szkoly: school_id,
          liczba_glosow: {
            increment: 1,
          }
        }
      });

      return res;
    } catch (e) {
      return null;
    }
  }
}





