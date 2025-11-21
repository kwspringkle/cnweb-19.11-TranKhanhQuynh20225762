import React from 'react'

export default function UsersTable({ users = [], onEdit, onDelete }) {
  return (
    <table className="users">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th style={{ width: 160 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan={4} style={{ textAlign: 'center', color: '#666' }}>No users</td>
          </tr>
        ) : (
          users.map(u => (
            <tr key={u.id ?? u.email}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                <div className="controls">
                  <button onClick={() => onEdit && onEdit(u)}>Edit</button>
                  <button className="btn-danger" onClick={() => {
                    if (confirm(`Delete ${u.name}?`)) onDelete && onDelete(u.id)
                  }}>Delete</button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
