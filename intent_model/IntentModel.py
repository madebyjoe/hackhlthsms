import numpy as np
import pandas as pd
import pickle
import re

from sklearn import metrics
from sklearn.model_selection import train_test_split
from sklearn.svm import LinearSVC


class IntentModel:

    class_to_label = {0: 'history',
                      1: 'remove_payment',
                      2: 'summary',
                      3: 'autopay',
                      4: 'make_payment',
                      5: 'outstanding_balance',
                      6: 'add_payment',
                      7: 'cancel',
                      8: 'help'
                     }

    label_to_class = None
    word_vectors = None
    model = None

    def __init__(self):

        self.label_to_class = {self.class_to_label[class_]: class_ for class_ in self.class_to_label}
        self.load_word_vectors()

    def load_word_vectors(self):
        """ Load word Stanford glove vectors and assign word vector dictionary to static variable"""

        self.word_vectors = pickle.load(open('word_vectors/'+ 'glove.pk', 'rb'))

    def load_word_vectors_from_txt(self):
        """ Load word Stanford glove vectors and assign word vector dictionary to static variable"""

        word_vectors = {}

        for vec in open('word_vectors/glove.6b.300d.txt'):
            spl = vec.strip().split()
            word_vectors[spl[0]] = np.array(spl[1:], dtype=float)

        self.word_vectors = word_vectors

    def sentence_to_vec(self, sentence):
        """ Return sentence embedding created by averaging word vectors """

        sentence = sentence.strip().lower()
        sentence = re.sub('[^a-z0-9#$]', ' ', sentence)
        sentence = re.sub('\s+', ' ', sentence)

        return np.mean([self.word_vectors[word] for word in sentence.split() if word in self.word_vectors], axis=0)

    def get_labelled_data(self):
        """ Load labelled data and return X and y """

        data = pd.read_csv('data/labelled_data.csv', names=['sentences', 'label'])

        X = [self.sentence_to_vec(sentence) for sentence in data.sentences]
        X = np.array([x for x in X if x.shape == (300,)])
        y = [self.label_to_class[data.label[i]] for i,x in enumerate(X) if x.shape == (300,)]

        return X, y

    def train_model(self):
        """ Train LinearSVC model """

        X, y = self.get_labelled_data()
        X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=.75, random_state=0)

        model = LinearSVC(random_state=0)
        model.fit(X_train, y_train)
        self.model = model
        print('Training Accuracy: {:.2%}'.format(model.score(X_train, y_train)))

        y_pred = model.predict(X_test)
        print('Test Accuracy: {:.2%}'.format(metrics.accuracy_score(y_test, y_pred)), '\n\n')

        print(metrics.confusion_matrix(y_test, y_pred), '\n\n')
        print(metrics.classification_report(y_test, y_pred))

    def predict(self, sentence):
        """ Predict class using model """

        if not self.model:
            print('Train a model before using it to predict')

        vec = self.sentence_to_vec(sentence).reshape(1, -1)
        return self.class_to_label[self.model.predict(vec)[0]]

    def save_model(self, filename):
        """ Save model """

        if not filename.endswith('.pk'):
            filename += '.pk'

        with open('models/'+ filename, 'wb') as f:
            pickle.dump(self.model, f)

    def load_model(self, filename):
        """ Load model """

        if not filename.endswith('.pk'):
            filename += '.pk'

        with open('models/'+ filename, 'rb') as f:
            self.model = pickle.load(f)
