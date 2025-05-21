import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Form,
  Button,
  Alert,
  Spinner,
} from 'react-bootstrap';
import BarcodeResult from '../components/barcode/BarcodeResult';
import { checkBarcode } from '../api/barcode';
import { AuthContext } from '../context/AuthContext';

const DashboardPage = () => {
  const [barcode, setBarcode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [checkLoading, setCheckLoading] = useState(false);
  const { user, isAnonymous, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAnonymous) {
      navigate('/', { replace: true });
    }
  }, [isAnonymous, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCheckLoading(true);
    setError(null);
    try {
      const response = await checkBarcode(barcode);
      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to check barcode');
    } finally {
      setCheckLoading(false);
    }
  };

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
          <CardTitle>Welcome, {user?.username}</CardTitle>
          <Card.Text>
            Enter a barcode below to check the authenticity of a product.
          </Card.Text>
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardBody>
          <CardTitle>Check Barcode</CardTitle>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Barcode</Form.Label>
              <Form.Control
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="Enter barcode"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={checkLoading}>
              {checkLoading ? (
                <>
                  <Spinner
                    as="span"
                    size="sm"
                    animation="border"
                    role="status"
                  />
                  <span className="ms-2">Checking...</span>
                </>
              ) : (
                'Check'
              )}
            </Button>
          </Form>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </CardBody>
      </Card>

      {result && <BarcodeResult result={result} />}
    </Container>
  );
};

export default DashboardPage;
