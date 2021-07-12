export class User{
  constructor(
    public username:string,
    public password:string,
    public email:string,
    public name:string,
    public lastname:string,
    public role:string,
    public img:string,
    public shoppingCar: [],
    public schoolStore: []
  ){}
}
