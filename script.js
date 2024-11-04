let TArticles = [];
let TArticlesChoisis = [];

//fonction init()
function init() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "articles.json", true);
    xhr.onload = function () {
        if (this.status === 200) {
            TArticles = JSON.parse(this.responseText);
        }
    };
    xhr.send();
}

//fonction pour gerer paiement
function gererPaiement() {
    const paiementCarte = document.getElementById("carte").checked;
    document.getElementById("numCarte").disabled = !paiementCarte;
}

//fonction ajouter
function ajouter() {
    const nom = document.getElementById("nom").value;
    const adresse = document.getElementById("adresse").value;
    const numCarte = document.getElementById("numCarte").value;
    const quantite = parseInt(document.getElementById("quantite").value);
    const pizzaCode = document.getElementById("pizza").value;

    if (nom === "" || adresse === "" || (document.getElementById("carte").checked && numCarte === "")) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }
    
    if (quantite < 1 || quantite > 10) {
        alert("La quantité doit être comprise entre 1 et 10.");
        return;
    }

    const pizza = TArticles.find(article => article.code === pizzaCode);
    const totalPizza = pizza.prix * quantite;

    TArticlesChoisis.push({ ...pizza, quantite, total: totalPizza });
    afficherTableau();
    calculerTotal();
}

//tableau des articles choisis
function afficherTableau() {
    const table = document.getElementById("tableArticles");
    table.innerHTML = `
        <tr>
            <th>Code Article</th>
            <th>Désignation</th>
            <th>Prix Unitaire</th>
            <th>Quantité</th>
            <th>Total</th>
        </tr>
    `;

    TArticlesChoisis.forEach(article => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${article.code}</td>
            <td>${article.designation}</td>
            <td>${article.prix}</td>
            <td>${article.quantite}</td>
            <td>${article.total} DH</td>
        `;
    });
}

//calcul montant total
function calculerTotal() {
    const total = TArticlesChoisis.reduce((sum, article) => sum + article.total, 0);
    document.getElementById("total").innerText = total + " DH";
}

//fonction pour envoyer commande
function envoyerCommande() {
    alert("Commande envoyée! Détails:\n" + JSON.stringify(TArticlesChoisis, null, 2));
}

//alert d'enregistrer 
function enregistrer() {
    alert("Commande enregistrée !");
}


window.onload = init;
