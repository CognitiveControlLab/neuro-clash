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

interface ProgressProps {
  team1: String,
  team2: String,
  progress: Number
}

export const Progress = styled.div<ProgressProps>`
    width: 100%;
    background-color: ${(props: ProgressProps) => props.team1 as any};
    border-radius: 13px;

    div {
        background-color: ${(props: ProgressProps) => props.team2 as any};
        width: ${(props: ProgressProps) => `${props.progress.toString()}%`};
        height: 25px;
        border-radius: 10px 0px 0px 10px;
    }

  `;

export const Row = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;
