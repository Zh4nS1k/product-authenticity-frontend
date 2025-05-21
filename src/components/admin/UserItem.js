import React, { useState } from 'react';
import { Button, Badge, Modal } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';
import { deleteUser } from '../../api/admin';

const UserItem = ({ user, currentUser, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteUser(user.id);
      onDelete(user.id);
      setShowDeleteModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    }
    setLoading(false);
  };

  return (
    <>
      <tr>
        <td>{user.id}</td>
        <td>
          {user.username}
          {user.id === currentUser.id && (
            <Badge bg="info" className="ms-2">
              You
            </Badge>
          )}
        </td>
        <td>{user.email}</td>
        <td>
          <Badge bg={user.role === 'admin' ? 'primary' : 'secondary'}>
            {user.role}
          </Badge>
        </td>
        <td>
          {user.id !== currentUser.id && (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
              disabled={loading}
            >
              <TrashFill />
            </Button>
          )}
        </td>
      </tr>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          <p>Are you sure you want to delete user {user.username}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserItem;
