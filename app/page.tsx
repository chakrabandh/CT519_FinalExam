import Link from 'next/link'

export default function HomePage() {
  const menuItems = [
    {
      title: 'เกี่ยวกับนักศึกษา',
      description: 'ข้อมูลส่วนตัวและประวัติการศึกษา',
      href: '/about',
      icon: '👨‍🎓',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'งานวิจัยของฉัน',
      description: 'เอกสารงานวิจัยและโครงงาน',
      href: '/myresearch',
      icon: '📚',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'เอกสารอ้างอิง',
      description: 'จัดการและแสดงเอกสารอ้างอิง',
      href: '/reference',
      icon: '📖',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6">
          <span className="text-3xl text-white">🔬</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          ยินดีต้อนรับสู่ Research Portfolio
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          แพลตฟอร์มสำหรับจัดการและแสดงผลงานวิจัย เอกสารอ้างอิง และข้อมูลนักศึกษา
        </p>
      </div>

      {/* Menu Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href} className="group">
            <div className="card group-hover:scale-105 transform transition-all duration-300">
              <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-center mt-4 text-blue-600 font-medium">
                <span>เข้าดู</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Features Section */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">คุณสมบัติของระบบ</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg inline-flex items-center justify-center mb-3">
              <span className="text-blue-600 text-xl">📊</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">จัดการข้อมูล</h4>
            <p className="text-sm text-gray-600">จัดเก็บและจัดการข้อมูลอย่างเป็นระบบ</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg inline-flex items-center justify-center mb-3">
              <span className="text-green-600 text-xl">🔍</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">แสดงผล PDF</h4>
            <p className="text-sm text-gray-600">อ่านและแสดงเอกสาร PDF ในระบบ</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg inline-flex items-center justify-center mb-3">
              <span className="text-purple-600 text-xl">✏️</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">CRUD Operations</h4>
            <p className="text-sm text-gray-600">เพิ่ม แก้ไข ลบ ข้อมูลอ้างอิง</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg inline-flex items-center justify-center mb-3">
              <span className="text-yellow-600 text-xl">🎨</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">UI/UX ที่สวยงาม</h4>
            <p className="text-sm text-gray-600">ออกแบบเพื่อการใช้งานที่ง่าย</p>
          </div>
        </div>
      </div>
    </div>
  )
}