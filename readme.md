# Research Portfolio - Next.js Application

แอปพลิเคชันสำหรับจัดการและแสดงผลงานวิจัย เอกสารอ้างอิง และข้อมูลนักศึกษา พร้อม Traefik Reverse Proxy และ SSL อัตโนมัติ

## ✨ คุณสมบัติ

- 🏠 **หน้าแรก**: แสดงภาพรวมและเมนูนำทาง
- 👨‍🎓 **หน้าเกี่ยวกับ**: ข้อมูลนักศึกษาและประวัติการศึกษา
- 📚 **หน้างานวิจัย**: แสดงเอกสาร PDF และเอกสารอ้างอิง
- 📖 **หน้าเอกสารอ้างอิง**: จัดการเอกสารอ้างอิงด้วย CRUD operations
- 🎨 **ธีมการศึกษา**: UI/UX ที่เหมาะสำหรับงานวิจัยและการศึกษา
- 💾 **ฐานข้อมูล JSON**: เก็บข้อมูลในรูปแบบ JSON
- 🐳 **Docker & Traefik**: พร้อม reverse proxy และ SSL อัตโนมัติ

## 📁 โครงสร้างโปรเจค

```
research-portfolio/
├── app/                          # Next.js App Router
│   ├── about/page.tsx           # หน้าเกี่ยวกับนักศึกษา
│   ├── api/references/          # API สำหรับจัดการเอกสารอ้างอิง
│   ├── components/Navigation.tsx # เมนูนำทาง
│   ├── myresearch/page.tsx      # หน้าแสดงงานวิจัย
│   ├── reference/page.tsx       # หน้าจัดการเอกสารอ้างอิง
│   ├── globals.css              # Tailwind CSS
│   ├── layout.tsx               # Layout หลัก
│   └── page.tsx                 # หน้าแรก
├── data/                        # ฐานข้อมูล JSON
│   └── references.json          # เอกสารอ้างอิง
├── public/                      # Static files
│   └── myresearch.pdf          # ไฟล์ PDF งานวิจัย
├── letsencrypt/                 # SSL certificates (auto-generated)
├── docker-compose.yml           # Docker configuration
├── Dockerfile                   # Docker build instructions
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md                   # คู่มือการใช้งาน
```

## 🚀 การติดตั้งและใช้งาน

### 📋 ข้อกำหนดเบื้องต้น

- Docker และ Docker Compose
- Domain name ที่ชี้มาเซิร์ฟเวอร์
- Port 80 และ 443 เปิดอยู่

### 🔧 การติดตั้ง

1. **Clone โปรเจค**
```bash
git clone <repository-url>
cd research-portfolio
```

2. **สร้าง directories ที่จำเป็น**
```bash
mkdir -p data public letsencrypt
chmod 755 data letsencrypt
```

3. **วางไฟล์ PDF** (ถ้ามี)
```bash
# วาง myresearch.pdf ในโฟลเดอร์ public/
cp /path/to/your/research.pdf public/myresearch.pdf
```

4. **แก้ไข email ใน docker-compose.yml** (บรรทัดที่ 18)
```yaml
- --certificatesresolvers.letsencrypt.acme.email=your-email@domain.com
```

5. **แก้ไข domain ใน docker-compose.yml** (บรรทัดที่ 37)
```yaml
- "traefik.http.routers.research-portfolio.rule=Host(`your-domain.com`)"
```

### 🚀 เริ่มใช้งาน

```bash
# Build และรัน containers
docker-compose up -d --build

# ดู logs
docker-compose logs -f

# ตรวจสอบสถานะ
docker-compose ps
```

## 🌐 การเข้าถึง

- **แอปพลิเคชัน**: `https://your-domain.com`
- **HTTP**: `http://your-domain.com` (จะ redirect ไป HTTPS อัตโนมัติ)
- **Traefik Dashboard**: `http://server-ip:8080` (development only)

## 📖 API Documentation

### References API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/references` | ดึงรายการเอกสารอ้างอิงทั้งหมด |
| POST   | `/api/references` | เพิ่มเอกสารอ้างอิงใหม่ |
| GET    | `/api/references/[id]` | ดึงเอกสารอ้างอิงตาม ID |
| PUT    | `/api/references/[id]` | แก้ไขเอกสารอ้างอิง |
| DELETE | `/api/references/[id]` | ลบเอกสารอ้างอิง |

### Request/Response Format

**POST/PUT Request:**
```json
{
  "title": "A. Kumar, \"Machine Learning in Education,\" IEEE Trans., 2024.",
  "url": "https://example.com/paper.pdf"
}
```

