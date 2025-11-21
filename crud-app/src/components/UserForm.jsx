import React, { useEffect, useState } from 'react'

// Form dùng để tạo mới hoặc chỉnh sửa user
export default function UserForm({ initialData = null, onSubmit, onCancel }) {
  // Khai báo state cho các trường trong form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  // Khi initialData thay đổi → cập nhật form (phục vụ chức năng Edit)
  useEffect(() => {
    if (initialData) {
      // Nếu có dữ liệu ban đầu → gán vào form
      setName(initialData.name || '')
      setEmail(initialData.email || '')
      setPhone(initialData.phone || '')
    } else {
      // Nếu không có initialData → reset form (trạng thái tạo mới)
      setName('')
      setEmail('')
      setPhone('')
    }
  }, [initialData])

  // Xử lý khi submit form
  function handleSubmit(e) {
    e.preventDefault()

    // Validate đơn giản
    if (!name.trim()) return alert('Name is required')
    if (!email.trim()) return alert('Email is required')

    // Trả dữ liệu cho parent component thông qua callback onSubmit
    onSubmit({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim()
    })
  }

  // Bấm ra ngoài modal → đóng
  function onBackdropClick(e) {
    // Chỉ đóng nếu click đúng vào vùng backdrop, không phải container bên trong
    if (e.target.classList && e.target.classList.contains('modal-backdrop')) {
      onCancel && onCancel()
    }
  }

  return (
    // Lớp modal-backdrop để tạo nền mờ
    <div
      className="modal-backdrop"
      onMouseDown={onBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      {/* modal-container để chứa form. StopPropagation để không lan sự kiện click ra ngoài */}
      <div className="modal-container" onMouseDown={e => e.stopPropagation()}>
        <h3 style={{ marginTop: 0 }}>
          {initialData ? 'Edit user' : 'Add user'}
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Hàng chứa 3 input */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label>Name</label>
              {/* autoFocus → tự focus khi mở form */}
              <input
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div style={{ flex: 1, minWidth: 200 }}>
              <label>Email</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div style={{ width: 200 }}>
              <label>Phone</label>
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Các nút Save và Cancel */}
          <div style={{ marginTop: 8 }}>
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={onCancel}
              style={{ marginLeft: 8 }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
