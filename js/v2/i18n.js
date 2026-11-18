/* Переводы: русский – в разметке, узбекский (латиница) и английский – здесь. Язык – параметр ?lang=uz|en в адресе,
   остальные параметры (static, to, review) сохраняются. Перевод применяется до меню, SplitText и барабана цифр,
   поэтому они работают с уже переведённым текстом. Переключатель языка – обычные ссылки, страница перезагружается.

   Как устроено: ключ – русский текст элемента (прямые текстовые узлы, пробелы и неразрывные пробелы схлопнуты),
   значение – перевод. Так же переводятся alt, aria-label и title. Новый текст на странице без строки здесь
   останется русским – добавить строку в оба словаря.
   Перевод черновой, сделан без носителя языка: узбекскую версию перед публикацией вычитать (открытый вопрос в базе). */

const UZ = {
  'United Lift – лифтовое оборудование под задачу объекта': 'United Lift – obyekt vazifasiga mos lift uskunalari',
  'United Lift подбирает, поставляет, устанавливает и запускает лифты, эскалаторы, траволаторы и подъёмные платформы в Узбекистане.': 'United Lift Oʻzbekistonda liftlar, eskalatorlar, travolatorlar va koʻtargich platformalarni tanlaydi, yetkazib beradi, oʻrnatadi va ishga tushiradi.',
  'United Lift – наверх': 'United Lift – yuqoriga',
  'Разделы': 'Boʻlimlar',
  'Язык': 'Til',
  'Оборудование': 'Uskunalar',
  'Этапы': 'Bosqichlar',
  'Сервис': 'Servis',
  'Объекты': 'Obyektlar',
  'Результаты': 'Natijalar',
  'Контакты': 'Aloqa',
  'Обсудить проект': 'Loyihani muhokama qilish',
  'Меню': 'Menyu',
  'Закрыть': 'Yopish',
  'Позвонить: +998 78 333-80-08': 'Qoʻngʻiroq: +998 78 333-80-08',

  'Лифтовое оборудование под задачу объекта': 'Obyekt vazifasiga mos lift uskunalari',
  'Подбираем, поставляем, устанавливаем и запускаем лифты, эскалаторы, траволаторы и подъёмные платформы в Узбекистане – от шахты до кнопки вызова.': 'Oʻzbekistonda liftlar, eskalatorlar, travolatorlar va koʻtargich platformalarni tanlaymiz, yetkazib beramiz, oʻrnatamiz va ishga tushiramiz – shaxtadan chaqiruv tugmasigacha.',
  'Обсудить поставку и установку': 'Yetkazib berish va oʻrnatishni muhokama qilish',
  '20+ лет': '20+ yil',
  'в лифтовой отрасли Узбекистана': 'Oʻzbekiston lift sohasida',
  'Полный цикл': 'Toʻliq sikl',
  'подбор, проект, поставка, монтаж, запуск': 'tanlash, loyiha, yetkazib berish, montaj, ishga tushirish',
  '4 вида': '4 turdagi',
  'лифты, эскалаторы, траволаторы, платформы': 'liftlar, eskalatorlar, travolatorlar, platformalar',

  'Четыре вида оборудования под задачи здания': 'Bino vazifalariga mos toʻrt turdagi uskuna',
  'Начинаем с назначения здания и потока людей, а не с каталога. Тип, производителя и комплектацию подбираем под объект.': 'Katalogdan emas, bino vazifasi va odamlar oqimidan boshlaymiz. Turi, ishlab chiqaruvchisi va komplektatsiyasini obyektga qarab tanlaymiz.',
  'Лифты и панорамный лифт в холле офисного здания': 'Ofis binosi holidagi liftlar va panoramali lift',
  'Эскалаторы в атриуме торгово-делового центра': 'Savdo-biznes markazi atriumidagi eskalatorlar',
  'Траволатор в терминале аэропорта': 'Aeroport terminalidagi travolator',
  'Подъёмная платформа для людей на креслах-колясках': 'Nogironlar aravachasidagi odamlar uchun koʻtargich platforma',
  'Лифты': 'Liftlar',
  'Пассажирские, панорамные, больничные и грузовые – под назначение здания, этажность и нагрузку.': 'Yoʻlovchi, panoramali, kasalxona va yuk liftlari – bino vazifasi, qavatlar soni va yuklamaga qarab.',
  'Эскалаторы': 'Eskalatorlar',
  'Для зданий, где люди постоянно переходят между этажами: торговых, транспортных, общественных.': 'Odamlar qavatlar orasida doimiy harakatlanadigan binolar uchun: savdo, transport va jamoat binolari.',
  'Траволаторы': 'Travolatorlar',
  'Движущиеся дорожки для длинных переходов и перепада уровней без ступеней.': 'Uzun oʻtish joylari va zinasiz sath farqlari uchun harakatlanuvchi yoʻlaklar.',
  'Подъёмные платформы': 'Koʻtargich platformalar',
  'Для людей и грузов там, где кабина лифта не нужна или не помещается.': 'Lift kabinasi kerak boʻlmagan yoki sigʻmaydigan joylarda odamlar va yuklar uchun.',

  'Что мы берём на себя': 'Biz nimalarni oʻz zimmamizga olamiz',
  'Поставка и установка – основная работа United Lift. Вот из чего она состоит и что получается на каждом этапе.': 'Yetkazib berish va oʻrnatish – United Liftning asosiy ishi. U nimalardan iborat va har bir bosqichda qanday natija olinadi.',
  'Результат': 'Natija',
  'Подбор': 'Tanlash',
  'Разбираем назначение здания, этажность и поток людей. Предлагаем тип и состав оборудования.': 'Bino vazifasi, qavatlar soni va odamlar oqimini oʻrganamiz. Uskuna turi va tarkibini taklif qilamiz.',
  'Понятно, какое оборудование нужно зданию.': 'Binoga qanday uskuna kerakligi aniq.',
  'Проектирование': 'Loyihalash',
  'Увязываем оборудование с проектом здания: размеры шахты, приямок, машинное помещение, нагрузки.': 'Uskunani bino loyihasi bilan moslashtiramiz: shaxta oʻlchamlari, chuqurcha, mashina xonasi, yuklamalar.',
  'Шахта и оборудование сходятся в проекте.': 'Shaxta va uskuna loyihada bir-biriga mos keladi.',
  'Поставка': 'Yetkazib berish',
  'Организуем поставку оборудования на объект и проверяем комплектность.': 'Uskunani obyektga yetkazib berishni tashkil qilamiz va toʻliqligini tekshiramiz.',
  'Оборудование на площадке в полном составе.': 'Uskuna maydonchada toʻliq holda.',
  'Монтаж': 'Montaj',
  'Устанавливаем направляющие, кабину, противовес, лебёдку и двери шахты.': 'Yoʻnaltiruvchilar, kabina, qarshi yuk, chigʻir va shaxta eshiklarini oʻrnatamiz.',
  'Лифт собран в шахте.': 'Lift shaxtada yigʻilgan.',
  'Пусконаладка': 'Sozlash va ishga tushirish',
  'Настраиваем, запускаем и передаём оборудование в работу.': 'Uskunani sozlaymiz, ishga tushiramiz va foydalanishga topshiramiz.',
  'Двери открываются, лифт возит людей.': 'Eshiklar ochiladi, lift odamlarni tashiydi.',

  'После запуска': 'Ishga tushirilgandan keyin',
  'Техническое обслуживание – продолжение работы с оборудованием, которое мы установили: лифт должен возить людей и через годы после запуска.': 'Texnik xizmat koʻrsatish – biz oʻrnatgan uskuna bilan ishning davomi: lift ishga tushirilganidan yillar oʻtib ham odamlarni tashishi kerak.',
  'Обсудить обслуживание': 'Texnik xizmatni muhokama qilish',

  'Здания в Ташкенте, где установлены лифты SRH.': 'Toshkentdagi SRH liftlari oʻrnatilgan binolar.',
  'Здание гостиницы Palermo Hotel': 'Palermo Hotel mehmonxonasi binosi',
  'Здание Хокимията города Ташкента': 'Toshkent shahar hokimiyati binosi',
  'Хокимият города Ташкента': 'Toshkent shahar hokimiyati',
  '3 лифта SRH': '3 ta SRH lifti',
  '4 лифта SRH': '4 ta SRH lifti',

  'Результаты на реальных объектах': 'Haqiqiy obyektlardagi natijalar',
  'Что остаётся после нашей работы: установленное оборудование и лифты, которые мы продолжаем обслуживать.': 'Ishimizdan keyin nima qoladi: oʻrnatilgan uskunalar va xizmat koʻrsatishda davom etayotgan liftlar.',
  'лет в лифтовой отрасли Узбекистана': 'yil Oʻzbekiston lift sohasida',
  'единиц оборудования установлено: лифты, эскалаторы, траволаторы и платформы': 'dona uskuna oʻrnatilgan: liftlar, eskalatorlar, travolatorlar va platformalar',
  'лифтов на нашем техническом обслуживании': 'ta lift bizning texnik xizmatimizda',
  'времени лифты на обслуживании в работе, в среднем за 2025 год': 'vaqt xizmatimizdagi liftlar ishlagan, 2025-yil boʻyicha oʻrtacha',
  'этапов – подбор, проект, поставка, монтаж и пусконаладка – ведёт одна команда': 'bosqich – tanlash, loyiha, yetkazib berish, montaj va ishga tushirish – bitta jamoa qoʻlida',
  'Значения – пример до получения данных компании, кроме опыта более 20 лет и состава работ. Фото кабины – иллюстративное.': 'Qiymatlar kompaniya maʼlumotlari olinguncha namuna sifatida berilgan, 20 yildan ortiq tajriba va ishlar tarkibi bundan mustasno. Kabina surati – illyustrativ.',

  'Расскажите об объекте – подберём оборудование': 'Obyekt haqida aytib bering – uskunani tanlab beramiz',
  'Назначение здания, этажность и поток людей – этого достаточно, чтобы начать разговор.': 'Bino vazifasi, qavatlar soni va odamlar oqimi – suhbatni boshlash uchun shu yetarli.',
  '100100, Ташкент, ул. Алишера Навои, 79': '100100, Toshkent, Alisher Navoiy koʻchasi, 79'
};

