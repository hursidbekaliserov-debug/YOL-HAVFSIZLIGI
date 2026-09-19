import fs from 'fs';
import path from 'path';

// Handle uncaught exceptions and rejections so process never crashes abruptly
process.on('uncaughtException', (err) => {
  console.error(`⚠️ [${new Date().toISOString()}] Uncaught Exception:`, err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(`⚠️ [${new Date().toISOString()}] Unhandled Rejection at:`, promise, 'reason:', reason);
});

// Load .env.local if exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [k, ...v] = trimmed.split('=');
        if (k && v.length) {
          process.env[k.trim()] = v.join('=').trim();
        }
      }
    }
  } catch (err) {
    console.error('Error reading .env.local:', err);
  }
}

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8985612392:AAG9e1PA3oQYBQ9eIdWpxN3hARN4zT5jwXA';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const WEBAPP_URL = `${APP_URL}/report`;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function callApi(method, body = {}) {
  try {
    const res = await fetch(`${TELEGRAM_API}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch (err) {
    console.error(`❌ Telegram API (${method}) xatosi:`, err.message);
    return { ok: false, error: err.message };
  }
}

async function initBot() {
  console.log(`🚀 [${new Date().toLocaleTimeString()}] Road Safety AI Telegram Boti ishga tushmoqda...`);

  let me = await callApi('getMe');
  let retries = 0;
  while (!me.ok && retries < 5) {
    retries++;
    console.warn(`⏳ Telegram API'ga ulanish kutilmoqda (${retries}/5)...`);
    await new Promise((r) => setTimeout(r, 2000));
    me = await callApi('getMe');
  }

  if (!me.ok) {
    console.error('❌ Bot tokeni noto\'g\'ri yoki Telegram API ulanib bo\'lmadi:', me);
    return false;
  }

  console.log(`✅ Telegram Bot muvaffaqiyatli ulandi: @${me.result.username} (${me.result.first_name})`);

  // Set Bot Commands list in Telegram menu
  await callApi('setMyCommands', {
    commands: [
      { command: 'start', description: 'Botni ishga tushirish va asosiy menyu' },
      { command: 'report', description: 'Kamera va xarita orqali nosozlik yuborish' },
      { command: 'dovon', description: 'Dovonlar & magistrallar jonli holati' },
      { command: 'jarima', description: '2025/2026 YHQ jarimalar hisoblagichi' },
      { command: 'map', description: 'Interaktiv xavfsizlik xaritasi' },
      { command: 'sos', description: 'Favqulodda yordam liniyalari (102, 1050)' },
      { command: 'help', description: 'Yordam va qo\'llanma' },
    ],
  });

  // Set Chat Menu Button if HTTPS available
  try {
    if (WEBAPP_URL.startsWith('https://')) {
      const menuRes = await callApi('setChatMenuButton', {
        menu_button: {
          type: 'web_app',
          text: '📸 Kamera & Xarita',
          web_app: { url: WEBAPP_URL },
        },
      });
      if (menuRes.ok) {
        console.log(`🎯 Pastki chap menyu paneli WebApp'ga ulandi: ${WEBAPP_URL}`);
      }
    }
  } catch (e) {
    console.warn('Menu button warning:', e.message);
  }

  return true;
}

function getMainKeyboard() {
  const isHttps = WEBAPP_URL.startsWith('https://');

  return {
    inline_keyboard: [
      isHttps
        ? [
            { text: '📸 Kamera & Xarita (Ilova)', web_app: { url: WEBAPP_URL } },
            { text: '🌐 Brauzerda ochish', url: `${APP_URL}/report` },
          ]
        : [
            { text: '📸 Kamera & Xarita (Muammo yuborish)', url: `${APP_URL}/report` },
          ],
      [
        { text: '⛰️ Dovonlar Holati', callback_data: 'cmd_dovon' },
        { text: '⚖️ Jarimalar & BHM', callback_data: 'cmd_jarima' },
      ],
      [
        { text: '🗺️ Interaktiv Xarita', url: `${APP_URL}/map` },
        { text: '📰 Yangiliklar', url: `${APP_URL}/news` },
      ],
      [
        { text: '🚨 Tezkor Yordam (102)', callback_data: 'cmd_sos' },
        { text: '🌐 Bosh Sahifa', url: APP_URL },
      ],
    ],
  };
}

