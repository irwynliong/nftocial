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

async function select() {
  const { data, error } = await supabase
    .from('NFTdata')
    .select('*');
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  };
};

async function insert_row() {
  const { data, error } = await supabase
    .from('NFTdata')
    .insert([
      {
        token_address: '0x9887Bc737Acd4E9e98cAAf817aEB14a874dD64db', 
        network: 'avalanche', 
        token_id:'57',
        image: "link.com",
        sticker: null,
      },
    ]).select();
  if(error) {
    console.log(error);
  } else {
    console.log(data);
  }
};
  
async function delete_matching_row(token_address: string) {
  const { data, error } = await supabase
    .from('NFTdata')
    .delete()
    .eq('token_address', token_address)
    .select();
  if(error) {
    console.log(error);
  } else {
    console.log(data);
  }
};

export { select, insert_row, delete_matching_row };
