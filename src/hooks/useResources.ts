import { useQuery } from "@tanstack/react-query";

import {
  getResources,
} from "../services/resource/resourceService";

export function useResources(
  journalId: string
) {

  return useQuery({

    queryKey: [
      "resources",
      journalId,
    ],

    queryFn: () =>
      getResources(
        journalId
      ),

    enabled:
      !!journalId,
  });
}