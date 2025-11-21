import React from 'react'

export default function SearchBar({ value = '', onChange }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flex: 1 }}>
      <input
        placeholder="Search by name"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ flex: 1, padding: '8px 10px', fontSize: 16, borderRadius: 6, border: '1px solid #ccc' }}
      />
      {value && <button onClick={() => onChange('')} style={{ padding: '6px 10px' }}>Clear</button>}
    </div>
  )
}
