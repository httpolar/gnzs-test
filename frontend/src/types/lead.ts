export type Lead = {
  id: number;
  name: string;
  price: number;
  score: number | null;
  statusId: number;
  createdBy: number;
  createdAt: number;
  closedAt: number | null;
  isDeleted: boolean;
};
