export interface CheckIn {
  id?: string;
  name: string;
  date: string;
  location: string;
}

export interface CreateCheckInResponse {
  result: string;
  id: string;
}

export interface UpdateCheckInResponse {
  result?: string;
  error?: string;
}

export interface DeleteCheckInResponse {
  result?: string;
  error?: string;
}
