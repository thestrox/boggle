export interface Response<T> {
  success: boolean;
  message: string;
  error_code?: string;
  data: T;
}

export interface NewGameResponse {
  board: string[][];
  duration: number;
}

export interface ValidateRequest {
  board: string[][];
  word: string;
}

export interface ValidateWordResponse {
  score: number;
}
