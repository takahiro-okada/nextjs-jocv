import Link from 'next/link';
import { UserType } from '@/app/type';
import Image from 'next/image';

export default function ProfileCard(user: UserType) {
  const { id, name, image, currentAddress, deploymentLocation, bio } = user;
  return (
    <Link href={`/${id}`} passHref className="mb-4 block rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center">
        <Image
          width={200}
          height={200}
          src={`http://localhost:3000/images/${image}`}
          alt={name}
          className="mr-4 size-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-gray-600">
            現住所：{currentAddress.country.name} {currentAddress.prefecture?.name}
          </p>
          <p className="text-gray-600">派遣国：{deploymentLocation.country.name}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-800">{bio}</p>
    </Link>
  );
}
