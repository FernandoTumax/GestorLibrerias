export class Order{
  constructor(
    public fecha:String,
    public totalAPagar:Number,
    public products:[],
    public schoolStore: {
      _id: String,
      nameSchoolStore: String,
      directionSchoolStore: String,
      NIT: Number
    },
    public client: {
      _id: String,
      nombreCliente: String,
      apellidoCliente: String,
      emailCliente: String,
    }
  ){}
}
