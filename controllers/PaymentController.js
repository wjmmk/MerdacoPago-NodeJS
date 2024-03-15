class PaymentController {
    constructor(paymentService) {
      this.paymentService = paymentService; 
    }
  
    async getMercadoPagoLink(req, res) {
        const { name, price, unit, img } = req.body;

        try {
            const checkout = await this.paymentService.createPaymentMercadoPago(
                name, // nombre del producto o servicio
                price, //precio del producto o servicio
                unit,  //cantidad que estamos vendiendo
                img  // imagen de referencia del producto o servicio
              );
        
              //si es exitoso los llevamos a la url de Mercado Pago
              return res.redirect(checkout.init_point); 
        
              // o si queres devolver la url al front 
              //return res.json({url: checkout.init_point})
        
        } catch (err) {
            return res.status(500).json({
                error: true,
                msg: "Hubo un error con Mercado Pago"
            });
        }
    }
  
    webhook(req, res) { 
        if (req.method === "POST") { 
            let body = ""; 
            req.on("data", chunk => {  
              body += chunk.toString();
            });
            req.on("end", () => {  
              console.log(body, "webhook response"); 
              res.end("ok");
            });
          }
          return res.status(200); 
    }
}
  
module.exports = PaymentController;