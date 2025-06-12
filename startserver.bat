@echo off

:: The original script comes from ATMTeam.
:: To use a specific Java runtime, set an environment variable named LWI_JAVA_PATH to the full path of java.exe.
:: To disable automatic restarts, set an environment variable named LWI_AUTO_RESTART to false.
:: To install the pack without starting the server, set an environment variable named LWI_INSTALL_ONLY to true.

set SERVER_NAME=Lucky World Invasion
:: set LWI_JAVA_PATH=
:: set LWI_AUTO_RESTART=false
:: set LWI_INSTALL_ONLY=true
set FORGE_VERSION=47.4.1

set INSTALLER="%~dp0forge-1.20.1-%FORGE_VERSION%-installer.jar"
set FORGE_URL="https://maven.minecraftforge.net/net/minecraftforge/forge/1.20.1-%FORGE_VERSION%/forge-1.20.1-%FORGE_VERSION%-installer.jar"

:JAVA
if not defined LWI_JAVA_PATH (
    set LWI_JAVA_PATH=java
)

"%LWI_JAVA_PATH%" -version 1>nul 2>nul || (
   echo Minecraft 1.20.1 requires Java 17 - Java not found
   pause
   exit /b 1
)

:FORGE
setlocal
cd /D "%~dp0"
if not exist "libraries" (
    echo Forge not installed, installing now.
    if not exist %INSTALLER% (
        echo No Forge installer found, downloading from %FORGE_URL%
        bitsadmin.exe /rawreturn /nowrap /transfer forgeinstaller /download /priority FOREGROUND %FORGE_URL% %INSTALLER%
    )
    
    echo Running Forge installer.
    "%LWI_JAVA_PATH%" -jar %INSTALLER% -installServer
)

if not exist "server.properties" (
    (
        echo allow-flight=true
        echo motd=%SERVER_NAME%
        echo max-tick-time=180000
        echo difficulty=hard
    )> "server.properties"
)

if "%LWI_INSTALL_ONLY%" == "true" (
    echo INSTALL_ONLY: complete
    goto:EOF
)

for /f tokens^=2-5^ delims^=.-_^" %%j in ('"%LWI_JAVA_PATH%" -fullversion 2^>^&1') do set "jver=%%j"
if not %jver% geq 17  (
    echo Minecraft 1.20.1 requires Java 17 - found Java %jver%
    pause
    exit /b 1
) 

:START
"%LWI_JAVA_PATH%" @user_jvm_args.txt @libraries/net/minecraftforge/forge/1.20.1-%FORGE_VERSION%/win_args.txt nogui

if "%LWI_AUTO_RESTART%" == "false" ( 
    goto:EOF 
)

echo Restarting automatically in 10 seconds (press Ctrl + C to cancel)
timeout /t 10 /nobreak > NUL
goto:START
