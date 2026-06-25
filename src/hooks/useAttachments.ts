import { useQuery }
from "@tanstack/react-query";

import {
  getAttachments,
}
from "../services/attachment/attachmentService";

export function useAttachments(
  journalId: string
) {

  return useQuery({

    queryKey: [
      "attachments",
      journalId,
    ],

    queryFn: () =>
      getAttachments(
        journalId
      ),

    enabled:
      !!journalId,
  });
}