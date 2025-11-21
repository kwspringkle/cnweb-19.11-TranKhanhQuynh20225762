import React, { useEffect, useState } from 'react'

export default function UserForm({ initialData = null, onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '')
      setEmail(initialData.email || '')
      setPhone(initialData.phone || '')
    } else {
      setName('')
      setEmail('')
      setPhone('')
    }
  }, [initialData])

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return alert('Name is required')
    if (!email.trim()) return alert('Email is required')
    onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim() })
  }

  function onBackdropClick(e) {
    if (e.target.classList && e.target.classList.contains('modal-backdrop')) {
      onCancel && onCancel()
    }
  }

  return (
    <div className="modal-backdrop" onMouseDown={onBackdropClick} role="dialog" aria-modal="true">
      <div className="modal-container" onMouseDown={e => e.stopPropagation()}>
        <h3 style={{ marginTop: 0 }}>{initialData ? 'Edit user' : 'Add user'}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label>Name</label>
              <input autoFocus value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label>Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div style={{ width: 200 }}>
              <label>Phone</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
          </div>

          <div style={{ marginTop: 8 }}>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
