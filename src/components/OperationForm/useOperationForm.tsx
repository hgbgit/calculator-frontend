import { ReactNode, useState } from "react";
import { calculatorApi } from "@/services/CalculatorApi";
import { RequestError } from "@/services/types/Request";
import { useRouter } from "next/navigation";
import {
  Operation,
  OperationLabel,
  operationLabels,
} from "@/components/OperationForm/operationLabels";
import { CalculationResponse } from "@/services/types/Calculator";

export const useOperationForm = () => {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | ReactNode>("");
  const [messageError, setMessageError] = useState("");
  const [selectedOperation, setSelectedOperation] = useState<
    OperationLabel | undefined
  >();
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const router = useRouter();

  const handleSelectedOperation = (operation: Operation) => {
    const op = operationLabels.find((o) => o.operation === operation);
    setSelectedOperation(op);
    setValue1("");
    setValue2("");
  };

  const createMessageSuccess = (response: CalculationResponse) => {
    return (
      <>
        <div>Calculation success!</div>
        <div>Operation: {response.operation}</div>
        <div>
          {selectedOperation?.value1}: {response.a}
        </div>
        <div>
          {selectedOperation?.value2}: {response.b}
        </div>
        <div>Result: {response.result}</div>
      </>
    );
  };

  const handleSubmit = async (event: any) => {
    setLoading(true);
    const form = event.currentTarget;
    const isValidForm = form.checkValidity();
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (!isValidForm) {
      setLoading(false);
      return;
    }

    setMessage("");
    setMessageError("");
    const formData = new FormData(form);
    const data = {
      operation: formData.get("operation") as Operation,
      a: formData.get("value1") as string,
      b: formData.get("value2") as string,
    };
    const response = await calculatorApi.calculation(data);

    if (response instanceof RequestError) {
      setMessageError(
        response.data?.message ??
          "Calculation Error: Please check your values and try again.",
      );
    } else {
      setMessage(createMessageSuccess(response));
      setValue1("");
      setValue2("");
      setValidated(false);
      form.reset();
    }

    setLoading(false);
  };

  return {
    loading,
    validated,
    message,
    messageError,
    handleSubmit,
    selectedOperation,
    handleSelectedOperation,
    value1,
    setValue1,
    value2,
    setValue2,
  };
};
