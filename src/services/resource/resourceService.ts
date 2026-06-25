import api from "../../api/axios";

import type { ApiResponse } from "../../types/api";

import type {
  Resource,
  CreateResourceRequest,
  UpdateResourceRequest,
} from "../../types/resource";

export async function getResources(
  journalId: string
): Promise<Resource[]> {

  const response =
    await api.get<ApiResponse<Resource[]>>(
      `/journals/${journalId}/resources`
    );

  return response.data.data;
}

export async function createResource(
  journalId: string,
  request: CreateResourceRequest
): Promise<Resource> {

  const response =
    await api.post<ApiResponse<Resource>>(
      `/journals/${journalId}/resources`,
      request
    );

  return response.data.data;
}

export async function updateResource(
  resourceId: string,
  request: UpdateResourceRequest
): Promise<Resource> {

  const response =
    await api.patch<ApiResponse<Resource>>(
      `/resources/${resourceId}`,
      request
    );

  return response.data.data;
}

export async function deleteResource(
  resourceId: string
): Promise<void> {

  await api.delete(
    `/resources/${resourceId}`
  );
}