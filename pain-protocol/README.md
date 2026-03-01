# 통증 관리 프로토콜 / Pain Management Protocol

> **임상 통증 평가 및 WHO 계단식 처방 가이드 풀스택 웹 애플리케이션**  
> **Fullstack clinical pain assessment and WHO analgesic ladder prescription guide**

---

## ⚠️ 중요 고지 / IMPORTANT NOTICE

> 🏥 **이 소프트웨어는 공익적 목적으로만 사용해야 합니다.**  
> 🏥 **This software is intended for public interest purposes ONLY.**

| 한국어 | English |
|--------|---------|
| 이 시스템은 임상 교육, 공중 보건 연구, 비영리 의료 참조 용도로만 개발되었습니다. | This system is developed solely for clinical education, public health research, and non-commercial medical reference purposes. |
| 상업적 이용, 영리 목적 활용, 제약사 마케팅 도구로 사용하는 것을 엄격히 금지합니다. | Commercial use, profit-driven applications, and pharmaceutical marketing tools are strictly prohibited. |
| 이 정보는 전문 의료인의 임상적 판단을 대체할 수 없습니다. | This information cannot replace the clinical judgment of qualified healthcare professionals. |
| 처방 결정은 반드시 담당 의료인이 환자 개인 상황을 고려하여 내려야 합니다. | Prescribing decisions must be made by qualified clinicians considering each patient's individual circumstances. |
| 저자는 이 시스템의 사용으로 인한 어떠한 임상적 결과에도 책임을 지지 않습니다. | The authors assume no liability for any clinical outcomes resulting from use of this system. |

---

## 💡 아이디어 및 기여 / Idea & Contribution

| 항목 | 비율 | 설명 |
|------|------|------|
| **아이디어 / Concept** | **90%** | 의료 현장의 실제 필요에서 출발한 임상 아이디어, 프로토콜 구성 방향, 사용자 요구사항 정의 |
| **구현 / Implementation** | **10%** | Claude (Anthropic)가 코드 구현, UI/UX 설계, API 구조화를 지원 |

> 이 프로젝트의 핵심 가치와 임상적 방향성은 의료 현장의 아이디어에서 비롯되었습니다.  
> The core clinical value and direction of this project originated from real-world medical practice.

---

## 📋 프로젝트 소개 / About This Project

임상에서 실제로 사용할 수 있도록 설계된 통증 평가 및 처방 프로토콜 매뉴얼입니다.  
WHO 3단계 진통제 계단을 기반으로, NRS/VAS 점수에 따라 적절한 약물 처방 가이드를 제공합니다.

A clinically-oriented pain assessment and prescription protocol manual designed for real-world use. Based on the WHO 3-step analgesic ladder, it provides appropriate drug prescription guides according to NRS/VAS scores.

### 주요 기능 / Key Features

| 기능 | Feature |
|------|---------|
| 🎚️ NRS/VAS 인터랙티브 통증 평가 슬라이더 | Interactive NRS/VAS pain assessment slider |
| 🪜 WHO 3단계 진통제 계단 시각화 | WHO 3-step analgesic ladder visualization |
| 💊 단계별 처방 프로토콜 (Step 1–3) | Step-by-step prescribing protocols (Steps 1–3) |
| 🔍 약물명/성분명 실시간 검색 | Real-time drug name / generic name search |
| ⚖️ 오피오이드 동등 진통 용량표 + 전환 계산기 | Opioid equianalgesic table + conversion calculator |
| ✅ 처방 전 안전 체크리스트 | Pre-prescribing safety checklist |
| 📱 반응형 모바일 지원 | Responsive mobile support |
| 🔌 REST API 백엔드 | REST API backend |

---

## 🏗️ 기술 스택 / Tech Stack

### 프론트엔드 / Frontend
```
React 18 (Vite)
CSS Modules
Axios
IBM Plex Sans KR, DM Serif Display, IBM Plex Mono
```

### 백엔드 / Backend
```
Node.js + Express 4
helmet (보안 헤더 / Security headers)
express-rate-limit (Rate limiting)
cors, morgan
```

### 인프라 / Infrastructure
```
Docker + Docker Compose
Nginx (프론트엔드 서빙 / Frontend serving)
```

---

## 🚀 시작하기 / Getting Started

### 사전 요구 사항 / Prerequisites
- Node.js 18+ 
- npm 9+
- (선택) Docker & Docker Compose

### 로컬 개발 / Local Development

```bash
# 1. 저장소 클론 / Clone repository
git clone https://github.com/YOUR_USERNAME/pain-management-protocol.git
cd pain-management-protocol

# 2. 의존성 설치 / Install dependencies
npm run install:all

# 3. 개발 서버 시작 (백엔드 + 프론트엔드 동시) / Start dev servers
npm run dev
```

