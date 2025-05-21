import React from 'react';
import { Card, CardBody, CardTitle, Form, Button } from 'react-bootstrap';

const BarcodeCheck = ({ barcode, setBarcode, onSubmit, loading }) => {
  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>Check Barcode</CardTitle>
        <Form onSubmit={onSubmit}>
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
            {loading ? 'Checking...' : 'Check'}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default BarcodeCheck;
