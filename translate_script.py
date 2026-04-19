import json
from deep_translator import GoogleTranslator

# Load the JSON data
with open('h:\\projects\\arctic\\frontend\\meet-arctic-front\\public\\data.en.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Initialize translator
translator = GoogleTranslator(source='ru', target='en')

# Translate 'name' and 'descr' fields in cities
for city in data['cities']:
    if 'name' in city and city['name']:
        try:
            translated_name = translator.translate(city['name'])
            city['name'] = translated_name
        except Exception as e:
            print(f"Error translating name {city['name']}: {e}")
    if 'descr' in city and city['descr']:
        try:
            translated_descr = translator.translate(city['descr'])
            city['descr'] = translated_descr
        except Exception as e:
            print(f"Error translating descr {city['descr']}: {e}")

# Save the translated JSON
with open('h:\\projects\\arctic\\frontend\\meet-arctic-front\\public\\data.en.translated.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Translation completed. Saved to data.en.translated.json")