import styled, { keyframes, css } from 'styled-components'

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: ${props => props.error ? '1px solid red' : '1px solid #eee'};
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;

    }
`;

//keyframes do styled-comp servem tbm pra fazer animacoes, recebe um estado inicial (from) e um estado final (to)
//nesse exemplo vai começar parado ( CSS transform: rotate(0deg) ) e vai terminar girando 360 graus ( CSS transform: rotate(360deg) )
const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    
    to {
        transform: rotate(360deg)
    }
`;

//acessando as props dentro de attrs; colocando o valor da prop html disabled de acordo com o props.loading repassado
export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading
}))`
    background: #7159c1;
    border: 0;
    padding: 0 15px;
    margin-left: 10px;
    border-radius: 4;
    display: flex;
    align-items: center;
    justify-content: center;

    /**& se refere ao proprio elemento, serve para acessar seletores como hover, disabled, etc  */
    &[disabled] {
        cursor: not-allowed;
        opacity: 0.6; 
    }

    /*como o q será renderizado condicionalmente atraves da props.loading será um children (svg, q representa o icone)
      é preciso usar o css'' do styled component, colodando dentro dele o que sera renderizado; nesse caso é uma animacao (a q foi criada
      anteriormente usando keyframes) com seus dados   */
    ${props => props.loading && css`
        svg {
            animation: ${rotate} 2s linear infinite;
        }
    ` }
`;

export const List = styled.ul`
    list-style: none;
    margin-top: 30px;

    li {
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        a {
            color: #715ac1;
            text-decoration: none;
        }

        /** indica estilizacao para todos os elementos LI, menos o primeiro */
        & + li {
            border-top: 1px solid #333;
        }
    }
`;

export const ClearButton = styled.button.attrs({
    type: 'button'
})`

    background: #e53935;
    border: 0;
    padding: 0 15px;
    margin-left: 10px;
    border-radius: 4;
    display: flex;
    align-items: center;
    justify-content: center;

`;