import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useAuth } from "@/providers/AuthProvider";
import { useCallback } from "react";
import { constants } from "@/lib/constants";
import { Button, Stack } from "react-bootstrap";
import { useRouter } from "next/navigation";

export function MainMenu() {
  const auth = useAuth();
  const router = useRouter();

  const getLoggedInMenu = useCallback(
    () => (
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0" navbarScroll>
          <Nav.Link onClick={() => router.push(constants.routes.OPERATION)}>
            New Operation
          </Nav.Link>
          <Nav.Link onClick={() => router.push(constants.routes.USER_RECORDS)}>
            User Records
          </Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link disabled className="active">
            @{auth.user?.username}
          </Nav.Link>
          <Nav.Link onClick={auth.signOut}>
            Logout <i className="bi bi-box-arrow-right"></i>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    ),
    [auth.user?.username],
  );

  const getLoggedOutMenu = useCallback(
    () => (
      <>
        <Stack direction="horizontal">
          <Nav>
            <Nav.Link onClick={() => router.push(constants.routes.SIGN_UP)}>
              Sign Up
            </Nav.Link>
          </Nav>
          <Button onClick={() => router.push(constants.routes.SIGN_IN)}>
            Sign in
          </Button>
        </Stack>
      </>
    ),
    [],
  );

  const getMenu = useCallback(
    () => (
      <>
        {auth.signed && getLoggedInMenu()}
        {!auth.signed && getLoggedOutMenu()}
      </>
    ),
    [auth.signed, getLoggedInMenu, getLoggedOutMenu],
  );

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          LoanPRO <i className="bi bi-calculator"></i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        {getMenu()}
      </Container>
    </Navbar>
  );
}
