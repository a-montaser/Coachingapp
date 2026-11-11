#!/bin/sh
# Runs inside the Android emulator step of the CI e2e job (Metro is already serving on :8081).
set -ex
eval "$(supabase status -o env)"
mkdir -p e2e-output
DB_URL="$DB_URL" sh apps/mobile/e2e/helper.sh &
HELPER=$!
adb install -r apps/mobile/android/app/build/outputs/apk/debug/app-debug.apk
adb reverse tcp:8081 tcp:8081
# Screen recording of the whole run. Android's screenrecord stops at 3 minutes, so it records in parts.
( i=0; while :; do i=$((i+1)); adb shell screenrecord --bit-rate 4000000 --time-limit 180 "/sdcard/e2e_$(printf %02d $i).mp4" || break; done ) &
REC=$!
status=0
"$HOME/.maestro/bin/maestro" test apps/mobile/e2e/phase1.yaml --debug-output e2e-output || status=$?
[ $status -eq 0 ] && { "$HOME/.maestro/bin/maestro" test apps/mobile/e2e/phase2.yaml --debug-output e2e-output/phase2 || status=$?; }
kill $HELPER || true
set +e
kill $REC; adb shell pkill -INT screenrecord; sleep 5
mkdir -p e2e-output/video
for f in $(adb shell 'ls /sdcard/e2e_*.mp4' | tr -d '\r'); do adb pull "$f" e2e-output/video/; done
if command -v ffmpeg > /dev/null; then
  (cd e2e-output/video && for f in e2e_*.mp4; do echo "file '$f'"; done > parts.txt &&
    ffmpeg -loglevel error -f concat -safe 0 -i parts.txt -c copy journey.mp4)
fi
exit $status
