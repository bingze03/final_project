const render=(date,topic)=>{
    $('#courseTable').html('');
    $('#courseTable').append('<tr><th>場次</th><th>時間</th><th>主題</th></tr>');
    for(var i=0; i<topic.length; ++i){
        var currentDate=new Date(date.valueOf()+7*i*86400000);
        $('#courseTable').append(
            '<tr>'+
                '<td>'+(i+1)+'</td>'+
                '<td>'+(currentDate.getMonth()+1)+'/'+currentDate.getDate()+'</td>'+
                '<td>'+topic[i]+'</td>'+
            '</tr>'
        );
        
    }

    $('td').each(function(){
        if($(this).text()=='不上課' || $(this).text()=='連假' || $(this).text()=='校慶停課')
            $(this).parent().css('color','grey');
    });
}

$(document).ready(()=>{
    render(beginDay,topic);

    $('input.firstDate').change(function(){
        var year=parseInt(this.value.slice(0,4));
        var month=parseInt(this.value.slice(5,7));
        var day=parseInt(this.value.slice(8,10));
        render(new Date(year,month-1,day),topic);
    });
});

