import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { doc, getDoc, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore'
import { db } from '/public/config/firebaseinit'
import { useAuth } from '/public/ctx/FirebaseAuth'
import { useNavigate } from 'react-router'

export default function GalleryPicture () {
    const { pictureId } = useParams();
    const [picture, setPicture] = useState({})
    const [loading, setLoading] = useState(true)
    const [hasLiked, setHasLiked] = useState(false)
    const { user, isAuthenticated } = useAuth(); //! auth ctx

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPicture = async () => {
            const docRef = doc(db, "gallery", pictureId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setPicture(docSnap.data());
            } else {
                console.log("No such document!");
            }
            setLoading(false);
        };

        fetchPicture();
    }, [pictureId]);

    useEffect(() => {
        if (isAuthenticated && user) {
            
            const checkIfLiked = () => {
                if (picture.likedByUserId && picture.likedByUserId.includes(user.uid)) {
                    setHasLiked(true);
                }
            };

            checkIfLiked();
        }
    }, [picture, isAuthenticated, user]);


    const handleLike = async () => {
        if (!isAuthenticated){
            navigate('/login')
            return alert('You must be logged in to like this picture.');
        }
        if(hasLiked) return; // Prevent like if not auth or already liked

        const docRef = doc(db, "gallery", pictureId);
        await updateDoc(docRef, {
            likes: picture.likes + 1,
            likedByUserId: arrayUnion(user.uid)
        });

        setPicture((prevState) => ({
            ...prevState,
            likes: prevState.likes + 1
        }));

        setHasLiked(true); // Set state to prevent further likes
    }

    // const handleEdit = () => {
    //     if (isAuthenticated) {
    //         navigate(`/gallery/${pictureId}/edit`);
    //     }else{
    //         navigate('/login')
    //         return alert('You must be logged in to edit this picture.')
    //     }
    // };
    //todo add alert with yes or no for deletion
    const handleDelete = async () => {
        if (!user || !isAuthenticated){
            navigate('/login')
            return alert('You must be logged in to delete this picture.');
        }
        if (picture?.createdByUserId !== user.uid) return alert('You are not authorized to delete this picture.');
    
        try {
            const docRef = doc(db, "gallery", pictureId);
            await deleteDoc(docRef);
            navigate('/gallery'); // Redirect after deletion
        } catch (error) {
            setError('Error deleting picture: ' + error.message);
        }
    };

    if (loading) return <p>Loading...</p>;// add proper loading

    const isCreator = isAuthenticated && user?.uid === picture?.createdByUserId;

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
                <div className="w-full max-w-4xl p-6">
                {/* picture info */}
                <div className="flex flex-col items-center">

                    {/* img */}
                    <div className="w-full max-w-3xl lg:mt-20">
                        <h2 className="sr-only">picture information</h2>

                        <img
                            alt={'picture'}
                            src={picture.imgUrl}
                            className="w-full h-auto rounded-lg object-cover shadow-lg"
                        />
                        
                        <div className="mt-6">
                            <h3 className="sr-only">Likes</h3>
                            <div className="flex justify-center">
                            <p className="text-lg font-medium text-indigo-600">{picture.likes} Likes</p>
                            </div>

                        {!hasLiked && (
                            <button
                                type="button"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                                onClick={handleLike}
                            >
                                Like
                            </button>
                         )}
                        </div>

                        <form className="mt-10">

                            {isCreator && (
                                <>
                                    {/* <button
                                        type="button"
                                        className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-500 px-8 py-3 text-base font-medium text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                                        onClick={handleEdit}
                                    >
                                        Edit picture
                                    </button> */}

                                    <button
                                        type="button"
                                        className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        onClick={handleDelete}
                                    >
                                        Delete Picture
                                    </button>
                                </>
                            )}
                        </form>
                    </div>

                    {/* <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16"> */}
                        {/* Category */}
                        {/* <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Category</h2>
                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">{wobbler.category || 'No category available'}</p>
                            </div>
                        </div> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}
