export interface Database {
    public: {
        Tables: {
            NFTdata: {
                Row: {
                    token_address: string;
                    network: string;
                    token_id: string;
                    image: string;
                    sticker: string;
                }
                Insert: {
                    token_address: string;
                    network: string;
                    token_id: string;
                    image: string;
                    sticker: string;
                }
                Update: {
                    token_address: string;
                    network: string;
                    token_id: string;
                    image: string;
                    sticker: string;
                }
            }
        }
    }
};