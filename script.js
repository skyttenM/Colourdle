/*
Mangler:
 - good job:)

*/


let colourValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
let numberOfPossibleGuesses = 5;
let answerColour = "";
let answerCircle = {};
let width = 1000;
let height = 700;
let inputFields = []; 
let colorCells = [];  
let feedBackCells = [];
let percentCells = [];
let count = 0;

function answerMaker() {
    let answerAsList = [];
    for (let i = 0; i < 6; i++) {
        let valueGenerator = random(colourValues);
        answerAsList.push(valueGenerator);
    }
    return "#" + answerAsList.join("");
}


function setup(){
    createCanvas(width, height);
    textAlign(CENTER, CENTER);
    noStroke(); // No borders on shape

    fill(255);
    rect(0, 0, width, height); // Make entire canvas white
    fill(0);
    textSize(50);
    textAlign(CENTER);
    text("Guess The Hex", width / 2, 60);
    
    answerColour = answerMaker(); // Create the answer
    textSize(20)
    textAlign(CENTER);
    //text(answerColour, width/2, 90) //this will be removed later

    fill(answerColour);
    circle(width/2, 140, 80);

    createSubmitButton();
    createTable();
}

function createTable(){
    const table = document.createElement('table');
        table.border = 1;
        const rows = 6;
        const columns = 2;
        table.style.width = "700px";
        table.style.height = "300px";
        table.style.position = "absolute";
        table.style.left = "50%";
        table.style.top = "55%";
        table.style.transform = "translate(-50%, -50%)";
        table.style.fontSize = "20px";

        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            // First column
            const inputCell = document.createElement('td');
            //inputCell.style.padding = "10px";
            
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = '#000000'; // Default hex code
            inputField.style.width = '300px';
            inputField.style.height = '50px';
            inputField.style.fontSize = "20px";

            inputCell.appendChild(inputField);
            row.appendChild(inputCell);
            inputFields.push(inputField);


            // Second column
            const colorCell = document.createElement('td');
            colorCell.style.width = '100px';
            colorCell.style.height = '50px';

            row.appendChild(colorCell);
            colorCells.push(colorCell);

            //Third column
            const feedBackCell = document.createElement('td');
            feedBackCell.style.width = '300px';
            feedBackCell.style.height = '50px';

            row.appendChild(feedBackCell);
            feedBackCells.push(feedBackCell);

            //fourth column
            const percentCell = document.createElement('td');
            percentCell.style.width = '100px';
            percentCell.style.height = '50px';

            row.appendChild(percentCell);
            percentCells.push(percentCell);


            table.appendChild(row);

        }
        document.body.appendChild(table);
}

function createSubmitButton(){
    let submitButton = createButton("SUBMIT");
    //submitButton.style.position("absolute");
    submitButton.position(width/2 + 100, 670);
    submitButton.style('width', '250px'); 
    submitButton.style('font-size', '40px');
    submitButton.mousePressed(() => {
        updateColorCells(); 
    });
}

function updateColorCells() {
    count ++;
    for (let i = 0; i < count; i++) {
        const hexValue = inputFields[i].value;
        if (hexValue === "#000000"){
            break;  
        } 

        else if (/^#([0-9A-F]{6})$/i.test(hexValue)) { // Check if valid hex
            colorCells[i].style.backgroundColor = hexValue;
            inputFields[i].disabled = true; //make input unchangable
        
            let answerRed = parseInt(answerColour.substring(1, 3), 16);
            let answerGreen = parseInt(answerColour.substring(3, 5), 16);
            let answerBlue = parseInt(answerColour.substring(5, 7), 16);

            let inputRed = parseInt(hexValue.substring(1, 3), 16);
            let inputGreen = parseInt(hexValue.substring(3, 5), 16);
            let inputBlue = parseInt(hexValue.substring(5, 7), 16);

            let feedback = "";
            feedback += (inputRed > answerRed) ? "Too much red, " : (inputRed < answerRed) ? "Too little red, " : "";
            feedback += (inputGreen > answerGreen) ? "Too much green, " : (inputGreen < answerGreen) ? "Too little green, " : "";
            feedback += (inputBlue > answerBlue) ? "Too much blue" : (inputBlue < answerBlue) ? "Too little blue" : "";

            if (feedback === "") {
                feedback = "Correct!";
            }
            feedBackCells[i].innerText = feedback;


            percentCells[i].innerText = 100 - Math.ceil((
                (Math.abs(answerRed - inputRed)/256) + 
                (Math.abs(answerBlue - inputBlue)/ 256) + 
                (Math.abs(answerGreen - inputGreen)/256)
                )/3*100)
                + "%"; 

            let coloredHex = "";
            for (let j = 0; j < 7; j ++) {
                if (hexValue[j].toUpperCase() === answerColour[j].toUpperCase()) {
                    coloredHex += `<span style="color: green;">${hexValue[j].toUpperCase()  }</span>`; //green text
                } else {
                    coloredHex += hexValue[j].toUpperCase(); //grey text
                }
            }
            inputFields[i].outerHTML = `<td style="width: 400px; height: 50px; font-size: 20px;">${coloredHex}</td>`;
        }   

        else {
            colorCells[i].style.backgroundColor = '#FFFFFF';
            feedBackCells[i].innerText = "That is not a valid 6 digit hex, try again";
            count--;
        }
    }
}


