import api from "../../api/axios";

import type { ApiResponse } from "../../types/api";

import type {
  Journal,
  JournalPage,
  CreateJournalRequest,
  UpdateJournalRequest,
} from "../../types/journal";

export async function getJournals(
  page = 0,
  size = 10
): Promise<JournalPage> {

  const response =
    await api.get<ApiResponse<JournalPage>>(
      `/journals?page=${page}&size=${size}`
    );

  return response.data.data;
}

export async function getJournal(
  journalId: string
): Promise<Journal> {

  const response =
    await api.get<ApiResponse<Journal>>(
      `/journals/${journalId}`
    );

  return response.data.data;
}

export async function createJournal(
  request: CreateJournalRequest
): Promise<Journal> {

  const response =
    await api.post<ApiResponse<Journal>>(
      "/journals",
      request
    );

  return response.data.data;
}

export async function updateJournal(
  journalId: string,
  request: UpdateJournalRequest
): Promise<Journal> {

  const response =
    await api.patch<ApiResponse<Journal>>(
      `/journals/${journalId}`,
      request
    );

  return response.data.data;
}

export async function deleteJournal(
  journalId: string
): Promise<void> {

  await api.delete(
    `/journals/${journalId}`
  );
}