// getting RGB value from DOM
let red = document.querySelector('.red');
let green = document.querySelector('.green');
let blue = document.querySelector('.blue');

// selecting other things
let resetButton = document.querySelector('.reset');
let options = document.querySelectorAll('.option');
let message = document.querySelector('.message');
let choices = document.querySelector('.choices');
let life_point = document.querySelector('.life_point');

// initializing game values
let r,g,b;
let status = "idle";
let life = 3;

// funtion to reset the screen
function reset() {

    //generating random rgb values
    r = Math.floor(Math.random().toFixed(2) * 256);
    g = Math.floor(Math.random().toFixed(2) * 256);
    b = Math.floor(Math.random().toFixed(2) * 256);

    //setting screen values
    red.textContent = r;
    green.textContent = g;
    blue.textContent = b;
    life_point.textContent = '💖 💖 💖';
    message.textContent = '';
    status = "idle";
    life = 3;
    choices.style.pointerEvents = 'all';
    options.forEach(option => {
        option.classList.add('box_shadow');
    })

    //this will shuffle the options
    let indices = [0, 1, 2, 3, 4, 5];
    let shuffleIndices = [];

    while (indices.length !== 0) {
        let idx = Math.floor(Math.random() * indices.length);
        let num = indices[idx];
        shuffleIndices.push(num);
        indices.splice(idx, 1);
    }

    // setting random colors to shuffeled options
    options[shuffleIndices[0]].style.backgroundColor = `rgb(${r}, ${(g+b)%256}, ${(g+b)%256})` ;
    options[shuffleIndices[1]].style.backgroundColor = `rgb(${(r+b)%256}, ${g}, ${(r+b)%256})` ;
    options[shuffleIndices[2]].style.backgroundColor = `rgb(${(r+g)%256}, ${(r+g)%256}, ${b})` ;
    options[shuffleIndices[3]].style.backgroundColor = `rgb(${(r+g)%256}, ${g}, ${(r+g+b)%256})` ;
    options[shuffleIndices[4]].style.backgroundColor = `rgb(${(r+g+b)%256}, ${g}, ${(b+g)%256})` ;
    options[shuffleIndices[5]].style.backgroundColor = `rgb(${r}, ${g}, ${b})` ;

}

//adding event listener to reset button
resetButton.addEventListener('click', () => {
    reset();
})

//adding eventListener to color options
options.forEach(option => {
    option.addEventListener('click',()=>{
        if(option.style.backgroundColor !== `rgb(${r}, ${g}, ${b})`){
            option.style.backgroundColor = `#e0e0e0`;
            option.classList.remove('box_shadow');
            life = life - 1;
            let string = '';
            for(let i=0; i<life; i++){
                string += '💖 ';
            }
            life_point.textContent = string;
            if(life === 0){
                status = 'lose';
                life_point.textContent = '💔';
            }
        }else{
            status = 'win';
            options.forEach(option => {
                option.style.backgroundColor = `rgb(${r}, ${g}, ${b})` ;
            })
        }

        if(status === 'win'){
            message.textContent = 'Winner :)';
            message.style.color = 'green';
            choices.style.pointerEvents = 'none';
        }else if(status === 'lose'){
            message.textContent = 'You lose :(';
            message.style.color = 'red';
            choices.style.pointerEvents = 'none';
        }
    })
})

// reseting game after screen loads
window.onload = reset();
