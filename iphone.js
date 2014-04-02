$(document).ready(init);

function init() {

	//Desactivation du click droit
	document.body.oncontextmenu = function(){return false;}
	
	//Mise en page des news
	$("#news")
		.css("position", "absolute")
		.css("top", "150px")
		.css("left", "60%");
	
	//Préchargement de toutes les images
	var d1 = new Date();
	$.preLoadImages(
		 [
			  'images/astatus-d.png',
			  'images/astatus-fond.png',
			  'images/astatus-g.png',
			  'images/barre-g.png',
			  'images/barre-d.png',
			  'images/barre-mid.png',
			  'images/batterie-veille.png',
			  'images/boutton-c.png',
			  'images/boutton-h.png',
			  'images/Camera.png',
			  'images/contour-b.png',
			  'images/contour-d.png',
			  'images/contour-g.png',
			  'images/contour-h.png',
			  'images/dock.png',
			  'images/fond.png',
			  'images/fond2.png',
			  'images/fondSpring.png',
			  'images/Message.png',
			  'images/Photo.png',
			  'images/Videos.png',
			  'images/Youtube.png',
			  'images/multitask-fond.png'
		 ],function(){
			var d2 = new Date();
			console.log(d1.getSeconds() + ":" + d1.getMilliseconds());
			console.log(d2.getSeconds() + ":" + d2.getMilliseconds());
			if(d1.getSeconds() == d2.getSeconds()) {
				$("#tChargement").html(d2.getMilliseconds()-d1.getMilliseconds() + "ms");
			}
			else {
				$("#tChargement").html(d2.getSeconds()-d1.getSeconds() + "s et " + d2.getMilliseconds()-d1.getMilliseconds() + "ms");
			}
		 }
	);
	
	//Desactivation de la sélection et du drag'n drop
	$(document).mousedown(function() {
		return false;
	});
	
	//Variables
	etat = 0; //0:eteint 1:lockscreen 2:springboard 3:inApp 4:multitask
	tVeille = undefined;
	slider = false;
	app = [];
	var page1 = [], colone = [], colone2 = [];
	colone.push(new App("Message", "toApp();"));
	colone.push(new App("Photo", "toApp();"));
	colone.push(new App("Camera", "toApp();"));
	colone.push(new App("Videos", "toApp();"));
	page1.push(colone);
	colone2.push(new App("Youtube", "toApp();"));
	page1.push(colone2);
	app.push(page1);
	width = 363;
	height = 544;
	
	//Ecran 2
	content2 = $("<div>", {id:"content"});
	content2.css("width", "363px")
		.css("height", "544px")
		.css("position", "absolute")
		.css("top", "151px")
		.css("background-color", "black")
		.css("left", "150px")
		.css("font-family", "Verdana")
		.css("color", "white")
		.css("z-index", "1")
		.appendTo("body");
	
	//Ecran 1
	content = $("<div>", {id:"content"});
	content.css("width", "363px")
		.css("height", "544px")
		.css("position", "absolute")
		.css("top", "151px")
		.css("background-color", "black")
		.css("left", "150px")
		.css("z-index", "2")
		.css("font-family", "Verdana")
		.css("color", "white");
	
	//Contour et boutons de l'iPhone
	
	var contourTop = $("<img>", {src:"images/contour-h.png"});
	contourTop.css("position", "absolute")
		.css("top", "2px")
		.css("z-index", "50")
		.css("left", "115px");
	
	var contourBottom = $("<img>", {src:"images/contour-b.png"});
	contourBottom.css("position", "absolute")
		.css("top", "695px")
		.css("z-index", "50")
		.css("left", "119px");
		
	var bouttonCenter = $("<img>", {src:"images/boutton-c.png", id:"btCenter"});
	bouttonCenter.css("position", "absolute")
		.css("top", "725px")
		.css("z-index", "50")
		.css("left", "293px")
		.click(function (e) {
			if(etat == 0) {
				if(tVeille != undefined) {
					clearTimeout(tVeille);
					tVeille = setTimeout(eteindreEcran, 5000);
				}
				else 
					tVeille = setTimeout(eteindreEcran, 5000);
				
				etat = 1;
				lockscreen();
			}
			if(etat == 3) {
				etat = 2;
				quitterApp();
			}
			if(etat == 4) {
				content.animate({top:"151px"}, 400, function() {content2.empty();});
				etat = 2;
			}
		})
		.dblclick(function() {
			if(etat == 2) {
				toMultitask();
			}
		});
	
	var bouttonTop = $("<img>", {src:"images/boutton-h.png"});
	bouttonTop.css("position", "absolute")
		.css("top", "-1px")
		.css("z-index", "50")
		.css("left", "408px")
		.mousedown(function (e) {
			$(this).css("top", "+=1px");
			if(etat == 0) {
				if(tVeille != undefined) {
					clearTimeout(tVeille);
					tVeille = setTimeout(eteindreEcran, 5000);
				}
				else
					tVeille = setTimeout(eteindreEcran, 5000);
				
				etat = 1;
				lockscreen();
			}
			else {
				if(etat == 4) {
					content.css("top", "151px");
				}
				content.empty();
				content.fadeIn(0);
				content2.empty();
				content.css("background-image", "");
				clearTimeout(tVeille);
				etat = 0;
			}
		})
		.mouseup(function () {
			$(this).css("top", "-=1px");
		});
	
	var contourLeft = $("<img>", {src:"images/contour-g.png"});
	contourLeft.css("position", "absolute")
		.css("left", "115px")
		.css("z-index", "50")
		.css("top", "151px");
	
	var contourRight = $("<img>", {src:"images/contour-d.png"});
	contourRight.css("position", "absolute")
		.css("top", "151px")
		.css("left", "510px");
	
	contourTop.appendTo("body");
	contourLeft.appendTo("body");
	contourRight.appendTo("body");
	contourBottom.appendTo("body");
	bouttonCenter.appendTo("body");
	bouttonTop.appendTo("body");
	
	content.mousedown(function() {
		if(tVeille != undefined) {
			clearTimeout(tVeille);
			tVeille = setTimeout(eteindreEcran, 5000);
		}
	});
	
	content.appendTo("body");
}

