//James Frazer 2019
//
//Blackjack JavaScript
//
var deck = new Array();
var suits = ["Clubs", "Diamonds", "Hearts", "Spades"]; //4 possible suits
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]; //13 possible card values
var pdeck = new Array();
var ddeck = new Array();
var ppoints = 0;
var dpoints = 0;
var pweight = new Array();
var dweight = new Array();
var pweightt = 0;
var dweightt = 0;

function getDeck(){
	deck = new Array();
	
	for(var i = 0; i < suits.length; i++){ //for each of the 4 suits
		for(var x = 0; x < values.length; x++){ //for each of the 13 values
			
			var card = {Value: values[x], Suit: suits[i]};//assign each 4 suits 13 values
			deck.push(card);
		}
	
	}
	return deck;
}

function randomise(){
	for(var i = 0; i < 400; i++){ //400 times
		var cardloc = Math.floor((Math.random() * deck.length)); //get random card in deck
		var cardloc2 = Math.floor((Math.random() * deck.length)); //get another random card in deck
		var tmp = deck[cardloc]; //store first card
		
		deck[cardloc] = deck[cardloc2]; //replace first card with second card
		deck[cardloc2] = tmp; //store second card
		
	}
}

function startBlackjack(){
		pdeck = [];
		ddeck = [];
		pweight = [];
		pweightt = [];
		dweight = [];
		dweightt = [];
	headers = document.getElementsByClassName('header2');
	document.getElementsByClassName('header2');//.style.visibility = "visible";
	if (headers) {
    for (var z = 0; z < headers.length; z++) {
      headers[z].style.visibility = "visible";
    }
  }
	document.getElementById('btnHit').style.visibility = "visible";
	document.getElementById('btnStay').style.visibility = "visible";
	getDeck();
	randomise();
	renderDeck();
	checkPoints();
}

function renderDeck(){
document.getElementById('playerdeck').innerHTML = '';
document.getElementById('dealerdeck').innerHTML = '';
document.getElementById('results').innerHTML = '';
	for(var i = 0; i < deck.length; i++)
	{
		
		var icon = '';
		if(deck[i].Suit == 'Clubs') //if deck suit matches, assign icon
		icon = "♣";
		if(deck[i].Suit == 'Diamonds')
		icon = "♦";
		if(deck[i].Suit == 'Hearts')
		icon = "♥";
		else
		icon = "♠";
	
deck[i].Value = deck[i].Value + ' ' + icon;
	}
	
	for(var x = 0; x < 2; x++)
	{
		if(deck[x].Value.includes("♦") || deck[x].Value.includes("♥")){
			document.getElementById("playerdeck").innerHTML += "<p class="+'red-suit'+">"+(deck[x].Value)+"</p>";
		}else{
			document.getElementById("playerdeck").innerHTML += "<p>"+(deck[x].Value)+"</p>";
		}
		
pdeck.push(deck[x].Value);
}
deck.shift();
deck.shift();
if(deck[0].Value.includes("♦") || deck[0].Value.includes("♥")){
	document.getElementById("dealerdeck").innerHTML += "<p class="+'red-suit'+">"+(deck[0].Value)+"</p>";
	ddeck.push(deck[0].Value);
	deck.shift();
}else{
	document.getElementById("dealerdeck").innerHTML += "<p>"+(deck[0].Value)+"</p>";
ddeck.push(deck[0].Value);
	deck.shift();
	
	}
	
	if(deck[0].Value.includes("♦") || deck[0].Value.includes("♥")){
	document.getElementById("dealerdeck").innerHTML += "<p id="+'scrs'+" class="+'secondcard'+">"+(deck[0].Value)+"</p>";
	}else{
	document.getElementById("dealerdeck").innerHTML += "<p class="+'secondcard'+">"+(deck[0].Value)+"</p>";	
	}
	ddeck.push(deck[0].Value);
	deck.shift();
}

function hit(){
	if(deck[0].Value.includes("♦") || deck[0].Value.includes("♥")){
	document.getElementById("playerdeck").innerHTML += "<p class="+'red-suit'+" >"+(deck[0].Value)+"</p>";
	pdeck.push(deck[0].Value);
	deck.shift();
	}else{
		document.getElementById("playerdeck").innerHTML += "<p>"+(deck[0].Value)+"</p>";
		pdeck.push(deck[0].Value);
	deck.shift();
	}

	updatePlayerPoints();
}