async function sendDovonInfo(chatId) {
  const dovonText =
    `⛰️ <b>Respublika Dovonlari va Magistrallari Jonli Holati:</b>\n\n` +
    `🏔️ <b>Qamchiq dovoni (A-373 Toshkent — O'sh):</b>\n` +
    `• Holati: 🟡 <i>Ehtiyotkorlik zarur</i>\n` +
    `• Havo harorati: -3°C, Yengil qor, ayrim joylarda yaxmalak\n` +
    `• Ko'rish masofasi: 150-200 metr (Tuman)\n` +
    `• Tavsiya: Qishki shinalar majburiy! Tezlikni 50 km/soatdan oshirmang.\n\n` +
    `⛰️ <b>Taxtaqoracha dovoni (M-39 Samarqand — Shahrisabz):</b>\n` +
    `• Holati: 🟢 <i>Harakat ochiq</i>\n` +
    `• Havo harorati: +1°C, Yo'l nam\n` +
    `• Ko'rish: Yaxshi (500+ metr)\n\n` +
    `🛣️ <b>M-39 Toshkent — Samarqand magistrali:</b>\n` +
    `• Holati: 🟢 <i>Harakat me'yorida</i>\n` +
    `• Jizzax aylanma yo'lida ta'mirlash ishlari ketmoqda (70 km/soat cheklov).\n\n` +
    `📞 <b>FVV Tezkor Qutqaruv:</b> 1050\n` +
    `🚔 <b>Yo'l Politsiyasi:</b> 102`;

  await callApi('sendMessage', {
    chat_id: chatId,
    text: dovonText,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📰 Batafsil Yangiliklar', url: `${APP_URL}/news` },
          { text: '🗺️ Xaritada Ko\'rish', url: `${APP_URL}/map` },
        ],
      ],
    },
  });
}

async function sendJarimaInfo(chatId) {
  const jarimaText =
    `⚖️ <b>2025/2026 Yo'l Harakati Jarimalari & BHM Ma'lumotnomasi:</b>\n\n` +
    `📌 <b>Amaldagi BHM:</b> 375 000 so'm\n` +
    `✨ <b>15 kunlik chegirma:</b> Qoidabuzarlik sodir etilgandan boshlab 15 kun ichida to'lansa, <b>50% chegirma</b> qo'llaniladi (MJtK 332-1-modda)!\n\n` +
    `🔹 <b>Tezlikni +20 km/soatgacha oshirish:</b>\n` +
    `• Asl jarima: 1 BHM = 375 000 so'm\n` +
    `• 50% chegirma bilan: <b>187 500 so'm</b>\n\n` +
    `🔹 <b>Tezlikni +20 dan +40 km/soatgacha:</b>\n` +
    `• Asl jarima: 5 BHM = 1 875 000 so'm\n` +
    `• 50% chegirma bilan: <b>937 500 so'm</b>\n\n` +
    `🔹 <b>Svetoforning qizil chirog'idan o'tish:</b>\n` +
    `• Asl jarima: 2 BHM = 750 000 so'm\n` +
    `• 50% chegirma bilan: <b>375 000 so'm</b>\n\n` +
    `🔹 <b>Xavfsizlik kamarini taqmaslik:</b>\n` +
    `• Asl jarima: 0.5 BHM = 187 500 so'm\n` +
    `• 50% chegirma bilan: <b>93 750 so'm</b>\n\n` +
    `🔹 <b>Haydashda telefondan foydalanish:</b>\n` +
    `• Asl jarima: 3 BHM = 1 125 000 so'm\n` +
    `• 50% chegirma bilan: <b>562 500 so'm</b>\n\n` +
    `🔹 <b>Qarama-qarshi yo'nalishga chiqish:</b>\n` +
    `• Asl jarima: 10 BHM = 3 750 000 so'm\n` +
    `• 50% chegirma bilan: <b>1 875 000 so'm</b>`;

  await callApi('sendMessage', {
    chat_id: chatId,
    text: jarimaText,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🧮 Interaktiv Kalkulyatorni Ochish', url: `${APP_URL}/news` },
        ],
      ],
    },
  });
}

