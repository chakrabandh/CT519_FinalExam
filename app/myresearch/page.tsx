'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Reference {
  id: string
  title: string
  url: string
  thumbnail?: string
}

export default function MyResearchPage() {
  const [references, setReferences] = useState<Reference[]>([])
  const [loading, setLoading] = useState(true)

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
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">งานวิจัยของฉัน</h1>
        <p className="text-gray-600">เอกสารงานวิจัยและเอกสารอ้างอิง</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar - References */}
        <div className="lg:col-span-1">
          <div className="card sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">เอกสารอ้างอิง</h3>
              <Link 
                href="/reference" 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                จัดการ
              </Link>
            </div>
            
            {loading ? (
              <div className="space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : references.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {references.map((ref) => (
                  <div key={ref.id} className="border-l-4 border-blue-200 pl-3">
                    <h4 className="font-medium text-sm text-gray-800 line-clamp-2 mb-1">
                      {ref.title}
                    </h4>
                    {ref.url && (
                      <a 
                        href={ref.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-700 truncate block"
                      >
                        ดูเอกสาร →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-gray-400 text-xl">📚</span>
                </div>
                <p className="text-gray-500 text-sm mb-3">ยังไม่มีเอกสารอ้างอิง</p>
                <Link 
                  href="/reference" 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  เพิ่มเอกสารอ้างอิง
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Main Content - PDF Viewer */}
        <div className="lg:col-span-3">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">เอกสารงานวิจัย</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>myresearch.pdf</span>
              </div>
            </div>

            {/* PDF Viewer Placeholder */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-red-600 text-3xl">📄</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  เอกสารงานวิจัย myresearch.pdf
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  เอกสารงานวิจัยหลักของนักศึกษา จะแสดงผลในรูปแบบ PDF viewer 
                  สำหรับให้ผู้เข้าชมสามารถอ่านและศึกษาได้
                </p>
                
                {/* Mock PDF Content Preview */}
                <div className="bg-white border rounded-lg shadow-sm p-6 max-w-2xl mx-auto text-left">
                  <div className="border-b pb-4 mb-4">
                    <h4 className="font-bold text-lg text-gray-800">หัวข้องานวิจัย</h4>
                    <p className="text-gray-600 mt-2">
                      การประยุกต์ใช้โมเดลภาษาขนาดใหญ่ (LLM) เพื่อคัดเลือกกลยุทธ์ Market Making แบบปรับตัวได้ในตลาดคริปโตเคอร์เรนซี โดยใช้ข้อมูลตลาดแบบบริบท
                    </p>
                  </div>
                  
                  <div className="space-y-3 text-sm text-gray-700">
                    <p><strong>นักศึกษา:</strong> นายจักรพันธุ์ ฤทธิแผลง</p>
                    <p><strong>รหัสนักศึกษา:</strong> 67130401</p>
                    <p><strong>อาจารย์ที่ปรึกษา:</strong> ผศ.ดร.ชัยพร เขมะภาตะพันธ์</p>
                    <div className="pt-3">
                      <p className="text-gray-600">
                        งานวิจัยนี้มุ่งพัฒนา Framework ที่ใช้ Large Language Models (LLMs) ในบทบาท “Meta-Strategy Selector” เพื่อเลือกและปรับค่ากลยุทธ์ Market Making ในตลาดคริปโต โดยผสานข้อมูลเชิงตัวเลข (order book, volatility) และข้อมูลบริบท (ข่าว, sentiment) เพื่อเพิ่มประสิทธิภาพและการอธิบายเหตุผล (explainability) ในการตัดสินใจ ผลการศึกษาเปรียบเทียบกับกลยุทธ์ baseline เช่น heuristic และ RL (AMSA) คาดว่าจะยืนยันว่า LLM สามารถปรับตัวต่อสภาวะตลาด dynamic ได้ดีกว่า และสร้างองค์ความรู้ใหม่ในการพัฒนา algorithmic trading ที่ฉลาดและยืดหยุ่นยิ่งขึ้น.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                  <button 
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/myresearch.pdf';
                      link.download = 'myresearch.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="btn-primary"
                  >
                    <span className="mr-2">📱</span>
                    ดาวน์โหลด PDF
                  </button>
                  <button 
                    onClick={() => {
                      window.open('/myresearch.pdf', '_blank');
                    }}
                    className="btn-secondary"
                  >
                    <span className="mr-2">🔍</span>
                    ดูแบบเต็มหน้าจอ
                  </button>
                </div>
              </div>
            </div>

            {/* Research Statistics */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">1</div>
                <div className="text-sm text-blue-700">งานวิจัยหลัก</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">{references.length}</div>
                <div className="text-sm text-green-700">เอกสารอ้างอิง</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">2025</div>
                <div className="text-sm text-purple-700">ปีที่ทำการวิจัย</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}