const EN = {
  'United Lift – лифтовое оборудование под задачу объекта': 'United Lift – lift equipment matched to your building',
  'United Lift подбирает, поставляет, устанавливает и запускает лифты, эскалаторы, траволаторы и подъёмные платформы в Узбекистане.': 'United Lift selects, supplies, installs and commissions lifts, escalators, moving walkways and platform lifts in Uzbekistan.',
  'United Lift – наверх': 'United Lift – back to top',
  'Разделы': 'Sections',
  'Язык': 'Language',
  'Оборудование': 'Equipment',
  'Этапы': 'Process',
  'Сервис': 'Service',
  'Объекты': 'Projects',
  'Результаты': 'Results',
  'Контакты': 'Contacts',
  'Обсудить проект': 'Discuss a project',
  'Меню': 'Menu',
  'Закрыть': 'Close',
  'Позвонить: +998 78 333-80-08': 'Call: +998 78 333-80-08',

  'Лифтовое оборудование под задачу объекта': 'Lift equipment matched to your building',
  'Подбираем, поставляем, устанавливаем и запускаем лифты, эскалаторы, траволаторы и подъёмные платформы в Узбекистане – от шахты до кнопки вызова.': 'We select, supply, install and commission lifts, escalators, moving walkways and platform lifts in Uzbekistan – from the shaft to the call button.',
  'Обсудить поставку и установку': 'Discuss supply and installation',
  '20+ лет': '20+ years',
  'в лифтовой отрасли Узбекистана': 'in Uzbekistan’s lift industry',
  'Полный цикл': 'Full cycle',
  'подбор, проект, поставка, монтаж, запуск': 'selection, design, supply, installation, commissioning',
  '4 вида': '4 types',
  'лифты, эскалаторы, траволаторы, платформы': 'lifts, escalators, moving walkways, platforms',

  'Четыре вида оборудования под задачи здания': 'Four types of equipment for what your building needs',
  'Начинаем с назначения здания и потока людей, а не с каталога. Тип, производителя и комплектацию подбираем под объект.': 'We start with the building’s purpose and foot traffic, not a catalogue. Type, manufacturer and configuration are chosen for each project.',
  'Лифты и панорамный лифт в холле офисного здания': 'Lifts and a panoramic lift in an office building lobby',
  'Эскалаторы в атриуме торгово-делового центра': 'Escalators in the atrium of a retail and business centre',
  'Траволатор в терминале аэропорта': 'Moving walkway in an airport terminal',
  'Подъёмная платформа для людей на креслах-колясках': 'Platform lift for wheelchair users',
  'Лифты': 'Lifts',
  'Пассажирские, панорамные, больничные и грузовые – под назначение здания, этажность и нагрузку.': 'Passenger, panoramic, hospital and freight lifts – matched to the building’s purpose, height and load.',
  'Эскалаторы': 'Escalators',
  'Для зданий, где люди постоянно переходят между этажами: торговых, транспортных, общественных.': 'For buildings where people constantly move between floors: retail, transport and public spaces.',
  'Траволаторы': 'Moving walkways',
  'Движущиеся дорожки для длинных переходов и перепада уровней без ступеней.': 'For long passages and changes of level without steps.',
  'Подъёмные платформы': 'Platform lifts',
  'Для людей и грузов там, где кабина лифта не нужна или не помещается.': 'For people and goods where a lift car isn’t needed or won’t fit.',

  'Что мы берём на себя': 'What we take on',
  'Поставка и установка – основная работа United Lift. Вот из чего она состоит и что получается на каждом этапе.': 'Supply and installation are United Lift’s core work. Here is what it involves and what you get at each stage.',
  'Результат': 'Result',
  'Подбор': 'Selection',
  'Разбираем назначение здания, этажность и поток людей. Предлагаем тип и состав оборудования.': 'We look at the building’s purpose, height and foot traffic, then propose the type and set of equipment.',
  'Понятно, какое оборудование нужно зданию.': 'It’s clear what equipment the building needs.',
  'Проектирование': 'Design',
  'Увязываем оборудование с проектом здания: размеры шахты, приямок, машинное помещение, нагрузки.': 'We fit the equipment into the building design: shaft dimensions, pit, machine room and loads.',
  'Шахта и оборудование сходятся в проекте.': 'Shaft and equipment match in the design.',
  'Поставка': 'Supply',
  'Организуем поставку оборудования на объект и проверяем комплектность.': 'We arrange delivery to the site and check that everything is complete.',
  'Оборудование на площадке в полном составе.': 'All equipment is on site and complete.',
  'Монтаж': 'Installation',
  'Устанавливаем направляющие, кабину, противовес, лебёдку и двери шахты.': 'We install the guide rails, car, counterweight, machine and landing doors.',
  'Лифт собран в шахте.': 'The lift is assembled in the shaft.',
  'Пусконаладка': 'Commissioning',
  'Настраиваем, запускаем и передаём оборудование в работу.': 'We adjust, start up and hand the equipment over for operation.',
  'Двери открываются, лифт возит людей.': 'The doors open and the lift carries people.',

  'После запуска': 'After commissioning',
  'Техническое обслуживание – продолжение работы с оборудованием, которое мы установили: лифт должен возить людей и через годы после запуска.': 'Maintenance continues our work on the equipment we installed: a lift should keep carrying people for years after it starts.',
  'Обсудить обслуживание': 'Discuss maintenance',

  'Здания в Ташкенте, где установлены лифты SRH.': 'Buildings in Tashkent with SRH lifts installed.',
  'Здание гостиницы Palermo Hotel': 'Palermo Hotel building',
  'Здание Хокимията города Ташкента': 'Tashkent City Hokimiyat building',
  'Хокимият города Ташкента': 'Tashkent City Hokimiyat',
  '3 лифта SRH': '3 SRH lifts',
  '4 лифта SRH': '4 SRH lifts',

  'Результаты на реальных объектах': 'Results on real projects',
  'Что остаётся после нашей работы: установленное оборудование и лифты, которые мы продолжаем обслуживать.': 'What remains after our work: installed equipment and lifts we keep maintaining.',
  '98,8%': '98.8%',
  'лет в лифтовой отрасли Узбекистана': 'years in Uzbekistan’s lift industry',
  'единиц оборудования установлено: лифты, эскалаторы, траволаторы и платформы': 'units installed: lifts, escalators, moving walkways and platforms',
  'лифтов на нашем техническом обслуживании': 'lifts under our maintenance',
  'времени лифты на обслуживании в работе, в среднем за 2025 год': 'uptime of the lifts we maintain, 2025 average',
  'этапов – подбор, проект, поставка, монтаж и пусконаладка – ведёт одна команда': 'stages – selection, design, supply, installation and commissioning – run by one team',
  'Значения – пример до получения данных компании, кроме опыта более 20 лет и состава работ. Фото кабины – иллюстративное.': 'Figures are placeholders until the company provides data, except for 20+ years of experience and the scope of work. The cabin photo is illustrative.',

  'Расскажите об объекте – подберём оборудование': 'Tell us about your building – we’ll select the equipment',
  'Назначение здания, этажность и поток людей – этого достаточно, чтобы начать разговор.': 'The building’s purpose, height and foot traffic are enough to start the conversation.',
  '100100, Ташкент, ул. Алишера Навои, 79': '79 Alisher Navoi St, Tashkent 100100'
};

