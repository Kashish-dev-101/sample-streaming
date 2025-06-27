'use strict';

const urlInput = document.querySelector("#video-url");
console.log(urlInput);


const playBtn = document.querySelector("#play-btn");
console.log(playBtn);

const videoElement = document.querySelector("#video-player");
console.log(videoElement);


playBtn.addEventListener("click", ()=>{
    console.log("play button was clicked");

    const videoURL = urlInput.value.trim();
    console.log(videoURL);

    const selectedFormat = document.querySelector('input[name="format"]:checked').value; // CSS query to select 
    console.log(selectedFormat);

    videoElement.classList.add("video-js");
    const player = videojs("video-player", {
        autoplay: true, // ← Tells browser to start playback automatically
        muted: true,   //  ← REQUIRED for autoplay to work without user interaction
        preload: "none", //  ← Optional, lets video buffer before playing
        html5: {
            hls: { overrideNative: true },
            nativeAudioTracks: false,
            nativeVideoTracks: false
          }
    });
    

    let mimetype = "";
    if(selectedFormat === "mp4"){
        mimetype = "video/mp4";     
    }else if (selectedFormat === "hls"){
        mimetype = "application/x-mpegURL"; 
    }else if (selectedFormat === "dash"){
        mimetype = "application/dash+xml"; 
    }

    player.src({ src: videoURL, type: mimetype });

    player.httpSourceSelector();

    player.ready(()=>{
        player.controlBar.addChild("SourceMenuButton",{});
    });

    


    // const source = document.createElement("source");
    // source.src = videoURL;
    // source.type = mimetype;

    // videoElement.append(source);
    // videoElement.load();
    // videoElement.play();

})


