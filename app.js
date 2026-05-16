'use strict';

// ===== THEME =====
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.body.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ===== NAVIGATION =====
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

function showSection(id) {
  sections.forEach(s => s.classList.remove('active'));
  navBtns.forEach(b => b.classList.remove('active'));
  const sec = document.getElementById('section-' + id);
  if (sec) sec.classList.add('active');
  const btn = document.querySelector(`.nav-btn[data-section="${id}"]`);
  if (btn) btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navBtns.forEach(btn => {
  btn.addEventListener('click', () => showSection(btn.dataset.section));
});

// Home cards
document.querySelectorAll('.home-card[data-goto]').forEach(card => {
  card.addEventListener('click', () => showSection(card.dataset.goto));
});

// ===== CONTROL TABS =====
document.querySelectorAll('.ctrl-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ctrl-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.ctrl-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('ctrl-' + tab.dataset.ctrl);
    if (panel) panel.classList.add('active');
  });
});

// ===== CLEANING TABS =====
document.querySelectorAll('.clean-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.clean-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.clean-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('clean-' + tab.dataset.clean);
    if (panel) panel.classList.add('active');
  });
});

// ===== MODES DATA =====
const modesData = {
  off: {
    icon: '○', name: 'Положение «Выкл»',
    desc: 'Духовой шкаф полностью отключён.',
    params: []
  },
  fast: {
    icon: '⚡', name: 'Быстрый нагрев',
    desc: 'Сокращает время разогрева до заданной температуры. Не ставьте продукты в духовку во время работы этого режима.',
    params: [
      { label: 'Совет', val: 'Без продуктов' },
      { label: 'После', val: 'Выбрать режим' }
    ]
  },
  convection: {
    icon: '🌀', name: 'Горячий воздух',
    desc: 'Одновременное выпекание, жарка и высушивание на трёх уровнях. Идеально для нескольких противней одновременно.',
    params: [
      { label: 'Температура', val: 'На 20–40°C ниже' },
      { label: 'Уровни', val: '1, 3 и 5' }
    ]
  },
  pizza: {
    icon: '🍕', name: 'Функция Пицца',
    desc: 'Специальный режим для пиццы с интенсивным нижним нагревом. Обеспечивает хрустящую нижнюю корочку и интенсивное подрумянивание.',
    params: [
      { label: 'Температура', val: '230–250°C' },
      { label: 'Уровень', val: '1-й' }
    ]
  },
  traditional: {
    icon: '🟥', name: 'Традиционное приготовление',
    desc: 'Классический режим с нагревом сверху и снизу. Для выпекания и жарки продуктов на одном уровне.',
    params: [
      { label: 'Уровень', val: '2-й' },
      { label: 'Тип', val: 'Один уровень' }
    ]
  },
  defrost: {
    icon: '❄️', name: 'Размораживание',
    desc: 'Мягкое размораживание без нагрева. Время зависит от объёма и размера замороженных продуктов.',
    params: [
      { label: 'Нагрев', val: 'Без нагрева' },
      { label: 'Продукты', val: 'Овощи, фрукты' }
    ]
  },
  moist: {
    icon: '💧', name: 'Влажная конвекция',
    desc: 'Режим экономии электроэнергии. Использует остаточное тепло. Лампа выключается через 30 сек. Температура внутри может отличаться от заданной.',
    params: [
      { label: 'Лампа', val: 'Выкл через 30с' },
      { label: 'Стандарт', val: 'EU 65/2014' }
    ]
  },
  hotairplus: {
    icon: '💧🌀', name: 'Горячий воздух ПЛЮС',
    desc: 'Пар + конвекция. Повышает влажность при приготовлении. Сочность при разогреве. Хрустящая корочка при выпечке.',
    params: [
      { label: 'Вода', val: '150–200 мл' },
      { label: 'Уровень', val: '2-й' }
    ]
  },
  grill: {
    icon: '🔆', name: 'Гриль',
    desc: 'Приготовление на гриле тонких продуктов и тостов. Используйте максимальную температуру. Предварительно разогрейте.',
    params: [
      { label: 'Температура', val: 'Максимум' },
      { label: 'Уровень', val: '4-й' }
    ]
  },
  turbogrill: {
    icon: '🔥', name: 'Турбо-гриль',
    desc: 'Жарка крупных кусков мяса или птицы с костями. Приготовление гратенов и обжаривание. Предварительно разогрейте.',
    params: [
      { label: 'Уровень', val: '1–2-й' },
      { label: 'Время', val: '× толщину см' }
    ]
  },
  pyro: {
    icon: '🛡️', name: 'Пиролитическая очистка',
    desc: '⚠️ Высокотемпературная очистка. Удалите ВСЕ принадлежности. Уберите животных. Обеспечьте вентиляцию.',
    params: [
      { label: 'P1 Лёгкая', val: '1 ч 30 мин' },
      { label: 'P2 Нормальная', val: '2 ч 30 мин' }
    ]
  }
};

