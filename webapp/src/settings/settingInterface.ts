import { AuthOptions } from 'aws-appsync-auth-link';

interface AuthLink {
  url: string;
  region: string;
  auth: AuthOptions;
}

interface SettingsInterface {
  graphql: AuthLink
}

export default SettingsInterface;
