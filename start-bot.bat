@echo off
title Road Safety AI - Telegram Bot & Tunnel Runner
cd /d "%~dp0"

echo ========================================================
echo   ROAD SAFETY AI - TELEGRAM BOT VA TUNNEL TIZIMI
echo ========================================================
echo.

:: 1. Next.js serverini tekshirish yoki ishga tushirish
echo [1/3] Next.js veb-serveri tekshirilmoqda...
netstat -ano | findstr :3000 >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Next.js ishga tushmoqda...
    start /b "" npm run dev
    timeout /t 5 >nul
) else (
    echo [OK] Next.js allaqachon port 3000 da ishlamoqda.
)

:: 2. Cloudflare tunnel
echo [2/3] Cloudflare tunneli ishga tushmoqda...
start /b "" ".\cloudflared.exe" tunnel --url http://localhost:3000

:: 3. Telegram Bot Supervisor (To'xtovsiz nazoratchi)
echo [3/3] Telegram Bot nazoratchisi ishga tushmoqda...
node scripts/bot-supervisor.mjs

pause
