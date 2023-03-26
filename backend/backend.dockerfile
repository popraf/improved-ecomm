FROM python:3.8-alpine

WORKDIR /app_backend

# Instalacja pakietów systemowych
RUN apk update && \
    apk add --no-cache --virtual .build-deps gcc musl-dev

# Instalacja Pythonowych zależności
COPY /app_backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopiowanie kodu aplikacji
COPY . /app_backend/

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]