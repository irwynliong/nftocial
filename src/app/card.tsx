import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import Image from 'next/image';

export default function ProfileCard() {
    return (
      <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative w-full h-120">
          <img
            src="/card.png"
            alt="Profile Avatar"
            className="object-cover w-full h-full max-h-80 max-w-full rounded-t-lg"
          />
        </div>
  
        <div className="px-6 py-4">
          <h4 className="text-2xl font-bold text-center">gumayusi</h4>
          <small className="block text-center text-gray-500">23 stickers</small>
        </div>
      </div>
    );
  }
  