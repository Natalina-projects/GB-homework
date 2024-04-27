'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const COUNTER_FILE_PATH = path.join(__dirname, 'counter.json');

function writeCounter(page, count) {
    let counters = {};
    if(fs.existsSync(COUNTER_FILE_PATH)) {
        counters = JSON.parse(fs.readFileSync(COUNTER_FILE_PATH, 'utf8'));
    }
    counters[page] = count;
    fs.writeFileSync(COUNTER_FILE_PATH, JSON.stringify(counters), 'utf8');
}

function readCounter(page) {
    if(fs.existsSync(COUNTER_FILE_PATH)) {
        const counters = JSON.parse(fs.readFileSync(COUNTER_FILE_PATH, 'utf8'));
        return counters[page] || 0;
    }
    return 0;
}

app.get('/', (req, res) => {
    const count = readCounter('home') + 1;
    writeCounter('home', count);
    const htmlContent = `<h1>Главная</h1>
                         <p>Количество просмотров:${count}</p> 
                         <a href="/about">Перейти на страницу 'О нас'</a>`;
    res.send(htmlContent);
})

app.get('/about', (req, res) => {
    const count = readCounter('about') + 1;
    writeCounter('about', count);
    const htmlContent = `<h1>О нас</h1>
                         <p>Количество просмотров:${count}</p> 
                         <a href="/">Перейти на главную страницу</a>`;
    res.send(htmlContent);
})

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});




