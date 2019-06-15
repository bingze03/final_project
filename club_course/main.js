const render=(topic)=>{
    $('#courseTable').html('');
    $('#courseTable').append('<tr><th>順序</th><th>電影名稱</th><th>上映日期(美國)</th></tr>');
    topic.forEach((d,i)=>{
        $('#courseTable').append(
            '<tr>'+
                '<td>'+(i+1)+'</td>'+
                '<td>'+d+'</td>'+
                '<td>'+release_date[i]+'</td>'+
            '</tr>'
        );
    });

    $('td').each(function(){
        if($(this).text().includes('復仇者聯盟'))
            $(this).parent().css('color','#f96363');
    });
}

$(document).ready(()=>{
    render(topic);

    $('input.firstDate').change(function(){
        var year=parseInt(this.value.slice(0,4));
        var month=parseInt(this.value.slice(5,7));
        var day=parseInt(this.value.slice(8,10));
        render(new Date(year,month-1,day),topic);
    });
});

