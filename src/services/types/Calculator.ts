import { Operation } from "@/components/OperationForm/operationLabels";

export type SignInRequest = {
  username: string;
  password: string;
};

export type User = {
  username: string;
  email: string;
  token: string;
};

export type SignUpRequest = {
  email: string;
  username: string;
  password: string;
};

export type SignUpSuccess = {
  message: string;
};

export type CalculationRequest = {
  operation: Operation;
  a: string;
  b: string;
};

export type CalculationResponse = CalculationRequest & {
  result: string;
};

export type DeleteRecordRequest = {
  id: number;
};

export type ListRecordsRequest = {
  page?: number;
  size?: number;
  sort?: string;
  operation?: string;
};

export const RecordFields = [
  { field: "id", label: "ID" },
  { field: "operation.type", label: "Operation" },
  { field: "operation.cost", label: "Operation Cost" },
  { field: "amount", label: "Amount" },
  { field: "userBalance", label: "User Balance" },
  { field: "operationResponse", label: "Operation Result" },
  { field: "date", label: "Date" },
];

export type Record = {
  id: number;
  operation: {
    id: number;
    type: string;
    cost: number;
  };
  amount: number;
  userBalance: number;
  operationResponse: string;
  date: Date | null;
};

export type ListRecordsResponse = {
  content: Record[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: any[];
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: any[];
  numberOfElements: number;
  empty: boolean;
};
