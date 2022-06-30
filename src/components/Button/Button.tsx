import React, { FC, ReactChildren, ReactChild }       from 'react';
import { Container } from './style'

type PanelProps = {
    value: any;
    style?: any;
    blackBg?: boolean;
    width?: string;
    height?: string;
    padding?: string;
    onClick: () => void;
};

const Button: FC<PanelProps> = ({
    value,
    style={},
    blackBg=false,
    width="165px",
    height="3.5rem",
    padding="1.5px",
    onClick
}) => 

        <Container onClick={onClick} style={style} blackBg={blackBg} width={width} height={height} padding={padding}>
            {value}
        </Container>
        
export default Button

