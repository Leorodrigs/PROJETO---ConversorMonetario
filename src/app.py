from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

API_KEY = '5903dbf2ce8cdd23731677a5'

def get_exchange_rate(from_currency, to_currency):
    url = f"https://v6.exchangerate-api.com/v6/{API_KEY}/latest/{from_currency}"
    response = requests.get(url)
    return response.json()['conversion_rates'][to_currency]

@app.route('/convert', methods=['GET'])
def convert_currency():
    from_currency = request.args.get('from')
    to_currency = request.args.get('to')
    amount = float(request.args.get('amount'))

    rate = get_exchange_rate(from_currency, to_currency)
    converted_amount = rate * amount    
    formatted_amount = round(converted_amount, 2)

    return jsonify({
        'from_currency': from_currency,
        'to_currency': to_currency,
        'amount': amount,
        'converted_amount': formatted_amount,
        'rate': round(rate, 2)
    })

if __name__ == '__main__':
    app.run(debug=True)
