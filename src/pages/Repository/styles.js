import styled from 'styled-components'

export const Loading = styled.h1`
    color: #fff;
    font-size: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        text-decoration: none;
        font-size: 18px;
    }

    img{
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1{
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        font-size: 14px;
        color: #666;
        margin-top: 5px;
        line-clamp: 1.4;
        max-width: 400px;
        text-align: center;
    }

`;

export const IssuesList = styled.ul`
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        padding: 15px 10px;
        display: flex;
        border: solid 1px #eee;
        border-radius: 4px;

        & + li {
            margin-top: 10px;
        }

        img {
        height: 36px;
        width: 36px;
        border-radius: 50%;
        border: solid 2px #eee;
        }

        div {
            flex: 1;
            margin-left: 10px;

            strong {
                font-size: 16px;

                a {
                    text-decoration: none;
                    color: #333;
                    &:hover {
                        color: #7159c1;
                    }
                }

                span {
                    background: #eee;
                    color: #333;
                    border-radius: 2px;
                    font-size: 12px;
                    font-weight: 600;
                    height: 20px;
                    padding: 3px 4px;
                    margin-left: 10px;

                }
            }

            p {
                margin-top: 5px;
                font-size: 12px;
                color: #999;
            }
        }

    }
`;

export const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    button {
        background: #7159c1;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        margin-left: 5px;
        width: 80px;

        &:focus {
            background: #311b92;
        }
    }
`;

export const PagesContainer = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;  

    button {
        background: #7159c1;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        width: 40px;
        
        & + button {
            margin-left: 15px;
        }   
    }

`

export const PrevButton = styled.button.attrs(props => ({
    disabled: props.page
}))`
    &[disabled] {
            cursor: not-allowed;
            opacity: 0.7;
    }

`


export const NextButton = styled.button`
    
`