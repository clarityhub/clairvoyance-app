#!/bin/bash
cd "$(dirname "$0")"

cd ../repos/services

for D in */; do
    if [ -d "${D}" ]; then
        if [ "${D}" != "node_modules/" ]; then
          if [ -f "${D}/package.json" ]; then
              (cd "${D}" && (yarn list | grep -q "service-claire") && yarn upgrade service-claire)
          fi
        fi
    fi
done
