from flask import Flask, jsonify


application = Flask(__name__)


@application.route("/api")
def hello():
   return "<h1 style='color:blue'>Hello There!</h1>"
   
@application.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello, REST API!", "status": "success"})   

if __name__ == "__main__":
   application.run(host='0.0.0.0')




# from flask import Flask, send_file
# from PIL import Image, ImageDraw, ImageFont
# import os

# app = Flask(__name__)

# # Пути к ресурсам
# STORAGE_DIR = "./generated_cards"
# BASE_IMG = "./assets/back.jpg"
# CITY_PHOTOS_DIR = "./assets/cities_photos" # фото городов из твоей базы
# FONT_PATH = "./assets/Roboto-Bold.ttf"

# @app.route('/city-card/<int:city_id>')
# def get_city_card(city_id):
#     filename = f"card_{city_id}.png"
#     filepath = os.path.join(STORAGE_DIR, filename)

#     # 1. Проверяем кеш
#     if os.path.exists(filepath):
#         return send_file(filepath, mimetype='image/png')

#     # 2. Если файла нет — генерируем (имитируем данные из БД/JSON)
#     # В реальном проекте здесь будет запрос к БД по city_id
#     city_data = {"name": "Мурманск", "temp": "-39°C", "pop": "270k"} 

#     try:
#         # Открываем фон
#         base = Image.open(BASE_IMG).convert("RGBA")
        
#         # Накладываем фото города (если есть)
#         city_photo_path = f"{CITY_PHOTOS_DIR}/{city_id}.jpg"
#         if os.path.exists(city_photo_path):
#             photo = Image.open(city_photo_path).resize((400, 300))
#             base.paste(photo, (50, 50)) # координаты вставки

#         # Рисуем текст
#         draw = ImageDraw.Draw(base)
#         font = ImageFont.truetype(FONT_PATH, 40)
        
#         draw.text((50, 400), f"Город: {city_data['name']}", font=font, fill="white")
#         draw.text((50, 450), f"Рекорд: {city_data['temp']}", font=font, fill="lightblue")

#         # Сохраняем
#         if not os.path.exists(STORAGE_DIR): os.makedirs(STORAGE_DIR)
#         base.save(filepath)

#         return send_file(filepath, mimetype='image/png')
#     except Exception as e:
#         return str(e), 500

# if __name__ == '__main__':
#     app.run(debug=True)


# import json
# from flask import Flask, send_file
# from PIL import Image, ImageDraw, ImageFont

# app = Flask(__name__)

# # Путь к твоему JSON в проекте React
# JSON_PATH = "../frontend/public/data.json"

# def get_city_from_json(city_id):
#     with open(JSON_PATH, 'r', encoding='utf-8') as f:
#         data = json.load(f)
#         # Ищем город по ID
#         return next((item for item in data if item["id"] == city_id), None)

# @app.route('/card/<int:city_id>')
# def serve_card(city_id):
#     city = get_city_from_json(city_id)
#     if not city:
#         return "City not found", 404

#     # Путь к кешированной картинке
#     card_path = f"./cache/card_{city_id}.png"

#     # Если данных в JSON много, можно добавить проверку хэша или даты файла
#     # Но для начала хватит простой проверки наличия
#     if not os.path.exists(card_path):
#         # Генерируем, используя city['name'], city['lowTemp'] и т.д.
#         generate_card(city, card_path) 

#     return send_file(card_path)
