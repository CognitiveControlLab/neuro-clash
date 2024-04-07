import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 15px;
`;

export const Progress = styled.div<{ color: String, progress: Number }>`
    width: 100%;
    background-color: whitesmoke;
    border-radius: 13px;
    padding: 3px;

    div {
        background-color: ${(props) => props.color};
        width: ${(props) => `${props.progress.toString()}%`};
        height: 20px;
        border-radius: 10px;
    }

  `;

export const Row = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;
