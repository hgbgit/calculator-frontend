import { AxiosError } from "axios";

export class RequestError {
  code?: string;
  status?: number;
  headers?: object;
  message: string;
  data: any;
  constructor(error: AxiosError) {
    this.code = error.code;
    this.status = error.response?.status;
    this.message = error.message;
    this.headers = error.response?.headers;
    this.data = error.response?.data;
  }
}
