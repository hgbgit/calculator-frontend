"use client";
import { Alert, Button, FloatingLabel, Form, Stack } from "react-bootstrap";
import { useSignUpForm } from "@/components/SignUpForm/useSignUpForm";

export const SignUpForm = () => {
  const { loading, validated, messageError, handleSubmit } = useSignUpForm();

  return (
    <Stack gap={3}>
      <Stack>
        <h2>Sign up</h2>
      </Stack>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Stack gap={3}>
          {messageError && <Alert variant="danger">{messageError}</Alert>}
          <Form.Group>
            <FloatingLabel
              controlId="floatingEmail"
              label="E-mail"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="email@domain.com"
                name="email"
                disabled={loading}
                required
                max={50}
                maxLength={50}
              />
            </FloatingLabel>

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
                required
                min={3}
                minLength={3}
                max={20}
                maxLength={20}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                disabled={loading}
                required
                min={6}
                minLength={6}
                max={40}
                maxLength={40}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm" />}{" "}
              Sign up
            </Button>
          </Form.Group>
        </Stack>
      </Form>
    </Stack>
  );
};
