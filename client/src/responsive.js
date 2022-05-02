import { css } from "styled-components";

export const mobile = (props) => {
   console.log(props);
    return css`
        @media only screen and (max-width: 640px){
            ${props}
        }
    `;
};

