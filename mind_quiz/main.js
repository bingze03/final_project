const renderQuestion=(index)=>{
    $('div.question h3').text(questions[index].question);
    for(var i=0;i<3;++i){
        $('div.option'+(i+1)+' span').text(questions[index].answers[i][0]);
    }
    return index;
}

$(document).ready(()=>{
    var ind=renderQuestion(0);

    $('div.option').mouseover(function(){
        $(this).css('background-color','#dddddd');
        $(this).css('cursor','pointer');
    });

    $('div.option').mouseout(function(){
        $(this).css('background-color','#ffffff');
    });

    $('div.option').click(function(){
        var ele=questions[ind].answers.find(d=>d[0]==$(this).children().text());
        if(typeof(ele[1])=='number')
            ind=renderQuestion(ele[1]);
        else{
            $('div.question h3').text(finalAnswers[ele[1]][0]);
            $('div.question').append('<span>'+finalAnswers[ele[1]][1]+'</span>');
            $('div.options').remove();
        }
    });
});
