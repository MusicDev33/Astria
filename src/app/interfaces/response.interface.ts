export interface IResponse<T> {
  success: boolean;
  msg: string;
  payload?: T;
}
