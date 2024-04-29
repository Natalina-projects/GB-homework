'use strict';

// Задача 1.

// const musicCollection = {
//     albums:[
//         {
//             title: "Альбом 1",
//             artist: "Исполнитель 1",
//             year:"2022"
//         },
//         {
//             title: "Альбом 2",
//             artist: "Исполнитель 2",
//             year:"2023"
//         },
//         {
//             title: "Альбом 3",
//             artist: "Исполнитель 3",
//             year:"2024"
//         }
//     ],
//     [Symbol.iterator]() {
//         let currentIndex = 0;
//         const albumsArr = this.albums;
//         return {
//             next() {
//                 if (currentIndex < albumsArr.length) {
//                     return {
//                         value: albumsArr[currentIndex++],
//                         done: false
//                     };
//                 } else {
//                     return {done: true};
//                 }
//             }
//         };
//     }
// };
//
// for (const  album of musicCollection) {
//     console.log(`${album.title} - ${album.artist} (${album.year})`);
// }

// Задача 2.
const dishesAndCooks = new Map([
    ["Пицца 'Маргарита'", "Виктор"],
    ["Пицца 'Пепперони'", "Виктор"],
    ["Суши 'Филадельфия'", "Ольга"],
    ["Суши 'Калифорния'", "Ольга"],
    ["Тирамису", "Дмитрий"],
    ["Чизкейк", "Дмитрий"]
]);

const client1 = {name: "Aлексей"};
const client2 = {name: "Мария"};
const client3 = {name: "Ирина"};

const clientsOrders = new Map();

clientsOrders.set(client1, ["Пицца 'Пепперони'", "Тирамису"]);
clientsOrders.set(client2, ["Суши 'Калифорния'", "Пицца 'Маргарита'"]);
clientsOrders.set(client3, ["Чизкейк"]);

console.log(clientsOrders);

clientsOrders.forEach((dishes, client) => {
    console.log(`Заказ клиента ${client.name}:`);
    dishes.forEach(dish => {
        console.log(`- Блюдо: ${dish}, повар: ${dishesAndCooks.get(dish)}`)
    })
})




