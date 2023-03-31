
let field1 = document.getElementById("1");
let field2 = document.getElementById("2");
let field3 = document.getElementById("3");
let song = document.getElementById("song");
let cooldown1 = 0;
let cooldown2 = 0;
let cooldown3 = 0;
let slope = 0;
let cooldownTotal = [];
let interval;

document.body.onkeydown = function(e) {
    if (e.keyCode == 49) {
        if(field1.style.backgroundColor == "green"){
            cooldownTotal.push(cooldown1);
            field1.style.backgroundColor = "darkgray";
            cooldown1 = 0;
        }
    }
    if (e.keyCode == 50) {
        if(field2.style.backgroundColor == "green"){
            cooldownTotal.push(cooldown2);
            field2.style.backgroundColor = "darkgray";
            cooldown2 = 0;
        }
    }
    if (e.keyCode == 51) {
        if(field3.style.backgroundColor == "green"){
            cooldownTotal.push(cooldown3);
            field3.style.backgroundColor = "darkgray";
            cooldown3 = 0;
        }
    }
    if(e.keyCode == 32){
        document.getElementById("instructions").style.display = "none";
        song.play();
        song.currentTime = 22;
        if(Math.random() > 0.5){
            song.playbackRate = 0.91;
            slope = 0.00003;
        }else{
            song.playbackRate = 1.09;
            slope = -0.00003;
        }
        interval = setInterval(tick, 10);
    }
}

let ticks = 1;
let nextAmount = 250;
let evaluated = 0;
function tick(){
    song.playbackRate += slope;
    if(field1.style.backgroundColor == "green"){
        cooldown1 += 0.01;
    }
    if(field2.style.backgroundColor == "green"){
        cooldown2 += 0.01;
    }
    if(field3.style.backgroundColor == "green"){
        cooldown3 += 0.01;
    }
    if(ticks >= nextAmount){
        ticks = 0;
        evaluated++;
        nextAmount = 200 + Math.random() * 100;
        let rand = Math.floor(Math.random() * 3);
        if(rand == 0){
            field1.style.backgroundColor = "green";
        }
        if(rand == 1){
            field2.style.backgroundColor = "green";
        }
        if(rand == 2){
            field3.style.backgroundColor = "green";
        }
    }
    //25
    if(evaluated >= 25){
        clearInterval(interval);
        song.pause();
        document.getElementById("fields").style.display = "none";
        document.getElementById("end").style.display = "block";
        cooldownTotal.splice(cooldownTotal.indexOf(Math.max(cooldownTotal)), 1);
        cooldownTotal.splice(cooldownTotal.indexOf(Math.min(cooldownTotal)), 1);
        cooldownTotal.splice(cooldownTotal.indexOf(Math.max(cooldownTotal)), 1);
        cooldownTotal.splice(cooldownTotal.indexOf(Math.min(cooldownTotal)), 1);
        document.getElementById("output").innerHTML += "Slope: " + slope + "<br><br>";
        for(let i = 0; i < cooldownTotal.length; i++){
            document.getElementById("output").innerHTML += Math.round(cooldownTotal[i] * 1000) / 1000 + "<br>";
        }
    }
    ticks++;
}
