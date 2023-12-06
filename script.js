/*===========================
Poject Task: 
No:1 => Take a Quentity value from user
No:2 => Using this create input color filed
No:3 => After Selected color add this No:1 value create Display div and disply color
No:4 => Create a span inside the display color div and stor this color code there
No:5 => All disply single box store an array  

Author : Md. Mostakim Billah
Date   : 03 Dec 2023
Country: Bangladesh
Purpose: Practice
Portfolio: www.mostakimbillah.com

=============================*/

// variable diclaration 
let QtInput = document.querySelector('.quantity_input');
let QtSubmit = document.querySelector('.submitQty');
let ColorSelectWraper = document.querySelector('.container');
let displayColorBoxWraper = document.querySelector('.colorBox-container');
let closePng = document.querySelector('.closePng');
let qt_wraperbox = document.querySelector('.qt-wraperbox');
let bar = document.querySelector('.bar');
let sound = new Audio('copied.mp3');



let QueantityTaking = function(event){
    event.preventDefault();

    let Qt_Value = QtInput.value;
    if(Qt_Value < 3 || Qt_Value > 15 || Qt_Value == '' || Qt_Value == '.' || Qt_Value == '+' || Qt_Value == '-'){
        alert(`Opps! Sorry. Limite number is 3 to 20`);
        QtInput.value = '';
    }else{
        ColorCreation(Qt_Value);//user Quentity pass this function
        QtInput.value = '';
    }
    
}


//after creating color box
let myClickAdd = function(addBtn, allColorInput, Qt_Value){// recived all passes paramiter
    let AddButton = addBtn;

    AddButton.addEventListener('click', function(){//when button clicked
        let displayColorDiv = document.createElement('div');
        displayColorDiv.setAttribute('class', 'singleBox');
        displayColorBoxWraper.appendChild(displayColorDiv);


        let colorCode = [];// create a blanck array variable 
        for(let i = 0; i < Qt_Value; i++){
            colorCode.push(allColorInput[i].value); // store all color code store this array

            let SingleColorDiv = document.createElement('div');
            SingleColorDiv.setAttribute('class', `color${i} colorBox`);//div class depending user Quantity
            SingleColorDiv.style.backgroundColor = allColorInput[i].value;//set all value in all div's bg color
            SingleColorDiv.style.width = 100 / Qt_Value + '%';//and all with depend 100/user quentity value %

            let span = document.createElement('span');// span tag create for showing color code
            span.innerText = allColorInput[i].value;
            SingleColorDiv.appendChild(span);
            displayColorDiv.appendChild(SingleColorDiv);


            let visiblityDispyAction = function(event){
                //mouse hover target element
                let mouseOverColor = event.target;
                mouseOverColor.style.width = 100 / 2 + '%';
                mouseOverColor.children[0].style.width = 50 + '%';
                mouseOverColor.children[0].style.textAlign = 'center';
                this.children[0].style.bottom = 3+'%';
                // if mouse hover the span color code text 
                span.addEventListener('mouseover', function(){
                    mouseOverColor.children[0].style.visibility = 'visible';
                    mouseOverColor.children[0].style.opacity = 1;
                    mouseOverColor.style.width = 100 / 2 + '%';
                    mouseOverColor.children[0].setAttribute('class', 'onHoverHere');
                });

                // style in css for visible code
                mouseOverColor.children[0].style.visibility = 'visible';
                mouseOverColor.children[0].style.opacity = 1;

                // if div color is white change the span color is black
                if(mouseOverColor.children[0].innerHTML === '#ffffff'){
                    // console.log(true);
                    mouseOverColor.children[0].style.color ='black';
                }

                // this function just for copy the color code 
                mouseOverColor.addEventListener('click', function(){
                    let catchValue = this.children[0].innerHTML;

                    let selectInputCreate = document.createElement('input');
                    selectInputCreate.setAttribute('value', catchValue);
                    document.body.appendChild(selectInputCreate);
                    selectInputCreate.select();
                    document.execCommand('copy');
                    selectInputCreate.parentNode.removeChild(selectInputCreate);

                    this.children[0].style.bottom = 10+'%';
                    this.children[0].style.opacity = 0;
                    sound.play();//sound for copied
                });
            }


            //when mouse hover the dispay single color div
            
            SingleColorDiv.addEventListener('mouseover', visiblityDispyAction);
            
            // mouse out event call here 
            
            let mouseOutTheColorDispy = function(event){

                event.target.style.width = 100 / Qt_Value + '%';
                // console.log(mouseOverColor);
                event.target.children[0].style.visibility = 'hidden';
                event.target.children[0].style.opacity = 0;
            } 
            SingleColorDiv.addEventListener('mouseout', mouseOutTheColorDispy);

        }

        closeAndOpenQt();//last operation

    })
}


let ColorCreation = function(Qt_Value){ //user Quentity recived this paramiter

    //if this color selection wraper have box input then remove it
    if(ColorSelectWraper.querySelector('.box-input')){
        let child = ColorSelectWraper.querySelector('.box-input');
        child.remove();
    }

    //other wise add
    let Wraper = document.createElement('div');
    Wraper.setAttribute('class', 'box-input');
    ColorSelectWraper.appendChild(Wraper);

    for(let i = 0; i < Qt_Value; i++){ //create color selection input filed refer by usere value
        let inputColor = document.createElement('input');
        inputColor.setAttribute('type', 'color');
        inputColor.setAttribute('class', 'color');
        inputColor.setAttribute('value', `#ffffff`);
        Wraper.appendChild(inputColor);
    }

    let br = document.createElement('br');
    let btn = document.createElement('button');
    btn.innerText = 'Add';
    Wraper.appendChild(br);
    Wraper.appendChild(btn);
    
    let allColorInput = Wraper.children;//all color input store here
    let addBtn = Wraper.querySelector('button');// add button sected here
    myClickAdd(addBtn, allColorInput, Qt_Value);//pass this 3 paramiter this function
};


QtSubmit.addEventListener('click', QueantityTaking); //program starting line




//desing purpose not magor things...
let closeAndOpenQt = function(){
    qt_wraperbox.classList.toggle('active');

}
closePng.addEventListener('click', closeAndOpenQt);
bar.addEventListener('click', closeAndOpenQt);