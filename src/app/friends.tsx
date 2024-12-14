import { QrReader } from 'react-qr-reader';
import Image from "next/image";
import { act, useState, useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@nextui-org/react";
type Friend = {
    id: number;
    friend_id: number;
    friend_name: string;
}

const PLACEHOLDER_NAME = "Irwyn Liong";
const PLACEHOLDER_FRIEND_NAME = "Shane Yeo";

export default function Friends(){
    const [friends, setFriends] = useState<Friend[]>([]);
    
    const addFriend = (friend: Friend) => {
        setFriends([...friends, friend]);
    };

    const removeFriend = (id: number) => {
        setFriends(friends.filter(friend => friend.id !== id));
    };

    return (
        <main className="pt-20 pb-10 flex items-center justify-center container max-w-screen-lg mx-auto over">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-center text-gray-500">Friends</h1>
                <AddFriend onAddFriend={addFriend} />
                <div className="flex flex-col gap-2 mt-4">
                    {friends.map((friend) => (
                        <div key={friend.id} className="flex items-center justify-between w-full p-4 bg-black text-white group">
                            <p>{friend.friend_name}</p>
                            <Button 
                                color="danger" 
                                variant="light" 
                                onPress={() => removeFriend(friend.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}


function AddFriend({ onAddFriend }: { onAddFriend: (friend: Friend) => void }){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [friendName, setFriendName] = useState("");
    const [tempCode, setTempCode] = useState("");

    const handleAddFriend = () => {
        const newFriend: Friend = {
            id: Date.now(),
            friend_id: Date.now(),
            friend_name: friendName,
        };
        onAddFriend(newFriend);
        setFriendName("");
        setTempCode("");
        onOpenChange();
    };

    const generateTempCode = () => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        setTempCode(code);
    };

    useEffect(() => {
        generateTempCode();
    }, []);

    return (
      <>
        <Button onPress={onOpen}>Add Friend</Button>
        <Modal
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Add Friend</ModalHeader>
                <ModalBody>
                  <p>Temporary Code: {tempCode}</p>
                  <input
                    type="text"
                    value={friendName}
                    onChange={(e) => setFriendName(e.target.value)}
                    placeholder="Enter friend's code"
                    className="w-full p-2 border border-gray-300 rounded mt-4"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={handleAddFriend}>
                    Add
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
}

function EncodeName
