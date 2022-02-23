$(document).ready(function () {
    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    let array = 0;
    let writing = sentences[array];

    let letterPlace = 0;
    let letter = writing.substring(letterPlace, letterPlace + 1);

    let timerOn = false;
    let startDate;
    let startTime;
    
    let numberoOfMistakes = 0;
    let numberOfWords = 54;


    $("#keyboard-upper-container").hide();

    $(document).keydown(function (e) {
        if (e.which == 16) {
            $("#keyboard-upper-container").show();
            $("#keyboard-lower-container").hide();
        };
    });

    $(document).keyup(function (e) {
        if (e.which == 16) {
            $("#keyboard-upper-container").hide();
            $("#keyboard-lower-container").show();
        }
    });

    $(document).keypress(function (e) {
        let theKey = e.key.charCodeAt();
        $('#' + theKey).css('background-color', 'lime');
        $(document).keyup(function (e) {
            let theKey = e.key.charCodeAt();
            $('#' + theKey).css('background-color', '');
        })
    });

    $("#sentence").text(writing);
    $("#target-letter").text(letter);

    $(document).keypress(function(e) {
        if (timerOn === false) {
          startDate = new Date();
          startTime = startDate.getTime();
          timerOn = true;
        }
        if (e.which == sentences[array].charCodeAt(letterPlace)) {
          let correct = $('<span class="glyphicon glyphicon-ok"></span>');
          $(correct).appendTo("#feedback");
          $("#yellow-block").css("left", "+=17.3px");
          letterPlace++;
          letter = writing.substring(letterPlace, letterPlace + 1);
          $("#target-letter").text(letter);
          if (letterPlace === writing.length) {
            array++; 
            if (array === sentences.length) {
              let endDate = new Date();
              let endTime = endDate.getTime();
              let minutes = (endTime - startTime) / 60000;
              wpm = Math.round(numberOfWords / minutes - 2 * numberoOfMistakes);
              const confirmBox = confirm(
                `Congratulations! You typed ${wpm} words per minute! Would you like to play again?`
              );
              if (confirmBox == true) {
                location.reload();
              }
            } else {
              writing = sentences[array];
              $("#sentence").text(writing);
              letterPlace = 0;
              letter = writing.substring(letterPlace, letterPlace + 1);
              $("#target-letter").text(letter);
              $("#yellow-block").css("left", "15px");
              $("#feedback").text("");
            }
          }
        } else {
          let incorrect = $('<span class="glyphicon glyphicon-remove"></span>');
          $(incorrect).appendTo("#feedback");
        }
      });
});