var arr = [6, 5, 4, 1, 9, 2];
var b = [];

for (var i = 0; i < arr.length; i++) {
  b[arr[i]] = 1;
}

arr.length = 0;
for (v in b) {
  arr.push(Number(v));
}
console.log(arr);
