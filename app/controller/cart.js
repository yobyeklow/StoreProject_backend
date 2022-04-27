const Cart = require("../models/cart");
const product = require("../models/product");
const Product = require("../models/product");

exports.addItemToCart = (req, res, next) => {
  console.log(req.body);
  Cart.findOne({ user: req.user.id })
      .exec((error, cart) => {

          if (error) return res.status(400).json({ error });
          if (cart) {
              // if cart already exists then update cart by quantity
              const product = req.body.cartItems.product;
              const item = cart.cartItems.find(c => c.product._id == product._id);
              let condition, update;
              if (item) {

                  condition = { "user": req.user.id, "cartItems.product": product };
                  update = {
                      "$set": {
                          "cartItems.$": {
                              ...req.body.cartItems,
                              quantity: item.quantity + req.body.cartItems.quantity
                          }
                      }
                  };

                  Cart.findOneAndUpdate(condition, update)
                      .exec((error, _cart) => {
                          if (error) return res.status(400).json({ error });
                          if (_cart) {
                              return res.status(201).json({ cart: _cart });
                          }
                      });

              } else {

                  condition = { user: req.user.id };
                  update = {
                      "$push": {
                          "cartItems": req.body.cartItems
                      }
                  };

                  Cart.findOneAndUpdate(condition, update)
                      .exec((error, _cart) => {
                          if (error) return res.status(400).json({ error });
                          if (_cart) {
                              return res.status(201).json({ cart: _cart });
                          }
                      });
              }
          } else {
              // if cart not exists then create a new cart
              const cart = new Cart({
                  user: req.user.id,
                  cartItems: [req.body.cartItems]
              });

              cart.save((error, cart) => {

                  if (error) return res.status(400).json({ error });
                  if (cart) {
                      return res.status(201).json({ cart });
                  }

              });
          }
      });



}
exports.deleteCart = async(req,res,next)=>{
   console.log(req.body._id);
   Cart.findOne({user:req.user.id})
       .exec(async function(err,cart){
         if(err) res.status(400).json(err);
         if(cart){
            const productId= req.body._id;
            console.log(productId);
            var item = await cart.cartItems.find((element,index)=>{
              if(element.product == productId){
                  const result=cart.cartItems.splice(index,1);
                  return result;
              }
            })
            console.log(item);
            if(item){
              const condition = {user:req.user.id};
              const updated ={ 
                "$pull": {
                  "cartItems": item
                }
              }
              Cart.findOneAndUpdate(condition,updated)
                  .exec((error,cart) => {
                    if (error) return res.status(400).json({ error });
                    if (cart) {
                        return res.status(201).json({message:"Deleted successfully"});
                    }
                });
            }
         }
       })
}
exports.totalPrice = async (req, res,next) => {
  Cart.findOne({ user: req.user.id })
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
        const count = 0;
        console.log(cart);
        res.status(200).json( 'haha' );
      }
    });
};
exports.getCartItems = (req, res) => {
    Cart.findOne({ user: req.user.id })
    .populate("cartItems.product", "_id name price image quantity")
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
        let cartItems = [];
        cart.cartItems.forEach((item, index) => {
          const _item = {
            _id: item.product._id.toString(),
            name: item.product.name,
            img: item.product.image,
            price: item.product.price,
            quantity: item.quantity,
          };
          cartItems.push(_item);
        });
        var price = 0;
        cartItems.forEach((element)=>{
          price = price + (element.price * element.quantity);
        })
        
        res.status(200).json( {'item':cartItems,'price':price });
      }
    });
};

