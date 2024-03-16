import React from 'react'
import formImage from '../../assets/bloodbag.png';
import mainImage from '../../assets/main_image.jpg';

function DonorHome() {
  return (
    <div className="container mx-auto flex items-center justify-center">
    {/* Left side with card view */}
    <div className="flex flex-col justify-center items-center w-1/3">
      <div className="bg-white p-4 ml-5 rounded-lg shadow-md mb-4 items-center justify-center">
      <div className="flex items-center justify-center">
<img src={formImage} alt="Main" className="w-24 h-24 mb-5" /> 
</div>

        {/* Vision text */}
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Our Vision</h2>
          <p className="text-gray-700 mb-10">To establish a nationally coordinated system that ensures high-quality blood services, setting a global standard for excellence and reliability.</p>
        </div>
<div className='grid grid-cols-2 md:grid-cols-2 gap-2 '>
        {/* First red button with margin-bottom */}
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg ">As Organizer</button>
        
        {/* Second red button */}
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg">As Donor</button>
        </div>
      </div>
    </div>
    
    {/* Right side with main image */}
    <div className="w-2/3">
     <img src={mainImage} alt="Main" className="w-full" /> 
     
      
    </div>
  </div>
  )
}

export default DonorHome