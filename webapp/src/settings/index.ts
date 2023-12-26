import development from './development';
import staging from './staging';
import production from './production';
import SettingsInterface from './settingInterface';

function getSettings(env : String | undefined) : SettingsInterface {
  switch (env) {
    case 'development':
      return development;
    case 'staging':
      return staging;
    case 'production':
      return production;
    default:
      return development;
  }
}

const settings = getSettings(process.env.REACT_APP_ENV);

export default settings;