//Etein l'ecran
function eteindreEcran() {
	content.empty()
		.css("background-color", "black");
	etat = 0;
}

//Affiche et configure le lockscreen
function lockscreen() {
	setScreen("1");
	var heure = new Date();
	var jour = "";
	var mois = "";
	content.empty();
	switch(heure.getDay()) {
		case 0:
			jour += "dimanche";
			break;
		case 1:
			jour += "lundi";
			break;
		case 2:
			jour += "mardi";
			break;
		case 3:
			jour += "mercredi";
			break;
		case 4:
			jour += "jeudi";
			break;
		case 5:
			jour += "vendredi";
			break;
		case 6:
			jour += "samedi";
			break;
	}
	switch(heure.getMonth()) {
		case 0:
			mois += "janvier";
			break;
		case 1:
			mois += "fevrier";
			break;
		case 2:
			mois += "mars";
			break;
		case 3:
			mois += "avril";
			break;
		case 4:
			mois += "mais";
			break;
		case 5:
			mois += "juin";
			break;
		case 6:
			mois += "juillet";
			break;
		case 7:
			mois += "aout";
			break;
		case 8:
			mois += "septembre";
			break;
		case 9:
			mois += "octobre";
			break;
		case 10:
			mois += "novembre";
			break;
		case 11:
			mois += "decembre";
			break;
	}
	$("<div>", {height:"18px", width:"363px", id:"statusBar"})
		.css("background-color", "black")
		.append($("<img>", {src:"images/status-hg.png"}).css("height", "16px"))
		.append($("<img>", {src:"images/status-c.png"}).css("height", "16px").css("position", "relative").css("left", "83px"))
		.append($("<img>", {src:"images/status-hd.png"}).css("height", "16px").css("position", "relative").css("left", "180px").css("top", "2px"))
		.appendTo(content);
	$("<div>", {height:"120px", width:"363px", id:"divHeure"})
		.append($("<div>", {height:"60px", width:"363px"})
			.css("background-color", "black")
			.append($("<img>", {src:"images/heure-top.png", height:"60", width:"363"})))
		.append($("<div>", {height:"60px", width:"363px"})
			.css("background-color", "black")
			.append($("<img>", {src:"images/heure-bot.png", height:"60", width:"363"})))
		.appendTo(content);
	if(heure.getMinutes()<10) {
		$("<p>", {id:"heure"})
				.html(heure.getHours() + ":0" + heure.getMinutes())
				.css("position", "relative")
				.css("left", "94px")
				.css("top", "-172px")
				.css("font-size", "3.8em")
				.appendTo(content);
	}
	else {
		$("<p>", {id:"heure"})
				.html(heure.getHours() + ":" + heure.getMinutes())
				.css("position", "relative")
				.css("left", "94px")
				.css("top", "-172px")
				.css("font-size", "3.8em")
				.appendTo(content);
	}
	$("<p>", {id:"date"})
			.html(jour + " " + heure.getHours() + " " + mois)
			.css("position", "relative")
			.css("left", "95px")
			.css("top", "-220px")
			.css("font-size", "1.1em")
			.appendTo(content);
	$("<img>", {src:"images/batterie-veille.png", height:"180"})
		.css("position", "relative")
		.css("left", "54px")
		.css("top", "-150px")
		.appendTo(content);
	$("<div>", {height:"90px", width:"363px", id:"bottom"})
		.css("background-color", "black")
		.append($("<img>", {src:"images/fond-b.png", height:"90", width:"363"}))
		.css("position", "relative")
		.css("top", "-101px")
		.append($("<div>", {height:"50px", width:"363px"})
			.append($("<img>", {src:"images/barre-mid.png", height:"50px", width:"265px"})
				.css("position", "relative")
				.css("top", "-75px")
				.css("left", "50px"))
			.append($("<img>", {src:"images/barre-g.png", height:"50px", width:"20px"})
				.css("position", "relative")
				.css("top", "-75px")
				.css("left", "-230px"))
			.append($("<img>", {src:"images/barre-d.png", height:"50px", width:"20px"})
				.css("position", "relative")
				.css("top", "-75px")
				.css("left", "30px"))
			.append($("<img>", {src:"images/slider.png", height:"45px", width:"70px", id:"slider"})
				.css("position", "relative")
				.css("top", "-125px")
				.css("left", "37px")
				.css("z-index", "2")
				.mousedown(function () {
					slider = true;
				})
				.mouseup(function (e) {
					if(slider) {
						if(e.pageX-200 >= 261) {
							toSpringboard();
						}
						else {
							$("#slider").animate({left:"37px"}, 400);
							$("#dev").fadeIn("fast");
						}
						
						slider = false;
					}
				}))
			.append($("<p>", {id:"dev"})
				.html("Deverrouiller")
				.css("position", "relative")
				.css("left", "130px")
				.css("top", "-190px")
				.css("font-size", "1.5em")
				.css("color", "#717171"))
			)
		.appendTo(content);
	
	content.css("background-color", "black")
		.mousemove(function(e) {
			if(slider) {
				if(e.pageX-200 > 38 && e.pageX-200 < 262) {
					if($("#dev").is(":visible"))
						$("#dev").fadeOut("fast");
					$("#slider").css("left", (e.pageX-200) + "px");
				}
			}
		});
		
	$(document).mouseup(function(e) {
		if(slider) {
			if(e.pageX-200 >= 261) {
				toSpringboard();
			}
			else {
				$("#slider").animate({left:"37px"}, 400);
			}
			$("#dev").fadeIn("fast");
			slider = false;
		}
	});
}

