export type GoalStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ON_HOLD";

export interface Goal {

  id: string;

  title: string;

  description: string;

  targetDate: string;

  status: GoalStatus;

  progressPercentage: number;

  createdAt: string;

  updatedAt: string;
}

export interface GoalPage {

  content: Goal[];

  page: number;

  size: number;

  totalElements: number;

  totalPages: number;

  first: boolean;

  last: boolean;
}

export interface CreateGoalRequest {

  title: string;

  description?: string;

  targetDate?: string;

  status?: GoalStatus;

  progressPercentage?: number;
}

export interface UpdateGoalRequest {

  title?: string;

  description?: string;

  targetDate?: string;

  status?: GoalStatus;

  progressPercentage?: number;
}