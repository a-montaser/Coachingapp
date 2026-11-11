#!/bin/sh
# Runs inside the Android emulator step of the CI e2e job (Metro is already serving on :8081).
set -ex
eval "$(supabase status -o env)"
mkdir -p e2e-output
DB_URL="$DB_URL" sh apps/mobile/e2e/helper.sh &
HELPER=$!
adb install -r apps/mobile/android/app/build/outputs/apk/debug/app-debug.apk
adb reverse tcp:8081 tcp:8081
status=0
"$HOME/.maestro/bin/maestro" test apps/mobile/e2e/phase1.yaml --debug-output e2e-output || status=$?
[ $status -eq 0 ] && { "$HOME/.maestro/bin/maestro" test apps/mobile/e2e/phase2.yaml --debug-output e2e-output/phase2 || status=$?; }
kill $HELPER || true
exit $status
