import { useState } from 'react'
import './style.css'

export type Note = {
  id: string
  content: string
}

export default function StickyNoteApp() {
  const [notes, setNotes] = useState<Note[]>([])
  const [draft, setDraft] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [confirmId, setConfirmId] = useState<string | null>(null)

  function handleSave() {
    const value = draft.trim()
    if (!value) {
      setError('Nội dung ghi chú không được bỏ trống')
      return
    }
    setError('')
    const newNote: Note = { id: crypto.randomUUID(), content: value }
    setNotes(prev => [newNote, ...prev])
    setDraft('')
  }

  function askDelete(id: string) {
    setConfirmId(id)
  }

  function handleConfirmDelete() {
    if (confirmId) {
      setNotes(prev => prev.filter(n => n.id !== confirmId))
      setConfirmId(null)
    }
  }

  return (
    <div className="sticky-root">
      <div className="sticky-header">
        <div className="sticky-title">STICKY NOTE</div>
        <button className="icon-button" onClick={handleSave} title="Thêm">
          💾
        </button>
      </div>

      <textarea
        className="sticky-input"
        placeholder="Nhập ghi chú..."
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      />
      {error && <div className="sticky-error">{error}</div>}

      <div className="sticky-list">
        {notes.map(note => (
          <div key={note.id} className="sticky-item">
            <div className="sticky-item-content">{note.content}</div>
            <div className="sticky-item-actions">
              <button
                className="icon-button"
                onClick={() => askDelete(note.id)}
                title="Xóa"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {confirmId && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-title"> Xóa note</div>
            <div className="modal-body">Bạn có muốn xóa note này không?</div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setConfirmId(null)}>
                No
              </button>
              <button className="btn-confirm" onClick={handleConfirmDelete}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
