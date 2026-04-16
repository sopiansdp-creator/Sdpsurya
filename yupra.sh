#!/data/data/com.termux/files/usr/bin/bash

clear

echo "==============================="
echo "        YUPRA CLOUD"
echo "==============================="

# Waktu sekarang
NOW=$(date "+%d/%m/%Y %H:%M:%S WIB")

# Lokasi (manual atau pakai curl ipinfo)
LOCATION=$(curl -s ipinfo.io/city), Indonesia (ID)

# OS
OS=$(uname -srmo)

# CPU
CPU=$(lscpu | grep "Model name" | cut -d ':' -f2)

# Uptime
UPTIME=$(uptime -p)

# Node.js
NODE=$(node -v)

# RAM
RAM=$(free -h | awk '/Mem:/ {print $3 "/" $2}')

# Disk
DISK=$(df -h / | awk 'NR==2 {print $3 "/" $2}')

# Usage Disk %
USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')

# Progress bar
BAR=$(printf "%0.s#" $(seq 1 $((USAGE/2))))

echo ""
echo "Now        : $NOW"
echo "Location   : $LOCATION"
echo "OS         : $OS"
echo "CPU        : $CPU"
echo "Uptime     : $UPTIME"
echo "Node.js    : $NODE"
echo "RAM        : $RAM"
echo "Disk       : $DISK"
echo ""
echo "Usage      : [$BAR] $USAGE%"
echo ""

echo "==============================="
echo "[1] Start"
echo "[2] Restart"
echo "[3] Stop"
echo "[0] Exit"
echo "==============================="

read -p "Pilih menu: " pilih

case $pilih in
1)
    echo "Starting server..."
    sleep 2
    ;;
2)
    echo "Restarting server..."
    sleep 2
    ;;
3)
    echo "Stopping server..."
    sleep 2
    ;;
0)
    exit
    ;;
*)
    echo "Pilihan tidak valid!"
    ;;
esac
