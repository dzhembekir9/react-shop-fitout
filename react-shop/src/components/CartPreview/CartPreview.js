import { StyledWrapper, StyledOrder, StyledPreviewWrapper } from '../../utilities/CartPreview/StyledCartPreview'
import ItemPreview from '../../components/ItemPreview/ItemPreview'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';

const CartPreview = (props) => {

    const { cart, state, setIsCartOpen, setItemsInCart } = props;
 
    let totalPriceArr = cart.map(x => Number(x.price));

    const totalPrice = totalPriceArr.reduce((a, b) => a + b, 0);

    const obj = cart.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = 0;
        }
        acc[item.id]++;
        return acc;
    }, {});

    const arr = Object.entries(obj);

    useEffect(() => {
        setItemsInCart(Object.keys(obj).length);
    }, [cart])


    return (
        <StyledPreviewWrapper>
            <div style={{overflowY: 'scroll', maxHeight: '300px'}}>
                {arr[0] && arr.map(x => <ItemPreview state={state} key={x[0]} id={x[0]} quantity={x[1]}/>) }
            </div>
            <StyledWrapper>
                <h3>Total price: ${totalPrice.toFixed(2)}</h3>
                <Link to="/cart" onClick={() => setIsCartOpen(false)} style={{textDecoration: 'none'}}>
                    <StyledOrder>Checkout</StyledOrder>
                </Link>
            </StyledWrapper>
        </StyledPreviewWrapper>
    );
}
 
export default CartPreview;