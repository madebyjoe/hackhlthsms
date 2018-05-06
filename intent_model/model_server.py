from flask import Flask, jsonify, request
from IntentModel import IntentModel
from Autocorrect import Autocorrect

print('Loading model..')
autocorrect = Autocorrect()
intent_model = IntentModel()
intent_model.load_model('lSVC.pk')
print('Finished loading model; starting server')

app = Flask(__name__)


@app.route('/classify', methods=['POST'])
def apicall():
    """ API Call to classify sentence and return intent """

    try:
        content = request.get_json()
        sentence = content['sentence'].strip()

    except Exception as e:
        raise e

    response = jsonify({'intent': intent_model.predict(sentence)})
    response.status_code = 200

    return response
