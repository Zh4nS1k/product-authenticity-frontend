import React from 'react';
import { Table } from 'react-bootstrap';
import UserItem from './UserItem';

const UsersList = ({ users, currentUser, onDelete }) => {
  return (
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
          users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              currentUser={currentUser}
              onDelete={onDelete}
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
  );
};

export default UsersList;
