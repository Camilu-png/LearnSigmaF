function hideShow(){
    if(document.querySelector('.nav-left').classList.contains('is-active')){
        document.querySelector('.nav-left').classList.remove('is-active');
        document.querySelector('.fa-folder').classList.add('is-active');
        document.querySelector('.fa-folder-open').classList.remove('is-active');
    }
    else{
        document.querySelector('.nav-left').classList.add('is-active');
        document.querySelector('.fa-folder').classList.remove('is-active');
        document.querySelector('.fa-folder-open').classList.add('is-active');
    }   
}