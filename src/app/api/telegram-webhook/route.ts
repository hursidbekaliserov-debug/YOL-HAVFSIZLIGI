import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8985612392:AAG9e1PA3oQYBQ9eIdWpxN3hARN4zT5jwXA';
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function callTelegram(method: string, body: Record<string, unknown> = {}) {
  const res = await fetch(`${TELEGRAM_API}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

function getAppUrl(req: NextRequest): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');
  }
  const host = req.headers.get('host');
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  return `${proto}://${host}`;
}

function getMainKeyboard(appUrl: string) {
  const webAppUrl = `${appUrl}/report`;
  const isHttps = webAppUrl.startsWith('https://');

  return {
    inline_keyboard: [
      isHttps
        ? [
            { text: '📸 Kamera & Xarita (Ilova)', web_app: { url: webAppUrl } },
            { text: '🌐 Brauzerda ochish', url: webAppUrl },
          ]
        : [
            { text: '📸 Kamera & Xarita (Muammo yuborish)', url: webAppUrl },
          ],
      [
        { text: '⛰️ Dovonlar Holati', callback_data: 'cmd_dovon' },
        { text: '⚖️ Jarimalar & BHM', callback_data: 'cmd_jarima' },
      ],
      [
        { text: '🗺️ Interaktiv Xarita', url: `${appUrl}/map` },
        { text: '📰 Yangiliklar', url: `${appUrl}/news` },
      ],
      [
        { text: '🚨 Tezkor Yordam (102)', callback_data: 'cmd_sos' },
        { text: '🌐 Bosh Sahifa', url: appUrl },
      ],
    ],
  };
}

async function sendDovonInfo(chatId: number, appUrl: string) {
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

  await callTelegram('sendMessage', {
    chat_id: chatId,
    text: dovonText,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📰 Batafsil Yangiliklar', url: `${appUrl}/news` },
          { text: '🗺️ Xaritada Ko\'rish', url: `${appUrl}/map` },
        ],
      ],
    },
  });
}

async function sendJarimaInfo(chatId: number, appUrl: string) {
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

  await callTelegram('sendMessage', {
    chat_id: chatId,
    text: jarimaText,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🧮 Interaktiv Kalkulyatorni Ochish', url: `${appUrl}/news` },
        ],
      ],
    },
  });
}

async function sendSosInfo(chatId: number, appUrl: string) {
  const sosText =
    `🚨 <b>Favqulodda Aloqa va Shoshilinch Yordam:</b>\n\n` +
    `• 👮 <b>IIV YHXBB (Yo'l politsiyasi):</b> 102\n` +
    `• 🚒 <b>FVV (Qutqaruv xizmati & Dovonlar):</b> 1050\n` +
    `• 🚑 <b>Tez Tibbiy Yordam:</b> 103\n` +
    `• 🛣️ <b>Avtomobil Yo'llari Qo'mitasi ishonch telefoni:</b> +998 (71) 200-00-00\n\n` +
    `⚠️ <b>YTH sodir bo'lganda birinchi qadamlar:</b>\n` +
    `1. Avtomobilni darhol to'xtating va avariya chiroqlarini yoqing.\n` +
    `2. Ogohlantiruvchi qizil uchburchak belgisini qo'ying.\n` +
    `3. 103 yoki 102 ga qo'ng'iroq qiling.`;

  await callTelegram('sendMessage', {
    chat_id: chatId,
    text: sosText,
    parse_mode: 'HTML',
    reply_markup: getMainKeyboard(appUrl),
  });
}

// GET handler to easily inspect or register webhook
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');
  const appUrl = getAppUrl(req);

  if (action === 'setWebhook') {
    const webhookUrl = `${appUrl}/api/telegram-webhook`;
    const res = await callTelegram('setWebhook', {
      url: webhookUrl,
      drop_pending_updates: false,
    });
    return NextResponse.json({ ok: true, webhookUrl, telegram: res });
  }

  if (action === 'deleteWebhook') {
    const res = await callTelegram('deleteWebhook', {
      drop_pending_updates: false,
    });
    return NextResponse.json({ ok: true, telegram: res });
  }

  const webhookInfo = await callTelegram('getWebhookInfo');
  return NextResponse.json({
    status: 'Telegram Webhook Endpoint Active',
    appUrl,
    webhookInfo,
  });
}

// POST handler receiving updates from Telegram
export async function POST(req: NextRequest) {
  try {
    const update = await req.json();
    const appUrl = getAppUrl(req);

    if (update.callback_query) {
      const cb = update.callback_query;
      const chatId = cb.message?.chat?.id;
      const data = cb.data;

      await callTelegram('answerCallbackQuery', { callback_query_id: cb.id });

      if (chatId) {
        if (data === 'cmd_dovon') await sendDovonInfo(chatId, appUrl);
        else if (data === 'cmd_jarima') await sendJarimaInfo(chatId, appUrl);
        else if (data === 'cmd_sos') await sendSosInfo(chatId, appUrl);
      }
      return NextResponse.json({ ok: true });
    }

    if (update.message) {
      const msg = update.message;
      const chatId = msg.chat?.id;
      const text = (msg.text || '').trim();
      const lower = text.toLowerCase();
      const firstName = msg.from?.first_name || 'Fuqaro';

      if (!chatId) return NextResponse.json({ ok: true });

      if (lower.startsWith('/start') || lower === 'salom' || lower === 'start') {
        const welcomeText =
          `Assalomu alaykum, hurmatli <b>${firstName}</b>!\n\n` +
          `🛡️ <b>Road Safety AI</b> — O'zbekiston milliy yo'l xavfsizligi rasmiy interaktiv botiga xush kelibsiz!\n\n` +
          `Bu yerda siz:\n` +
          `• Yo'ldagi chuqurcha, buzilgan svetofor yoki o'chgan yo'l chiziqlarini kamera bilan suratga olib xabar berishingiz;\n` +
          `• Qamchiq va boshqa dovonlarning jonli ob-havo holatini bilishingiz;\n` +
          `• 2025/2026 YHQ jarimalari va 50% chegirmali hisoblarni ko'rishingiz mumkin.\n\n` +
          `Kerakli bo'limni tanlang:`;

        await callTelegram('sendMessage', {
          chat_id: chatId,
          text: welcomeText,
          parse_mode: 'HTML',
          reply_markup: getMainKeyboard(appUrl),
        });
        return NextResponse.json({ ok: true });
      }

      if (lower.startsWith('/dovon') || lower.includes('dovon') || lower.includes('qamchiq')) {
        await sendDovonInfo(chatId, appUrl);
        return NextResponse.json({ ok: true });
      }

      if (lower.startsWith('/jarima') || lower.includes('jarima') || lower.includes('tezlik')) {
        await sendJarimaInfo(chatId, appUrl);
        return NextResponse.json({ ok: true });
      }

      if (lower.startsWith('/sos') || lower.includes('sos') || lower.includes('avariya')) {
        await sendSosInfo(chatId, appUrl);
        return NextResponse.json({ ok: true });
      }

      // Default response
      await callTelegram('sendMessage', {
        chat_id: chatId,
        text:
          `Hurmatli <b>${firstName}</b>, savolingiz qabul qilindi!\n\n` +
          `Siz <b>Road Safety AI</b> milliy yo'l xavfsizligi tizimi botidasiz. Kerakli xizmat yoki ma'lumotni pastdagi menyudan tanlashingiz mumkin:`,
        parse_mode: 'HTML',
        reply_markup: getMainKeyboard(appUrl),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error('Webhook error:', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
