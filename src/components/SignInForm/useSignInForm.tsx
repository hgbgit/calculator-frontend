import { useEffect, useState } from "react";
import { RequestError } from "@/services/types/Request";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { constants } from "@/lib/constants";

export const useSignInForm = () => {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [messageFromParam, setMessageFromParam] = useState<string | null>("");
  const [usernameFromParam, setUsernameFromParam] = useState<string | null>("");
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    const message = new URLSearchParams(window.location.search).get("msg");
    const username = new URLSearchParams(window.location.search).get(
      "username",
    );
    setMessageFromParam(message);
    setUsernameFromParam(username);
  }, []);

  const handleSubmit = async (event: any) => {
    setLoading(true);
    const form = event.currentTarget;
    const isValidForm = form.checkValidity();
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    setMessageFromParam("");
    setUsernameFromParam("");

    if (!isValidForm) {
      setLoading(false);
      return;
    }

    setMessageError("");
    const formData = new FormData(form);

    const response = await auth.signIn({
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    });

    if (response instanceof RequestError) {
      setMessageError(
        "Login failed. Please check your credentials and try again.",
      );
      form.reset();
      setLoading(false);

      return;
    }

    router.push(constants.routes.OPERATION);
  };

  return {
    loading,
    validated,
    messageError,
    handleSubmit,
    messageFromParam,
    usernameFromParam,
  };
};
