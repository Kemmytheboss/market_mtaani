FROM python:3.10-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . ./

ENV FLASK_APP=server.app

# Run migrations (if not already initialized) and seed database
CMD ["sh", "-c", "flask db init 2>/dev/null || true; flask db migrate -m 'initial' || true; flask db upgrade || true; python server/seed.py"]
