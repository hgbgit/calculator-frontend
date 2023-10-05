"use client";
import { Alert, Button, FloatingLabel, Form, Stack } from "react-bootstrap";
import { useOperationForm } from "@/components/OperationForm/useOperationForm";
import {
  Operation,
  operationLabels,
} from "@/components/OperationForm/operationLabels";

export const OperationForm = () => {
  const {
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
  } = useOperationForm();

  return (
    <Stack gap={3}>
      <Stack>
        <h2>Operation</h2>
      </Stack>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Stack gap={3}>
          {message && <Alert variant="success">{message}</Alert>}
          {messageError && <Alert variant="danger">{messageError}</Alert>}
          <Form.Group>
            <FloatingLabel
              controlId="floatingOperation"
              label="Operation"
              style={{ marginBottom: "2rem" }}
            >
              <Form.Select
                name="operation"
                disabled={loading}
                required
                onChange={(e) =>
                  handleSelectedOperation(e.target.value as Operation)
                }
              >
                <option></option>
                {operationLabels.map((op) => (
                  <option key={op.operation} value={op.operation}>
                    {op.operation}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingValue1"
              label={selectedOperation?.value1}
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder={selectedOperation?.value1}
                name="value1"
                disabled={loading || !selectedOperation?.value1}
                required
                minLength={1}
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingValue2"
              label={selectedOperation?.value2}
            >
              <Form.Control
                type="number"
                placeholder={selectedOperation?.value2}
                name="value2"
                disabled={loading || !selectedOperation?.value2}
                required
                minLength={1}
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm" />}{" "}
              Calculate
            </Button>
          </Form.Group>
        </Stack>
      </Form>
    </Stack>
  );
};
