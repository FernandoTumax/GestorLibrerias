export class Libreria{
  constructor(
    public name:string,
    public direction:string,
    public description:string,
    public phone:number,
    public NIT:number,
    public img:string,
    public products: [],
    public orders: []
  ){}
}
