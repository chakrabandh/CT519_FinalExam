import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">เกี่ยวกับนักศึกษา</h1>
        <p className="text-gray-600">ข้อมูลส่วนตัวและประวัติการศึกษา</p>
      </div>

      <div className="card">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Image */}
          <div className="md:col-span-1">
            <div className="relative">
              <div className="w-full aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl overflow-hidden shadow-lg">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <span className="text-white text-3xl font-bold">จ</span>
                    </div>
                    <p className="text-gray-600 text-sm">รูปภาพนักศึกษา</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student Information */}
          <div className="md:col-span-2">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">ข้อมูลส่วนตัว</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600">👤</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ชื่อ-นามสกุล</p>
                      <p className="font-semibold text-gray-800">นายจักรพันธุ์ ฤทธิแผลง</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600">🎓</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">รหัสนักศึกษา</p>
                      <p className="font-semibold text-gray-800">67130401</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-purple-600">🏫</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ภาควิชา</p>
                      <p className="font-semibold text-gray-800">วิศวกรรมคอมพิวเตอร์</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-yellow-600">📚</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">คณะ</p>
                      <p className="font-semibold text-gray-800">วิทยาลัยวิศวกรรมศาสตร์และเทคโนโลยี</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">ความสนใจด้านการวิจัย</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <span className="text-blue-700 font-medium">เทคโนโลยีสารสนเทศ</span>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <span className="text-green-700 font-medium">การพัฒนาซอฟต์แวร์</span>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <span className="text-purple-700 font-medium">ปัญญาประดิษฐ์</span>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <span className="text-yellow-700 font-medium">การวิเคราะห์ข้อมูล</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">ทักษะและความสามารถ</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">การเขียนโปรแกรม</span>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className={`w-3 h-3 rounded-full ${i <= 3 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">การวิจัยและวิเคราะห์</span>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className={`w-3 h-3 rounded-full ${i <= 4 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">การนำเสนอ</span>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className={`w-3 h-3 rounded-full ${i <= 4 ? 'bg-purple-500' : 'bg-gray-200'}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}