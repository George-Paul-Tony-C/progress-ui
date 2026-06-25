import { useQuery } from "@tanstack/react-query";

import { getJournals } from "../services/journal/journalService";

export function useJournals(
  page = 0,
  size = 10
) {
  return useQuery({
    queryKey: [
      "journals",
      page,
      size,
    ],

    queryFn: () =>
      getJournals(
        page,
        size
      ),
  });
}