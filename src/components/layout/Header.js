import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Container,
  Button,
  Badge,
  Spinner,
} from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { user, isAnonymous, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  if (loading) {
    return (
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Product Authenticity
          </Navbar.Brand>
          <Spinner animation="border" variant="primary" />
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Product Authenticity
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/check">
              Check Barcode
            </Nav.Link>
            {!isAnonymous && (
              <Nav.Link as={Link} to="/history">
                History
              </Nav.Link>
            )}
            {user?.role === 'admin' && (
              <Nav.Link as={Link} to="/admin">
                Admin
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {!isAnonymous ? (
              <>
                <Navbar.Text className="me-2">
                  Welcome, {user?.username}
                  <Badge
                    bg={user?.role === 'admin' ? 'primary' : 'secondary'}
                    className="ms-2"
                  >
                    {user?.role}
                  </Badge>
                </Navbar.Text>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
