import http from "../http-common";


const addcart = (userId,postID) => 
{
    return http.post(`/mycart/addMyCart`, {userId,postID});
}
 


const deletecart = (userId,postID) => {
    return http.delete(`/mycart/deleteMyCart`, {
        data: {userId,postID }
    });
}


// router.post("/getitems", displayItemController);
const displaycart = (userId) => {

    console.log(`mycartdisplaylistuserid frontend ${userId}`) //mycartdisplaylistuserid frontend 2
    // return http.get(`/mycart/displayMyCart`, { userId });
    return http.get(`/mycart/displayMyCart`, { params: { userId } });

}


const CartService = {
    addcart,deletecart,displaycart
}

export default CartService;