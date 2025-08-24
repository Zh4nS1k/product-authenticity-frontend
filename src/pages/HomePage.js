import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Row,
  Col,
  Spinner,
} from 'react-bootstrap';
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
      {/* Hero Section */}
      <Card className="mb-4">
        <Card.Img
          variant="top"
          src="https://cdn-dlbon.nitrocdn.com/ukVKTqjfWwKJxncFrKknFxIMxESHpjNh/assets/images/optimized/rev-9018230/www.asp.com.au/wp-content/uploads/2021/09/shutterstock_73529662.jpg"
          alt="Barcode Scanner"
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
          }}
        />
        <CardBody>
          <CardTitle as="h2">Easily Verify Product Authenticity</CardTitle>
          <CardText>
            Use our service to scan barcodes and ensure the originality of your
            products.
          </CardText>
          <Button as={Link} to="/check" variant="primary">
            Start Verification
          </Button>
        </CardBody>
      </Card>

      {/* Additional Content */}
      <Card className="mb-4">
        <CardBody>
          <CardTitle as="h2">
            Welcome to the Product Authenticity Checker
          </CardTitle>
          <CardText>
            {isAnonymous
              ? 'You are currently using the service anonymously.'
              : `Welcome back, ${user?.username}!`}
          </CardText>

          <Row className="mt-4">
            <Col md={6} className="mb-3">
              <Card>
                <CardBody>
                  <CardTitle>Check Product</CardTitle>
                  <CardText>
                    Verify if your product is original by entering its barcode.
                  </CardText>
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
                    <CardText>
                      Register to save your verification history and access
                      additional features.
                    </CardText>
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
