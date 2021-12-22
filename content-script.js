function getRandom(arr, num){
    let res = [];
    for(let i = 0; i < num;){
        let random = Math.floor(Math.random() * arr.length);
        // prevent duplicate
        if(res.indexOf(arr[random]) !== -1){
          continue;
        }
        res.push(arr[random]);
        i++;
    }
    return res;
}
//https://strawpoll.com/api/polls
function createPoll(anwsers){
    var xhr = new XMLHttpRequest();
    // proxy to avoid CORS
    xhr.open("POST", "https://alpa.ninja/poll.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        poll :{
            title: "Votez pour le prochain son",
            answers: anwsers,
            ma: false,
            co: false,
            mip: false,
            vpn: false
        }
    }));

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let poll = this.responseText;
            let url = "https://strawpoll.com/" + poll;
            window.open(url);
        }
    }
}
(function() {
    if(window.location.hash != "#favorites"){
        return;
    }
    
    var box = document.createElement("div");
    box.style.position = "fixed";
    box.style.width = "120px";
    box.style.height = "100px";
    box.style.left = "10px";
    box.style["background-color"] = "white";
    box.style["z-index"] = "9999";
    box.style.border = "1px solid black";
    var content = document.createElement("div");
    content.style.padding = "10px";

    var label = document.createElement("label");
    label.innerText = "Number of songs to pick";

    var input = document.createElement("input");
    input.type = "number";
    input.value = "5";
    input.id = "number-of-songs";
    input.style.width = "100%";
    input.style["margin-bottom"] = "10px";


    var button = document.createElement("button");
    button.onclick = startPoll;
    button.innerText = "Start Poll";
    button.style.width = "100%";

    content.appendChild(label);
    content.appendChild(input);
    content.appendChild(button);
    box.appendChild(content);


    document.body.appendChild(box)
})();

function startPoll(){
    var songs = document.getElementsByClassName("song song--short");
    var max = document.getElementById("number-of-songs").value;

    var list = getRandom(songs, parseInt(max));
    var displaySongs = [];
    for(let i = 0; i < list.length; i++){
        let elem = list[i];
        let title = elem.getElementsByClassName("song__title")[0].innerText;
        let author = elem.getElementsByClassName("song__artist")[0].innerText;
        displaySongs.push(title + " - " + author);
    }
    
    createPoll(displaySongs);
}