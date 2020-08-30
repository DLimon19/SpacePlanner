
function hacerArreglo(){
    //Convierte un string como '2 3' a una tupla (2,3)
function seat_to_point(seat)
{
    let tuple = seat.split(' ')
    return tuple
}

function euclidean_distance(point1, point2)
{
    return Math.sqrt(Math.pow(Math.abs(point1[0]-point2[0]), 2) + Math.pow(Math.abs(point1[1]-point2[1]), 2))
}

function min_from_array(arr)
{
    let min_value = 9999
    arr.forEach(val => {
        if (val < min_value)
            min_value = val
    })

    return min_value
}

let layout =[
                [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],

            ]

let total=0
var filasv = document.getElementById("filas").value;
var columnasv = document.getElementById("columnas").value;
/*for(var i = 0; i<columnasv;i++){
    for(var j = 0; j<filasv;j++){
        layout[i][j] = "1";
    }
}

for(var i = 0; i<layout.length;i++){
    for(var j = 0; j<layout[0].length;j++){
        if(i>filas || j>columnas)
        layout[i][j].remove();
    }
}*/
//let total=document.getElementById("capacidad").value
 //layout.forEach((num)=> {
 //    total+=num
 //});
layout.forEach(row => row.forEach(val => total += val))

//Porcentaje admitido
let percentage = document.getElementById("porcentaje").value/100;
//Distancia en metros
let seat_side_length = .75
let safe_distance = document.getElementById("distancia").value
let safe_units = Math.ceil(safe_distance / seat_side_length)

console.log('total: ' + total)
console.log('percentage: ' + percentage)
console.log('seat_side_length: ' + seat_side_length)
console.log('safe_distance: ' + safe_distance)
console.log('safe_units: ' + safe_units)

let k = Math.floor(total * percentage)

let corners = [
    '0 0',
    (layout[0].length - 1) + ' 0',
    '0 ' + String(layout.length - 1),
    String((layout[0].length - 1)) + ' ' + String(layout.length - 1)
]

let is_possible = true;
while (corners.length < k){
    new_corner = ''
    min_mean = 9999

    for (y = 0; y < layout.length; ++y) 
    {
        for (x = 0; x < layout[0].length; ++x) 
        {
            if (!((String(x) + ' ' + String(y)) in corners) && layout[y][x] >=1)
            {
                let distances = []
                corners.forEach((c)=>
                {
                    distances.push(euclidean_distance([x,y], seat_to_point(c)))
                })

                let mean = 0;
                //distances = distances.slice();
                let dlength = distances.length;
                let a = 0;
                distances.forEach((n)=>
                {
                    a+=n;
                })
                mean = a/dlength;
                if((mean < min_mean) && (min_from_array(distances) > safe_units))
                {
                    min_mean = mean;
                    new_corner = String(x) + ' ' + String(y);
                }
            }
        }
    }
    if (new_corner=='')
    {
        console.log('Not possible!')
        is_possible = false;
    }

    if (!is_possible)
        break;

    corners.push(new_corner)
}

if (is_possible) {
    corners.forEach(corner => {
        [x, y] = seat_to_point(corner)
        layout[y][x] = 2
    })
    
    // console.log(layout)
    for (let y = 0; y < layout.length; y++) {
        let row = ''
        for (let x = 0; x < layout[0].length; x++) {
            //if(layout[y][x]==1)
            row += `${layout[y][x]} `
        }

        console.log(row);
    }

    // layout.forEach(row => row.forEach())
    }
}

    