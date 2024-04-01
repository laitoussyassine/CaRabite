import service1 from '../images/homePage/SVG.svg'
import card1 from '../images/homePage/cardIcon.svg'
import card2 from '../images/homePage/card2.svg'
import card3 from '../images/homePage/card3.svg'
import AutoPlaySlider from '../components/sliderHome/AutoPlaySlider.jsx';
import SearchComponent from '../components/search/SearchComponent.jsx';
const Home = () => {


  return (
    <>
      <div>
        <AutoPlaySlider />
        <SearchComponent />
        <div className='mt-48 mb-20 mx-20 flex flex-col gap-10 '>
          <div className=''>
            <h2 className='flex justify-center gap-1 items-center text-3xl mb-5'>Why<span className='font-semibold'> Choose Us</span></h2>
            <p className='border-b-4	border-gray-400 w-12 mx-auto'></p>
          </div>
          <div className='grid grid-cols-9'>
            <div className='lg:col-span-3 col-span-full bg-cardBg px-10 text-center py-20 flex flex-col gap-5 my-5 hover:bg-cardHoverBg hover:duration-500'>
              <div className='flex justify-center'>
                <img src={service1} alt="" />
              </div>
              <h3 className='text-xl text-white font-semibold'>Expert Mechanics</h3>
              <p className='text-textCardColor font-semibold'>Most of the vehicles get damaged just because of maintenance neglect you take.</p>
            </div>
            <div className='lg:col-span-3 col-span-full bg-cardHoverBg px-10 text-center py-20 flex flex-col gap-5
            shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]
          '>
              <div className='flex justify-center'>
                <img src={service1} alt="" />
              </div>
              <h3 className='text-xl text-white font-semibold'>Reasonable Price</h3>
              <p className='text-textCardColor font-semibold'>Receiving offers through Autobutler guarantees your certainty your car. fixed if the mechanic.</p>
            </div>
            <div className='lg:col-span-3 col-span-full bg-cardBg px-10 text-center py-20 flex flex-col gap-5 my-5 hover:bg-cardHoverBg hover:duration-500'>
              <div className='flex justify-center'>
                <img src={service1} alt="" />
              </div>
              <h3 className='text-xl text-white font-semibold'>Fast Feature Delivery</h3>
              <p className='text-textCardColor font-semibold'>If the mechanic discovers other issues with your car while it's in the garage he will call.</p>
            </div>
          </div>
        </div>
        <div className='mx-20 flex flex-col gap-10 my-32'>
          <div className=''>
            <h2 className='flex justify-center gap-1 items-center text-3xl mb-5'>How<span className='font-semibold'>We Work</span></h2>
            <p className='border-b-4	border-gray-400 w-12 mx-auto'></p>
          </div>
          <div className='grid grid-cols-9 text-center'>
            <div className='lg:col-span-3 col-span-full flex flex-col gap-5'>
              <div className='flex justify-center'>
                <img src={card1} alt="" />
              </div>
              <h4 className='text-xl text-cardHoverBg font-semibold'>Choose your Repairs</h4>
              <p className='font-medium text-gray-600'>Annual servicing and is recom mended everytime miles or every 12 months.</p>
            </div>
            <div className='lg:col-span-3 col-span-full flex flex-col gap-5'>
              <div className='flex justify-center'>
                <img src={card2} alt="" />
              </div>
              <h4 className='text-xl text-cardHoverBg font-semibold'>Choose your Repairs</h4>
              <p className='font-medium text-gray-600'>Annual servicing and is recom mended everytime miles or every 12 months.</p>
            </div>
            <div className='lg:col-span-3 col-span-full flex flex-col gap-5'>
              <div className='flex justify-center'>
                <img src={card3} alt="" />
              </div>
              <h4 className='text-xl text-cardHoverBg font-semibold'>Choose your Repairs</h4>
              <p className='font-medium text-gray-600'>Annual servicing and is recom mended everytime miles or every 12 months.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
