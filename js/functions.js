window.onload = () => {
    let image, photoName;
    const reader = new FileReader();
    const inputs = document.getElementsByClassName('data-edit');
    const load = document.getElementById('inputPre');
    const preview = document.getElementById('loadedImg');
    const hiddens = document.getElementsByClassName('init-hidden');

    document.getElementById('select').onclick = () => {
        load.click();
    }

    load.addEventListener('change', () => {
        let file = load.files.item(0);
        photoName = file.name;
        reader.readAsDataURL(file);

        reader.onload = function (event) {
            image = new Image();
            image.src = event.target.result;
            image.onload = onLoadImage;
        }
    })

    // Criando Canvas
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    function onLoadImage() {

        const { width, height } = image;
        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(image, 0, 0);
        preview.src = canvas.toDataURL();
        reveal();
    }
    for(let i = 0; i < inputs.length; i++){
        inputs[i].addEventListener('change', () =>{
            effects();
        })
    }
    function effects() {
        preview.style.filter = 
        `grayscale(${inputs[0].value}%) blur(${inputs[1].value}px)
        contrast(${inputs[2].value}%)  invert(${inputs[3].value}%)
        brightness(${inputs[4].value}%) hue-rotate(${inputs[5].value}deg)
        opacity(${inputs[6].value}%) saturate(${inputs[7].value}) 
        sepia(${inputs[8].value}%)`;
        preview.style.borderRadius = `${inputs[9].value}px`;
    }
    function reveal(){
        for (let i = 0; i < hiddens.length; i++) {
            hiddens[i].style.display = 'initial'; 
        }
        document.getElementById('edit').style.display = 'flex';
    }

    document.getElementById('download').onclick = () => {
        const a = document.createElement('a');
        a.download = (photoName.split('.')[0]) + '-edited.png';
        a.href = canvas.toDataURL();
        a.click();
    }
}