//Affiche et configure le springboard
function toSpringboard() {
	var heure = new Date(), str = "";
	
	if(heure.getMinutes()<10)
		str = ":0";
	else
		str = ":";
	setScreen("1");
	content2.css("background-color", "black");
	content.fadeOut(300, function() {
		clearTimeout(tVeille);
		tVeille = undefined;
		content.empty()
			.append($("<div>", {height:"18px", width:"363px", id:"statusBar"})
				.css("background-color", "black")
				.append($("<img>", {src:"images/status-hg.png"}).css("height", "16px"))
				.append($("<p>", {id:"heure", width:"100px"})
					.css("position", "absolute")
					.css("top", "-13px")
					.css("left", "132px")
					.css("color", "#bfbfbf")
					.css("font-weight", "bold")
					.css("text-align", "center")
					.css("font-size", "0.9em")
					.html(heure.getHours() + str + heure.getMinutes()))
				.append($("<img>", {src:"images/status-hd.png"}).css("height", "16px").css("position", "relative").css("left", "180px").css("top", "2px")))
			.append($("<img>", {src:"images/fondSpring.png"})
				.css("width", width + "px")
				.css("height", height-18 + "px")
				)
			.append($("<img>", {src:"images/dock.png", width:"363px"})
					.css("position", "absolute")
					.css("bottom", "0px")
					.css("left", "0px")
					.css("z-index", "1")
					.appendTo(content))
			.fadeIn(300, springboard);
	});
	etat = 2;
	
}

