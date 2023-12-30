import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const GENERATE_IMAGE = gql`
  mutation generateImage($prompt: String) {
    generateImage(prompt: $prompt) {
      url
    }
  }
`;
