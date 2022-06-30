import styled         from 'styled-components';
import { magentaPink, cylindrical, primary, blueMagenta, brightPink } from '../../utils/basicColor';

export const Container = styled.button<{
    blackBg: boolean;
    width: string;
    height: string;
    padding: string;
  }>`
    border-color: ${primary};
    color: white;
    display: flex;
    background: ${props => props.blackBg ? 'black' : 'linear-gradient(90deg,#cc567f,#394b5a)'};
    transition: all .3s ease-in-out;
    font-weight: 600;
    padding: ${props => props.padding};
    border-radius: 100px;
    overflow: hidden;
    width: ${props => props.width};
    height: ${props => props.height};
    justify-content: center;
    align-items: center;
    position: relative;
    line-height: 1.5rem;
    cursor: pointer;
    &:hover {
        background: linear-gradient(270deg,#cc567f,#394b5a);
    }
    margin: 5px;
    border-width: 0px;
`;
export default Container
