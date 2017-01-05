var cols = 3;
var rows = 3;
var board = [];
var number_of_moves = 0;

//gets the adjacent nodes to the node n and return an array of adjacent nodes
function adjacent(n) {
	var node_row = parseInt(n[0]);
	var node_col = parseInt(n[2]);
	var left = node_col - 1;
	var right = node_col + 1;
	var up = node_row - 1;
	var down = node_row + 1;

	var val = [];
	if (up >= 0 ) val.push(board[up][node_col] + "|" + up + "," + node_col);
	if (down <= rows - 1) val.push(board[down][node_col] + "|" + down+ "," + node_col);
	if (left >= 0 )  val.push(board[node_row][left] + "|" + node_row + "," + left);
	if (right <= cols - 1) val.push(board[node_row][right] + "|" + node_row + "," + right);


	return val;
}
//initialize board
function initialize_board() {
	board = [];
	var counter = 0;
	for (var i = 0; i < rows; i++) {
		var row_arr = [];
		for (var j = 0; j < cols; j++){
			row_arr.push(++counter);
		}
		board.push(row_arr);
	}
}

function shuffle_board() {
	number_of_moves = 0;
	initialize_board();
	//shuffle
	shuffle(board);
	for (var i = 0; i < board.length; i++) shuffle(board[i]);
	//generate
	generate();
}


function generate_board() {
	number_of_moves = 0;
	//getting user input
	var e = document.getElementById("options");
	var value = e.options[e.selectedIndex].value;
	//initializing rows and cols based on user input
	rows = value.split("x")[0];
	cols = value.split("x")[1];

	initialize_board();
	generate();
}

//sets up and generate the maze layout according to cols and rows
function generate(){

	var puzzle = document.getElementById("puzzle");
	puzzle.innerHTML = "";
	for (var i = 0; i < rows; i++){

		var row = document.createElement("div");
		row.setAttribute("class", "row");
		
		for (var j = 0; j < cols; j++){
			
		 	var col = document.createElement("div")
		 	col.setAttribute("class", "col-md-4");
		 	col.setAttribute("class", "col-sm-4");
		 	col.setAttribute("id",  i +"," + j);
		 	col.setAttribute("onClick", "isClicked()");
		 	
		 	var color = "";
		 	if (board[i][j] == (cols * rows)) color = "white";
		 	else {
		 		color = "red";
		 		col.innerHTML = board[i][j];
		 	}
		 		col.setAttribute("style", "border-style: solid;"+"width:" + (500/rows - cols)+ "px;"
		 						 +"height:" + (500/cols - rows) + "px;background-color:" + color);

		 	row.appendChild(col);
		}
		
		puzzle.appendChild(row);
	}
}


function win() {
	var counter = 0;
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++){
			counter++;
			if (board[i][j] != counter) return false;
		}
	}
	return true;
}

function isClicked() {
	//getting the element
	var x = event.clientX;     // Get the horizontal coordinate
	var y = event.clientY;	   // get the vertical coordinate 
    var elementMouseIsOver = document.elementFromPoint(x, y);

    //console.log(elementMouseIsOver.innerHTML.split(","));
    var ad = adjacent(elementMouseIsOver.id);
    move(elementMouseIsOver, ad);
   // console.log(board);
   // for (var i = 0; i < ad.length; i++) console.log(ad[i]);
   
   //update user
   var element = document.getElementById("update");
   	if (win()){
   	 element.innerHTML = "you won!!! in " + number_of_moves + " moves";
   	 element.style.color = "green";
   	}
   	else element.innerHTML = "Moves:" + number_of_moves; 
}

function move(current, adj) {
	
	for (var i = 0; i < adj.length; i++) {
		if (adj[i].split("|")[0] == (cols * rows)) {
			//get sp element
			var sp = document.getElementById(adj[i].split("|")[1]);
			//swap inner html and background color between space and current
			var temp = sp.innerHTML;
			sp.innerHTML = current.innerHTML;
			current.innerHTML = temp;

			//swap background color
			temp = sp.style.backgroundColor;
			sp.style.background = current.style.backgroundColor;
			current.style.backgroundColor = temp;

			//update board 
			var val = current.id.split(",");
			var val2 = adj[i].split("|")[1].split(",");

			temp = board[val[0]][val[1]];
			board[val[0]][val[1]] = board[val2[0]][val2[1]];
			board[val2[0]][val2[1]] = temp;

			number_of_moves++;
			return true;
		}
	}	
	return false;
}


function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

window.onload = shuffle_board;