function stay(){
	var seccard = document.getElementsByClassName('secondcard'), z;
	for(var z = 0; z < seccard.length; z++){
		seccard[z].style.visibility = 'visible';
	}
	document.getElementById('btnHit').style.visibility = "hidden";
	document.getElementById('btnStay').style.visibility = "hidden";
	if(dweightt > 16 && dweightt < 22){
		if(dweightt > pweightt){
			document.getElementById("results").innerHTML += "<p class="+'bouncing'+">Dealer wins with "+dweightt+"!</p>";
		}else if(pweightt > dweightt){
			document.getElementById("results").innerHTML += "<p class="+'bouncing'+">You win with "+pweightt+"!</p>";
		}else if(pweightt == dweightt){
			document.getElementById("results").innerHTML += "<p class="+'bouncing'+">A draw!</p>";
		}

	}else{
		if(deck[0].Value.includes("♦") || deck[0].Value.includes("♥")){
			document.getElementById("dealerdeck").innerHTML += "<p class="+'red-suit'+">"+(deck[0].Value)+"</p>";
		ddeck.push(deck[0].Value);
		deck.shift();
		}else{
		document.getElementById("dealerdeck").innerHTML += "<p>"+(deck[0].Value)+"</p>";
		ddeck.push(deck[0].Value);
		deck.shift();
		}
		updateDealerPoints();
	}
	
	
}

function checkPoints(){
	for(var i = 0; i < pdeck.length; i++){
		
	pweight[i] = parseInt(pdeck[i]);
                    if (pdeck[i].replace(/\W/g, '') == "J" || pdeck[i].replace(/\W/g, '') == "Q" || pdeck[i].replace(/\W/g, '') == "K")
                        pweight[i] = 10;
                    if (pdeck[i].replace(/\W/g, '') == "A")
                        pweight[i] = 11;
					
	pweightt = pweight.reduce((a,b) => a + b, 0);
}
for(var x = 0; x < ddeck.length; x++){
	dweight[x] = parseInt(ddeck[x]);
	 if (ddeck[x].replace(/\W/g, '') == "J" || ddeck[x].replace(/\W/g, '') == "Q" || ddeck[x].replace(/\W/g, '') == "K")
                        dweight[x] = 10;
                    if (ddeck[x].replace(/\W/g, '') == "A")
		dweight[x] = 11;
	
	dweightt = dweight.reduce((a,b) => a + b, 0);
	
	
}
if(pweightt == 21){
	var seccard = document.getElementsByClassName('secondcard'), z;
	for(var z = 0; z < seccard.length; z++){
		seccard[z].style.visibility = 'visible';
	}
	document.getElementById('btnHit').style.visibility = "hidden";
	document.getElementById('btnStay').style.visibility = "hidden";
	document.getElementById("results").innerHTML += "<p class="+'bouncing'+">You got blackjack!</p>";
}else if(dweightt == 21){
	var seccard = document.getElementsByClassName('secondcard'), z;
	for(var z = 0; z < seccard.length; z++){
		seccard[z].style.visibility = 'visible';
	}
	document.getElementById('btnHit').style.visibility = "hidden";
	document.getElementById('btnStay').style.visibility = "hidden";
	document.getElementById("results").innerHTML += "<p class="+'bouncing'+">Dealer got blackjack!</p>";
}

}

function updatePlayerPoints(){
		//for(var i = 0; i < pdeck.length; i++){
	pweight.push(parseInt(pdeck[pdeck.length - 1]));
                    if (pdeck[pdeck.length - 1].replace(/\W/g, '') == "J" || pdeck[pdeck.length - 1].replace(/\W/g, '') == "Q" || pdeck[pdeck.length - 1].replace(/\W/g, '') == "K")
                    pweight.push(10);    
					//pweight[pdeck.length - 1] = 10;
                    if (pdeck[pdeck.length - 1].replace(/\W/g, '') == "A")
                    pweight.push(11);    
					//pweight[pdeck.length - 1] = 11;
					
	pweightt += pweight[pweight.length - 1];


if (pweightt > 21){
	document.getElementById('btnHit').style.visibility = "hidden";
	document.getElementById('btnStay').style.visibility = "hidden";
	
	document.getElementById("results").innerHTML += "<p class="+'bouncing'+">You went bust with "+pweightt+"</p>";
	
}else{
}
		}

function updateDealerPoints(){
		dweight.push(parseInt(ddeck[ddeck.length - 1]));
                    if (ddeck[pdeck.length - 1].replace(/\W/g, '') == "J" || ddeck[ddeck.length - 1].replace(/\W/g, '') == "Q" || ddeck[ddeck.length - 1].replace(/\W/g, '') == "K")
                    dweight.push(10);    
					//pweight[pdeck.length - 1] = 10;
                    if (ddeck[ddeck.length - 1].replace(/\W/g, '') == "A")
                    dweight.push(11);    
					//pweight[pdeck.length - 1] = 11;
					
	dweightt += dweight[dweight.length - 1];
	if (dweightt > 21){
	document.getElementById("results").innerHTML += "<p class="+'bouncing'+">Dealer went bust with "+dweightt+"</p>";
	
}else{
	stay();
}
}