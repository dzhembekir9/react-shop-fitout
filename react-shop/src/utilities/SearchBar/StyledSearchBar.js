import styled from 'styled-components'

export const StyledSearchBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    @media (max-width: 1200px) {
        position: absolute;
        top: 150px;
        width: 100%;
        left: 0; 
    }
`;

export const StyledSearchBar = styled.input`
    border: 1px solid #E1E1E1;
    width: 100%;
    padding: 0 20px;
    font-size: 20px;
    border-radius: 50px;
    @media (max-width: 1200px) {
        border-radius: 0;   
    }
`;

export const StyledSearchResultsWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 36%;
    width: 25%;
    top: 96px;
    z-index: 1;
    background-color: white;
    @media (max-width: 1200px) {
        top: 41px;
        width: 100%;
        left: 0;
    }
`;

export const StyledSearchResultsContainer = styled.div`
    color: black;
    border-top: 0px;
    padding: 10px;
    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }
    border: 1px solid gainsboro;
`;