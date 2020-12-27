import React from 'react';
import styled from 'styled-components';

const Loader = () => {
    return (
        <Container>
            <First/>
            <Second/>
            <Three/>
            <Four/>
        </Container>
    )
}

export default Loader

const Container = styled.div`
    display: flex;
	justify-content: center;
	align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const Dot = styled.div`
    width: 3vw;
	height: 3vw;
	border-radius: 100%;
	margin: 2vw;
	background-image: linear-gradient(145deg, rgba(255,255,255,0.5) 0%, rgba(0,0,0,0) 100%);
	animation: bounce 1.5s 0.5s linear infinite;
    @keyframes bounce {
        0%, 50%, 100% {
            transform: scale(1);
            filter: blur(0px);
        }
        25% {
            transform: scale(0.6);
            filter: blur(0px);
        }
        75% {
            filter: blur(0px);
            transform: scale(1.4);
        }
    }
`
const First = styled(Dot)`
    background-color: #feb60a;
`
const Second = styled(Dot)`
    background-color: var(--red)ff0062;
	animation-delay: 0.1s;
`
const Three = styled(Dot)`
    background-color: #00dbf9;
	animation-delay: 0.2s;
`
const Four = styled(Dot)`
    background-color: #da00f7;
	animation-delay: 0.3s;
`