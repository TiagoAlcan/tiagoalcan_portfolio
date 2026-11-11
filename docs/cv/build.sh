#!/usr/bin/env bash
# Renders the two résumés to public/cv with headless Chrome. Needs network access for the fonts.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="$here/../../public/cv"
mkdir -p "$out"
for pair in "en:tiago-alcantara-cv-en" "pt-BR:tiago-alcantara-cv-pt-br"; do
  google-chrome --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 \
    --print-to-pdf="$out/${pair#*:}.pdf" "file://$here/cv.${pair%%:*}.html"
done
