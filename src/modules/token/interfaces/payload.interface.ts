export interface IAccessPayload {
  id: number;
  password: string;
  roles: string[];
}

export interface IRefreshPayload {
  agent: string;
  date: number;
}
