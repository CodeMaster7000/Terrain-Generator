window.onload = function() {
  var canvas = document.getElementById('canvas'),
      c = canvas.getContext('2d');
  canvas.width = 1000;
  canvas.height = 1000;
  var Width = canvas.width,
     Height = canvas.height;
 var land = "=", water = "~", map = [], chanceOfLand = 0.47, terrainSize = 20;
 var mouseX, mouseY;
 MakeMap();
 function MakeMap() {
   GenerateMap();
   for(var i = 0; i < 10; i++)
    SmoothMap();
   Draw();
 }
 function GenerateMap() {
   for (var i = 0; i < canvas.width; i+=terrainSize) {
     map[i] = [];
     for (var j = 0; j < canvas.height; j+=terrainSize) {
       if(i === 0 || i === Width-1 || j === 0 || j === Height-1)
           map[i][j] = 1;
       if(Math.random() < chanceOfLand)
         map[i][j] = 1;
       else
         map[i][j] = 0;
     }
   }
 }
 function SmoothMap() {
   for (var i = 0; i < canvas.width; i+=terrainSize) {
     for (var j = 0; j < canvas.height; j+=terrainSize) {
         var nextWallTiles = GetSurroundingTile(i,j);
         if(nextWallTiles > 4)
           map[i][j] = 1;
         else if(nextWallTiles < 4)
             map[i][j] = 0;
     }
   }
 }
 function GetSurroundingTile(gridX, gridY) {
   var wallCount = 0;
   for (var nextX = gridX-terrainSize; nextX <= gridX+terrainSize; nextX+=terrainSize) {
     for (var nextY = gridY-terrainSize; nextY <= gridY+terrainSize; nextY+=terrainSize) {
       if(nextX >= 0 && nextX < canvas.width && nextY >= 0 && nextX < canvas.height) {
         if(nextX != gridX || nextY != gridY)
           wallCount += map[nextX][nextY];
       }else {
         wallCount++;
       }
     }
   }
   return wallCount;
 }
 function Draw() {
   for (var i = terrainSize; i < canvas.width; i+=terrainSize) {
     for (var j = terrainSize; j < canvas.height; j+=terrainSize) {
       if(map[i][j] === 1)
           c.fillStyle = "rgb(0, 18, 255)";
       else if(map[i+terrainSize][j] === 1 || map[i][j+terrainSize] === 1 || map[i-terrainSize][j] === 1 || map[i][j-terrainSize] === 1)
         c.fillStyle = "rgb(255, 253, 91)";
       else if(map[i][j] === 0)
           c.fillStyle = "rgb(43, 255, 0)";
        c.fillRect(i, j, terrainSize, terrainSize);
     }
   }
 }
};