// Mode cards click
document.querySelectorAll('.mode-card').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.dataset.mode;
    const data = modesData[key];
    if (!data) return;
    document.getElementById('overlayIcon').textContent = data.icon;
    document.getElementById('overlayName').textContent = data.name;
    document.getElementById('overlayDesc').textContent = data.desc;
    const paramsEl = document.getElementById('overlayParams');
    paramsEl.innerHTML = data.params.map(p =>
      `<div class="overlay-param"><span class="p-label">${p.label}</span><span class="p-val">${p.val}</span></div>`
    ).join('');
    document.getElementById('modeOverlay').classList.add('visible');
  });
});

document.getElementById('overlayClose').addEventListener('click', () => {
  document.getElementById('modeOverlay').classList.remove('visible');
});
document.getElementById('modeOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    e.currentTarget.classList.remove('visible');
  }
});

// ===== CHEF DATA =====
const chefData = {
  baking: [
    {
      emoji: '🥐', name: 'Круассаны', hint: 'слоёное тесто',
      mode: 'Горячий воздух', temp: '150–170°C', level: '3-й', time: '15–25 мин',
      tips: '💡 Предварительный разогрев не требуется. Используйте эмалированный противень.'
    },
    {
      emoji: '🍰', name: 'Бисквитный торт', hint: 'форма Ø26 см',
      mode: 'Горячий воздух', temp: '150°C', level: '2-й', time: '40–50 мин',
      tips: '💡 Предварительно разогрейте духовку 10 мин. Не открывайте дверцу первые 3/4 времени.'
    },
    {
      emoji: '🧁', name: 'Маффины (12 шт)', hint: 'глубокий противень',
      mode: 'Горячий воздух', temp: '150–160°C', level: '3-й', time: '20–30 мин',
      tips: '💡 Предварительно разогрейте пустой духовой шкаф. Используйте глубокий противень.'
    },
    {
      emoji: '🍪', name: 'Печенье (20 шт)', hint: 'эмалированный противень',
      mode: 'Горячий воздух', temp: '140–150°C', level: '3-й', time: '25–45 мин',
      tips: '💡 Для двух уровней: используйте 2-й и 4-й. Равномерное пропекание.'
    },
    {
      emoji: '🍞', name: 'Белый хлеб', hint: '1–2 батона по 0.5 кг',
      mode: 'Традиционное', temp: '190°C', level: '1-й', time: '60–70 мин',
      tips: '💡 Предварительно разогрейте. Для влажной корочки используйте Горячий воздух ПЛЮС.'
    },
    {
      emoji: '🥖', name: 'Булочки (6–8 шт)', hint: 'глубокий противень',
      mode: 'Горячий воздух', temp: '180°C', level: '2-й', time: '25–40 мин',
      tips: '💡 Предварительный разогрев. Для 2 уровней: 2-й и 4-й.'
    },
    {
      emoji: '🎂', name: 'Торт с фруктами', hint: 'форма Ø24 см',
      mode: 'Горячий воздух', temp: '150°C', level: '2-й', time: '110–120 мин',
      tips: '💡 Предварительно разогрейте пустой духовой шкаф. Много фруктов → долгое запекание.'
    },
    {
      emoji: '🥧', name: 'Открытый пирог', hint: 'форма Ø20 см',
      mode: 'Горячий воздух', temp: '170°C', level: '2-й', time: '45–70 мин',
      tips: '💡 Для хрустящей основы используйте нижний нагрев первые 15 мин.'
    }
  ],
  meat: [
    {
      emoji: '🥩', name: 'Говядина / Ростбиф', hint: 'средняя прожарка',
      mode: 'Горячий воздух', temp: '190°C', level: '2-й', time: '50–70 мин',
      tips: '💡 После приготовления выдержите 15 мин перед нарезкой — сохранит сочность. Налейте немного воды в противень против дыма.'
    },
    {
      emoji: '🍗', name: 'Цыплёнок целиком', hint: '~1–1.5 кг',
      mode: 'Горячий воздух', temp: '200°C', level: '2-й', time: '70–85 мин',
      tips: '💡 Используйте турбо-гриль для золотистой корочки в конце. Кладите на решетку грудкой вверх.'
    },
    {
      emoji: '🦃', name: 'Индейка целиком', hint: '~2.5–3.5 кг',
      mode: 'Горячий воздух', temp: '160°C', level: '2-й', time: '210–240 мин',
      tips: '💡 Прикройте фольгой первые 2 часа, затем снимите для подрумянивания. Поливайте соком каждые 30 мин.'
    },
    {
      emoji: '🦆', name: 'Утка целиком', hint: '~1.5–2 кг',
      mode: 'Турбо-гриль', temp: '220°C', level: '2-й', time: '120–150 мин',
      tips: '💡 Несколько раз проколите кожу для вытапливания жира. Рекомендуется перевернуть на половине приготовления.'
    },
    {
      emoji: '🐑', name: 'Нога ягнёнка', hint: '~1–1.5 кг',
      mode: 'Горячий воздух', temp: '175°C', level: '2-й', time: '110–130 мин',
      tips: '💡 Нашпигуйте чесноком и розмарином. Дайте отдохнуть 20 мин после приготовления.'
    },
    {
      emoji: '🥩', name: 'Телятина', hint: 'жаркое, ~1 кг',
      mode: 'Турбо-гриль', temp: '160–180°C', level: '1–2-й', time: '90–120 мин',
      tips: '💡 Для нежного результата используйте более низкую температуру и дольше запекайте.'
    },
    {
      emoji: '🍖', name: 'Говяжий стейк (4 шт)', hint: 'на гриле',
      mode: 'Гриль', temp: 'Максимум', level: '4-й', time: '10–12 / 6–8 мин',
      tips: '💡 Предварительно разогрейте 3 мин. Переверните после первой половины. Поместите поддон уровнем ниже.'
    },
    {
      emoji: '🍗', name: 'Куриная грудка (4 шт)', hint: 'гриль',
      mode: 'Гриль', temp: 'Максимум', level: '4-й', time: '12–15 мин каждая',
      tips: '💡 Предварительно разогрейте гриль 3 мин. Грудки ~0.4 кг — переверните на середине.'
    }
  ],
  fish: [
    {
      emoji: '🐟', name: 'Форель / Морской лещ', hint: '3–4 рыбы',
      mode: 'Горячий воздух', temp: '175°C', level: '2-й', time: '40–55 мин',
      tips: '💡 Смажьте рыбу оливковым маслом, добавьте лимон и зелень. Дно слегка смажьте маслом.'
    },
    {
      emoji: '🐠', name: 'Тунец / Лосось', hint: '4–6 кусочков филе',
      mode: 'Горячий воздух', temp: '175°C', level: '2-й', time: '35–60 мин',
      tips: '💡 Используйте маринад. Не пересушите — рыба готова, когда легко расслаивается вилкой.'
    },
    {
      emoji: '🐡', name: 'Рыба на пару (целая)', hint: '1–1.5 кг',
      mode: 'Горячий воздух ПЛЮС', temp: '210–220°C', level: '2-й', time: '40–60 мин',
      tips: '💡 Налейте 200 мл воды в выемку. Сочная рыба с минимальным использованием масла.'
    },
    {
      emoji: '🦐', name: 'Рыбное филе на гриле', hint: '4 шт, ~0.4 кг',
      mode: 'Гриль', temp: 'Максимум', level: '4-й', time: '12–14 / 10–12 мин',
      tips: '💡 Предварительно разогрейте 3 мин. Лёгкое маринование в лимонном соке.'
    }
  ],
  pizza: [
    {
      emoji: '🍕', name: 'Пицца', hint: 'глубокий противень или форма',
      mode: 'Функция Пицца', temp: '230–250°C', level: '1-й', time: '10–20 мин',
      tips: '💡 Предварительно разогрейте! Хрустящая корочка снизу — отличительная черта этого режима.'
    },
    {
      emoji: '🍕', name: 'Замороженная пицца (0.35 кг)', hint: 'влажная конвекция',
      mode: 'Влажная конвекция', temp: '220°C', level: '2-й', time: '10–15 мин',
      tips: '💡 Используйте решетку. Разморозка не требуется — прямо из морозилки.'
    },
    {
      emoji: '🫓', name: 'Фокачча', hint: 'эмалированный противень',
      mode: 'Горячий воздух ПЛЮС', temp: '200–210°C', level: '2-й', time: '10–20 мин',
      tips: '💡 Налейте 150 мл воды. Пышная и влажная внутри, хрустящая снаружи.'
    },
    {
      emoji: '🥙', name: 'Лепёшки из песочного теста', hint: 'глубокий противень',
      mode: 'Горячий воздух', temp: '190°C', level: '3-й', time: '10–20 мин',
      tips: '💡 Предварительно разогрейте духовой шкаф.'
    }
  ],
  frozen: [
    {
      emoji: '🍕', name: 'Замороженная пицца', hint: 'прямо из морозилки',
      mode: 'Горячий воздух ПЛЮС', temp: '200–210°C', level: '2-й', time: '10–20 мин',
      tips: '💡 Налейте 200 мл воды. Хрустящая корочка сохраняется.'
    },
    {
      emoji: '🥐', name: 'Замороженные круассаны', hint: '170–180°C',
      mode: 'Горячий воздух', temp: '170–180°C', level: '3-й', time: '15–25 мин',
      tips: '💡 Разморозка не требуется. Выпекайте прямо из морозилки для лучшего слоения.'
    },
    {
      emoji: '🍝', name: 'Замороженная лазанья', hint: 'форма для запекания',
      mode: 'Горячий воздух ПЛЮС', temp: '180–200°C', level: '2-й', time: '35–50 мин',
      tips: '💡 Налейте 200 мл воды. Накройте фольгой первые 20 мин, затем снимите для корочки.'
    },
    {
      emoji: '🍗', name: 'Разморозка цыплёнка (1 кг)', hint: 'режим разморозки',
      mode: 'Размораживание', temp: 'Без нагрева', level: 'Любой', time: '100–140 мин',
      tips: '💡 Выложите на перевёрнутое блюдце. Переверните на половине. Доморозка 20–30 мин после.'
    },
    {
      emoji: '🥩', name: 'Разморозка мяса (0.5–1 кг)', hint: 'режим разморозки',
      mode: 'Размораживание', temp: 'Без нагрева', level: 'Любой', time: '90–140 мин',
      tips: '💡 Переверните на половине времени. Дайте постоять 20–30 мин после размораживания.'
    }
  ],
  reheat: [
    {
      emoji: '🍕', name: 'Разогрев пиццы', hint: 'Горячий воздух ПЛЮС',
      mode: 'Горячий воздух ПЛЮС', temp: '110°C', level: '2-й', time: '15–25 мин',
      tips: '💡 Налейте 100 мл воды. Пицца будет как свежая — хрустящая корочка, сочная начинка.'
    },
    {
      emoji: '🍖', name: 'Разогрев мяса', hint: 'восстановление сочности',
      mode: 'Горячий воздух ПЛЮС', temp: '110°C', level: '2-й', time: '15–25 мин',
      tips: '💡 Налейте 100 мл воды. Пар сохраняет сочность мяса при разогреве.'
    },
    {
      emoji: '🍞', name: 'Свежесть хлеба', hint: 'булочки, хлеб',
      mode: 'Горячий воздух ПЛЮС', temp: '110°C', level: '2-й', time: '15–25 мин',
      tips: '💡 100 мл воды. Хлеб станет мягким внутри и хрустящим снаружи.'
    },
    {
      emoji: '🍝', name: 'Разогрев пасты / риса', hint: 'стеклянная глубокая ёмкость',
      mode: 'Горячий воздух ПЛЮС', temp: '110°C', level: '2-й', time: '15–25 мин',
      tips: '💡 Используйте стеклянную глубокую ёмкость. Налейте 100 мл воды в выемку камеры.'
    },
    {
      emoji: '🥗', name: 'Разогрев овощей', hint: 'эмалированный противень',
      mode: 'Горячий воздух ПЛЮС', temp: '110°C', level: '2-й', time: '15–25 мин',
      tips: '💡 Пар сохраняет витамины и текстуру овощей лучше, чем микроволновка.'
    }
  ]
};

