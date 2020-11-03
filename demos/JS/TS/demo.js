"use strict";
var Color;
(function (Color) {
    Color[Color["red"] = 4] = "red";
    Color[Color["blue"] = 3] = "blue";
    Color[Color["green"] = 4] = "green";
})(Color || (Color = {}));
;
console.log(Color['red'] === 4);
console.log(4 === Color['red']);
console.log(Color['green'] === 4);
console.log(4 === Color['green']);
//# sourceMappingURL=demo.js.map