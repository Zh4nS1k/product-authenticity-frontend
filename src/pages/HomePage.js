import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Button,
  Row,
  Col,
  Spinner,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const { user, isAnonymous, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAnonymous) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAnonymous, loading, navigate]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container>
      <Card className="mb-4">
        <CardBody>
          <CardTitle as="h2">Welcome to Product Authenticity Checker</CardTitle>
          <Card.Text>
            {isAnonymous
              ? 'You are currently using the service anonymously.'
              : `Welcome back, ${user?.username}!`}
          </Card.Text>

          <Row className="mt-4">
            <Col md={6} className="mb-3">
              <Card>
                <CardBody>
                  <CardTitle>Check Product</CardTitle>
                  <Card.Text>
                    Verify if your product is original by entering its barcode.
                  </Card.Text>
                  <Button as={Link} to="/check" variant="primary">
                    Check Barcode
                  </Button>
                </CardBody>
              </Card>
            </Col>

            {isAnonymous && (
              <Col md={6} className="mb-3">
                <Card>
                  <CardBody>
                    <CardTitle>Create Account</CardTitle>
                    <Card.Text>
                      Register to save your verification history and access
                      additional features.
                    </Card.Text>
                    <Button
                      as={Link}
                      to="/register"
                      variant="success"
                      className="me-2"
                    >
                      Register
                    </Button>
                    <Button as={Link} to="/login" variant="outline-primary">
                      Login
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            )}
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
};

export default HomePage;