// ===== CHEF LOGIC =====
let currentCategory = 'baking';

function renderDishes(cat) {
  const dishes = chefData[cat] || [];
  const container = document.getElementById('chefDishes');
  container.innerHTML = dishes.map((d, i) => `
    <button class="dish-btn" data-idx="${i}">
      <span class="dish-emoji">${d.emoji}</span>
      <span class="dish-info">
        <span class="dish-name">${d.name}</span>
        <span class="dish-hint">${d.hint}</span>
      </span>
    </button>
  `).join('');

  container.querySelectorAll('.dish-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showDishResult(dishes[parseInt(btn.dataset.idx)]);
    });
  });
}

function showDishResult(dish) {
  document.getElementById('chefDishes').style.display = 'none';
  document.querySelector('.chef-categories').style.display = 'none';
  const result = document.getElementById('chefResult');
  result.style.display = 'block';
  document.getElementById('resultDish').textContent = `${dish.emoji} ${dish.name}`;
  document.getElementById('resultMode').textContent = dish.mode;
  document.getElementById('resultTemp').textContent = dish.temp;
  document.getElementById('resultLevel').textContent = dish.level;
  document.getElementById('resultTime').textContent = dish.time;
  document.getElementById('resultTips').textContent = dish.tips;
}

document.getElementById('chefBack').addEventListener('click', () => {
  document.getElementById('chefResult').style.display = 'none';
  document.getElementById('chefDishes').style.display = 'flex';
  document.querySelector('.chef-categories').style.display = 'flex';
});

document.querySelectorAll('.chef-cat').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.chef-cat').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.cat;
    renderDishes(currentCategory);
    // Reset result view
    document.getElementById('chefResult').style.display = 'none';
    document.getElementById('chefDishes').style.display = 'flex';
  });
});

// Init chef
renderDishes(currentCategory);

// ===== BUTTON SYMBOLS LEGEND (from manual) =====
// All symbols are rendered in the HTML via CSS class .btn-sym
// ⊙  — кнопка часов / подтверждения (clock/confirm button)
// △  — кнопка таймера (timer bell button)  
// ☼  — кнопка лампы / таймер (lamp + timer, hold 3s)
// °C — кнопка температуры (temp check button)
// |→| — функция Продолж. (duration display symbol)
// →|  — функция Окончание (end time display symbol)
// |→|→| — отсрочка запуска (delayed start)
// ⊡  — блокировка дверцы (door lock indicator)
// ≡  — полоски нагрева на дисплее (heating bars)

// ===== SERVICE WORKER =====
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}