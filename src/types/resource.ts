export type ResourceType =
  | "YOUTUBE"
  | "DOCUMENTATION"
  | "GITHUB"
  | "ARTICLE"
  | "COURSE"
  | "OTHER";

export interface Resource {
  id: string;

  resourceType: ResourceType;

  title: string;

  url: string;

  createdAt: string;

  updatedAt: string;
}

export interface CreateResourceRequest {
  resourceType: ResourceType;

  title: string;

  url: string;
}

export interface UpdateResourceRequest {
  resourceType?: ResourceType;

  title?: string;

  url?: string;
}