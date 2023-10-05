import { useCallback, useEffect, useState } from "react";
import { calculatorApi } from "@/services/CalculatorApi";
import { RequestError } from "@/services/types/Request";
import { ListRecordsResponse } from "@/services/types/Calculator";

export const useRecordTable = () => {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageError, setMessageError] = useState("");
  const [listRecords, setListRecords] = useState<ListRecordsResponse>();
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<string | undefined>();
  const [filter, setFilter] = useState<string | undefined>();
  const [refreshRecords, setRefreshRecords] = useState(new Date());

  const loadListRecords = useCallback(async () => {
    const response = await calculatorApi.listRecords({
      size: 6,
      page,
      sort,
      operation: filter,
    });
    if (response instanceof RequestError) {
      setMessageError(
        response.data?.message ?? "List Records Error: Please try again.",
      );
    } else {
      setListRecords(response);
      if (response.empty && page >= 0) {
        setPage(page - 1);
        setRefreshRecords(new Date());
      }
    }
    setLoading(false);
  }, [refreshRecords, page, sort, filter]);

  useEffect(() => {
    loadListRecords();
  }, [loadListRecords]);

  const handleDelete = async (id: number) => {
    setMessageError("");
    const response = await calculatorApi.deleteRecord({ id });

    if (response instanceof RequestError) {
      setMessageError(
        response.data?.message ?? "Delete Record Error: Please try again.",
      );
      return;
    }
    setRefreshRecords(new Date());
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

    setMessageError("");
    const formData = new FormData(form);
    const data = {
      email: formData.get("email") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    const response = await calculatorApi.signUp(data);

    if (response instanceof RequestError) {
      setMessageError(
        response.data?.message ??
          "Registration Error: Please check your information and try again.",
      );
      setLoading(false);
      return;
    }
  };

  return {
    listRecords,
    loading,
    validated,
    messageError,
    handleSubmit,
    setPage,
    handleDelete,
    setSort,
    setFilter,
  };
};
