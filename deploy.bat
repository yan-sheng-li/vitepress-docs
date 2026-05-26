@echo off

echo ===== Starting Deploy =====

git status --porcelain
if %errorlevel% neq 0 (
    echo [ERROR] Git command failed
    cmd /k
)

git status --porcelain | findstr /v "^$" >nul
if %errorlevel% neq 0 (
    echo [INFO] No git changes, exit
    cmd /k
)

echo [INFO] Git changes detected
echo.

set commit_msg=feat: new docs

echo Enter commit message (press Enter for default):
set /p user_input=

if not "%user_input%"=="" (
    set commit_msg=%user_input%
)

echo [INFO] Commit message: %commit_msg%

echo [INFO] Running git add .
git add .

echo [INFO] Running git commit
git commit -m "%commit_msg%"

echo [INFO] Running git push
git push

echo.
echo [INFO] Running npm run deploy
call npm run deploy

echo.
echo ===== Deploy Done! =====
cmd /k
