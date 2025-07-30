from flask import jsonify

def response(success=True, message="", data=None, status=200):
    return jsonify({
        "success": success,
        "message": message,
        "data": data
    }), status
