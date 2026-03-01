// pain-data.js — Clinical Pain Protocol Reference Data
// Source: WHO, IASP, Korean Pain Society guidelines

const protocols = {
  step1: {
    level: 1,
    nrsRange: [1, 3],
    vasRange: [0, 30],
    label: "경증 통증 / Mild Pain",
    color: "#10b981",
    drugs: [
      {
        category: "1차 선택 / First-line",
        name: "아세트아미노펜 (Acetaminophen)",
        mechanism: "COX 비선택적 억제, 중추 작용",
        items: [
          { brand: "타이레놀 325mg", generic: "Acetaminophen 325mg", dose: "325–1000 mg", interval: "4–6시간마다 / q4–6h", maxDaily: "4,000 mg/day", route: "PO", notes: "간기능 저하 시 2,000 mg/일로 제한" },
          { brand: "타이레놀ER 650mg", generic: "Acetaminophen ER 650mg", dose: "650–1300 mg", interval: "8시간마다 / q8h", maxDaily: "4,000 mg/day", route: "PO", notes: "서방형 — 씹지 말 것" },
          { brand: "데노간 주 / Denogan Inj.", generic: "IV Acetaminophen 1000mg/100mL", dose: "1,000 mg", interval: "6시간마다 / q6h", maxDaily: "4,000 mg/day", route: "IV (15분 이상)", notes: "체중 50kg 미만: 15mg/kg" }
        ],
        warnings: ["알코올 다용, 간질환, 영양결핍: 최대 2,000 mg/일", "복합제 중복 투약 주의 (감기약, 진통복합제 등)"],
        contraindications: ["심한 간부전 (Child-Pugh C)"]
      },
      {
        category: "1차 선택 / First-line",
        name: "NSAIDs — 비선택적 / Non-selective",
        mechanism: "COX-1, COX-2 비선택적 억제 → PG 합성 감소",
        items: [
          { brand: "이부프로펜 / Ibuprofen", dose: "200–400 mg", interval: "4–6시간마다", maxDaily: "2,400 mg/day", route: "PO", notes: "식후 복용 권장" },
          { brand: "나프록센 / Naproxen", dose: "250–500 mg", interval: "8–12시간마다", maxDaily: "1,500 mg/day", route: "PO", notes: "반감기 길어 1일 2회 가능" },
          { brand: "디클로페낙 나트륨 / Diclofenac Na", dose: "50 mg", interval: "8시간마다", maxDaily: "150 mg/day", route: "PO (장용정)", notes: "공복 피함" },
          { brand: "케토로락 / Ketorolac", dose: "15–30 mg", interval: "6시간마다", maxDaily: "120 mg/day", route: "IV/IM", notes: "⚠️ 최대 5일 이내 사용" }
        ],
        warnings: ["65세 이상: PPI 병용 고려", "장기 사용 시 위장관 보호제 처방", "항응고제 복용 시 주의"],
        contraindications: ["위장관 출혈/궤양 병력", "eGFR <30", "심부전", "아스피린 알레르기", "임신 3기"]
      },
      {
        category: "COX-2 선택적",
        name: "COX-2 억제제 / COX-2 Inhibitors (Coxibs)",
        mechanism: "COX-2 선택적 억제 → 위장 부작용 감소",
        items: [
          { brand: "셀레콕시브 / Celecoxib", dose: "100–200 mg", interval: "12–24시간마다", maxDaily: "400 mg/day", route: "PO", notes: "아스피린 알레르기 시 주의" },
          { brand: "에토리콕시브 / Etoricoxib", dose: "60–120 mg", interval: "24시간마다", maxDaily: "120 mg/day", route: "PO", notes: "고혈압 조절 확인 필요" }
        ],
        warnings: ["심혈관 위험(MI, 뇌졸중) 증가 가능", "최단 기간·최소 유효 용량 사용"],
        contraindications: ["관상동맥질환", "뇌졸중 과거력", "중증 심부전"]
      },
      {
        category: "보조 진통제",
        name: "신경병증성 통증 보조제 / Adjuvants for Neuropathic Pain",
        items: [
          { brand: "가바펜틴 / Gabapentin", dose: "시작 100–300 mg hs → 300–1200 mg TID", interval: "TID", maxDaily: "3,600 mg/day", route: "PO", notes: "신장 기능에 따라 용량 조절" },
          { brand: "프레가발린 / Pregabalin", dose: "시작 25–75 mg hs → 150–300 mg BID", interval: "BID", maxDaily: "600 mg/day", route: "PO", notes: "당뇨병성 신경병증, 섬유근육통" },
          { brand: "아미트리프틸린 / Amitriptyline", dose: "시작 10 mg hs → 25–75 mg hs", interval: "hs (취침 전)", maxDaily: "150 mg/day", route: "PO", notes: "노인: 10–25 mg으로 제한" }
        ]
      }
    ]
  },
  step2: {
    level: 2,
    nrsRange: [4, 6],
    vasRange: [31, 60],
    label: "중등도 통증 / Moderate Pain",
    color: "#f59e0b",
    drugs: [
      {
        category: "1차 선택 / First-line",
        name: "트라마돌 (Tramadol)",
        mechanism: "μ-오피오이드 수용체 부분 작용 + SNRI 기전",
        items: [
          { brand: "트리돌 50mg (속효성)", generic: "Tramadol HCl 50mg", dose: "50–100 mg", interval: "4–6시간마다", maxDaily: "400 mg/day", route: "PO", notes: "초기 50 mg으로 시작 → 3일 후 증량" },
          { brand: "트리돌 SR 100mg (서방형)", dose: "100–200 mg", interval: "12시간마다", maxDaily: "400 mg/day", route: "PO", notes: "씹지 말고 통째로 삼킴" },
          { brand: "울트라셋 / Ultracet", generic: "Tramadol 37.5mg + Acetaminophen 325mg", dose: "1–2정", interval: "4–6시간마다", maxDaily: "8정/일", route: "PO", notes: "아세트아미노펜 총량 주의" }
        ],
        warnings: ["오심/구토: 초반 2–3일 가장 심함 → 메토클로프라미드 병용", "변비 예방 완하제 선제적 처방", "eGFR <30: 12시간 간격으로 조정"],
        contraindications: ["MAO 억제제 동시 사용 (세로토닌 증후군)", "조절되지 않는 간질", "심한 호흡 억제"]
      },
      {
        category: "대안 / Alternative",
        name: "코데인 (Codeine)",
        mechanism: "CYP2D6에 의해 모르핀으로 전환 (전구약물)",
        items: [
          { brand: "코데인 인산염 / Codeine Phosphate", dose: "15–60 mg", interval: "4–6시간마다", maxDaily: "360 mg/day", route: "PO", notes: "아세트아미노펜 병용 가능" }
        ],
        warnings: ["CYP2D6 poor metabolizer(~7–10%): 효과 없음", "Ultra-rapid metabolizer: 과다 모르핀 변환 위험"],
        contraindications: ["12세 이하 소아", "18세 미만 편도/아데노이드 수술 후"]
      },
      {
        category: "신경병증성 / Neuropathic",
        name: "SNRI / Duloxetine",
        items: [
          { brand: "둘록세틴 / Duloxetine", dose: "30 mg qd → 60 mg qd", interval: "1일 1회", maxDaily: "120 mg/day", route: "PO", notes: "당뇨병성 신경병증, 섬유근육통, 만성 요통" },
          { brand: "벤라팍신 / Venlafaxine", dose: "37.5 mg qd → 150 mg qd", interval: "1일 1회", maxDaily: "225 mg/day", route: "PO", notes: "혈압 모니터링" }
        ]
      },
      {
        category: "근이완제 / Muscle Relaxants",
        name: "근이완제 (단기 병용)",
        items: [
          { brand: "클로르족사존 / Chlorzoxazone", dose: "250–500 mg", interval: "TID–QID", maxDaily: "1,500 mg/day", route: "PO", notes: "졸음 주의 — 운전 금지" },
          { brand: "에페리손 / Eperisone", dose: "50–150 mg", interval: "TID", maxDaily: "150 mg/day", route: "PO", notes: "상대적으로 졸음 적음" },
          { brand: "티자니딘 / Tizanidine", dose: "2–4 mg", interval: "TID", maxDaily: "36 mg/day", route: "PO", notes: "간독성 모니터링, 항고혈압제 상호작용" }
        ],
        warnings: ["급성기(2–4주) 단기 사용 권장", "장기 사용 시 의존성 및 인지기능 저하"]
      }
    ]
  },
  step3: {
    level: 3,
    nrsRange: [7, 10],
    vasRange: [61, 100],
    label: "중증 통증 / Severe Pain",
    color: "#ef4444",
    drugs: [
      {
        category: "기준 약물 / Gold Standard",
        name: "모르핀 (Morphine)",
        mechanism: "μ-오피오이드 수용체 완전 작용제",
        items: [
          { brand: "MSIR (속효성)", generic: "Morphine Sulfate IR", dose: "5–15 mg PO / 2–5 mg IV/SC", interval: "4시간마다 (q4h)", maxDaily: "제한 없음 (개인화)", route: "PO / IV / SC", notes: "구제 용량: 4시간 용량의 1/6" },
          { brand: "MS Contin (서방형)", generic: "Morphine Sulfate CR", dose: "15–30 mg", interval: "12시간마다", maxDaily: "개인화", route: "PO", notes: "속효성과 병용, 씹지 말 것" },
          { brand: "모르핀 IV PCA", dose: "기저: 1–2 mg/h / Bolus: 1–2 mg", interval: "Lock-out: 10–15분", route: "IV PCA", notes: "SpO₂, 진정도 모니터링 필수" }
        ],
        warnings: ["신부전 eGFR<30: M6G 축적 → 50% 감량 또는 전환", "용량 적정: 24시간마다 25–50% 씩 증량 가능", "호흡억제 징후 모니터링"],
        contraindications: ["중증 호흡억제", "마비성 장폐색", "MAO 억제제 14일 이내 사용"]
      },
      {
        category: "일반 사용 / Commonly Used",
        name: "옥시코돈 (Oxycodone)",
        mechanism: "μ, κ-오피오이드 수용체 작용",
        items: [
          { brand: "옥시콘틴 CR (서방형)", dose: "10–80 mg", interval: "12시간마다", route: "PO", notes: "모르핀 경구 대비 1.5배 효력" },
          { brand: "옥시코돈 IR (속효성)", dose: "5–15 mg", interval: "4–6시간마다", route: "PO", notes: "구제 요법으로 사용" }
        ]
      },
      {
        category: "경피 투여 / Transdermal",
        name: "펜타닐 패치 (Fentanyl TDS)",
        items: [
          { brand: "듀로제식 패치 / Durogesic DTrans", dose: "12.5 / 25 / 50 / 75 / 100 μg/h", interval: "72시간마다 교체", route: "경피 (Transdermal)", notes: "25μg/h ≈ 경구 모르핀 90mg/일" }
        ],
        warnings: ["오피오이드 미경험자 초기 처방 금기", "발열, 열탕, 전기담요: 흡수율 급증", "악액질 환자: 흡수율 변동"],
        contraindications: ["오피오이드 naive 환자", "급성 통증", "수술 후 통증"]
      },
      {
        category: "응급 / Emergency",
        name: "정주 오피오이드 급속 적정 / IV Rapid Titration",
        items: [
          { brand: "모르핀 IV", dose: "초기: 0.05–0.1 mg/kg IV", interval: "15분마다 재평가 후 2–5 mg 추가", route: "IV Bolus", notes: "RR, SpO₂ 지속 모니터링" },
          { brand: "하이드로모르폰 IV / Hydromorphone", dose: "초기: 0.01–0.02 mg/kg IV", interval: "15분마다 0.5–1 mg 추가", route: "IV Bolus", notes: "모르핀 5–7배 효력 (IV)" },
          { brand: "펜타닐 IV / Fentanyl IV", dose: "0.5–1 μg/kg IV", interval: "10분마다 25–50 μg 추가", route: "IV Bolus", notes: "즉효성 — 의식 수준 모니터링" }
        ],
        warnings: ["날록손 비치 필수: 호흡수 <8회/분, SpO₂ <90%, 심한 진정 시 0.1 mg IV 투여"],
        antidote: { name: "날록손 / Naloxone", dose: "0.1 mg IV q2–3min", maxDose: "0.4–2 mg" }
      },
      {
        category: "부작용 관리 / Side Effect Management",
        name: "오피오이드 부작용 예방 처방",
        items: [
          { brand: "센나 + 도큐세이트 / Senna + Docusate", indication: "변비 예방 (필수)", dose: "센나 2정 BID", route: "PO", notes: "오피오이드 시작과 동시 처방" },
          { brand: "메토클로프라미드 / Metoclopramide", indication: "오심/구토", dose: "10 mg TID", route: "PO/IV", notes: "초기 2–3일, 이후 내성 형성 시 중단" },
          { brand: "하이드록시진 / Hydroxyzine", indication: "소양증", dose: "25 mg q6h PRN", route: "PO", notes: "진정 효과 주의" },
          { brand: "날록세골 / Naloxegol", indication: "OIC (오피오이드 유발 변비)", dose: "25 mg qd", route: "PO", notes: "기존 완하제 실패 시" }
        ]
      }
    ]
  }
};