const DICTS = { uz: UZ, en: EN };
const params = new URLSearchParams(location.search);
export const LANG = DICTS[params.get('lang')] ? params.get('lang') : 'ru';
const dict = DICTS[LANG] || null;

const norm = s => s.replace(/\s+/g, ' ').trim();
/* висячие короткие слова в переводе: после них – неразрывный пробел, как &nbsp; в русской разметке (проверка дизайна №4).
   Два прохода – для пар вроде «of the» */
const SHORT = /(^|[\s(])(a|an|the|of|to|in|on|at|by|for|and|or|with|va|bu|har|bir)\s/gi;
const glue = s => s.replace(SHORT, '$1$2 ').replace(SHORT, '$1$2 ');
export const t = ru => (dict && dict[norm(ru)] && glue(dict[norm(ru)])) || ru;

/* перевод текста одного элемента: его собственные текстовые узлы как одна строка */
const translateText = el => {
  const nodes = [...el.childNodes].filter(n => n.nodeType === 3 && n.nodeValue.trim());
  if (!nodes.length) return;
  const key = norm(nodes.map(n => n.nodeValue).join(' '));
  if (!dict[key]) return;
  const val = glue(dict[key]);
  const first = nodes[0].nodeValue;
  const lead = /^\s/.test(first) ? ' ' : '';
  const trail = /\s$/.test(nodes[nodes.length - 1].nodeValue) ? ' ' : '';
  nodes[0].nodeValue = lead + val + trail;
  nodes.slice(1).forEach(n => { n.nodeValue = ''; });
};

/* ссылки переключателя: тот же адрес с другим ?lang, активный язык – белым чипом */
const linkSwitchers = () => {
  document.querySelectorAll('[data-lang]').forEach(a => {
    const p = new URLSearchParams(location.search);
    if (a.dataset.lang === 'ru') p.delete('lang'); else p.set('lang', a.dataset.lang);
    const qs = p.toString().replace(/=(&|$)/g, '$1'); /* ?static и ?review – флаги без значения */
    a.href = location.pathname + (qs ? `?${qs}` : '') + location.hash;
    const on = a.dataset.lang === LANG;
    a.classList.toggle('is-active', on);
    if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  });
};

export const applyLang = () => {
  linkSwitchers();
  if (!dict) return;
  document.documentElement.lang = LANG;
  document.title = t(document.title);
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.content = t(desc.content);
  document.body.querySelectorAll('*').forEach(el => {
    if (el.closest('svg') || el.matches('script, style')) return;
    translateText(el);
    ['alt', 'aria-label', 'title'].forEach(attr => { if (el.hasAttribute(attr)) el.setAttribute(attr, t(el.getAttribute(attr))); });
  });
};
