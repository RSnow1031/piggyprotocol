import styled         from 'styled-components';
import { magentaPink } from '../../utils/basicColor';

export const Container = styled.div`
    width: 80%;
    margin: auto;
    // height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Item = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 200px;
    margin: 0 auto;
`

export const ItemTitle = styled.div`
    font-weight: 600;
    line-height: 24px;
    font-size: 16px;
    color: rgba(244,215,225, 1);
    text-align: center
`

export const ItemExtra = styled.div`
    line-height: 2rem;
    font-weight: 900;
    font-size: 1.5rem;
    text-align: center;
    color: rgba(209,84,128)
`

export const ItemContent = styled.div`
    line-height: 32px;
    font-weight: 600;
    font-size: 1rem;
    text-align: center;
    color: white;
`

export const VerticalItems = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`

export const VerticalItem = styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;

`

export const VerticalItemTitle = styled.div`
    font-weight: 600;
    line-height: 24px;
    font-size: 16px;
    color: rgba(244,215,225, 1);
    float: left;
`

export const VerticalItemContent = styled.div`
    line-height: 32px;
    font-weight: 600;
    font-size: 24px;
    float: right;
    color: white;
`

export const ButtonWrapper = styled.div`
    display: flex;
    position: absolute;
    right: 10px;
    top: 10px;
`

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    padding-right: 20px;
    min-width: 190px;
`

export const InputTitle = styled.div`
    font-weight: 600;
    line-height: 24px;
    font-size: 16px;
    padding-bottom: 10px;
    color: rgba(244,215,225, 1);
    text-align: left;
`

export const Input = styled.input`
    color: rgba(196,196,196,1);
    border-radius: 12px;
    height: 35px;
    line-height: 60px;
    padding-left: 20px;
    // border-color: rgba(229,231,235,1);
    background-color: rgba(61,20,48,1);
    border: 0 solid;
`

export const Range = styled.input`
    border-color: rgba(16,185,129,1);
    appearance: none;
    background: linear-gradient(270deg,#d15480,#374757 98.6%);
    cursor: pointer;
    width: 100%;
    border-radius: 12px;
    line-height: 60px;
    height: 0.5rem;
`
