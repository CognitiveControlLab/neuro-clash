<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

- [NodeJS](https://nodejs.org/en/) (Can be installed through [NVM](https://github.com/nvm-sh/nvm))
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) 

### Installation

1. Install packages
   ```sh
   yarn
   ```
2. Copy `development.sample.ts` to `development.ts` and add the missing settings.
3. Start the app
   ```sh
   yarn start
   ```
### Testing

- Test everything 
   ```sh
   yarn test
   ```
- Lint only 
   ```sh
   yarn lint
   ```
- Unit test only
   ```sh
   yarn test:unit
   ```
- Type check only
   ```sh
   yarn type-check
   ```
### VSCode Extensions
- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)