import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
const dotenv = require('dotenv');
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_API = process.env.SUPABASE_API as string;

const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_API
);


async function main() {
    const { data, error } = await supabase.from('NFTdata').select('*');
    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
}
  
main();
