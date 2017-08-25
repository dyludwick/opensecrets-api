import 'babel-polyfill';
import dotenv from 'dotenv';

// config dotenv
dotenv.config();

// Check for api key
const apikey = process.env.OPENSECRETS_API_KEY;
!apikey ? console.log('Warning: OpenSecrets API key required') : console.log('api key found');
