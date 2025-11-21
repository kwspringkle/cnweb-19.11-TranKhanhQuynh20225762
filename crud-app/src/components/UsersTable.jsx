import React from 'react'

// Component hiển thị bảng danh sách người dùng
export default function UsersTable({ users = [], onEdit, onDelete }) {
  return (
    <table className="users">
      <thead>
        <tr>
          {/* Tiêu đề các cột */}
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th style={{ width: 160 }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {/* Nếu mảng users rỗng → hiển thị dòng "No users" */}
        {users.length === 0 ? (
          <tr>
            <td colSpan={4} style={{ textAlign: 'center', color: '#666' }}>
              No users
            </td>
          </tr>
        ) : (
          // Nếu có user → map từng user thành 1 dòng trong bảng
          users.map(u => (
            // key ưu tiên dùng u.id, fallback sang u.email nếu không có id
            <tr key={u.id ?? u.email}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                <div className="controls">
                  {/* Nút Edit → gọi callback onEdit (nếu có) và truyền object user */}
                  <button onClick={() => onEdit && onEdit(u)}>Edit</button>

                  {/* Nút Delete → confirm trước khi xoá, sau đó gọi onDelete với id */}
                  <button
                    className="btn-danger"
                    onClick={() => {
                      if (confirm(`Delete ${u.name}?`)) {
                        onDelete && onDelete(u.id)
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
