
// variables
    var correctScore = 0
    var incorrectScore = 0
    var unanswered = 0
    var startScreen
    var counter = 30
    var questionCounter = 0
    var selecterAnswer
    var theClock
    var gameHTML
    var questionArray = ["Who wrote the music from West Side Story?", "Who wrote Pavane pour une infante défunte?", "Who wrote Prélude à l'après-midi d'un faune?", "Who wrote Concierto de Aranjuez?", "Who wrote Capullito de alhelí?", "Who wrote Music for 18 Musicians?", "Who wrote Einstein on the Beach?", "Who wrote Rhapsody in Blue?"]
    var answerArray = [["Leonard Bernstein", "Maurice Ravel", "George Gershwin", "Arnold Schoenberg"], ["Claude Debussy","Maurice Ravel","Alban Berg","Leonard Bernstein"], ["Steve Reich", "Alban Berg", "Claude Debussy", "Joaquín Rodrigo"], ["Phillip Glass","Arnold Schoenberg","Joaquín Rodrigo","Rafael Hernández Marín"], ["Arnold Schoenberg", "Maurice Ravel", "Claude Debussy", "Rafael Hernández Marín"], ["Steve Reich","Alban Berg","Leonard Bernstein","Joaquín Rodrigo"], ["Leonard Bernstein", "Phillip Glass", "George Gershwin", "Rafael Hernández Marín"], ["Maurice Ravel","Leonard Bernstein","Alban Berg","George Gershwin"]]
    var imageArray = ["<img class='center-block img-right' src='assets/images/leonardBernstein.jpg' height='280' width='200'>", "<img class='center-block img-right' src='assets/images/mauriceRavel.jpg'>", "<img class='center-block img-right' src='assets/images/claudeDebussy.jpg' height='280' width='200'>", "<img class='center-block img-right' src='assets/images/joaquinRodrigo.jpg'>", "<img class='center-block img-right' src='assets/images/rafaelHernandezMarin.jpg'>", "<img class='center-block img-right' src='assets/images/steveReich.jpg'>", "<img class='center-block img-right' src='assets/images/phillipGlass.jpg' height='280' width='200'>", "<img class='center-block img-right' src='assets/images/georgeGershwin.jpg' height='280' width='200'>"]
    var correctAnswers = ["A. Leonard Bernstein", "B. Maurice Ravel", "C. Claude Debussy", "C. Joaquín Rodrigo", "D. Rafael Hernández Marín", "A. Steve Reich", "B. Phillip Glass", "D. George Gershwin"]
    
    
    


// functions
    function youWin() {
        correctScore++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter]
        $(".mainArea").html(gameHTML)
        setTimeout(wait, 4000)  
    }
    
    function youLose() {
        incorrectScore++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/frownFace.png' height='300' width='300'>"
        $(".mainArea").html(gameHTML)
        setTimeout(wait, 4000) 
    }

    function TimeOut() {
        unanswered++
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/frownFace.png' height='300' width='300'>"
        $(".mainArea").html(gameHTML)
        setTimeout(wait, 4000)
    }
    
    function editHTML() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>"
        $(".mainArea").html(gameHTML);
    }
    
    function wait() {
        if (questionCounter < 7) {
        questionCounter++
        editHTML()
        counter = 30
        timerWrapper()
        console.log(questionCounter)
        }
        else {
            gameOver()
        }
    }
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000)
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock)
                TimeOut()
            }
            if (counter > 0) {
                counter--
            }
            $(".timer").html(counter)
        }
    }
    
    function gameOver() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Here's your score: " + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctScore + "</p>" + "<p>Wrong Answers: " + incorrectScore + "</p>" + "<p>Unanswered: " + unanswered + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Play again</a></p>"
        $(".mainArea").html(gameHTML)
        
    }
    
    function resetGame() {
        questionCounter = 0
        correctScore = 0
        incorrectScore = 0
        unanswered = 0
        counter = 30
        editHTML()
        timerWrapper()
    }
    

    
$(document).ready(function() {
    
    function introScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>"
        $(".mainArea").html(startScreen);
    }
    
    introScreen()
    
    
    // starts game
    $("body").on("click", ".start-button", function(event){
        editHTML()
    
        timerWrapper()
    
    }) 
    
    $("body").on("click", ".answer", function(event){
        
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) { // correct answer
            
    
            clearInterval(theClock)
            youWin()
        }
        else { // incorrect answer
            
            clearInterval(theClock);
            youLose()
        }
    }); 
    
    $("body").on("click", ".reset-button", function(event){
        resetGame()
    }); 
    
    });  
    
    
    

    