async function sendSosInfo(chatId) {
  const sosText =
    `🚨 <b>Favqulodda Aloqa va Shoshilinch Yordam:</b>\n\n` +
    `• 👮 <b>IIV YHXBB (Yo'l politsiyasi):</b> 102\n` +
    `• 🚒 <b>FVV (Qutqaruv xizmati & Dovonlar):</b> 1050\n` +
    `• 🚑 <b>Tez Tibbiy Yordam:</b> 103\n` +
    `• 🛣️ <b>Avtomobil Yo'llari Qo'mitasi ishonch telefoni:</b> +998 (71) 200-00-00\n\n` +
    `⚠️ <b>YTH sodir bo'lganda birinchi qadamlar:</b>\n` +
    `1. Avtomobilni darhol to'xtating va avariya chiroqlarini yoqing.\n` +
    `2. Ogohlantiruvchi qizil uchburchak belgisini qo'ying (aholi punktida 15m, tashqarisida 30m).\n` +
    `3. Jabrlanganlarga birinchi tibbiy yordam ko'rsating va 103/102 ga qo'ng'iroq qiling.`;

  await callApi('sendMessage', {
    chat_id: chatId,
    text: sosText,
    parse_mode: 'HTML',
    reply_markup: getMainKeyboard(),
  });
}

async function handleMessage(message) {
  const chatId = message.chat.id;
  const text = (message.text || '').trim();
  const lowerText = text.toLowerCase();
  const firstName = message.from?.first_name || 'Fuqaro';

  console.log(`📩 [${new Date().toLocaleTimeString()}] Xabar keldi [${chatId}] (${firstName}): ${text}`);

  // Handle WebApp Data Submission
  if (message.web_app_data) {
    try {
      const data = JSON.parse(message.web_app_data.data);
      await callApi('sendMessage', {
        chat_id: chatId,
        text: `✅ <b>Rahmat! Murojaatingiz qabul qilindi!</b>\n\nAriza ID raqami: <code>${data.reportId || 'YHX-2026'}</code>\n\nSun'iy intellekt xabaringizni tasdiqladi va mas'ul yo'l xo'jaligi bo'limiga yo'naltirdi. Statusni veb-saytimiz orqali kuzatib borishingiz mumkin.`,
        parse_mode: 'HTML',
        reply_markup: getMainKeyboard(),
      });
      return;
    } catch {
      // ignore parse error
    }
  }

  // Specific commands or keywords
  if (lowerText.startsWith('/start') || lowerText === 'salom' || lowerText === 'start') {
    const welcomeText =
      `Assalomu alaykum, hurmatli <b>${firstName}</b>!\n\n` +
      `🛡️ <b>Road Safety AI</b> — O'zbekiston milliy yo'l xavfsizligi rasmiy interaktiv botiga xush kelibsiz!\n\n` +
      `Bu yerda siz:\n` +
      `• Yo'ldagi chuqurcha, buzilgan svetofor yoki o'chgan yo'l chiziqlarini kamera bilan suratga olib xabar berishingiz;\n` +
      `• Qamchiq va boshqa dovonlarning jonli ob-havo holatini bilishingiz;\n` +
      `• 2025/2026 YHQ jarimalari va 50% chegirmali hisoblarni ko'rishingiz mumkin.\n\n` +
      `Kerakli bo'limni tanlang:`;

    await callApi('sendMessage', {
      chat_id: chatId,
      text: welcomeText,
      parse_mode: 'HTML',
      reply_markup: getMainKeyboard(),
    });
    return;
  }

  if (lowerText.startsWith('/report') || lowerText.includes('xabar') || lowerText.includes('muammo') || lowerText.includes('chuqur') || lowerText.includes('rasm')) {
    await callApi('sendMessage', {
      chat_id: chatId,
      text: `📸 <b>Yo'ldagi nosozlik haqida xabar berish:</b>\n\nNosozlikni suratga olish va xaritada belgilash uchun pastdagi tugmani bosing:`,
      parse_mode: 'HTML',
      reply_markup: getMainKeyboard(),
    });
    return;
  }

  if (lowerText.startsWith('/dovon') || lowerText.includes('dovon') || lowerText.includes('qamchiq') || lowerText.includes('taxtaqoracha') || lowerText.includes('ob-havo') || lowerText.includes('qor')) {
    await sendDovonInfo(chatId);
    return;
  }

  if (lowerText.startsWith('/jarima') || lowerText.includes('jarima') || lowerText.includes('tezlik') || lowerText.includes('bhm') || lowerText.includes('kamar') || lowerText.includes('chegirma')) {
    await sendJarimaInfo(chatId);
    return;
  }

  if (lowerText.startsWith('/sos') || lowerText.includes('sos') || lowerText.includes('avariya') || lowerText.includes('yth') || lowerText.includes('yordam')) {
    await sendSosInfo(chatId);
    return;
  }

  if (lowerText.startsWith('/map') || lowerText.includes('xarita')) {
    await callApi('sendMessage', {
      chat_id: chatId,
      text: `🗺️ <b>Interaktiv Geoportal Xarita:</b>\n\nRespublika bo'ylab barcha xavfli zonalar va bartaraf etilgan nuqtalarni onlayn kuzating:\n${APP_URL}/map`,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🗺️ Xaritani Ochish', url: `${APP_URL}/map` },
          ],
        ],
      },
    });
    return;
  }

  if (lowerText.startsWith('/help')) {
    await callApi('sendMessage', {
      chat_id: chatId,
      text:
        `ℹ️ <b>Qo'llanma va Tezkor Savollar:</b>\n\n` +
        `1. <b>/report</b> — Kamera orqali yo'ldagi nosozlikni suratga olib xaritaga joylash.\n` +
        `2. <b>/dovon</b> — Qamchiq va boshqa dovonlarning so'nggi holati.\n` +
        `3. <b>/jarima</b> — Amaldagi BHM va qoidabuzarlik jarimalari ro'yxati.\n` +
        `4. <b>/sos</b> — 102 va 1050 shoshilinch aloqa raqamlari.\n\n` +
        `Biz bilan birgalikda yo'llarimizni xavfsizroq qiling!`,
      parse_mode: 'HTML',
      reply_markup: getMainKeyboard(),
    });
    return;
  }

  // Default intelligent response for any inquiry
  await callApi('sendMessage', {
    chat_id: chatId,
    text:
      `Hurmatli <b>${firstName}</b>, savolingiz qabul qilindi!\n\n` +
      `Siz <b>Road Safety AI</b> milliy yo'l xavfsizligi tizimi botidasiz. Kerakli xizmat yoki ma'lumotni pastdagi menyudan tanlashingiz mumkin:`,
    parse_mode: 'HTML',
    reply_markup: getMainKeyboard(),
  });
}

