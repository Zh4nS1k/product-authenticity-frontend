import React, { useState } from 'react';
import { Button, Badge, Form, Modal } from 'react-bootstrap';
import {
  CheckCircleFill,
  XCircleFill,
  PencilFill,
  TrashFill,
} from 'react-bootstrap-icons';
import { updateHistoryItem, deleteHistoryItem } from '../../api/history';

const HistoryItem = ({ item, onUpdate, onDelete }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedBarcode, setEditedBarcode] = useState(item.barcode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateHistoryItem(item.id, editedBarcode);
      onUpdate(item.id, response.data.data);
      setShowEditModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update barcode');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setLoading(true);
      setError(null);
      try {
        await deleteHistoryItem(item.id);
        onDelete(item.id);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete record');
      }
      setLoading(false);
    }
  };

  return (
    <>
      <tr>
        <td>{item.barcode}</td>
        <td>
          {item.is_original ? (
            <Badge bg="success">
              <CheckCircleFill className="me-1" />
              Original
            </Badge>
          ) : (
            <Badge bg="danger">
              <XCircleFill className="me-1" />
              Fake
            </Badge>
          )}
        </td>
        <td>{item.barcode_country || 'Unknown'}</td>
        <td>{new Date(item.checked_at).toLocaleString()}</td>
        <td>
          <Button
            variant="outline-primary"
            size="sm"
            className="me-2"
            onClick={() => setShowEditModal(true)}
            disabled={loading}
          >
            <PencilFill />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
          >
            <TrashFill />
          </Button>
        </td>
      </tr>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Barcode</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Barcode</Form.Label>
              <Form.Control
                type="text"
                value={editedBarcode}
                onChange={(e) => setEditedBarcode(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HistoryItem;
