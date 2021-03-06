import { StyledCreateWrapper, StyledCreateContainer, StyledForm, StyledButton, StyledInput, StyledLabel, StyledDes } from '../../utilities/Create/StyledCreate'
import 'bootstrap/dist/css/bootstrap.min.css'
import uuid from 'react-uuid'
import axios from 'axios'
import { useState } from 'react'
import DropDown from '../../components/DropDown/DropDown'
import { useHistory } from 'react-router-dom'

const Create = ({state, handleSetState, isOpen}) => {

    const errorImg = 'https://image.freepik.com/free-vector/error-404-found-glitch-effect_8024-4.jpg';

    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    const [sizes, setSizes] = useState('');

    const createProduct = () => {
        
        const newId = uuid();
        
        if (state.title && state.description && state.price) {
            setIsPending(true);
            
            axios({
                method: 'post',
                url: 'https://fitout-shop-default-rtdb.firebaseio.com/.json',
                data: {
                  title: state.title,
                  description: state.description,
                  price: state.price,
                  url: state.url || errorImg,
                  availableSizes: sizes.split(','),
                  id: newId,
                }
            }).then(() => {
                setIsPending(false);
                history.push('/shop');
            })
        }
        else {
            alert('Please, fill in all fields (except url and size)');
        }
        
    }

    return (
        <div className="container">
            <StyledCreateWrapper className="row">
                {isOpen && <DropDown />}
                <h1>Add Product</h1>

                <StyledCreateContainer className="col-md-6">

                    <StyledForm action="">
                        <StyledLabel htmlFor="title">Title:</StyledLabel>
                        <StyledInput onChange={e => handleSetState({...state, title: e.target.value})} type="text" name="title" id="title"/>

                        <StyledLabel htmlFor="body">Description:</StyledLabel>
                        <StyledDes onChange={e => handleSetState({...state, description: e.target.value})} type="text" name="description" id="description"/>

                        <StyledLabel htmlFor="author">Price:</StyledLabel>
                        <StyledInput onChange={e => handleSetState({...state, price: e.target.value})} type="number" min="1" step="1" name="price" id="price"/>

                        <StyledLabel htmlFor="img">Image url:</StyledLabel>
                        <StyledInput onChange={e => handleSetState({...state, url: e.target.value})} type="text" name="img" id="img"/>
                        
                        <StyledLabel htmlFor="size">Available sizes (separated by one comma):</StyledLabel>
                        <StyledInput onChange={e => setSizes(e.target.value)} type="text" name="size" id="sizes"/>

                    </StyledForm>

                    {!isPending && <StyledButton onClick={createProduct} className="create-blog-btn">Add Product</StyledButton>}
                    {isPending && <StyledButton disabled onClick={createProduct} className="create-blog-btn">Adding Product...</StyledButton>}

                </StyledCreateContainer>
            </StyledCreateWrapper>
        </div>
    );
}
 
export default Create;