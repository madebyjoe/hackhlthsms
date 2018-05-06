# intent_model
Server to accept user sentences and resolve to a given set of intents

## Setup
1. To install all python dependencies run:
```
pip install -r requirements.txt
```
2. Download word vectors from http://nlp.stanford.edu/data/glove.6B.zip and extract "glove.6B.300d.txt" into word_vectors/
3. To start the server run:
```
gunicorn --bind 0.0.0.0:8000 model_server:app
```
4. Send post requests to http://localhost:8000/classify with a json in the format:
```
{
    "sentence": user_sentence_as_string
}
```
