import {randomUUID} from 'crypto';
const storage = [
    {id: randomUUID(), playerCard: "yolo 420", desc: "I am a straight up gun, I run into battle and then hide.", age: 25, active: true, },
    {id: randomUUID(), playerCard: "noob master", desc: "I am new to the game and still learning the ropes.", age: 30, active: false},
    {id: randomUUID(), playerCard: "pro gamer", desc: "I am highly skilled and competitive, always aiming for the top.", age: 22, active: true},
    {id: randomUUID(), playerCard: "casual player", desc: "I play for fun and relaxation, not too serious.", age: 28, active: false},
    {id: randomUUID(), playerCard: "elite sniper", desc: "I am precise and deadly, always hitting my target.", age: 35, active: true},
    {id: randomUUID(), playerCard: "stealth master", desc: "I excel at sneaking around and surprising my opponents.", age: 27, active: true},
];
export default storage;