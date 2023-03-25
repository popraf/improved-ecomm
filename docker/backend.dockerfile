FROM python:3.8-alpine

WORKDIR /app

# Instalacja pakietów systemowych
RUN apk update && \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev

# Instalacja Pythonowych zależności
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Kopiowanie kodu aplikacji
COPY . /app/

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]