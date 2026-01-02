import { useEffect, useState } from 'react'
import { useParams, useNavigate} from 'react-router'
import { doc, getDoc} from 'firebase/firestore'
import { db } from '/public/config/firebaseinit'
import { useAuth } from '/public/ctx/FirebaseAuth'
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ApartmentDetails() {
  const [showPhone, setShowPhone] = useState(false);
  const { apartmentId } = useParams();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user, isAuthenticated } = useAuth();
  const [totalImages, setTotalImages] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const imagesPerPage = 1;

    const navigate = useNavigate()

    useEffect(() => {
    const fetchApartment = async () => {
      try {
        const docRef = doc(db, "apartments", apartmentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setApartment(data);
          setTotalImages(data.imgsUrl?.length || 0);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching apartment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApartment();
  }, [apartmentId]);


    const handlePhoneBtn = () => {
        if (isAuthenticated) {
            setShowPhone(!showPhone);
        } else {
            navigate("/login"); // Redirect to login if not auth
            return alert('You must be logged in to access the phone number.');
        }
    };

    const handlePrev = () => {
    if (!totalImages) return;
    setStartIndex((prev) =>
      prev - imagesPerPage < 0
        ? (totalImages - imagesPerPage + totalImages) % totalImages
        : prev - imagesPerPage
    );
  };

    const handleNext = () => {
    if (!totalImages) return;
    setStartIndex((prev) => (prev + imagesPerPage) % totalImages);
  };

   // Avoid running until apartment and imgsUrl exist
  const visibleImages =
    apartment?.imgsUrl?.length > 0
      ? Array.from({ length: Math.min(imagesPerPage, totalImages) }, (_, i) => {
          const index = (startIndex + i) % totalImages;
          return apartment.imgsUrl[index];
        })
      : [];


    if (loading) return <div className="flex items-center justify-center min-h-screen">
                           <span className="flex justify-center mt-5">
                               <svg className="spinner" />
                           </span>
                        </div>

    return (
        <div className="bg-gray-200">
            <div className="pt-6">
                

         {/* Image slider */}
        <div className="relative mx-auto mt-20 max-w-4xl px-4 select-none">
            <div className="overflow-hidden rounded-lg">
              {visibleImages.length > 0 && (
                <img
                  src={visibleImages[0]} // show only the first image in the visible set
                  alt={`${apartment.name} ${startIndex + 1}`}
                  className="w-full rounded-lg object-cover aspect-video transition-transform duration-500 hover:scale-105"
                />
              )}
            </div>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -left-6 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute top-1/2 -right-6 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Optional total images indicator */}
        <p className="text-center text-gray-600 mt-4">
            Image {totalImages > 0 ? (startIndex % totalImages) + 1 : 0} of {totalImages}
        </p>     

                {/* Apartment info */}
                <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{apartment.name}</h1>
                    </div>

                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <div className="mt-10">
                                <button
                                    type="button"
                                    className="mt-10 flex w-full items-center justify-center btn-orange"
                                    onClick={handlePhoneBtn}
                                >
                                {showPhone ? "Hide Phone Number" : "Give us a call"}
                                </button>

                                {isAuthenticated && showPhone && (
                                    <p className="mt-4 text-center text-lg font-medium text-gray-900">
                                        📞 {apartment.phone}
                                    </p>
                                )}
                            </div>
                        </div>
                    {/* img */}
                    {/* <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Apartment information</h2>

                        <img
                            alt={apartment.name}
                            src={apartment.imgUrl}
                            className="aspect-4/5 object-cover sm:rounded-lg lg:aspect-auto"
                        />
                    </div> */}

                        
                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
                        {/* Details */}
                        <div>
                            <h3 className="sr-only">Details</h3>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{apartment.details || 'No details available.'}</p>
                            </div>
                        </div>

                        {/* Highlights */}
                        {/* <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    <li className="text-gray-400">
                                        <span className="text-gray-600">Handcrafted design</span>
                                    </li>
                                    <li className="text-gray-400">
                                        <span className="text-gray-600">High-quality materials</span>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
