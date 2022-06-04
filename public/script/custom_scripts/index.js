/* const db = firebase.firestore();

db.collection("activites").onSnapshot((s) => {
    $("#activites-container").empty();
    var n = 0;
    var content = document.createElement("div");
    content.classList.add('sportsmagazine-featured-slider');
    s.forEach(function(x) {
        
        content.innerHTML = `
        <div class="sportsmagazine-featured-slider-layer" style="background-image: url('` + x.data().imgUrl +`')">
            <img style="display:inline-block" src="`+x.data().imgUrl+`"  alt="">
            <span class="sportsmagazine-black-transparent"></span>
            <div class="sportsmagazine-featured-caption">
            <h2>` +x.data().titreActivite +`</h2>
            <span class="sportsmagazine-color">` +x.data().auteurActivite +` ` +x.data().dateActivite +`</span>
    </div>
    </div>
    `;

        n += 1;
    });

    $("#activites-container").append(content);
});





 */