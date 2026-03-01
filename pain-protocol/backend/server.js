/**
 * Pain Management Protocol API Server
 * =====================================
 * ⚠️ 공익적 목적으로만 사용 / FOR PUBLIC INTEREST USE ONLY
 * This software is intended solely for clinical education,
 * public health, and non-commercial medical reference purposes.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const { protocols, equianalgesicTable, checklist } = require('./data/pain-data');

const app = express();
const PORT = process.env.PORT || 3001;

// ── MIDDLEWARE ──
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'] }));
app.use(express.json());
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use('/api/', limiter);

// ── PUBLIC INTEREST DISCLAIMER MIDDLEWARE ──
app.use((req, res, next) => {
  res.setHeader('X-Clinical-Disclaimer', 'For clinical reference and public interest use only. Not a substitute for professional medical judgment.');
  next();
});

// ── ROUTES ──

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Pain Management Protocol API',
    disclaimer: '⚠️ For clinical reference and public interest use only',
    timestamp: new Date().toISOString()
  });
});

// Get all protocols
app.get('/api/protocols', (req, res) => {
  res.json({
    data: Object.values(protocols),
    meta: {
      source: 'WHO Pain Ladder, Korean Pain Society, IASP Guidelines',
      lastUpdated: '2025-01',
      disclaimer: '이 정보는 임상 참조용이며 전문 의료인의 판단을 대체할 수 없습니다.'
    }
  });
});

// Get protocol by step
app.get('/api/protocols/step/:step', (req, res) => {
  const step = parseInt(req.params.step);
  const key = `step${step}`;
  if (!protocols[key]) return res.status(404).json({ error: 'Protocol step not found' });
  res.json({ data: protocols[key] });
});

// Get protocol by NRS score
app.get('/api/protocols/nrs/:score', (req, res) => {
  const score = parseInt(req.params.score);
  if (isNaN(score) || score < 0 || score > 10) {
    return res.status(400).json({ error: 'NRS score must be 0–10' });
  }

  let step = null;
  let recommendation = {};

  if (score === 0) {
    recommendation = {
      step: 0, label: '통증 없음 / No Pain', color: '#6ee7b7',
      message: '현재 약물 처방이 필요하지 않습니다. / No medication required at this time.',
      drugs: []
    };
  } else if (score <= 3) {
    step = protocols.step1;
    recommendation = {
      step: 1, ...step,
      message: 'WHO Step 1: 비오피오이드 단독 치료 / Non-opioid monotherapy recommended'
    };
  } else if (score <= 6) {
    step = protocols.step2;
    recommendation = {
      step: 2, ...step,
      message: 'WHO Step 2: 약한 오피오이드 + 비오피오이드 병용 / Weak opioid + non-opioid combination'
    };
  } else {
    step = protocols.step3;
    recommendation = {
      step: 3, ...step,
      message: 'WHO Step 3: 강한 오피오이드 필요 / Strong opioid required. Immediate reassessment recommended.',
      urgent: true
    };
  }

  res.json({ nrsScore: score, vasEstimate: Math.round(score * 9.5), recommendation });
});

// Get equianalgesic table
app.get('/api/equianalgesic', (req, res) => {
  res.json({
    data: equianalgesicTable,
    note: '동등 용량은 참고치입니다. 오피오이드 전환 시 25–50% 감량 후 시작하십시오. / Equianalgesic doses are approximate. Reduce by 25–50% when rotating opioids due to incomplete cross-tolerance.'
  });
});

// Get checklist
app.get('/api/checklist', (req, res) => {
  res.json({ data: checklist });
});

// Search drugs by name
app.get('/api/drugs/search', (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  if (!query) return res.status(400).json({ error: 'Query parameter q is required' });

  const results = [];
  Object.values(protocols).forEach(p => {
    p.drugs.forEach(cat => {
      cat.items?.forEach(item => {
        const name = (item.brand + ' ' + (item.generic || '')).toLowerCase();
        if (name.includes(query)) {
          results.push({ ...item, category: cat.name, step: p.level, stepLabel: p.label });
        }
      });
    });
  });

  res.json({ query, results, count: results.length });
});

// WHO ladder summary
app.get('/api/who-ladder', (req, res) => {
  res.json({
    data: [
      { step: 1, nrsRange: "1–3", label: "경증 / Mild", drugs: "아세트아미노펜, NSAIDs, COX-2 억제제", color: "#10b981" },
      { step: 2, nrsRange: "4–6", label: "중등도 / Moderate", drugs: "트라마돌, 코데인 + 비오피오이드", color: "#f59e0b" },
      { step: 3, nrsRange: "7–10", label: "중증 / Severe", drugs: "모르핀, 옥시코돈, 펜타닐, 하이드로모르폰", color: "#ef4444" }
    ],
    principles: [
      "By mouth (구강 투여 우선)",
      "By the clock (규칙적 시간 투여)",
      "By the ladder (단계적 접근)",
      "For the individual (개인 맞춤)"
    ]
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`\n🩺  Pain Protocol API running on http://localhost:${PORT}`);
  console.log(`⚠️  FOR PUBLIC INTEREST / CLINICAL USE ONLY\n`);
});

module.exports = app;
