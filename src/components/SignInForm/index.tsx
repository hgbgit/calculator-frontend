"use client";
import { Alert, Button, FloatingLabel, Form, Stack } from "react-bootstrap";
import { useSignInForm } from "@/components/SignInForm/useSignInForm";

export const SignInForm = () => {
  const {
    loading,
    validated,
    messageError,
    handleSubmit,
    messageFromParam,
    usernameFromParam,
  } = useSignInForm();

  return (
    <Stack gap={3}>
      <Stack>
        <h2>Sign in</h2>
      </Stack>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Stack gap={3}>
          {messageFromParam && (
            <Alert variant="success">{messageFromParam}</Alert>
          )}
          {messageError && <Alert variant="danger">{messageError}</Alert>}
          <Form.Group>
            <FloatingLabel
              controlId="floatingUsername"
              label="Username"
              className="mb-3"
            >
              <Form.Control
                type="username"
                placeholder="username"
                name="username"
                disabled={loading}
                defaultValue={usernameFromParam!}
                required
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                disabled={loading}
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm" />}{" "}
              Login
            </Button>
          </Form.Group>
        </Stack>
      </Form>
    </Stack>
  );
};
