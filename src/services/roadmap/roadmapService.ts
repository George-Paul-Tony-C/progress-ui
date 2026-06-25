import api from "../../api/axios";

import type { ApiResponse }
from "../../types/api";

import type {
  Roadmap,
  RoadmapPage,
  Milestone,
  CreateRoadmapRequest,
  UpdateRoadmapRequest,
  CreateMilestoneRequest,
  UpdateMilestoneRequest,
} from "../../types/roadmap";

export async function getRoadmaps()
: Promise<RoadmapPage> {

  const response =
    await api.get<
      ApiResponse<RoadmapPage>
    >(
      "/roadmaps"
    );

  return response.data.data;
}

export async function getRoadmap(
  roadmapId: string
): Promise<Roadmap> {

  const response =
    await api.get<
      ApiResponse<Roadmap>
    >(
      `/roadmaps/${roadmapId}`
    );

  return response.data.data;
}

export async function createRoadmap(
  request: CreateRoadmapRequest
): Promise<Roadmap> {

  const response =
    await api.post<
      ApiResponse<Roadmap>
    >(
      "/roadmaps",
      request
    );

  return response.data.data;
}

export async function updateRoadmap(
  roadmapId: string,
  request: UpdateRoadmapRequest
): Promise<Roadmap> {

  const response =
    await api.patch<
      ApiResponse<Roadmap>
    >(
      `/roadmaps/${roadmapId}`,
      request
    );

  return response.data.data;
}

export async function deleteRoadmap(
  roadmapId: string
): Promise<void> {

  await api.delete(
    `/roadmaps/${roadmapId}`
  );
}

export async function getMilestones(
  roadmapId: string
): Promise<Milestone[]> {

  const response =
    await api.get<
      ApiResponse<Milestone[]>
    >(
      `/roadmaps/${roadmapId}/milestones`
    );

  return response.data.data;
}

export async function createMilestone(
  roadmapId: string,
  request: CreateMilestoneRequest
): Promise<Milestone> {

  const response =
    await api.post<
      ApiResponse<Milestone>
    >(
      `/roadmaps/${roadmapId}/milestones`,
      request
    );

  return response.data.data;
}

export async function updateMilestone(
  milestoneId: string,
  request: UpdateMilestoneRequest
): Promise<Milestone> {

  const response =
    await api.patch<
      ApiResponse<Milestone>
    >(
      `/milestones/${milestoneId}`,
      request
    );

  return response.data.data;
}

export async function deleteMilestone(
  milestoneId: string
): Promise<void> {

  await api.delete(
    `/milestones/${milestoneId}`
  );
}