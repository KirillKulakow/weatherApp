import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

let myEnv = dotenv.config()
export default dotenvExpand(myEnv)