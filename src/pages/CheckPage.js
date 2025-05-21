import React, { useState, useContext } from 'react';
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Badge,
} from 'react-bootstrap';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import { AuthContext } from '../context/AuthContext';
import { checkBarcode } from '../api/barcode';

const BarcodeResult = ({ result }) => {
  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>
          Verification Result
          {result.is_original ? (
            <Badge bg="success" className="ms-2">
              <CheckCircleFill className="me-1" />
              Original
            </Badge>
          ) : (
            <Badge bg="danger" className="ms-2">
              <XCircleFill className="me-1" />
              Counterfeit
            </Badge>
          )}
        </CardTitle>
        <div className="mt-3">
          <p>
            <strong>Barcode:</strong> {result.barcode}
          </p>
          <p>
            <strong>Barcode Country:</strong> {result.barcode_country}
          </p>
          <p>
            <strong>Your Location:</strong> {result.ip_country}
          </p>
          <p>
            <strong>Checked At:</strong>{' '}
            {new Date(result.checked_at).toLocaleString()}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

const CheckPage = () => {
  const [barcode, setBarcode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isAnonymous } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await checkBarcode(barcode);
      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to check barcode');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                {isAnonymous ? 'Anonymous Barcode Check' : 'Barcode Check'}
              </CardTitle>
              {isAnonymous && (
                <Alert variant="info" className="mb-3">
                  You are checking anonymously. Your history won't be saved.
                  <Button variant="link" href="/register" className="p-0 ms-2">
                    Register
                  </Button>
                  to save your verification history.
                </Alert>
              )}

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
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Checking...' : 'Check Barcode'}
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
        </Col>
      </Row>
    </Container>
  );
};

export default CheckPage;
