const Order=require('../../../models/order')
const moment =require('moment')

function orderController(){

    return{
        store(req,res){
            
            const { phone,address}=req.body

            if(!phone || !address){
                req.flash("error",'All fields are required')
                return res.redirect('/cart')
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            })

            order.save().then(result=>{

                Order.populate(result,{path:'customerId'},(err,placedOrder)=>{
                   
                    req.flash('success','Order Places Successfuly')
                    delete req.session.cart
            
                     //emit emitter
                      
                     const eventEmitter=req.app.get('eventEmitter')
                    eventEmitter.emit('orderPlaced',result) 
                    return res.redirect('/customer/orders')
                })
                
            }).catch(err =>{
                req.flash('error','something went wrong');
                return res.redirect('/cart')
            })


        },
      async index(req,res){
            // console.log(req);
        const orders = await Order.find({ customerId: req.user._id },
            null,
            {sort: {'createdAt':-1}})
            // console.log(orders);
           
            res.render('customers/orders', { orders: orders, moment: moment })

       }, 

      async show(req,res){

        const order=await Order.findById(req.params.id)

        //authorize user
        if(req.user._id.toString() === order.customerId.toString()){

           return res.render('customers/singleOrder',{order:order})

        }

        
          return res.redirect('/')
        


       }

    }
}

module.exports=orderController
