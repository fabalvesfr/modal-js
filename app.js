// TODO: refaire avec une seule fonction qui ouvre ET ferme la modale basée sur un boolean

let modal = null; // Variable qui nous permettra de savoir quelle est la boîte modale qui est actuellement ouverte


function openModal(a){
    a.preventDefault();
    const target = document.querySelector(a.target.getAttribute('href'));
    target.style.display = null; // Cela enlève le display:none qui était initialement ajouté et la boîte modale s'affiche
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}

function closeModal(a){
    if (modal === null) return; // Cela n'a pas de sens de fermer une modale qui n'a pas encore été ouverte

    a.preventDefault();
    modal.style.display = "none"; // On inverse les choses par rapport à openModal()
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-modal');
    // "Cleaning the selected modal from the event listeners we've given to it previously"
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;
}

// Fonction qui empêche la modale de fermer si on clique à l'intérieur de la modale
function stopPropagation(e){
    e.stopPropagation();
}

// On sélectionne tous les liens dans la page qui sont censés ouvrir une boîte modale lorsqu'ils sont cliqués dessus
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});

// Activant la touche "Esc" pour qu'elle puisse aussi fermer la modale
window.addEventListener('keydown', (e)=>{
    if(e.key === "Escape" || e.key === "Esc"){
        closeModal(e)
    }
    if(e.key === "Tab" && modal != null){
        focusInModal(e)
    }
});