const equianalgesicTable = [
  { drug: "모르핀 (Morphine)", po: "30 mg", iv: "10 mg", ratio: "3:1 (PO:IV)", notes: "기준 약물 / Reference", highlight: true },
  { drug: "코데인 (Codeine)", po: "200 mg", iv: "120 mg", ratio: "3:2", notes: "모르핀의 1/6 효력" },
  { drug: "트라마돌 (Tramadol)", po: "300 mg", iv: "300 mg", ratio: "1:1", notes: "일일 최대 용량 제한 중요" },
  { drug: "옥시코돈 (Oxycodone)", po: "20 mg", iv: "10 mg", ratio: "2:1", notes: "경구 생체이용률 60–87%" },
  { drug: "하이드로모르폰 (Hydromorphone)", po: "7.5 mg", iv: "1.5 mg", ratio: "5:1", notes: "모르핀 대비 5–7배 효력 (IV)" },
  { drug: "펜타닐 TDS", po: "—", iv: "0.1 mg (IV)", ratio: "—", notes: "25μg/h patch ≈ 경구 모르핀 60mg/일" },
  { drug: "부프레노르핀 TDS", po: "—", iv: "—", ratio: "—", notes: "5μg/h patch ≈ 경구 모르핀 12mg/일" },
  { drug: "메타돈 (Methadone)", po: "가변적", iv: "가변적", ratio: "가변적", notes: "⚠️ 전문가 상담 필수 — 반감기 매우 가변적" }
];

