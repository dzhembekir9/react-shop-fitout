import DropDown from '../../components/DropDown/DropDown'
import { StyledCart, StyledCheckout, StyledWrapper, StyledCartWrapper, StyledCartContainer, StyledImgWrapper, StyledCodeWrapper, 
    StyledCodeContainer, StyledCheckoutContainer, StyledPriceWrapper, StyledApplyBtn, StyledCheckoutBtn, StyledRemove } 
from '../../utilities/Cart/StyledCart'
import 'bootstrap/dist/css/bootstrap.min.css'

const Cart = (props) => {

    const { isOpen, cart, state, setCart } = props;

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
    const items = arr.map(x => Object.values(state).filter(y => x[0] === y.id));

    const handleRemoveFromCart = (id) => {
        const filtered = cart.filter(x => x.id !== id);
        setCart(filtered);
    }

    return (

        <div className="container" style={{marginTop: '20px'}}>
            {isOpen && <DropDown />}
            <h1>My cart</h1>
            {items.length > 0 ? 
            <StyledWrapper>
                <StyledCartWrapper className="col-lg-12">
                    {items.map((x,index) => x.map(item => (
                        <StyledCart key={item.id}>
                            <StyledCartContainer>
                                <StyledImgWrapper>
                                    <img style={{height: '200px', width: 'auto', backgroundColor: 'white'}} src={item.url} alt="item"/>
                                </StyledImgWrapper>
                                <div style={{margin: '20px'}}>
                                    <h2>{item.title}</h2>
                                    <p>Product id: {item.id}</p>   
                                    <h4>Quantity: {arr[index][1]}</h4>
                                    <StyledRemove onClick={() => {
                                        handleRemoveFromCart(arr[index][0]);
                                    }}>Remove from cart</StyledRemove>
                                </div>
                            </StyledCartContainer>
                            <p style={{fontSize: '20px', fontWeight: 'bold'}}>${item.price}</p>
                        </StyledCart>
                    )))}
                </StyledCartWrapper>
                <StyledCheckout>
                    <StyledCodeWrapper>
                        <h2>You have a promo code?</h2>
                        <StyledCodeContainer>
                            <label htmlFor="promo-code">Enter your promo code here:</label>
                            <input type="text" name="promo-code" id="promo-code"/>
                            <StyledApplyBtn>Apply promo code</StyledApplyBtn>
                        </StyledCodeContainer>
                    </StyledCodeWrapper>
                    <StyledCheckoutContainer>
                        <StyledPriceWrapper>
                            <h3>Total price: </h3>
                            <p style={{fontSize: '18px', marginLeft: '10px'}}>${totalPrice.toFixed(2)}</p>
                        </StyledPriceWrapper>
                        <StyledCheckoutBtn>Continue to checkout</StyledCheckoutBtn>
                    </StyledCheckoutContainer>
                </StyledCheckout>
            </StyledWrapper> : <h1>No items in shopping cart</h1>}
        </div>
    );
}
 
export default Cart;