import axios, { AxiosError } from "axios";
import {
  User,
  SignInRequest,
  SignUpRequest,
  SignUpSuccess,
  CalculationRequest,
  CalculationResponse,
  ListRecordsRequest,
  ListRecordsResponse,
  DeleteRecordRequest,
} from "@/services/types/Calculator";
import { constants } from "@/lib/constants";
import { RequestError } from "@/services/types/Request";

const axiosInstance = axios.create({
  baseURL: constants.calculatorApi.baseUrl,
});

class CalculatorApi {
  private token: string | null = null;
  getToken() {
    return this.token;
  }

  setAuthToken(token: string | null) {
    this.token = token;
  }

  async signIn({
    username,
    password,
  }: SignInRequest): Promise<User | RequestError> {
    try {
      const payload = {
        username,
        password,
      };
      const res = await axiosInstance.post(
        constants.calculatorApi.signIn(),
        payload,
      );
      return res.data as User;
    } catch (error) {
      return new RequestError(error as AxiosError);
    }
  }

  async signUp({
    email,
    username,
    password,
  }: SignUpRequest): Promise<SignUpSuccess | RequestError> {
    try {
      const payload = {
        email,
        username,
        password,
      };
      const res = await axiosInstance.post(
        constants.calculatorApi.signUp(),
        payload,
      );
      return res.data as SignUpSuccess;
    } catch (error) {
      return new RequestError(error as AxiosError);
    }
  }

  async calculation({
    operation,
    a,
    b,
  }: CalculationRequest): Promise<CalculationResponse | RequestError> {
    try {
      const payload = {
        operation,
        a,
        b,
      };
      const res = await axiosInstance.post(
        constants.calculatorApi.calculation(),
        payload,
      );
      return { ...payload, ...res.data } as CalculationResponse;
    } catch (error) {
      return new RequestError(error as AxiosError);
    }
  }

  async listRecords({
    page = 0,
    size = 10,
    sort,
    operation,
  }: ListRecordsRequest): Promise<ListRecordsResponse | RequestError> {
    try {
      const params = {
        page,
        size,
        sort,
        operation,
      };
      const res = await axiosInstance.get(constants.calculatorApi.records(), {
        params,
      });
      return res.data as ListRecordsResponse;
    } catch (error) {
      return new RequestError(error as AxiosError);
    }
  }

  async deleteRecord({
    id,
  }: DeleteRecordRequest): Promise<object | RequestError> {
    try {
      const params = {
        id,
      };
      const res = await axiosInstance.delete(
        `${constants.calculatorApi.records()}/${id}`,
      );
      return res.data as object;
    } catch (error) {
      return new RequestError(error as AxiosError);
    }
  }
}

const calculatorApi = new CalculatorApi();

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = calculatorApi.getToken();
  return config;
});

export { calculatorApi };
