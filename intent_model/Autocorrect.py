import re
from collections import Counter


class Autocorrect:

    WORDS = None
    DICT = None

    def __init__(self):
        self.WORDS = Counter(self.words(open('data/big.txt').read()))
        self.DICT = set([word.strip() for word in open('dictionary/google-10000-english-usa.txt', 'r')])

    @staticmethod
    def words(text):
        return re.findall(r'\w+', text.lower())

    def p(self, word):
        """Probability of `word`."""
        n = sum(self.WORDS.values())
        return self.WORDS[word] / n

    def correction(self, word):
        """Most probable spelling correction for word."""
        return max(self.candidates(word), key=self.p)

    def correct_sentence(self, sentence):
        """Call correction on all words"""
        return ' '.join([self.correction(word) if word.lower() not in self.DICT else word for word in sentence.split()])

    def candidates(self, word):
        """Generate possible spelling corrections for word."""
        return self.known([word]) or self.known(self.edits1(word)) or self.known(self.edits2(word)) or [word]

    def known(self, words):
        """The subset of `words` that appear in the dictionary of WORDS."""
        return set(w for w in words if w in self.WORDS)

    @staticmethod
    def edits1(word):
        """All edits that are one edit away from `word`."""
        letters = 'abcdefghijklmnopqrstuvwxyz'
        splits = [(word[:i], word[i:]) for i in range(len(word) + 1)]
        deletes = [L + R[1:] for L, R in splits if R]
        transposes = [L + R[1] + R[0] + R[2:] for L, R in splits if len(R)>1]
        replaces = [L + c + R[1:] for L, R in splits if R for c in letters]
        inserts = [L + c + R for L, R in splits for c in letters]
        return set(deletes + transposes + replaces + inserts)

    def edits2(self, word):
        """All edits that are two edits away from `word`."""
        return (e2 for e1 in self.edits1(word) for e2 in self.edits1(e1))
