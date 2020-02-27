export interface Response<T> {
  success: boolean;
  message: string;
  error_code?: string;
  data: T;
}

export interface BoardData {
  board: string[][];
}
