function checkCookies() {
        var message = document.querySelector('#msg');
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition; //recognize voice
        // var SpeechGrammerList =  SpeechGrammarList || window.webkitSpeechGrammarList; //recognize grammer
        var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
        // var speechRecognitionList = new SpeechGrammarList();

        var grammer = '#JSGF V1.0'; //type of the grammer we use

        var recognition = new SpeechRecognition();
        // var speechRecoGrammerlist = new SpeechGrammerList();
        // speechRecoGrammerlist.addFromString(grammer, 1); //provide grammer information

        // recognition.grammers = speechRecoGrammerlist;
        recognition.lang = 'en-US'; //Specify lang but not compulsory
        recognition.interimResults = false;

        recognition.onresult = function(event){//when recoginzer reconize correct commands
            var last = event.results.length - 1;
            var command = event.results[last][0].transcript;
          
            alert(command);

            if (command.toLowerCase().includes("tic")|| command.toLowerCase().includes("tac")){
                alert("command");
                window.location = "test2.html";        
            }
            else if (command.toLowerCase().includes("world")|| command.toLowerCase().includes("wumpus")||command.toLowerCase().includes("bompus")){
                // document.querySelector('#what').checked = true;
                window.location = 'https://www.google.com';    
            }
            else{
                message.textContent = 'Voice Input Not Match: ' + vcmd + '.';
            }
        };

        recognition.onspeechend = function(){ //when speech end, recogintion stop
            recognition.stop();
        };

        recognition.onerror = function(event){ //when any error raised, set a message
            message.textContent = 'Error in recognition: ' + event.error;
        };

        document.querySelector('#btnCmd').addEventListener('click', function(){
            recognition.start();
        });
 }
         
   