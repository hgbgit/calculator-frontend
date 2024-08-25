"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/globals.css";
import { ReactNode } from "react";
import { AppWrapper } from "@/components/AppWrapper";
import { MainMenu } from "@/components/MainMenu";
import Container from "react-bootstrap/Container";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppWrapper>
          <MainMenu />
          <Container className="mt-4">{children}</Container>
        </AppWrapper>
      </body>
    </html>
  );
}
