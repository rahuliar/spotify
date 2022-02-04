
//initialise the variable
let songIndex=0;
let audioElement=new Audio('songs/1.mp3')
let masterplay=document.getElementById('masterplay');
let gif=document.getElementById('gif');
let myprogressbar=document.getElementById('myprogressbar');
let masterSongName=document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItems'));
let autoPlay = document.getElementById('autoplay');
let autoPlayIndex = 0;
let autoPlayMusic = 0;
//  audioElement.play();
let songs = [
    {songName:"Namo Namo", filePath:"songs/1.mp3", coverPath:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw36sjMNH4xKx4dbC5uaU05WpDX4U3vBoZHA&usqp=CAU", songTime:"5:30"},
    {songName:"Tum Tak", filePath:"songs/2.mp3", coverPath:"https://static.toiimg.com/photo/20051882.cms?imgsize=195523", songTime:"5:04"} ,
    {songName:"Teri Hogaiyaan", filePath:"songs/3.mp3", coverPath:"https://baapsong.com/uploads//thumbnails/300x300/id3Picture_1184284043.jpg", songTime:"2:55"},
    {songName:"Cash", filePath:"songs/4.mp3", coverPath:"https://dns2.vippendu.com/thumbmed/1023085.jpg", songTime:"4:56"},
    {songName:"Shinchan [theme-song]", filePath:"songs/5.mp3", coverPath:"https://wallpapercave.com/wp/wp1812482.jpg", songTime:"1:19" },
    {songName:"Asmaan ko chukar dekha ", filePath:"songs/6.mp3", coverPath:"https://www.pagalworld.pw/GpE34Kg9Gq/111207/thumb-hanuman-returns-300.jpg", songTime:"4:37"},
    {songName:"Bhaag D.K. Bose", filePath:"songs/7.mp3", coverPath:"https://pagalsong.in/uploads//thumbnails/300x300/id3Picture_451397315.jpg", songTime:"4:01"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    // element.getElementsByClassName("stimespan")[0].innerText = songs[i].songName; 
})
//handle play pause click
  masterplay.addEventListener('click',()=>{
      if(audioElement.paused|| audioElement.currentTime<=0){
          audioElement.play();
          masterplay.classList.remove('fa-play-circle');
          masterplay.classList.add('fa-pause-circle');
          gif.style.opacity='1';
          document.getElementById('masterimage').src=songs[songIndex].coverPath;
          document.getElementById('time').style.opacity='1';
          SongCurrentTime=setInterval(completedTime,1000);
        }else{
            audioElement.pause();
            masterplay.classList.remove('fa-pause-circle');
            masterplay.classList.add('fa-play-circle');
            gif.style.opacity='0';
            document.getElementById('time').style.opacity='0';
            clearInterval(SongCurrentTime);
      }
  })
//   setInterval(updatetime,1000);
  let SongCurrentTime;
  let songSecond=00; 
  let songMinute=0;
  function completedTime(){
   
      if(songSecond==60){
          ++songMinute;
          songSecond=0;
          document.getElementById('time').innerText=songMinute+':'+songSecond+'/'+songs[songIndex].songTime;
        }else{
            ++songSecond;
            document.getElementById('time').innerText=songMinute+':'+songSecond+'/'+songs[songIndex].songTime;
      }
  }

// listen to event

audioElement.addEventListener('timeupdate',()=>{
  myprogressbar.max=audioElement.duration;
  myprogressbar.value=audioElement.currentTime;
  
 })
 
myprogressbar.addEventListener('change',()=>{
    audioElement.currentTime=myprogressbar.value
})
 const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
        clearInterval(SongCurrentTime);
    })
 }
Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex =parseInt( e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName;
        document.getElementById('masterimage').src=songs[songIndex].coverPath;
        document.getElementById('time').style.opacity='1';
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        document.getElementById('time').style.opacity='1';
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        myprogressbar.max=audioElement.duration;
        document.getElementById('time').innerText=songs[songIndex].songTime;
        songMinute=0;
        songSecond=0;
        SongCurrentTime=setInterval(completedTime,1000);
         autoPlayIndex = songIndex + 1;
    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    makeAllPlays();
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
    masterSongName.innerText=songs[songIndex].songName;
    myprogressbar.max=audioElement.duration;
    document.getElementById('time').innerText=songs[songIndex].songTime;
    document.getElementById('masterimage').src=songs[songIndex].coverPath;
    songMinute=0;
    songSecond=0;
    SongCurrentTime=setInterval(completedTime,1000);
     autoPlayIndex = songIndex + 1;
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    makeAllPlays();
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
    masterSongName.innerText=songs[songIndex].songName;
    myprogressbar.max=audioElement.duration;
    document.getElementById('time').innerText=songs[songIndex].songTime;
    document.getElementById('masterimage').src=songs[songIndex].coverPath;
    songMinute=0;
    songSecond=0;
    SongCurrentTime=setInterval(completedTime,1000);
     autoPlayIndex = songIndex + 1;
})

autoPlay.addEventListener('click', () => {
    if (autoPlayMusic == 0) {
        autoPlay.style.textDecoration = 'underline';
        autoPlayMusic = 1;
        if (audioElement.paused || audioElement.currentTime <= 0) {
            songIndex=autoPlayIndex;
            audioElement.src = songs[autoPlayIndex].filePath;
            audioElement.play();
            document.getElementById('masterimage').src = songs[autoPlayIndex].coverPath;
            masterSongName.innerText = songs[autoPlayIndex].songName;
            gif.style.opacity = 1;
            masterplay.classList.remove('fa-play-circle');
            masterplay.classList.add('fa-pause-circle');
            autoPlayIndex++;
            document.getElementById('time').style.opacity=0;
        }
        audioElement.addEventListener('ended', () => {
            console.log(autoPlayIndex);
            songIndex=autoPlayIndex;
            audioElement.src = songs[autoPlayIndex].filePath;
            document.getElementById('masterimage').src = songs[autoPlayIndex].coverPath;
            masterSongName.innerHTML = songs[autoPlayIndex].songName;
            audioElement.play();
            gif.style.opacity = 1;
            autoPlayIndex++;
            document.getElementById('time').style.opacity=0;
        });
    } else if (autoPlayMusic == 1) {
        autoPlay.style.textDecoration = 'none';
        autoPlayMusic = 0;
        audioElement.addEventListener('ended', () => {
            audioElement.pause();
            masterplay.classList.add('fa-play-circle');
            masterplay.classList.remove('fa-pause-circle');
            gif.style.opacity = 0;
        });
    }
});


