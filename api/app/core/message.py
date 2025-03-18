from flask_jsonpify import jsonify

def returnMessage(information, code) :
    message = {
        'message': information
    }
    return jsonify(message),code

def returnData(data, code) :
    return jsonify(data),code