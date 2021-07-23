# docker/backend/Dockerfile

FROM python:3.8-alpine

WORKDIR /app
ADD ./backend/requirements.txt /app/backend/

RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt

ADD ./docker /app/docker
ADD ./backend /app/backend

# add execute rights
RUN chmod +x docker/backend/wsgi-entrypoint.sh