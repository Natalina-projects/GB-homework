const express = require('express');
const fs = require('fs');
const path = require('path');
const joi = require('joi');

const filePath = path.join(__dirname, 'users.json');
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
}
let customId = 1;

const scheme = joi.object({
    firstName: joi.string().min(1).required(),
    lastName: joi.string().min(1).required(),
    age: joi.number().min(10).max(100).required(),
    city: joi.string().min(3)
})

const app = express();
app.use(express.json());

app.get('/users', (req, res) => {
    try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        const users = JSON.parse(fileData);
        res.send({users});
    } catch (error) {
        res.status(500).send({ error: "Внутренняя ошибка сервера"});
    }
});

app.get('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const user = users.find(user => user.id === Number(req.params.id));
    if(user) {
        res.send({user});
    } else {
        res.send({error: "User not found"});
    }

});

app.put('/users/:id', (req, res) => {
    const result = scheme.validate(req.body);
    if (result.error) {
        return res.send({error: result.error.details});
    }

    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const user = users.find(user => user.id === Number(req.params.id));
    if (user) {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.city = req.body.city;
        fs.writeFileSync(filePath, JSON.stringify(users));
        res.send({user});
    } else {
        res.send({error: "User not found"});
    }
});

app.post('/users', (req, res) => {
    const result = scheme.validate(req.body);
    if (result.error) {
        return res.send({error: result.error.details});
    }
    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const user = {
        id: ++customId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        city: req.body.city
    };
    users.push(user);
    fs.writeFileSync(filePath, JSON.stringify(users));
    res.send({user});
});


app.delete('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const userIndex = users.findIndex(user => user.id === Number(req.params.id));
    if (userIndex >=0) {
        users.splice(userIndex, 1);
        fs.writeFileSync(filePath, JSON.stringify(users));
        res.status(204).send();
    } else {
        res.send({error: "User not found"});
    }
});

try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(fileData);
    customId = users.reduce((max, user) => Math.max(max, user.id), 0) + 1;
} catch (error) {
    console.error("Не удалось установить id пользователя");
    process.exit(1);
}

app.listen(3000, () => console.log("Started"));