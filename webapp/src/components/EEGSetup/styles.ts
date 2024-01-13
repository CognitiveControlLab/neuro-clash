import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import VideogameAssetOffIcon from '@mui/icons-material/VideogameAssetOff';
import styled from 'styled-components';

export const EEGConnectedIcon = styled(VideogameAssetIcon)`
    font-size: 200px;
`;

export const EEGDisconnectedIcon = styled(VideogameAssetOffIcon)`
    font-size: 200px;
`;

export const Title = styled.div`
    font-size: 20px;
`;

export const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const EEGContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: right;
    margin-bottom: 10px;
`;

export const Header = styled.div`
    display: flex;
    margin: 10px 0px 5px 10px;
`;

export const DeviceName = styled.div`
    font-size: 20px;
    margin-bottom: 20px;
`;
