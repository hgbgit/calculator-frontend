import { useState } from "react";
import { calculatorApi } from "@/services/CalculatorApi";
import { RequestError } from "@/services/types/Request";
import { useRouter } from "next/navigation";
import { constants } from "@/lib/constants";

export const useSignUpForm = () => {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const router = useRouter();

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

    router.push(
      `${constants.routes.SIGN_IN}?msg=${response.message}&username=${data.username}`,
    );
  };

  return {
    loading,
    validated,
    messageError,
    handleSubmit,
  };
};
