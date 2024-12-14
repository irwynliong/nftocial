use ink_lang as ink;

#[ink::contract]
mod marketplace {
    use ink_storage::{
        collections::{HashMap as StorageHashMap, Vec as StorageVec},
        lazy::Lazy,
    }

    #[ink(storage)]
    pub struct NFTmarketplace {
        owner: AccountId,
        token: StorageVec<Token>,
        balances: StorageHashMap<AccountId, Balance>,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct Token {
        id: TokenId,
        owner: AccountId,
    }

    pub type TokenId = u64;
    pub type AccountId = [u8; 32];
    pub type Balance = u64;

    #[ink(event)]
    pub struct Transfer {
        #[ink(topic)]
        from: Option<AccountId>,
        #[ink(topic)]
        to: Option<AccountId>,
        token_id: TokenId,
    }

    impl NFTMarketplace {
        #[ink(constructor)]
        pub fn new() -> Self {
            let caller = Self::env().caller();
            Self {
                owner: caller,
                token: StorageVec::new(),
                balances: StorageHashMap::new(),
            }
        }

        #[ink(message)]
        pub fn transfer(&mut self, to: AccountId, token_id: TokenId) -> bool {
            let caller = self.env().caller();
            let caller_balance = self.balances.get(&caller).unwrap_or(&mut 0);
            let to_balance = self.balances.get(&to).unwrap_or(&mut 0);
            assert!(caller_balance > 0, "Caller has no token");
            assert!(self.tokens[token_id as usize].owner == caller, 
                "Caller is not the owner of the token");
            *caller_balance -= 1;
            self.balances
                .entry(to)
                .and_modify(|b| *b += 1)
                .or_insert(1);

            self.tokens[token_id as usize].owner = to;
            
            self.env().emit_event(Transfer {
                from: Some(caller),
                to: Some(to),
                token_id,
            });
        }

        #[ink(message)]
        pub fn mint(&mut self, to: AccountId) -> TokenId {
            let caller = self.env().caller();
            assert_eq!(caller, self.owner, "Only owner can mint");

            let token_id = self.token.len() as TokenId;
            self.token.push(Token {
                id: token_id,
                owner: to,
            });
            self.balances.insert(to, self.balances.get(&to).unwrap_or(0) + 1);
            self.env().emit_event(Transfer {
                from: None,
                to: Some(to),
                token_id,
            });
            token_id
        }

        #[ink(message)]
        pub fn balance_of(&self, owner: AccountId) -> Balance {
            self.balances.get(&owner).unwrap_or(&0)
        }
    }
}