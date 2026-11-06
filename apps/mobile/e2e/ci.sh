#!/bin/sh
# Runs inside the Android emulator step of the CI e2e job (Metro is already serving on :8081).
set -ex
adb install -r apps/mobile/android/app/build/outputs/apk/debug/app-debug.apk
adb reverse tcp:8081 tcp:8081
"$HOME/.maestro/bin/maestro" test apps/mobile/e2e/phase1.yaml --debug-output e2e-output
