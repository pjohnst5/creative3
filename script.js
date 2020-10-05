var app = new Vue({
	el: '#main',
	data: {
    title: 'The Doggo Quiz',
		message: 'Take the quiz to find out which dog is best for you!',
    footerMessage: 'Created by Paul Johnston',
    available: 'Source code available on ',
    answers: [],
    current: {},
    finishedQuiz: false,
    loadingResult: false,
    answers : {},
    enableSubmit: false,
    breed: '',
    subBreed: '',
    vowels: ['A', 'E', 'I', 'O', 'U'],
    answersAsString: '',
    answersToBreed: {
      "AAA": {"url": "/pug", "name": "Pug"},
      "AAB": {"url": "/chihuahua", "name": "Chihuahua"},
      "AAC": {"url": "/shihtzu", "name": "Shih Tzu"},

      "ABA": {"url": "/akita", "name": "Akita"},
      "ABB": {"url": "/hound/basset", "name": "Basset Hound"},
      "ABC": {"url": "/dachshund", "name": "Dachshund"},
      
      "ACA": {"url": "/terrier/yorkshire", "name": "Yorkshire Terrier"},
      "ACB": {"url": "/shiba", "name": "Shiba"},
      "ACC": {"url": "/newfoundland", "name": "Newfoundland"},

      "BAA": {"url": "/pomeranian", "name": "Pomeranian"},
      "BAB": {"url": "/beagle", "name": "Beagle"},
      "BAC": {"url": "/terrier/russell", "name": "Jack Russell Terrier"},

      "BBA": {"url": "/chow", "name": "Chow Chow"},
      "BBB": {"url": "/collie/border", "name": "Border Collie"},
      "BBC": {"url": "/whippet", "name": "Whippet"},

      "BCA": {"url": "/labrador", "name": "Labrador"},
      "BCB": {"url": "/husky", "name": "Husky"},
      "BCC": {"url": "/germanshepherd", "name": "German Sherpherd"},

      "CAA": {"url": "/spaniel/cocker", "name": "Cocker Spaniel"},
      "CAB": {"url": "/corgi/cardigan", "name": "Corgi"},
      "CAC": {"url": "/bulldog/french", "name": "French Bulldog"},

      "CBA": {"url": "/poodle/standard", "name": "Poodle"},
      "CBB": {"url": "/dalmatian", "name": "Dalmatian"},
      "CBC": {"url": "/retriever/golden", "name": "Golden Retriever"},

      "CCA": {"url": "/samoyed", "name": "Samoyed"},
      "CCB": {"url": "/australian/shepherd", "name": "Australian Shepherd"},
      "CCC": {"url": "/stbernard", "name": "St. Bernard"},
    },

	}, //end data
  methods: {
    finishedQuizFunction: function() {
      this.finishedQuiz = true;
      this.loadingResult = true;

      this.answersToString()
      console.log(this.answersAsString)

      name = this.answersToBreed[this.answersAsString].name;

      if (this.vowels.includes(name.charAt(0))) {
        this.message = 'An ' + name + ' is best for you!';
      } else {
        this.message = 'A ' + name + ' is best for you!';
      }
      
      url = this.fullUrl(this.answersToBreed[this.answersAsString].url)
      console.log(url)
      fetch(url).then(response => {
       return response.json();
      }).then(json => {
         this.current = json;
         this.loadingResult = false;
         return true;
      }).catch(err => {
          this.message = 'Something went wrong';
      });

    },
    answeredQuestion: function(num, answer) {
      if (!(num in this.answers)) {
        Vue.set(app.answers, num, {actualAnswer: answer});
      } else {
        this.answers[num].actualAnswer = answer;
      }
      console.log("answer for " + num + " is now " + this.answers[num].actualAnswer);
      var size = 0;

      for(var prop in this.answers) {
        if(this.answers.hasOwnProperty(prop))
            ++size;
      }
      console.log('num answers is ' + size);

      if (size === 3){
        this.enableSubmit = true;
      }
    },
    answersToString: function() {
      console.log(this.answers)
      for (var key in this.answers) {
        if (this.answers.hasOwnProperty(key)) {
          this.answersAsString += this.answers[key].actualAnswer
        }
      }
    },
    fullUrl: function(breed) {
      return 'https://dog.ceo/api/breed' + breed + '/images/random';
    },
    again : function() {
      location.reload();
    },

  }, //end methods
});
