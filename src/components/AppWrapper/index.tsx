import { ReactNode } from "react";
import { AuthProvider } from "@/providers/AuthProvider";
import { AuthRouter } from "@/components/AuthRouter";

type AppWrapperProps = {
  children: ReactNode;
};

export const AppWrapper = ({ children }: AppWrapperProps) => {
  return (
    <AuthProvider>
      <AuthRouter>{children}</AuthRouter>
    </AuthProvider>
  );
};
