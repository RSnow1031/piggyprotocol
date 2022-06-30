import styled         from 'styled-components';
import { magentaPink } from '../../utils/basicColor'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 240px;
    height: 100vh;
    background-color: ${magentaPink};
    position: fixed;
    z-index:100;
`;

export const LogoImg = styled.img`
    padding-top: 1.75rem;
    padding-bottom: 3.5rem;
    max-width: 144px;
    max-height: 200px;
    align-self: center;

`

export const MenuItemContainer = styled.div`
    display: flex;
    padding-left: 1.5rem;
    padding-top: 15px;
    padding-bottom: 15px;
    cursor: pointer;
    align-items: center;
    &:hover {
        background-color: #4D193C;
        color: #D15480;
    }
`

export const MenuImg = styled.img`
    padding-right: 10px;

`

export const MenuText = styled.div`
    color: white;
    font-size: 16px;
    font-weight: 600;
`
