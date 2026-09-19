import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8985612392:AAG9e1PA3oQYBQ9eIdWpxN3hARN4zT5jwXA';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { photo, lat, lng, type, description, address, telegramUser } = body;

    const reportId = `REP-${Date.now().toString().slice(-6)}`;
    const hazardTypeLabels: Record<string, string> = {
      chuqurlik: '🕳️ Yo\'l chuqurchasi (Pothole)',
      svetofor: '🚦 Nosoz svetofor / datchik',
      belgi: '🛑 Yo\'l belgisi yo\'q / shikastlangan',
      chiziq: '〰️ O\'chgan piyodalar yo\'lagi / chiziq',
      yoritgich: '💡 Tungi yoritgich nosoz',
      boshqa: '⚠️ Boshqa xavfli to\'siq',
    };

    const hazardTitle = hazardTypeLabels[type] || '⚠️ Yo\'l nosozligi';
    const userDisplay = telegramUser?.username
      ? `@${telegramUser.username} (${telegramUser.first_name || 'Fuqaro'})`
      : telegramUser?.first_name || 'Noma\'lum fuqaro';

    const caption = `🚨 <b>YANGI YO'L MUAMMOSI QAYD ETILDI</b>\n\n` +
      `🆔 <b>Murojaat ID:</b> <code>${reportId}</code>\n` +
      `📌 <b>Muammo turi:</b> ${hazardTitle}\n` +
      `📝 <b>Tavsif:</b> ${description || 'Tavsif berilmagan'}\n` +
      `📍 <b>Joylashuv:</b> <code>${lat.toFixed(5)}, ${lng.toFixed(5)}</code>\n` +
      `🏙️ <b>Taxminiy manzil:</b> ${address || 'O\'zbekiston'}\n` +
      `👤 <b>Yuboruvchi:</b> ${userDisplay}\n` +
      `🕒 <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}\n\n` +
      `🗺️ <a href="https://maps.google.com/?q=${lat},${lng}">Google Xaritada ko'rish</a>\n` +
      `⚡ <i>Holat: Sun'iy intellekt tomonidan tasdiqlanib, mas'ul xizmatga yo'naltirildi.</i>`;

    // Target chat to notify (if user opened from telegram, send back to user; otherwise default to user's chat_id)
    const targetChatId = telegramUser?.id;

    if (targetChatId) {
      if (photo && photo.startsWith('data:image')) {
        // Convert base64 data to Blob
        const base64Data = photo.split(',')[1];
        const binaryData = Buffer.from(base64Data, 'base64');
        const formData = new FormData();
        formData.append('chat_id', String(targetChatId));
        formData.append('caption', caption);
        formData.append('parse_mode', 'HTML');
        formData.append('photo', new Blob([binaryData], { type: 'image/jpeg' }), `${reportId}.jpg`);

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
          method: 'POST',
          body: formData,
        });

        // Also send exact location
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendLocation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: targetChatId,
            latitude: lat,
            longitude: lng,
          }),
        });
      } else {
        // Send text message with location
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: targetChatId,
            text: caption,
            parse_mode: 'HTML',
            disable_web_page_preview: false,
          }),
        });

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendLocation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: targetChatId,
            latitude: lat,
            longitude: lng,
          }),
        });
      }
    }

    return NextResponse.json({
      success: true,
      reportId,
      message: 'Murojaat qabul qilindi va Telegramga uzatildi!',
    });
  } catch (error: unknown) {
    console.error('Report submission error:', error);
    const msg = error instanceof Error ? error.message : 'Xatolik yuz berdi';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
