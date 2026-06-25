export type Mood =
  | "HAPPY"
  | "SAD"
  | "EXCITED"
  | "MOTIVATED"
  | "TIRED"
  | "NEUTRAL";

export interface Journal {
  id: string;
  entryDate: string;
  title: string;
  summary: string;
  notes: string;
  mood: Mood;
  hoursSpent: number;

  createdAt: string;
  updatedAt: string;
}

export interface CreateJournalRequest {
  entryDate: string;
  title: string;
  summary: string;
  notes: string;
  mood: Mood;
  hoursSpent: number;
}

export interface UpdateJournalRequest {
  entryDate?: string;
  title?: string;
  summary?: string;
  notes?: string;
  mood?: Mood;
  hoursSpent?: number;
}

export interface JournalPage {
  content: Journal[];

  page: number;
  size: number;

  totalElements: number;
  totalPages: number;

  first: boolean;
  last: boolean;
}