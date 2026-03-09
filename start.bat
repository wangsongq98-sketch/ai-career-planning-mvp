@echo off
echo AI职业规划一体机 MVP - 启动中...
echo.
npm install
if %errorlevel% neq 0 (
    echo 安装依赖失败，请检查网络连接
    pause
    exit /b 1
)
echo.
echo 启动开发服务器...
echo.
npm run dev
pause
