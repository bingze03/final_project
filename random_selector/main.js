$(document).ready(()=>{
    $('.btn').click(()=>{
        var food=[];
        const option=$('.option').val();
        if(option){
            $('li.'+option).each(function(){
                food.push($(this).text());
            });
        }
        else{
            $('li.food').each(function(){
                food.push($(this).text());
            });
        }
    
        const rand=Math.floor(Math.random()*food.length);
    
        $('.dinner').text(food[rand]);
        $('.pic img').attr('src','random_selector/'+food[rand]+'.jpg');
    })
})
