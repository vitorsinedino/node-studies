const fs = require('fs');
const http = require('http');
const url = require('url');


/////////////Files/////////////

//sycrhonous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// const textOut = `this is what we know about the avocado : ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('file written !!');

//asynchronous
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2} \n${data3}`, err =>{
//                 console.log('your file has been written');
//             })
//         });
//     });
// });
// console.log('read this first !!');

/////////////SERVER/////////////
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
    const pathName = req.url;
    if(pathName === '/' || pathName=== '/overview'){
        res.end('this is the OVERVIEW');
    }else if (pathName === '/api'){
        fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', ( (err, data) =>{
            res.writeHead(200, {'content-type' : 'aplication/json'});
            res.end(data);
        }));
    }else if(pathName === '/product'){
        res.end('this the Product page');
    }else{
        res.writeHead(404, {
            'Content-type':' text/html',
            'my-own-header': 'hello wolrd'
        });
        res.end('<h1>Page Not Found</h1>');
    }
});

server.listen(8000, () =>{
    console.log('listening requests on port 8000');
})