**Response:**
```json
{
  "id": "uuid",
  "title": "...",
  "url": "...",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🔧 การจัดการ

### การดูข้อมูล
```bash
# ดู logs
docker-compose logs -f

# ดู logs เฉพาะ service
docker-compose logs -f research-portfolio
docker-compose logs -f traefik

# เข้าไปใน container
docker exec -it research-portfolio-app sh
docker exec -it traefik sh
```

### การ Backup ข้อมูล
```bash
# Backup ข้อมูลเอกสารอ้างอิง
cp data/references.json backup/references-$(date +%Y%m%d).json

# Backup SSL certificates
cp -r letsencrypt backup/letsencrypt-$(date +%Y%m%d)
```

### การ Restart
```bash
# Restart ทุก services
docker-compose restart

# Restart เฉพาะ service
docker-compose restart research-portfolio
docker-compose restart traefik
```

### การอัพเดต
```bash
# อัพเดต application
docker-compose up -d --build research-portfolio

# อัพเดต Traefik
docker-compose pull traefik
docker-compose up -d traefik
```

## 🛠️ การปรับแต่ง

### ข้อมูลนักศึกษา
แก้ไขในไฟล์ `app/about/page.tsx`:
```tsx
<p className="font-semibold text-gray-800">นายจักรพันธุ์ ฤทธิแผลง</p>
<p className="font-semibold text-gray-800">67130401</p>
```

### เปลี่ยนสีธีม
แก้ไขในไฟล์ `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'research': {
        // กำหนดสีใหม่
      }
    }
  }
}
```

### เพิ่มเมนู
แก้ไขในไฟล์ `app/components/Navigation.tsx`:
```tsx
const navItems = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/about', label: 'เกี่ยวกับ' },
  { href: '/myresearch', label: 'งานวิจัย' },
  { href: '/reference', label: 'เอกสารอ้างอิง' },
  // เพิ่มเมนูใหม่ที่นี่
]
```

## 🔒 ความปลอดภัย

### SSL Certificate
- ใช้ Let's Encrypt อัตโนมัติ
- ต่ออายุอัตโนมัติทุก 90 วัน
- เก็บใน `letsencrypt/acme.json`

### การป้องกัน
- HTTP to HTTPS redirect อัตโนมัติ
- Security headers
- Non-root user ใน container
- File permissions ที่เหมาะสม

## 📊 การ Monitor

### ตรวจสอบ SSL
```bash
# ตรวจสอบ certificate
openssl s_client -connect your-domain.com:443 -servername your-domain.com

# ตรวจสอบวันหมดอายุ
echo | openssl s_client -connect your-domain.com:443 2>/dev/null | openssl x509 -noout -dates
```

### ตรวจสอบ Performance
```bash
# ดู resource usage
docker stats

# ตรวจสอบ disk usage
du -sh data/ letsencrypt/ public/
```

## 🐛 การแก้ไขปัญหา

### ปัญหาที่พบบ่อย

1. **SSL Certificate ไม่ได้**
   - ตรวจสอบ DNS pointing
   - ตรวจสอบ firewall (port 80, 443)
   - ดู logs: `docker-compose logs traefik`

2. **API ไม่ทำงาน**
   - ตรวจสอบ permissions: `ls -la data/`
   - ดู logs: `docker-compose logs research-portfolio`

3. **PDF ไม่แสดง**
   - ตรวจสอบไฟล์: `ls -la public/myresearch.pdf`
   - ลองเข้า: `https://your-domain.com/myresearch.pdf`

### Debug Commands
```bash
# ตรวจสอบ network
docker network inspect research-portfolio_research-network

# ตรวจสอบ containers
docker-compose ps

# ดู configuration
docker inspect traefik
docker inspect research-portfolio-app
```

## 📞 การสนับสนุน

หากพบปัญหาหรือต้องการความช่วยเหลือ:

1. ตรวจสอบ logs ก่อน: `docker-compose logs -f`
2. ดู troubleshooting section ข้างบน
3. ตรวจสอบ GitHub Issues
4. ติดต่อผู้พัฒนา

## 📝 License

MIT License - ใช้งานได้อย่างอิสระ

---

## 🎯 Quick Start Commands

```bash
# Setup เริ่มต้น
mkdir -p data public letsencrypt
chmod 755 data letsencrypt

# แก้ไข domain และ email ใน docker-compose.yml
# your-domain.com และ your-email@domain.com

# เริ่มใช้งาน
docker-compose up -d --build

# ดู logs
docker-compose logs -f

# เข้าใช้งาน
# https://your-domain.com
```

**พร้อมใช้งาน!** 🎉