var array = [2,1,51,49];
qtd_array = array.length;

for (let i = 0; i < qtd_array; i++) {
    for (let j = 0; j < qtd_array; j++) {    
        console.log(`${array[j]} < ${array[j+1]}`);  
        if(array[j+1] < array[j]){
            let temp = array[j];
            console.log(`------------------------------`);
            console.log(`PN[${array[j]}] = ${array[j+1]}`);
            console.log(`PT[${array[j+1]}] = ${temp}`);

            array[j] = array[j+1];
            array[j+1] = temp;       
        }
    }
    
}

// console.log(array);