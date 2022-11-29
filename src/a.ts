console.log('hello world!');
interface User {
  name: string;
  age: number;
}
function getUser(user: User): void {
  console.log(user.age);
}
