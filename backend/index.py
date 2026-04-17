from flask import Flask, jsonify


application = Flask(__name__)


@application.route("/")
def hello():
   return "<h1 style='color:blue'>Hello There!</h1>"
   
@application.route('/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello, REST API!", "status": "success"})   

if __name__ == "__main__":
   application.run(host='0.0.0.0')