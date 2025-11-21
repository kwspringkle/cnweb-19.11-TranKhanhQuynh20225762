import { useEffect, useState } from 'react'
import './App.css'
import UsersTable from './components/UsersTable'
import UserForm from './components/UserForm'
import Pagination from './components/Pagination'
import SearchBar from './components/SearchBar'

// API demo của jsonplaceholder
const API = 'https://jsonplaceholder.typicode.com/users'

export default function App() {
  // lưu toàn bộ users
  const [users, setUsers] = useState([])
  // loading để hiện chữ “Loading…”
  const [loading, setLoading] = useState(false)
  // error để báo lỗi
  const [error, setError] = useState(null)

  // query để search
  const [query, setQuery] = useState('')
  // page để phân trang
  const [page, setPage] = useState(1)
  const pageSize = 5 // mỗi trang 5 user

  // editing: lưu user đang edit
  const [editing, setEditing] = useState(null)
  // showForm: bật/tắt form thêm/sửa
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    // khi component load thì fetch users
    loadUsers()
  }, [])

  async function loadUsers() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API)
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
      const data = await res.json()
      setUsers(data) // gán vào state
    } catch (err) {
      setError(err.message) // nếu lỗi thì lưu error
    } finally {
      setLoading(false) // tắt loading
    }
  }

  // Thêm user
  async function handleCreate(user) {
    setError(null)
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
      if (!res.ok) throw new Error(`Create failed: ${res.status}`)
      const created = await res.json()

      // thêm user mới lên đầu danh sách
      setUsers(prev => [created, ...prev])
      setShowForm(false) // tắt form sau khi thêm
    } catch (err) {
      setError(err.message)
    }
  }

  // Update user
  async function handleUpdate(user) {
    setError(null)
    try {
      const res = await fetch(`${API}/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
      if (!res.ok) throw new Error(`Update failed: ${res.status}`)
      const updated = await res.json()

      // map lại list users, thay đúng user được update
      setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)))
      setEditing(null)
      setShowForm(false)
    } catch (err) {
      setError(err.message)
    }
  }

  // Xoá user
  async function handleDelete(id) {
    setError(null)
    const prev = users
    setUsers(u => u.filter(x => x.id !== id))

    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`)
    } catch (err) {
      setError(err.message)
      // nếu lỗi thì trả lại như cũ
      setUsers(prev)
    }
  }

  // Lọc theo tên (search)
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase())
  )

  // Tính tổng số trang
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))

  useEffect(() => {
    // nếu lỡ search khiến số trang giảm → reset về page 1
    if (page > totalPages) setPage(1)
  }, [filtered.length, totalPages])

  const pageStart = (page - 1) * pageSize
  const visible = filtered.slice(pageStart, pageStart + pageSize)

  return (
    <div id="root">
      <h1>Users CRUD (jsonplaceholder)</h1>

      <div
        style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        {/* Thanh search */}
        <SearchBar
          value={query}
          onChange={v => {
            setQuery(v)
            setPage(1) // search thì quay về trang 1
          }}
        />

        {/* Nút thêm user */}
        <div>
          <button
            onClick={() => {
              setShowForm(true)
              setEditing(null) // đang add mới → không có editing
            }}
          >
            + Add user
          </button>
        </div>
      </div>

      {/* Hiện lỗi nếu có */}
      {error && (
        <div style={{ color: 'crimson', marginBottom: 8 }}>
          Error: {error}
        </div>
      )}

      {/* Form thêm/sửa user */}
      {showForm && (
        <UserForm
          initialData={editing}
          onCancel={() => {
            setShowForm(false)
            setEditing(null)
          }}
          onSubmit={async data => {
            // nếu editing tồn tại → update, không thì create
            if (editing) {
              await handleUpdate({ ...editing, ...data })
            } else {
              await handleCreate(data)
            }
          }}
        />
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* Bảng users */}
          <UsersTable
            users={visible}
            onEdit={u => {
              setEditing(u) // chọn user để sửa
              setShowForm(true) // bật form
            }}
            onDelete={handleDelete}
          />

          {/* Phân trang */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />

          <div style={{ marginTop: 8, color: '#666' }}>
            {/* Thông báo bao nhiêu user đang hiển thị */}
            Showing {visible.length} of {filtered.length} user(s)
          </div>
        </>
      )}
    </div>
  )
}