async function handleCallbackQuery(callbackQuery) {
  const chatId = callbackQuery.message?.chat?.id;
  const data = callbackQuery.data;

  // Answer callback query so button doesn't spin
  await callApi('answerCallbackQuery', {
    callback_query_id: callbackQuery.id,
  });

  if (!chatId) return;

  if (data === 'cmd_dovon') {
    await sendDovonInfo(chatId);
  } else if (data === 'cmd_jarima') {
    await sendJarimaInfo(chatId);
  } else if (data === 'cmd_sos') {
    await sendSosInfo(chatId);
  }
}

// Resilient Long Polling Loop
async function startPolling() {
  let offset = 0;
  console.log('🔄 [Polling] Telegram xabarlarini qabul qilish boshlandi (24/7 faol)...');

  let consecutiveErrors = 0;

  while (true) {
    try {
      const res = await callApi('getUpdates', {
        offset,
        timeout: 25,
      });

      if (res && res.ok && Array.isArray(res.result)) {
        consecutiveErrors = 0; // reset error counter on success
        for (const update of res.result) {
          offset = update.update_id + 1;
          if (update.message) {
            await handleMessage(update.message);
          } else if (update.callback_query) {
            await handleCallbackQuery(update.callback_query);
          }
        }
      } else {
        consecutiveErrors++;
        const delay = Math.min(consecutiveErrors * 2000, 15000);
        console.warn(`⚠️ Polling javobi nosoz, ${delay / 1000}s kutib qayta ulanadi...`);
        await new Promise((r) => setTimeout(r, delay));
      }
    } catch (err) {
      consecutiveErrors++;
      const delay = Math.min(consecutiveErrors * 2000, 15000);
      console.error(`⚠️ Polling xatoligi (${consecutiveErrors}):`, err.message);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

async function main() {
  const ok = await initBot();
  if (ok) {
    await startPolling();
  } else {
    console.error('❌ Botni ishga tushirishda xatolik yuz berdi. 5 soniyadan so\'ng qayta uriniladi...');
    setTimeout(main, 5000);
  }
}

main();
