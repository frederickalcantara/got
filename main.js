const characters = [

    "https://www.anapioficeandfire.com/api/characters/148",
    "https://www.anapioficeandfire.com/api/characters/823",
    "https://www.anapioficeandfire.com/api/characters/1052",
    "https://www.anapioficeandfire.com/api/characters/1303",
    "https://www.anapioficeandfire.com/api/characters/208",
    "https://www.anapioficeandfire.com/api/characters/957",
    "https://www.anapioficeandfire.com/api/characters/583"

];


$(".btn").on('click touch', clickButton);

var current = -1;

function clickButton(e) {

    e.preventDefault();

    var i = $(this).attr("data-id");
   
    console.log(characters[i]);

    if (i != current) {
        $('#character').removeClass('hidden');
    } else {
        $('#character').toggleClass('hidden');
    }

    if ( $('section').is(':visible') ) {

    var data;

    $.getJSON(characters[i], function(json) {
        data = json;

        $('#name').html(json.name);

        const alliance = $('#alliance');

        Promise.all(data.allegiances.map(function(ally) {
                return new Promise(function(resolve, reject) {
                    $.getJSON(ally, function(json) {
                        resolve(json.name);
                    });
                });
            }))
            .then(function(allies) {
                alliance.html(allies.join(', '));
            });


        $('#born').html(json.born);

        const death = (json.died === "") ? 'N/A' : json.died;

        const dead = $('#death');

        dead.html(death);

        const cultureText = (json.culture === "") ? 'N/A' : json.culture;

        const culture = $('#culture');

        culture.html(cultureText);

        const title = $('#title');

        const titleText = (data.titles.length === 0) ? 'N/A' : data.titles.join(', ');

        title.html(titleText);

        const alias = $('#alias');

        const aliasText = (data.aliases.length === 0) ? 'N/A' : data.aliases.join(', ');

        alias.html(aliasText);

        const spouse = $('#spouse');

        var partner =  $.getJSON(data.spouse, function(love) {
                 spouse.html(love.name);
        });
        
        const spouseText = (data.spouse === "") ? 'N/A' : partner;

        spouse.html(spouseText);
           
        const tv = $('#season');

        const tvText = (data.tvSeries === 0) ? 'N/A' : data.tvSeries.join(', ');

        tv.html(tvText);

        const actor = $('#actor')
        
        const actorText = (json.playedBy === "") ? 'N/A' : json.playedBy.join(', ');

        actor.html(actorText);

     });
    
    }

    current = i;

};



