'use client'

import { useState, useEffect } from 'react'

interface Reference {
  id: string
  title: string
  url: string
  thumbnail?: string
}

export default function ReferencePage() {
  const [references, setReferences] = useState<Reference[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    url: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchReferences()
  }, [])

  const fetchReferences = async () => {
    try {
      const response = await fetch('/api/references')
      const data = await response.json()
      setReferences(data)
    } catch (error) {
      console.error('Error fetching references:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/references/${editingId}` : '/api/references'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchReferences()
        resetForm()
      }
    } catch (error) {
      console.error('Error saving reference:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (ref: Reference) => {
    setFormData({
      title: ref.title,
      url: ref.url
    })
    setEditingId(ref.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('ต้องการลบเอกสารอ้างอิงนี้หรือไม่?')) return

    try {
      const response = await fetch(`/api/references/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchReferences()
      }
    } catch (error) {
      console.error('Error deleting reference:', error)
    }
  }

  const resetForm = () => {
    setFormData({ title: '', url: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const generateThumbnail = (url: string) => {
    // Simple thumbnail generation based on URL
    const domain = url.includes('://') ? new URL(url).hostname : url
    return `https://api.faviconkit.com/${domain}/64`
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">เอกสารอ้างอิง</h1>
          <p className="text-gray-600">จัดการเอกสารอ้างอิงในรูปแบบ IEEE</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          <span className="mr-2">➕</span>
          เพิ่มเอกสารอ้างอิง
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {editingId ? 'แก้ไขเอกสารอ้างอิง' : 'เพิ่มเอกสารอ้างอิงใหม่'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่อเรื่อง (รูปแบบ IEEE) *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input-field"
                    placeholder='เช่น: J. Smith and M. Johnson, "Title of Paper," IEEE Trans. Comput., vol. 50, no. 1, pp. 1-10, Jan. 2021.'
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    กรุณาใส่ข้อมูลในรูปแบบ IEEE Citation Style
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL ของเอกสาร PDF
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="input-field"
                    placeholder="https://example.com/document.pdf"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    ลิงก์ไปยังเอกสาร PDF ต้นฉบับ (ไม่บังคับ)
                  </p>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex-1"
                  >
                    {loading ? 'กำลังบันทึก...' : (editingId ? 'อัพเดต' : 'เพิ่ม')}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-secondary"
                  >
                    ยกเลิก
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* References List */}
      <div className="space-y-6">
        {references.length === 0 ? (
          <div className="card text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-3xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">ยังไม่มีเอกสารอ้างอิง</h3>
            <p className="text-gray-600 mb-6">เพิ่มเอกสารอ้างอิงแรกของคุณเพื่อเริ่มต้น</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              เพิ่มเอกสารอ้างอิง
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {references.map((ref, index) => (
              <div key={ref.id} className="card hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  {/* Thumbnail */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                      {ref.url ? (
                        <img
                          src={generateThumbnail(ref.url)}
                          alt="Site favicon"
                          className="w-8 h-8"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            target.nextElementSibling!.classList.remove('hidden')
                          }}
                        />
                      ) : null}
                      <span className={`text-blue-600 text-xl ${ref.url ? 'hidden' : ''}`}>📄</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            #{index + 1}
                          </span>
                          <span className="text-sm text-gray-500">IEEE Format</span>
                        </div>
                        <p className="text-gray-800 leading-relaxed mb-3">
                          {ref.title}
                        </p>
                        {ref.url && (
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            <span>ดูเอกสารต้นฉบับ</span>
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleEdit(ref)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="แก้ไข"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(ref.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="ลบ"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistics */}
      {references.length > 0 && (
        <div className="card mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">สถิติเอกสารอ้างอิง</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{references.length}</div>
              <div className="text-sm text-gray-600">เอกสารทั้งหมด</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {references.filter(ref => ref.url).length}
              </div>
              <div className="text-sm text-gray-600">มี URL แนบ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {Math.round((references.filter(ref => ref.url).length / references.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">ความสมบูรณ์</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}