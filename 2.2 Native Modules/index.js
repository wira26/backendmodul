const fs = require('fs')

fs.writeFile("massage.txt", "Heloo wira", (err) =>{
    if(err) throw err;
    console.log("the file has been saved");
} );

fs.readFile('massage.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  }); 