import Link from 'next/link';

type ProfileCardProps = {
  name: string;
  location: string;
  image: string;
  description: string;
};

export default function ProfileCard({ name, location, image, description }: ProfileCardProps) {
  return (
    <Link href="#" className="block bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center">
        <img src={image} alt={name} className="w-16 h-16 object-cover rounded-full mr-4" />
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-gray-600">{location}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-800">{description}</p>
    </Link>
  );
}
