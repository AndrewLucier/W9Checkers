// create a 2d array to manage the layout of the pieces on the checkers board
arrPieces = [
    [null, 'w', null, 'w', null, 'w', null, 'w'],
    ['w', null, 'w', null, 'w', null, 'w', null],
    [null, 'w', null, 'w', null, 'w', null, 'w'],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    ['b', null, 'b', null, 'b', null, 'b', null],
    [null, 'b', null, 'b', null, 'b', null, 'b'],
    ['b', null, 'b', null, 'b', null, 'b', null]
]

// create a pointer to the secret span
var secretSpan = document.getElementById("selectedSquare");

// this function will create a checkers board
function createCheckersBoard(checkersBoard){
    // a typical chessboard has 8 rows and 8 columns
    // we will build those with nested loops
    for (var i=0; i < 8; i++){
        //loop to build the columns
        for (var j=0; j < 8; j++){
            // build the chess squares
            // create a new div
            var checkersSquare = document.createElement("div");

            // assign a css class to each square
            checkersSquare.className = "checkersSquare";
            // add an id, so we know where to 
            checkersSquare.setAttribute("id", "div" + i + j);

            // check to see if this is an even or odd square
            // % is modulus (mod) - it divides the first number by the second number, but only returns the remainder; if the remainder is 0 when our row+column is divided by 2, then it was an even number
            if ((i+j) % 2 == 1){
                checkersSquare.style.backgroundColor = "black";
                // add an event listener for the click on the square event, then call the movePiece function
                checkersSquare.addEventListener("click", movePiece);
            }

            // add the checkers square to the chess board div
            checkersBoard.appendChild(checkersSquare);

            // if the corresponding element in the array is not null, add a checkers piece in the square
            // in this example. if the value is w or b, then this if statement will be true
            if (arrPieces[i][j]){
                // pass in 3 argumenrs - piece#, the css class to set the correct piece color, the div where the piece should be added
                createPiece("piece" + i + j, "checkerPiece-" + arrPieces[i][j], checkersSquare);
            }
        }
    }
}

// function o create the checkers piece
function createPiece(id, pieceClass, theSquare){
    // create a new div
    var newPiece = document.createElement("div");
    // set the id, so we can know what square/piece we are working with later
    newPiece.setAttribute("id", id);
    // apply the standard checker piece class to the piece
    newPiece.classList.add("checkerPiece");
    // use the value passed in to create a white or black piece
    newPiece.classList.add(pieceClass); 
    // add an onclick event handler to handle when the piece is clicked
    newPiece.addEventListener("click", savePieceId);
    // add our new piece to the square
    theSquare.appendChild(newPiece);
}

function movePiece(event){
    console.log("movePiece function called");

    // what square was clicked
    var newSquareId = event.target.id;

    // remove any prefix that we may have on the new square id
    newSquareId = newSquareId.replace("piece", "").replace("div", "");

    // get the id of the piece to move from the secret span
    var selPieceId = secretSpan.textContent;

    // make sure that the user is trying to move the piece to a different square
    if (newSquareId != selPieceId){
        // create a pointer to the old square
        var oldSquare = document.getElementById("div" + selPieceId);
        // create a pointer to the old piece
        var oldPiece = document.getElementById("piece" + selPieceId);
        // get the color of the old piece
        var oldPieceColorClass = oldPiece.classList[1];
        // remove the old piece from the board
        oldSquare.removeChild(oldPiece);

        // create a pointer to the new square
        var newSquare = document.getElementById("div" + newSquareId);
        // create the new piece on the new square
        createPiece("piece" + newSquare, oldPieceColorClass, newSquare);

        // clear the value from the secret span
        secretSpan.textContent = "";
    }
}

// function to save the piece id in our secret span
function savePieceId(event){
    //console.log("savePieceId function called");

    // var to hold the id of the piece
    var selectedPieceId = event.target.id;

    // remove the word piece from the id, so we just have the row # and col #
    selectedPieceId = selectedPieceId.replace("piece", "");

    // store the piece id in our secret span
    secretSpan.textContent = selectedPieceId;

    console.log("selectedPieceId=" + selectedPieceId);
}