import { generateUsername } from 'friendly-username-generator';

const storageKey = 'nero-clash-user-id';

function getOrCreateUserName() : string {
  if (localStorage.getItem(storageKey)) {
    return localStorage.getItem(storageKey) as string;
  }
  const userId = generateUsername({
    useRandomNumber: false,
  });
  localStorage.setItem(storageKey, userId);
  return userId;
}

export default getOrCreateUserName;
