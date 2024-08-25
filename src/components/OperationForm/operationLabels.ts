export type Operation =
  | "ADDITION"
  | "SUBTRACTION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SQUARE_ROOT"
  | "RANDOM_STRING";

export type OperationLabel = {
  operation: Operation;
  value1: string;
  value2: string;
};

export const operationLabels: OperationLabel[] = [
  {
    operation: "ADDITION",
    value1: "first addend",
    value2: "second addend",
  },
  {
    operation: "SUBTRACTION",
    value1: "minuend",
    value2: "subtrahend",
  },
  {
    operation: "MULTIPLICATION",
    value1: "factor",
    value2: "multiplier",
  },
  {
    operation: "DIVISION",
    value1: "dividend",
    value2: "quotient",
  },
  {
    operation: "SQUARE_ROOT",
    value1: "radicand",
    value2: "square root",
  },
  {
    operation: "RANDOM_STRING",
    value1: "num",
    value2: "len",
  },
];
