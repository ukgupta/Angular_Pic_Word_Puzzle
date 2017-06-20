angular.module('4Pics1Word')

.controller('PicWordController', function($scope, $http){

	var pw = this;
	var levelAnswers = ["Green", "Avengers", "splash"];
	var levelPics = {};

	pw.answerGuessHintLocation = [];
	pw.answerGuess = [];
	pw.currentLevel = 1;

	var currentLevelAnswer = levelAnswers[pw.currentLevel-1];

	var getLevelPics = function(level){
		for(var i=1; i<=4; i++){
			levelPics[i-1] = 'img/images_'+level+ i + '.jpg';
		}
		pw.levelPics = levelPics;
		/*alert(pw.levelPics);*/
	}
		
	String.prototype.shuffle = function () {
		var strToArr = this.split(""),
		n = strToArr.length;

		for(var i = n - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var tmp = strToArr[i];
			strToArr[i] = strToArr[j];
			strToArr[j] = tmp;
		}
		return strToArr;
	}

	var createHintsBoxes = function(answerBoxes){
		var fillLetters = 'abcdefghijklmnopqrstuvwxyz';
		
		for(var i=answerBoxes.length; i < 12; i++){
			answerBoxes += fillLetters.charAt(Math.floor(Math.random() * 26));
		}

		pw.hintBoxes = answerBoxes.shuffle();
		/*alert(pw.hintBoxes);*/
	}

	var picWord = function(){
		if(pw.currentLevel <= levelAnswers.length){
			currentLevelAnswer = levelAnswers[pw.currentLevel-1];
			pw.initAnswerLength = new Array(currentLevelAnswer.length);
			getLevelPics(pw.currentLevel);
			createHintsBoxes(currentLevelAnswer);
		}else{
			alert('Congratulations you have successfully completed game');
			pw.currentLevel = 1;
			pw.answerGuess = [];
			picWord();
		}	
	}

	pw.addLetterToAnswerBox = function(index, hint){
		var hintAddLocation = pw.answerGuess.indexOf('');
		if(hint){
			if(pw.answerGuess.length !== currentLevelAnswer.length && hintAddLocation == -1){
				pw.answerGuess.push(hint);
				pw.answerGuessHintLocation.push(index);
				pw.hintBoxes[index] = '';
			}else if(hintAddLocation >= 0 || pw.answerGuess.length !== currentLevelAnswer.length){
				pw.answerGuess[hintAddLocation] = hint;
				pw.answerGuessHintLocation[hintAddLocation] = index;
				pw.hintBoxes[index] = '';
			}
		}

		if(pw.answerGuess.length == currentLevelAnswer.length && hintAddLocation == -1 || hintAddLocation == currentLevelAnswer.length-1){
			if(pw.answerGuess.join('') == currentLevelAnswer){
				alert('Answer is Correct');
				pw.currentLevel += 1;
				pw.answerGuess = [];
				pw.answerGuessHintLocation = [];
				picWord();
			}else{
				alert('Wrong Answer');
			}
		}
	};

	pw.removeLetterFromAnswerBox = function(index, hint){
		if(hint){
			var addHintLocation = pw.answerGuessHintLocation[index];
			pw.hintBoxes[addHintLocation] = hint;
			pw.answerGuess[index] = '';
		}
	};

	picWord();
});

