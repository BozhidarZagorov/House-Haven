import { Link } from "react-router";
import { useTranslation } from "react-i18next";



export default function GalleryItem({pictures}) {
    const { t } = useTranslation()

    return (
        <Link key={pictures.id} to={`/gallery/${pictures.id}`} className="group">
            <img
                alt={'Gallery pic'}
                src={pictures.imgUrl}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
            />
            <p className="mt-1 text-lg font-medium text-gray-900">{t("galleryItem.likes")}: {pictures.likes}</p>
        </Link>
    );
}
