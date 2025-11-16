import {randomUUID} from 'crypto';
const storage = [
    {id: randomUUID(), playerCard: "yolo 420", desc: "first info card", age: 25, active: true},
    {id: randomUUID(), playerCard: "noob master", desc: "second info card", age: 30, active: false},
    {id: randomUUID(), playerCard: "pro gamer", desc: "third info card", age: 22, active: true},
    {id: randomUUID(), playerCard: "casual player", desc: "fourth info card", age: 28, active: false},
];
export default storage;