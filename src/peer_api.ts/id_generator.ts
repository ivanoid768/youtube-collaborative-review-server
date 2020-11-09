import { customAlphabet, urlAlphabet, } from 'nanoid';
const nanoid = customAlphabet(urlAlphabet, 21)

export {nanoid as generateId}