- 프론트엔드: http://localhost:3000
- 백엔드 API: http://localhost:3001
- API 헬스체크: http://localhost:3001/api/health

### Docker로 실행 / Run with Docker

```bash
docker-compose up -d
```

### 백엔드만 실행 / Backend Only

```bash
cd backend
npm install
npm start
```

---

## 📡 API 엔드포인트 / API Endpoints

| Method | Endpoint | 설명 / Description |
|--------|----------|-------------------|
| `GET` | `/api/health` | 헬스체크 / Health check |
| `GET` | `/api/protocols` | 전체 프로토콜 조회 / All protocols |
| `GET` | `/api/protocols/step/:step` | 단계별 조회 / By step (1–3) |
| `GET` | `/api/protocols/nrs/:score` | NRS 점수별 추천 / Recommendation by NRS score |
| `GET` | `/api/equianalgesic` | 동등 진통 용량표 / Equianalgesic table |
| `GET` | `/api/checklist` | 처방 전 체크리스트 / Pre-prescribing checklist |
| `GET` | `/api/drugs/search?q=` | 약물 검색 / Drug search |
| `GET` | `/api/who-ladder` | WHO 계단 요약 / WHO ladder summary |

### 예시 응답 / Example Response

```bash
GET /api/protocols/nrs/7
```

```json
{
  "nrsScore": 7,
  "vasEstimate": 67,
  "recommendation": {
    "step": 3,
    "label": "중증 통증 / Severe Pain",
    "color": "#ef4444",
    "message": "WHO Step 3: 강한 오피오이드 필요 / Strong opioid required.",
    "urgent": true,
    "drugs": [...]
  }
}
```

---

## 📖 임상 참조 / Clinical References

- **WHO** — Cancer Pain Relief (1986, 2nd ed. 1996)
- **IASP** — International Association for the Study of Pain Guidelines
- **대한통증학회** — Korean Pain Society Clinical Guidelines
- **식품의약품안전처** — Ministry of Food and Drug Safety (MFDS) Korea
- **Beers Criteria** — American Geriatrics Society 2023
- **ORT** — Webster LR & Webster RM, *Pain Medicine* 2005

---

## 🗂️ 프로젝트 구조 / Project Structure

```
pain-management-protocol/
├── backend/
│   ├── data/
│   │   └── pain-data.js          # 프로토콜 데이터 / Protocol data
│   ├── server.js                 # Express API 서버 / Express API server
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PainAssessor.jsx  # NRS/VAS 평가 / Assessment
│   │   │   ├── ProtocolView.jsx  # 처방 프로토콜 / Protocols
│   │   │   ├── WHOLadder.jsx     # WHO 계단 / WHO Ladder
│   │   │   ├── EquiTable.jsx     # 동등 용량표 / Equianalgesic
│   │   │   ├── Checklist.jsx     # 체크리스트 / Checklist
│   │   │   └── DrugSearch.jsx    # 약물 검색 / Drug search
│   │   ├── styles/
│   │   ├── utils/
│   │   │   └── api.js            # API 클라이언트 / API client
│   │   └── App.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## 🤝 기여 / Contributing

임상적으로 더 정확하고 유용한 정보가 있다면 Pull Request 또는 Issue를 통해 기여해 주세요.  
공익을 위한 기여를 환영합니다.

If you have clinically more accurate or useful information, please contribute via Pull Request or Issue.  
Contributions for the public good are welcome.

---

## 📄 라이선스 / License

**MIT License** — 단, 반드시 공익적 목적으로만 사용해야 합니다.  
**MIT License** — However, use is restricted to public interest purposes only.

```
Copyright (c) 2025 Pain Management Protocol Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software, provided that:

1. Use is limited to public interest, clinical education, non-profit health,
   and research purposes only.
2. Commercial use, pharmaceutical marketing, or profit-driven applications
   are strictly prohibited.
3. This software shall not replace professional medical judgment.
```

---

## ⚕️ 면책 조항 / Disclaimer

> 이 소프트웨어는 임상 교육 및 공익 참조 목적으로만 제공됩니다.  
> 의료 행위의 대체물이 아니며, 모든 처방 결정은 면허를 가진 의료 전문가가 내려야 합니다.  
> 저자 및 기여자는 이 소프트웨어 사용으로 인한 어떠한 임상적 결과에도 법적 책임을 지지 않습니다.

> This software is provided for clinical education and public interest reference purposes only.  
> It is not a substitute for medical practice. All prescribing decisions must be made by licensed healthcare professionals.  
> The authors and contributors assume no legal liability for any clinical outcomes resulting from use of this software.

---

<div align="center">

Made with ❤️ for public health / 공중 보건을 위해 제작됨

**아이디어 90% 의료 현장 · 구현 10% Claude (Anthropic)**

</div>
