#!/bin/sh

set -eu
# The original script comes from ATMTeam.
# To use a specific Java runtime, set an environment variable named LWI_JAVA_PATH to the full path of java.exe.
# To disable automatic restarts, set an environment variable named LWI_AUTO_RESTART to false.
# To install the pack without starting the server, set an environment variable named LWI_INSTALL_ONLY to true.

SERVER_NAME="Lucky World Invasion"
# LWI_JAVA_PATH=""
# LWI_AUTO_RESTART="false"
# LWI_INSTALL_ONLY="true"
FORGE_VERSION=47.4.1

INSTALLER="forge-1.20.1-$FORGE_VERSION-installer.jar"
FORGE_URL="https://maven.minecraftforge.net/net/minecraftforge/forge/1.20.1-$FORGE_VERSION/forge-1.20.1-$FORGE_VERSION-installer.jar"

pause() {
    printf "%s\n" "Press enter to continue..."
    read ans
}

if ! command -v "${LWI_JAVA_PATH:-java}" >/dev/null 2>&1; then
    echo "Minecraft 1.20.1 requires Java 17 - Java not found"
    pause
    exit 1
fi

cd "$(dirname "$0")"
if [ ! -d libraries ]; then
    echo "Forge not installed, installing now."
    if [ ! -f "$INSTALLER" ]; then
        echo "No Forge installer found, downloading now."
        if command -v wget >/dev/null 2>&1; then
            echo "DEBUG: (wget) Downloading $FORGE_URL"
            wget -O "$INSTALLER" "$FORGE_URL"
        else
            if command -v curl >/dev/null 2>&1; then
                echo "DEBUG: (curl) Downloading $FORGE_URL"
                curl -o "$INSTALLER" -L "$FORGE_URL"
            else
                echo "Neither wget or curl were found on your system. Please install one and try again"
                pause
                exit 1
            fi
        fi
    fi

    echo "Running Forge installer."
    "${LWI_JAVA_PATH:-java}" -jar "$INSTALLER" -installServer
fi

if [ ! -e server.properties ]; then
    printf "allow-flight=true\nmotd=$SERVER_NAME\nmax-tick-time=180000\ndifficulty=hard" > server.properties
fi

if [ "${LWI_INSTALL_ONLY:-false}" = "true" ]; then
    echo "INSTALL_ONLY: complete"
    exit 0
fi

JAVA_VERSION=$("${LWI_JAVA_PATH:-java}" -fullversion 2>&1 | awk -F '"' '/version/ {print $2}' | cut -d'.' -f1)
if [ ! "$JAVA_VERSION" -ge 17 ]; then
    echo "Minecraft 1.20.1 requires Java 17 - found Java $JAVA_VERSION"
    pause
    exit 1
fi

while true
do
    "${LWI_JAVA_PATH:-java}" @user_jvm_args.txt @libraries/net/minecraftforge/forge/1.20.1-$FORGE_VERSION/unix_args.txt nogui

    if [ "${LWI_AUTO_RESTART:-true}" = "false" ]; then
        exit 0
    fi

    echo "Restarting automatically in 10 seconds (press Ctrl + C to cancel)"
    sleep 10
done
