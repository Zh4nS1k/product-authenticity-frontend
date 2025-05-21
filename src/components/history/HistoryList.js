import React from 'react';
import { Table } from 'react-bootstrap';
import HistoryItem from './HistoryItem';

const HistoryList = ({ items, onUpdate, onDelete }) => {
  return (
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
        {items.length > 0 ? (
          items.map((item) => (
            <HistoryItem
              key={item.id}
              item={item}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              No history found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default HistoryList;
