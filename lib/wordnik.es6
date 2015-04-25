wordnik = {
  baseUrl: 'http://api.wordnik.com:80/v4/words.json/'
, apiKey: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
, getRandom: function (length) {
    return (
      this.baseUrl + 'randomWord'
    + '?hasDictionaryDef=true&minCorpusCount=0'
    + '&maxCorpusCount=0&minDictionaryCount=50&maxDictionaryCount=0'
    + '&minLength=' + length + '&maxLength=' + length
    + '&api_key=' + this.apiKey
    );
  }

, checkWord: function (word) {
    return (
      this.baseUrl + 'search/' + word + '?api_key=' + this.apiKey
    );
  }
};
