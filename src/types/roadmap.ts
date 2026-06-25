export type RoadmapStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ON_HOLD";

export interface Roadmap {

  id: string;

  title: string;

  description: string;

  targetDate: string;

  status: RoadmapStatus;

  totalMilestones: number;

  completedMilestones: number;

  createdAt: string;

  updatedAt: string;
}

export interface Milestone {

  id: string;

  title: string;

  description: string;

  completed: boolean;

  orderNumber: number;

  createdAt: string;

  updatedAt: string;
}

export interface RoadmapPage {

  content: Roadmap[];

  page: number;

  size: number;

  totalElements: number;

  totalPages: number;

  first: boolean;

  last: boolean;
}

export interface CreateRoadmapRequest {

  title: string;

  description?: string;

  targetDate?: string;

  status?: RoadmapStatus;
}

export interface UpdateRoadmapRequest {

  title?: string;

  description?: string;

  targetDate?: string;

  status?: RoadmapStatus;
}

export interface CreateMilestoneRequest {

  title: string;

  description?: string;

  orderNumber: number;
}

export interface UpdateMilestoneRequest {

  title?: string;

  description?: string;

  completed?: boolean;

  orderNumber?: number;
}