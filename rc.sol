pragma solidity ^0.4.11;

contract RC {


    struct Delivery {
            address sender;
            bytes32 pickup_hash;
            bytes32 drop_off_hash;
            address reza_parcero;
            address receiver;
            uint price;
            uint status;
        }
    mapping(bytes32 => Delivery) public deliveries;
   /// Para varios envios de un solo account mapping(bytes32 => Delivery[]) public deliveries;

    function RC(
        ) public {

        }

    function new_delivery( bytes32 _delivery_hash, address _receiver)
            public payable
        {
            deliveries[_delivery_hash] = Delivery({
                sender: msg.sender,
                pickup_hash: 0,
                drop_off_hash: 0,
                reza_parcero : 0,
                price: msg.value,
                status: 1,
                receiver: _receiver
            });
        }

    function choose_delivery(bytes32 _delivery_hash, bytes32 _pickup_hash) public {
    /*Validar que nadie haya tomado el pickup antes*/
        if( deliveries[_delivery_hash].status == 1 ) {
            deliveries[_delivery_hash].reza_parcero = msg.sender;
            deliveries[_delivery_hash].pickup_hash = _pickup_hash;
            /*Record price of this operation to refund RezaParcero later*/
            deliveries[_delivery_hash].status = 2;
        }else {
                     revert();
                     }
    }

    function confirm_pickup(bytes32 _delivery_hash, string _pickup_key, bytes32 _dropoff_hash) public {
        /* encode of key_world (md5)  and compare with deliveries[_delivery_hash].pickup_hash*/
        bytes32 h = keccak256(_pickup_key);
        address a = msg.sender;
         if (deliveries[_delivery_hash].pickup_hash == h
            && a  == deliveries[_delivery_hash].sender
            && deliveries[_delivery_hash].status == 2) {
            deliveries[_delivery_hash].status = 3;
            deliveries[_delivery_hash].drop_off_hash = _dropoff_hash;
        }else {
                     revert();
                     }
    }

    function confirm_drop(bytes32 _delivery_hash, string _drop_off_key, string _delivery_key) public {
            /* encode of key_world (md5)  and compare with deliveries[_delivery_hash].pickup_hash*/
             if (deliveries[_delivery_hash].drop_off_hash == keccak256(_drop_off_key)
                && _delivery_hash == keccak256(_delivery_key)
                && msg.sender == deliveries[_delivery_hash].receiver
                && deliveries[_delivery_hash].status == 3) {

                deliveries[_delivery_hash].reza_parcero.transfer(deliveries[_delivery_hash].price);
                delete deliveries[_delivery_hash];

            } else {
            revert();
            }
        }


}