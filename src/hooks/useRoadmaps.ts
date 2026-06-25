import { useQuery }
from "@tanstack/react-query";

import {
  getRoadmaps,
} from "../services/roadmap/roadmapService";

export function useRoadmaps() {

  return useQuery({

    queryKey: [
      "roadmaps",
    ],

    queryFn:
      getRoadmaps,
  });
}