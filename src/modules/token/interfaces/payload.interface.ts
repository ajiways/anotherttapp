export interface IAccessPayload {
  id: number;
  password: string;
  roles: string[];
}

export interface IRefreshPayload {
  id: number;
  agent: string;
  date: number;
}
