function hideShow(){
    if(document.querySelector('.menu').classList.contains('is-active')){
        document.querySelector('.menu').classList.remove('is-active');
        document.querySelector('.fa-folder').classList.add('is-active');
        document.querySelector('.fa-folder-open').classList.remove('is-active');
    }
    else{
        document.querySelector('.menu').classList.add('is-active');
        document.querySelector('.fa-folder').classList.remove('is-active');
        document.querySelector('.fa-folder-open').classList.add('is-active');
    }
    
}