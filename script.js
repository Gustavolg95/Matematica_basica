const topics = [
  { id: 'fracoes', label: 'Frações' },
  { id: 'mdcmmc', label: 'MDC e MMC' },
  { id: 'potenciacao', label: 'Potenciação/Raiz' },
  { id: 'segundograu', label: '2º grau' },
  { id: 'videos', label: 'Vídeos' },
  { id: 'quiz', label: 'Quiz' },
];

const nav = document.getElementById('nav');

topics.forEach((t, i) => {
  const btn = document.createElement('button');
  btn.textContent = t.label;
  btn.dataset.target = t.id;
  if (i === 0) btn.classList.add('active');
  btn.onclick = () => switchTo(t.id);
  nav.appendChild(btn);
});

function switchTo(id) {
  document.querySelectorAll('nav button').forEach(b => b.classList.toggle('active', b.dataset.target === id));
  document.querySelectorAll('section.topic').forEach(s => s.classList.toggle('active', s.id === id));
}

switchTo('fracoes');

// flip cards data
const flipData = {
  'grid-fracoes': [
    { front: '2/3 + 1/4 = ?', back: '11/12 → (2·4 + 3·1)/(3·4) = 11/12' },
    { front: '3/5 × 2/7 = ?', back: '6/35 → multiplica reto' },
    { front: '4/9 ÷ 2/3 = ?', back: '2/3 → copia 4/9, inverte 3/2, multiplica = 12/18 = 2/3' },
  ],
  'grid-mdcmmc': [
    { front: 'MDC(12,18) = ?', back: '6 → fatores comuns: 2×3' },
    { front: 'MMC(4,6) = ?', back: '12 → menor múltiplo comum' },
    { front: 'MDC×MMC de 8 e 12', back: '8×12=96 → se MDC=4, então MMC=24 (96÷4)' },
  ],
  'grid-potenciacao': [
    { front: '2³ · 2⁴ = ?', back: '2⁷ = 128 → soma os expoentes' },
    { front: '5⁻² = ?', back: '1/25 → inverte e vira positivo' },
    { front: '√50 simplificado', back: '5√2 → 50 = 25·2, raiz de 25 é 5' },
  ],
  'grid-segundograu': [
    { front: 'x² − 7x + 12 = 0', back: 'x=3 e x=4 → soma 7, produto 12' },
    { front: 'x² − 9 = 0', back: 'x=3 e x=−3 → x²=9, raiz dos dois lados' },
    { front: '2x² − 8x = 0', back: 'x=0 e x=4 → x(2x−8)=0' },
  ],
};

Object.entries(flipData).forEach(([gridId, cards]) => {
  const grid = document.getElementById(gridId);
  cards.forEach(c => {
    const card = document.createElement('div');
    card.className = 'flip-card';
    card.innerHTML = `<div class="flip-inner">
      <div class="flip-face flip-front"><span>${c.front}</span><div class="flip-hint">toque para ver a resposta</div></div>
      <div class="flip-face flip-back">${c.back}</div>
    </div>`;
    card.onclick = () => card.classList.toggle('flipped');
    grid.appendChild(card);
  });
});

// videos
const videos = [
  { t: 'Frações em 11 minutos (soma, subtração, multiplicação, divisão)', u: 'https://www.youtube.com/watch?v=BWFnqKYxgMo' },
  { t: 'Divisão de frações — macete em 5 segundos', u: 'https://www.youtube.com/watch?v=xIrFhblnYBE' },
  { t: 'MMC e MDC em 1 minuto', u: 'https://www.youtube.com/watch?v=O4DqgH8JMm0' },
  { t: 'MMC e MDC — dica rápida (Matemática Rio)', u: 'https://www.youtube.com/watch?v=Ao7Sz3gdmNY' },
  { t: 'Potenciação e Radiciação — resumão', u: 'https://www.youtube.com/watch?v=m-_sIVXNnXU' },
  { t: 'Equação do 2º grau sem Bhaskara — soma e produto', u: 'https://www.youtube.com/watch?v=6iUnNKlCLoU' },
];

const vl = document.getElementById('video-list');
videos.forEach(v => {
  const li = document.createElement('li');
  li.innerHTML = `<a href="${v.u}" target="_blank" style="color:#f2c94c;">${v.t}</a>`;
  vl.appendChild(li);
});

// quiz
const quizData = [
  { q: '3/4 + 1/2 = ?', opts: ['5/4', '4/6', '1 1/4', '3/6'], a: 0 },
  { q: '5/6 ÷ 1/3 = ?', opts: ['5/18', '5/2', '2 1/2', '15/6'], a: 1 },
  { q: 'MMC(6, 8) = ?', opts: ['48', '24', '14', '2'], a: 1 },
  { q: 'MDC(15, 20) = ?', opts: ['5', '60', '3', '1'], a: 0 },
  { q: '2⁵ ÷ 2² = ?', opts: ['2³', '2⁷', '4', '1'], a: 0 },
  { q: '(3²)³ = ?', opts: ['3⁵', '3⁶', '9⁶', '729²'], a: 1 },
  { q: 'x² − 6x + 8 = 0, quais raízes?', opts: ['2 e 4', '1 e 8', '−2 e −4', '3 e 5'], a: 0 },
  { q: 'x² − 16 = 0, valores de x?', opts: ['x=8', 'x=4 e x=−4', 'x=16', 'x=−16'], a: 1 },
];

let qIndex = 0, score = 0;
const quizArea = document.getElementById('quiz-area');

function renderQuiz() {
  if (qIndex >= quizData.length) {
    quizArea.innerHTML = `<div class="score-screen">
      <div class="big">${score}/${quizData.length}</div>
      <p>${score === quizData.length ? 'Show! Você tá pronto.' : score >= quizData.length * 0.6 ? 'Bom ritmo — reforce os que errou.' : 'Revise as colas acima antes da prova.'}</p>
      <button class="restart-btn" id="restart">Refazer quiz</button>
    </div>`;
    document.getElementById('restart').onclick = () => { qIndex = 0; score = 0; renderQuiz(); };
    return;
  }
  
  const item = quizData[qIndex];
  quizArea.innerHTML = `
    <div class="quiz-progress">Questão ${qIndex + 1} de ${quizData.length} · acertos: ${score}</div>
    <div class="q-card">
      <h3>${item.q}</h3>
      <div class="opts" id="opts"></div>
      <div class="quiz-footer">
        <span></span>
        <button class="next-btn" id="nextBtn">Próxima →</button>
      </div>
    </div>`;

  const optsEl = document.getElementById('opts');
  item.opts.forEach((opt, i) => {
    const b = document.createElement('button');
    b.className = 'opt';
    b.textContent = opt;
    b.onclick = () => {
      document.querySelectorAll('.opt').forEach(o => o.disabled = true);
      if (i === item.a) { 
        b.classList.add('correct'); 
        score++; 
      } else {
        b.classList.add('wrong');
        optsEl.children[item.a].classList.add('correct');
      }
      document.getElementById('nextBtn').style.display = 'inline-block';
    };
    optsEl.appendChild(b);
  });

  document.getElementById('nextBtn').onclick = () => { qIndex++; renderQuiz(); };
}

renderQuiz();