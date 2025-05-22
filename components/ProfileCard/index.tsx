import Link from 'next/link';
import { UserType } from '@/app/type';
import Image from 'next/image';

export default function ProfileCard({ user }: { user: UserType }) {
  const { id, name, image, currentCountry, deploymentCountry, currentPrefecture, bio } = user;

  return (
    <Link href={`/${id}`} className="block rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="p-6">
        <div className="mb-4 flex items-center">
          <Image
            width={64}
            height={64}
            src={image || '/images/default-avatar.png'}
            alt={name || ''}
            className="rounded-full border-2 border-[#f1f6f9] object-cover "
          />
          <div className="ml-4">
            <h2 className="text-xl font-bold">{name}</h2>
            {currentCountry?.name && (
              <p className="text-sm text-gray-600">
                現住所：
                <span className="font-medium ">
                  {currentCountry.name} {currentPrefecture?.name}
                </span>
              </p>
            )}
            {deploymentCountry?.name && (
              <p className="text-sm text-gray-600">
                派遣国：
                <span className="font-medium">{deploymentCountry.name}</span>
              </p>
            )}
          </div>
        </div>
        {bio && <p className="line-clamp-3 text-gray-700">{bio}</p>}
      </div>
    </Link>
  );
}
