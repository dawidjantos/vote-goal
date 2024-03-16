import {cache} from 'react'
import {fetchResults} from "@/actions/fetch-results";

export const getSchoolsResult = cache(async () => {
  const schoolsResult = await fetchResults();

  return schoolsResult
})