"use client";
import {
  Alert,
  Button,
  FloatingLabel,
  Form,
  Stack,
  Table,
} from "react-bootstrap";
import { useRecordTable } from "@/components/RecordTable/useRecordTable";
import { format, formatDistance, subDays } from "date-fns";
import Pagination from "react-bootstrap/Pagination";
import { operationLabels } from "@/components/OperationForm/operationLabels";
import { RecordFields } from "@/services/types/Calculator";

export const RecordTable = () => {
  const {
    loading,
    validated,
    messageError,
    handleSubmit,
    listRecords,
    setPage,
    handleDelete,
    setSort,
    setFilter,
  } = useRecordTable();

  const paginationBasic = () => {
    if (!listRecords?.totalPages) {
      return null;
    }

    const active = listRecords.number + 1;
    const items = [];
    for (let number = 1; number <= listRecords?.totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => setPage(number - 1)}
        >
          {number}
        </Pagination.Item>,
      );
    }

    return <Pagination>{items}</Pagination>;
  };

  return (
    <Stack gap={3}>
      <Stack>
        <h2>User Records</h2>
      </Stack>
      <Stack gap={3}>
        {messageError && <Alert variant="danger">{messageError}</Alert>}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <FloatingLabel
              controlId="floatingOperationFilter"
              label="Filter by Operation"
              style={{ marginBottom: "2rem" }}
            >
              <Form.Select
                name="operationFilter"
                disabled={loading}
                required
                onChange={(e) => setFilter(e.target.value)}
              >
                <option></option>
                {operationLabels.map((op) => (
                  <option key={op.operation} value={op.operation}>
                    {op.operation}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel
              controlId="floatingSortByFiled"
              label="Sort by Field"
              style={{ marginBottom: "2rem" }}
            >
              <Form.Select
                name="sortByFiled"
                disabled={loading}
                required
                onChange={(e) => setSort(e.target.value)}
              >
                <option></option>
                {RecordFields.map((rf) => (
                  <option key={rf.label} value={rf.field}>
                    {rf.label}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
        </Form>
      </Stack>
      <Table responsive="xl">
        <thead>
          <tr>
            <th>ID</th>
            <th>Operation</th>
            <th>Operation Cost</th>
            <th>Amount</th>
            <th>User Balance</th>
            <th>Operation Result</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listRecords?.content?.map((record, i) => (
            <tr key={`${record.operation.type}_${record.date}_${i}`}>
              <td>{record.id}</td>
              <td>{record.operation.type}</td>
              <td>{record.operation.cost}</td>
              <td>{record.amount}</td>
              <td>{record.userBalance}</td>
              <td>{record.operationResponse}</td>

              <td
                title={
                  (record.date &&
                    formatDistance(
                      subDays(new Date(record.date), 3),
                      new Date(),
                      {
                        addSuffix: true,
                      },
                    )) ??
                  ""
                }
              >
                {record.date &&
                  format(new Date(record.date), "MM/dd/yyyy HH:mm:ss.SSS XXX")}
              </td>
              <td>
                <Button onClick={() => handleDelete(record.id)}>
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {paginationBasic()}
    </Stack>
  );
};