function springboard() {
	
	tVeille = setTimeout(eteindreEcran, 60000);
	
	for(var page = 0; page<app.length; page++) {
		for(var i = 0; i<app[page].length; i++) {
			for(var j = 0; j<app[page][i].length; j++) {
				var img = $("<img>", {src:"images/" + app[page][i][j].nom + ".png", height:"65px", x:j, y:i, page:page})
					.css("position", "absolute")
					.css("top", (35+(65+25)*i) + "px")
					.css("z-index", "1")
					.css("left", (18+(65+20)*j) + "px")
					.click(function() {
						eval(app[$(this).attr("page")][$(this).attr("y")][$(this).attr("x")].eval )
					})
					.appendTo(content);
					
					
				var div = $("<div>", {width:"65px"}).html(app[page][i][j].nom)
					.css("position", "absolute")
					.css("top", ((35+(65+25)*i)+65) + "px")
					.css("left", (18+(65+20)*j) + "px")
					.css("font-size", "0.7em")
					.css("z-index", "1")
					.css("text-shadow", "1px -1px 1px black")
					.css("text-align", "center")
					.appendTo(content);
					
				switch(i) {
					case 0:
						img.addClass("h")
							.css("top", "-=120px");
						div.addClass("h")
							.css("top", "-=120px");
						break;
					case 1:
						img.addClass("h2")
							.css("top", "-=240px");
						div.addClass("h2")
							.css("top", "-=240px");
						break;
					case 2:
						img.addClass("b")
							.css("top", "+=120px");
						div.addClass("b")
							.css("top", "+=120px");
						break;
					case 3:
						img.addClass("b2")
							.css("top", "+=240px");
						div.addClass("b2")
							.css("top", "+=240px");
						break;
				}	
			}
		}
	}

	content.children(".h").animate({top:"+=120px"}, 400);
	content.children(".h2").animate({top:"+=240px"}, 400);
}

function App(nom, eval) {
	this.nom = nom;
	this.eval= eval;
}


function toApp() {
	clearTimeout(tVeille);
	tVeille = undefined;
	
	content2.empty()
		.css("background-color", "")
		.append($("<div>", {id:'fondApp', width:"0px", height:"0px"})
			.css("position", "relative")
			.css("left", width/2 + "px")
			.css("top", height/2 + "px")
			.css("background-image", "url('images/fond.png')"));
	
	switchScreen();
	
	$('#fondApp').animate({
		width:width,
		height:height,
		left:0, 
		top:0},
		300,
		function() {
			etat = 3;
		message();
		});
}

function message() {
	var heure = new Date(), str = "";
	
	if(heure.getMinutes()<10)
		str = ":0";
	else
		str = ":";
	$('#fondApp')
		.append($("<div>")
			.css("position", "relative")
			.css("left", "0px")
			.css("top", "0px")
			.css("width", width)
			.css("height", "20px")
			.append($("<img>", {src:"images/astatus-fond.png", width:"100%", height:"100%"})
				.css("position", "absolute")
				.css("top", "0px")
				.css("left", "0px"))
			.append($("<img>", {src:"images/astatus-g.png", width:"110px"})
				.css("position", "absolute")
				.css("top", "0px")
				.css("left", "0px"))
			.append($("<img>", {src:"images/astatus-d.png", width:"65px"})
				.css("position", "absolute")
				.css("top", "0px")
				.css("right", "3px"))
			.append($("<p>", {id:"heure", width:"100px"})
				.css("position", "absolute")
				.css("top", "-13px")
				.css("left", "132px")
				.css("color", "#404040")
				.css("font-weight", "bold")
				.css("text-align", "center")
				.css("font-size", "0.9em")
				.html(heure.getHours() + str + heure.getMinutes()))
			);
}

function switchScreen() {
	if(content.css("z-index") == 1) {
		content.css("z-index", "2");
		content2.css("z-index", "1");
	}
	else {
		content2.css("z-index", "2");
		content.css("z-index", "1");
	}
}

function setScreen(screen) {
	if(screen == "1") {
		content.css("z-index", "2");
		content2.css("z-index", "1");
	}
	if(screen == "2") {
		content2.css("z-index", "2");
		content.css("z-index", "1");
	}
}

function quitterApp() {
	setScreen("2");
	$('#fondApp').animate({
		width:"0px",
		height:"0px",
		left:width/2, 
		top:height/2},
		300,
		function() {
			content2.empty();
			etat = 2;
			switchScreen();
		});
}

function toMultitask() {
	etat = 4;
	setScreen("1");
	content2.empty()
		.append($("<img>", {src:"images/multitask-fond.png", width:width})
				.css("position", "absolute")
				.css("bottom", "0px")
				.css("left", "0px"));
				
	content.animate({top:"44px"}, 400, multitask);
}

function multitask() {
	console.log('ok');
}