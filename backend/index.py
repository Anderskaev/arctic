import os
import json
from flask import Flask, send_file
from PIL import Image, ImageDraw, ImageFont
import textwrap
import logging
# from flask_cors import CORS


basedir = os.path.abspath(os.path.dirname(__file__))
logging.basicConfig(filename=os.path.join(basedir, 'error.log'), level=logging.DEBUG)

# CITY_PHOTOS_DIR = "./public/cities" 
# CITY_CARDS_DIR = "./public/postcards" 


application = Flask(__name__)
# CORS(application)

# PUBLIC_PATH = "../frontend/meet-arctic-front/public"
PUBLIC_PATH = "/public"

CITY_PHOTOS_DIR = f"{PUBLIC_PATH}/cities" 
CITY_CARDS_DIR = f"./postcards" 
POSTCARD_BLANK = f"{PUBLIC_PATH}/blank.png"

DATA_FILE = f"{PUBLIC_PATH}/data.json"
BLANK_CITY = { "id":1, "id_country": 9, "name": "Arctic City", "lowTemp": -71, "avgTemp": -20.0, "longitude": 0.0, "latitude": 90.00, "population": 4000000, "descr": "The Arctic is the northernmost region of Earth, primarily consisting of the Arctic Ocean and parts of Russia, the United States (Alaska), Canada, Norway, Denmark (Greenland), Sweden, Finland, and Iceland." }
BLANK_COUNTRY = {"id":9, "name":"Arctic"}
BLANK_DATA = {"countries": [BLANK_COUNTRY], "cities":[BLANK_CITY]}

FONT_PATH = f"{PUBLIC_PATH}/fonts"
FONT_HEADER = f'{FONT_PATH}/exotc.ttf'
FONT_STAT = f'{FONT_PATH}/bodoni.ttf'
FONT_COORDS = f'{FONT_PATH}/consola.ttf'

if os.path.exists(DATA_FILE):
   with open(DATA_FILE, 'r', encoding='utf-8') as f:
      data = json.load(f)
else:
   data = BLANK_DATA  

CITIES = {city['id']: city for city in data['cities']}
COUNTRIES = {country['id']: country for country in data['countries']}

def get_rect_center(rect):
   rect = rect
   center_x = (rect[0] + rect[2]) / 2
   center_y = (rect[1] + rect[3]) / 2
   return (center_x, center_y)

def format_pop(n):
    if n < 100:
        return str(n)
    if n >= 1000000:
        return f"{n / 1000000:.1f}M"
    if n >= 1000:
        return f"{n / 1000:.0f}K"
    
    # Аналог n.toLocaleString() — добавляет пробел как разделитель тысяч
    return f"{n:,}".replace(",", " ")

def format_coords(value, positive_dir, negative_dir):
    # Вычисляем градусы и минуты
    abs_val = abs(value)
    d = int(abs_val)  # Целая часть (аналог Math.floor)
    m = round((abs_val - d) * 60)
    
    # Обработка переполнения минут
    if m == 60:
        d += 1
        m = 0
        
    direction = positive_dir if value >= 0 else negative_dir
    return f"{d}°{m}′ {direction}"

def format_latitude(lat):
    return format_coords(lat, 'N', 'S')

def format_longitude(lng):
    return format_coords(lng, 'E', 'W')

def draw_text_constrained(draw, text, font, rect, fill="black"):
    # rect = (x0, y0, x1, y1)
    x0, y0, x1, y1 = rect
    max_width = x1 - x0
    
    # 1. Рассчитываем, сколько символов поместится в ширину
    # Примерно: ширина области / ширина среднего символа
    avg_char_width = font.getlength('x') 
    chars_per_line = int(max_width / avg_char_width)
    
    # 2. Разбиваем текст на строки
    lines = textwrap.wrap(text, width=chars_per_line)
    
    # 3. Рисуем каждую строку
    current_y = y0
    line_spacing = font.getbbox("Ay")[3] + 5 # Высота строки + отступ
    
    for line in lines:
        # Проверяем, не вышли ли за нижнюю границу
        if current_y + line_spacing > y1:
            break
            
        # Рисуем строку (можно добавить anchor="mm" для центрирования)
        draw.text((x0, current_y), line, font=font, fill=fill)
        current_y += line_spacing

def generate_card(city_id, filepath, postcard_path):
   city_data = CITIES.get(city_id, BLANK_CITY)
   base = Image.open(filepath).convert("RGBA")
   base = base.resize((1500, 1000))

   blank = Image.open(POSTCARD_BLANK).resize((1500, 1000))
   base.paste(blank, (0, 0), blank) 

   draw = ImageDraw.Draw(base)
   
   font = ImageFont.truetype(FONT_HEADER, 56)       
   draw.text(get_rect_center([950, 100, 1480, 200] ), f"{city_data['name'].upper()}", font=font, fill="#042C53", anchor="mm")
   font = ImageFont.truetype(FONT_HEADER, 40)  
   country = COUNTRIES.get(city_data['id_country'],BLANK_COUNTRY)
   draw.text(get_rect_center([950, 180, 1480, 280] ), f"{country['name'].upper()}", font=font, fill="#042C53", anchor="mm")

   font = ImageFont.truetype(FONT_STAT, 30)       
   draw.text((1270, 317), f"{city_data['lowTemp']} C", font=font, fill="#0C447C")
   draw.text((1280, 363), f"{city_data['avgTemp']} C", font=font, fill="#0C447C")   
   draw.text((1320, 417), f"{format_pop(city_data['population'])}", font=font, fill="#0C447C")   

   font = ImageFont.truetype(FONT_COORDS, 30)       
   draw.text((215, 893), f"{format_latitude(city_data['latitude'])}, {format_longitude(city_data['longitude'])} ", font=font, fill="white")
   
   font = ImageFont.truetype(FONT_COORDS, 20)  
   draw_text_constrained(draw, city_data['descr'], font, [980, 510, 1480, 820], fill="#042C53")

   base.save(postcard_path) 
   
   return

@application.route('/api', methods=['GET'])
def hello():
    return "Hello world"

@application.route('/api/postcard/<int:city_id>', methods=['GET'])
def get_postcard(city_id):
      
   filepath = os.path.join(os.path.dirname(__file__), f'{CITY_PHOTOS_DIR}/{city_id}.png') if os.path.exists(os.path.join(os.path.dirname(__file__), f'{CITY_PHOTOS_DIR}/{city_id}.png')) else  os.path.join(os.path.dirname(__file__), f'{CITY_PHOTOS_DIR}/placeholder.png')
   postcard_path = os.path.join(os.path.dirname(__file__), f'{CITY_CARDS_DIR}/{city_id}.png')

    
#    if os.path.exists(postcard_path):
#        return send_file(postcard_path, mimetype='image/png')
#    else:
      #generate_card(city_id, filepath)
   generate_card(city_id, filepath, postcard_path)
   return send_file(postcard_path, mimetype='image/png')

if __name__ == "__main__":
   application.run(host='0.0.0.0', debug=True)  # добавить debug=True
   #application.run(host='0.0.0.0')




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
