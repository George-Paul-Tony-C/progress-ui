import api from "../../api/axios";

import type { ApiResponse }
from "../../types/api";

import type { Attachment }
from "../../types/attachment";

export async function getAttachments(
  journalId: string
): Promise<Attachment[]> {

  const response =
    await api.get<ApiResponse<Attachment[]>>(
      `/journals/${journalId}/attachments`
    );

  return response.data.data;
}

export async function uploadAttachment(
  journalId: string,
  file: File
): Promise<Attachment> {

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await api.post<
      ApiResponse<Attachment>
    >(
      `/journals/${journalId}/attachments`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data.data;
}

export async function deleteAttachment(
  attachmentId: string
): Promise<void> {

  await api.delete(
    `/attachments/${attachmentId}`
  );
}