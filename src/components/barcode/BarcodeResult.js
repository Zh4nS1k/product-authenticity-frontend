import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Badge,
} from 'react-bootstrap';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

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
        <ListGroup variant="flush">
          <ListGroupItem>
            <strong>Barcode:</strong> {result.barcode}
          </ListGroupItem>
          {result.barcode_country && (
            <ListGroupItem>
              <strong>Barcode Country:</strong> {result.barcode_country}
            </ListGroupItem>
          )}
          {result.ip_country && (
            <ListGroupItem>
              <strong>Your Location:</strong> {result.ip_country}
            </ListGroupItem>
          )}
          <ListGroupItem>
            <strong>Checked At:</strong>{' '}
            {new Date(result.checked_at).toLocaleString()}
          </ListGroupItem>
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default BarcodeResult;
