import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Table,
  Button,
  Alert,
} from 'react-bootstrap';
import HistoryItem from '../components/history/HistoryItem';
import { getHistory } from '../api/history';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/common/Loading';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getHistory();
        setHistory(response.data.data.items);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch history');
      }
      setLoading(false);
    };

    if (user) {
      fetchHistory();
    }
  }, [user]);

  const handleUpdate = (id, updatedItem) => {
    setHistory(history.map((item) => (item.id === id ? updatedItem : item)));
  };

  const handleDelete = (id) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  if (!user) {
    return (
      <Container>
        <Alert variant="warning">
          You need to be logged in to view your verification history.
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Card className="mb-4">
        <CardBody>
          <CardTitle>Your Verification History</CardTitle>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading ? (
            <Loading />
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Barcode</th>
                  <th>Status</th>
                  <th>Country</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {history.length > 0 ? (
                  history.map((item) => (
                    <HistoryItem
                      key={item.id}
                      item={item}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No verification history found
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

export default HistoryPage;
