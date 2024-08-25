"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { calculatorApi } from "@/services/CalculatorApi";
import { storageManager } from "@/lib/storageManager";
import { SignInRequest, User } from "@/services/types/Calculator";
import { decodeToken, isExpired as isTokenExpired } from "react-jwt";
import { RequestError } from "@/services/types/Request";
import { constants } from "@/lib/constants";
import { useRouter } from "next/navigation";

interface AuthContextData {
  signed: boolean;
  user?: User | null;
  signIn(signInRequest: SignInRequest): Promise<User | RequestError>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const router = useRouter();

  const signOut = () => {
    setUser(null);
    calculatorApi.setAuthToken(null);
    storageManager.deleteUser();
    router.push(constants.routes.SIGN_IN);
  };

  //*******************************************
  // Load user from local storage (client-side)
  //*******************************************
  useEffect(() => {
    const user = storageManager.getUser();

    if (!user) {
      setUser(undefined);
      return;
    }

    if (user.token) {
      const decodedToken = decodeToken(user.token);
      const isExpired = isTokenExpired(user.token);

      if (decodedToken && isExpired) {
        signOut();
        setUser(undefined);
        return;
      }
    }

    setUser(user);
    calculatorApi.setAuthToken(user.token);
  }, []);

  const signIn = async (signInRequest: SignInRequest) => {
    const user = await calculatorApi.signIn(signInRequest);

    if (user instanceof RequestError) {
      return user;
    }

    setUser(user);
    calculatorApi.setAuthToken(user.token);
    storageManager.setUser(user);
    return user;
  };

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
