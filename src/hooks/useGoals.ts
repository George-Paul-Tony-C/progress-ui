import { useQuery }
from "@tanstack/react-query";

import {
  getGoals,
} from "../services/goal/goalService";

export function useGoals() {

  return useQuery({

    queryKey: [
      "goals",
    ],

    queryFn: () =>
      getGoals(),
  });
}