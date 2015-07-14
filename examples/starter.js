//A function is a piece of code that can be run many times, usually by its name

//can you make this a polygon?
function square(side) {
   repeat(4, function () {
      forward(side);
      right(90);
   });
}

function demo() {
   hideTurtle();
   colour(0,0,255,1);
   for(s = 100; s > 0; s -= 10) {
      square(s);
      right(36);
   }
}

//type "demo()" below this line, and hit "Run Code" (or ctl-m)
