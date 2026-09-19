import { spawn } from 'child_process';
import path from 'path';

const botScript = path.join(process.cwd(), 'scripts', 'telegram-bot.mjs');

console.log('🛡️ [Supervisor] Telegram bot nazorat tizimi ishga tushirildi...');
console.log('🛡️ [Supervisor] Rejim: Avtomatik qayta tiklanish (Hech qachon to\'xtamaydi)');

let restartCount = 0;

function runBot() {
  console.log(`\n▶️ [Supervisor] Bot ishga tushirilmoqda... (Urinish #${++restartCount})`);

  const child = spawn(process.execPath, [botScript], {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: process.env,
  });

  child.on('error', (err) => {
    console.error('❌ [Supervisor] Jarayonni ishga tushirishda xatolik:', err);
  });

  child.on('exit', (code, signal) => {
    console.warn(`⚠️ [Supervisor] Bot jarayoni yakunlandi (kod: ${code}, signal: ${signal}).`);
    console.log('🔄 [Supervisor] 2 soniya ichida bot qayta ishga tushirilmoqda...');
    setTimeout(runBot, 2000);
  });
}

runBot();
