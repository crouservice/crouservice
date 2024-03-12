function search() {
    var mots_cles = document.querySelector(".searchTerm").value.toLowerCase().split(" ");
    var donnees = ["residence", "résidence", "logement", "restaurant", "appartement"];
    var resultat = [];
    
    for(var i = 0; i < mots_cles.length; i++) {
       for(var j = 0; j < donnees.length; j++) {
          if(donnees[j].toLowerCase().indexOf(mots_cles[i]) > -1) {
             resultat.push(donnees[j]);
          }
       }
    }
    // afficher les résultats de la recherche
    console.log(resultat);
 }