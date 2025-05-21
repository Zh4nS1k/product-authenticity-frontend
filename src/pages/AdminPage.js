import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Table,
  Alert,
} from 'react-bootstrap';
import UserItem from '../components/admin/UserItem';
import { getUsers } from '../api/admin';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/common/Loading';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data.data.users);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch users');
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <Container>
      <Card className="mb-4">
        <CardBody>
          <CardTitle>Admin Dashboard</CardTitle>
          <Card.Text>
            Welcome to the admin panel. Here you can manage all users.
          </Card.Text>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading ? (
            <Loading />
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((userItem) => (
                    <UserItem
                      key={userItem.id}
                      user={userItem}
                      currentUser={user}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </CardBody>
      </Card>
    </Container>
  );
};

export default AdminPage;
