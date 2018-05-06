# Server to accept user sentences and resolve to a given set of intents

To install all python dependencies run:
```
pip install -r requirements.txt
```

To start the server run:
```
gunicorn --bind 0.0.0.0:8000 model_server:app
```

Send post requests to http://localhost:8000/classify with a json in the format:
```
{
    "sentence": user_sentence_as_string
}
```
