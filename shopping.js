let slideo=document.querySelectorAll(".slideo");
let slidet=document.querySelectorAll(".slidet");

let counter=0;

slideo.forEach((slide, index)=>{
    slide.style.left=`${index * 100}%`
})

slidet.forEach((slide, index)=>{
    slide.style.left=`${index * 100}%`
})



function goprev(){
    counter--;
    slideoimages();

}


function gonext(){
    counter++;
    slideoimages();
}
function slideoimages(){
    slideo.forEach(
        (slide) => {
            slide.style.transform = `translateX(-${counter * 100}%)`
        }
    )
}
function slidetimages(){
    slidet.forEach(
        (slide) => {
            slide.style.transform = `translateX(-${counter * 100}%)`
        }
    )
}
function prev(){
    counter--;
    slidetimages();

}
function next(){
    counter++;
    slidetimages();
}