#!/bin/bash
# Використовуємо порт, наданий Render
uvicorn app.main:app --host 0.0.0.0 --port $PORT
