$(document).ready(()=>{
    $('.btn').click(()=>{
        var heroes=[];
        const option=$('.heroes').children();
        option.each(d=>{
            heroes.push(option[d].innerText);
        });

        const rand=Math.floor(Math.random()*heroes.length);

        const name_mapping=name=>{
            switch(name){
                case '鋼鐵人':
                    return 'iron_man';
                case '美國隊長':
                    return 'captain_america';
                case '浩克':
                    return 'hulk';
                case '黑寡婦':
                    return 'black_widow';
                case '索爾':
                    return 'thor';
                case '鷹眼':
                    return 'hawk_eye';
            }
        }
    
        $('.hero').text(heroes[rand]);
        $('.pic img').attr('width',900).attr('height',600).attr('src','random_selector/'+name_mapping(heroes[rand])+'.jpg');
    })
})
