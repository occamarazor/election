export const electionRequestInfoCandidateAdapter = (electionCandidate) =>
  Object.entries(electionCandidate)
    .filter(([key]) => isNaN(+key))
    .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});
