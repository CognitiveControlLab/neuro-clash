import { AUTH_TYPE } from 'aws-appsync-auth-link';
import SettingsInterface from './settingInterface';

const settings : SettingsInterface = {
  graphql: {
    url: 'your_graphql_url',
    region: 'your_aws_region',
    auth: {
      type: AUTH_TYPE.API_KEY,
      apiKey: 'your_api_key',
    },
  },
};

export default settings;
