import {cache} from 'react'
import {fetchResults} from "@/actions/fetch-results";

export const getSchoolsResult = cache(async ({etap}: {etap:1|2}) => {
  const schoolsResult = await fetchResults({etap});

  return schoolsResult
})