const checklist = {
  basic: [
    { id: "nrs", text: "통증 강도(NRS/VAS) 및 성격 평가", sub: "위치, 방사통, 악화/완화 요인, 양상(둔통/예리/작열감/박동성) 기록" },
    { id: "allergy", text: "알레르기 및 과민 반응 확인", sub: "NSAIDs, 아스피린, 오피오이드 알레르기 이력 조회" },
    { id: "renal", text: "신장 기능 확인 (eGFR/Cr)", sub: "eGFR <60: NSAIDs 주의 / eGFR <30: 오피오이드 용량 감량" },
    { id: "hepatic", text: "간 기능 확인 (AST/ALT/Bilirubin)", sub: "간기능 저하 시 아세트아미노펜 2,000 mg/일로 제한" },
    { id: "dur", text: "현재 복용 중인 약물 목록 확인 (DUR 조회)", sub: "MAO 억제제, 세로토닌 제제, 항응고제, CYP3A4/2D6 상호작용 확인" }
  ],
  opioid: [
    { id: "consent", text: "마약류 처방 자격 및 환자 동의서 확인", sub: "오피오이드 치료 계획, 위험/이익 설명 후 서면 동의" },
    { id: "ort", text: "ORT (Opioid Risk Tool) 시행", sub: "저위험(0–3점), 중위험(4–7점), 고위험(≥8점) 분류 및 기록" },
    { id: "benzo", text: "벤조디아제핀 동시 처방 여부 확인", sub: "오피오이드 + 벤조디아제핀: 호흡 억제 위험 2–4배 증가" },
    { id: "laxative", text: "변비 예방 완하제 처방 (선제적)", sub: "오피오이드 시작과 동시에 자극성 완하제(센나) 처방" },
    { id: "naloxone", text: "날록손 비치 및 가정 교육", sub: "중등도 이상 위험 환자: 날록손 처방 및 사용법 교육" },
    { id: "followup", text: "치료 목표 및 재평가 일정 설정", sub: "시작 후 24–72시간 내 재평가. 4주 후 정기 추적 관찰" }
  ],
  special: [
    { id: "elderly", text: "고령 환자(65세 이상) — Beers Criteria 확인", sub: "NSAIDs: PPI 병용. 오피오이드: 25–50% 감량 시작" },
    { id: "pregnancy", text: "임신/수유 여부 확인", sub: "임신 3기: NSAIDs 금기. 아세트아미노펜 1차 선택" },
    { id: "pediatric", text: "소아 환자 — 체중 기반 용량 계산", sub: "아세트아미노펜: 10–15 mg/kg. 이부프로펜: 5–10 mg/kg. 코데인: 12세 이하 금기" }
  ]
};

module.exports = { protocols, equianalgesicTable, checklist };
