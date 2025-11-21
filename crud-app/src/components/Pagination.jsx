import React from 'react'

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  const pages = []
  for (let i = 1; i <= totalPages; i++) pages.push(i)

  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>
      <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>Prev</button>
      {pages.map(p => (
        <button key={p} onClick={() => onPageChange(p)} style={{ fontWeight: p === currentPage ? '600' : undefined }}>{p}</button>
      ))}
      <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>Next</button>
    </div>
  )
}
