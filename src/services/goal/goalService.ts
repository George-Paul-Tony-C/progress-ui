import api from "../../api/axios";

import type { ApiResponse }
from "../../types/api";

import type {
  Goal,
  GoalPage,
  CreateGoalRequest,
  UpdateGoalRequest,
  GoalStatus,
} from "../../types/goal";

export async function getGoals(
  page = 0,
  size = 10,
  status?: GoalStatus
): Promise<GoalPage> {

  const response =
    await api.get<
      ApiResponse<GoalPage>
    >(
      "/goals",
      {
        params: {
          page,
          size,
          status,
        },
      }
    );

  return response.data.data;
}

export async function getGoal(
  goalId: string
): Promise<Goal> {

  const response =
    await api.get<
      ApiResponse<Goal>
    >(
      `/goals/${goalId}`
    );

  return response.data.data;
}

export async function createGoal(
  request: CreateGoalRequest
): Promise<Goal> {

  const response =
    await api.post<
      ApiResponse<Goal>
    >(
      "/goals",
      request
    );

  return response.data.data;
}

export async function updateGoal(
  goalId: string,
  request: UpdateGoalRequest
): Promise<Goal> {

  const response =
    await api.patch<
      ApiResponse<Goal>
    >(
      `/goals/${goalId}`,
      request
    );

  return response.data.data;
}

export async function deleteGoal(
  goalId: string
): Promise<void> {

  await api.delete(
    `/goals/${goalId}`
  );
}