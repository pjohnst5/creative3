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

	}, //end data
  methods: {
    finishedQuizFunction: function() {
      this.finishedQuiz = true;
      this.loadingResult = true;

      if (this.answers[0].actualAnswer === 'A') {
        if (this.answers[1].actualAnswer === 'A') {
          this.breed = 'Chihuahua';
        } else if (this.answers[1].actualAnswer ==='B') {
          this.breed = 'Beagle';
        } else {
          this.breed = 'Dingo';
        }

      } else if (this.answers[0].actualAnswer === 'B') {
        if (this.answers[1].actualAnswer === 'A') {
          this.breed = 'Whippet';
        } else if (this.answers[1].actualAnswer ==='B') {
          this.breed = 'Labrador';
        } else {
          this.breed = 'Akita';
        }
      } else {
        if (this.answers[1].actualAnswer === 'A') {
          this.breed = 'Kelpie';
        } else if (this.answers[1].actualAnswer ==='B') {
          this.breed = 'Germanshepherd';
        } else {
          this.breed = 'Leonberg';
        }
      }

      this.title = this.breed;
      if (this.breed.charAt(0) === 'A' || this.breed.charAt(0) === 'E' || this.breed.charAt(0) === 'I' || this.breed.charAt(0) === 'O' || this.breed.charAt(0) === 'U'){
        this.message = 'An ' + this.breed + ' is best for you!';
      } else {
        this.message = 'A ' + this.breed + ' is best for you!';
      }

			const url = 'https://dog.ceo/api/breed/' + this.breed.toLowerCase() + '/images/random';
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
    again : function() {
      location.reload();
    },

  }, //end methods
});
