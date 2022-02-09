FROM python:3.8

ENV PYTHONUNBUFFERED 1

# устанавливаем рабочую директорию для программы внутри контейнера
WORKDIR /usr/src/app

# копируем файл с зависимостями
COPY ./requirements.txt .

# установка зависимостей проекта, они станут частью образа
RUN pip install -r requirements.txt

# копируем программный код проекта внутрь образа
COPY . .

# устанавливаем точку входа, когда на основе образа будет создан
# контейнер, эти команды будут запущены в момент его запуска
RUN chmod +x ./docker-entrypoint.sh
ENTRYPOINT [ "./docker-entrypoint.sh" ]
