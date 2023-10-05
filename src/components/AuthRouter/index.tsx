"use client";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { constants } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";

type AuthRouterProps = {
  children: ReactNode;
};

export const AuthRouter = ({ children }: AuthRouterProps) => {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (auth.user === undefined) {
      router.push(constants.routes.SIGN_IN);
    }
  }, [auth.user, router]);

  if (typeof window === "undefined") {
    return null;
  }

  if (!auth.signed && !constants.routes.publicRoutes().includes(pathname)) {
    return null;
  }

  return children;
};
