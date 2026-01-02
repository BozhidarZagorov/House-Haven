import { Link } from "react-router";

export default function GalleryItem({
    pictures,
}) {
    return (
        <Link key={pictures.id} to={`/gallery/${pictures.id}`} className="group">
            <img
                alt={'Gallery pic'}
                src={pictures.imgUrl}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
            />
            <p className="mt-1 text-lg font-medium text-gray-900">Likes: {pictures.likes}</p>
        </Link>
    );
}
