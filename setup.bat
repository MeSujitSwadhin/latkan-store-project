@echo off
REM One-click setup for The Latkan Store (Windows)
cd /d "%~dp0"
echo Installing dependencies...
call npm install || goto :err
echo Downloading licensed demo photographs...
call npm run images
echo Starting the site at http://localhost:3000 ...
call npm run dev
goto :eof
:err
echo.
echo Setup failed. Make sure Node.js 18.18+ is installed: https://nodejs.org
pause
