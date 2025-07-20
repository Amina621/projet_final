import React, { useState, useEffect } from 'react';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';

const AddRoom = () => {
  const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null });
  const [previewUrls, setPreviewUrls] = useState({});

  const [inputs, setInputs] = useState({
    roomType: '',
    PricePerNight: 0,
    amenities: {
      'Free Wifi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false,
    }
  });

  // Nettoyer les URLs des images
  useEffect(() => {
    const urls = {};
    Object.keys(images).forEach(key => {
      if (images[key]) {
        urls[key] = URL.createObjectURL(images[key]);
      }
    });
    setPreviewUrls(urls);
    return () => {
      Object.values(urls).forEach(url => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!inputs.roomType || inputs.PricePerNight <= 0) {
      alert("Please enter a valid room type and price.");
      return;
    }
    const hasImage = Object.values(images).some(img => img);
    if (!hasImage) {
      alert("Please upload at least one image.");
      return;
    }

    // Construction du FormData
    const formData = new FormData();
    formData.append('roomType', inputs.roomType);
    formData.append('PricePerNight', parseFloat(inputs.PricePerNight));

    Object.entries(inputs.amenities).forEach(([key, value]) => {
      formData.append(`amenities[${key}]`, value);
    });

    Object.keys(images).forEach((key, i) => {
      if (images[key]) {
        formData.append(`image${i + 1}`, images[key]);
      }
    });

    // Envoi simulé (remplacer par axios.post ou fetch)
    console.log('Sending room data...', inputs, images);

    alert("Room added successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Title
        align='left'
        font='outfit'
        title='Add Room'
        subTitle='Fill in the details carefully and accurate room details, 
        pricing, and amenities to enhance the user booking experience'
      />

      {/* Upload Images */}
      <p className='text-gray-800 mt-10'>Images</p>
      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage-${key}`} key={key}>
            <img
              className='max-h-32 cursor-pointer opacity-80 border'
              src={images[key] ? previewUrls[key] : assets.uploadArea}
              alt=""
            />
            <input
              type="file"
              accept='image/*'
              id={`roomImage-${key}`}
              hidden
              onChange={e => setImages({ ...images, [key]: e.target.files[0] })}
            />
          </label>
        ))}
      </div>

      {/* Room Type & Price */}
      <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
        <div className='flex-1 max-w-48'>
          <p className='text-gray-800 mt-4'>Room Type</p>
          <select
            value={inputs.roomType}
            onChange={e => setInputs({ ...inputs, roomType: e.target.value })}
            className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>
        <div>
          <p className='mt-4 text-gray-800'>Price <span className='text-xs'>/night</span></p>
          <input
            type="number"
            placeholder='0'
            className='border border-gray-300 mt-1 rounded p-2 w-24'
            value={inputs.PricePerNight}
            onChange={e => setInputs({ ...inputs, PricePerNight: parseFloat(e.target.value) })}
          />
        </div>
      </div>

      {/* Amenities */}
      <p className='text-gray-800 mt-4'>Amenities</p>
      <div className='flex flex-col flex-wrap mt-1 text-gray-600 max-w-sm'>
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <div className='flex items-center gap-2 my-1' key={index}>
            <input
              type="checkbox"
              id={`amenities-${index}`}
              checked={inputs.amenities[amenity]}
              onChange={() => {
                const updatedAmenities = {
                  ...inputs.amenities,
                  [amenity]: !inputs.amenities[amenity],
                };
                setInputs({ ...inputs, amenities: updatedAmenities });
              }}
            />
            <label htmlFor={`amenities-${index}`}>{amenity}</label>
          </div>
        ))}
      </div>

      {/* Submit */}
      <button type='submit' className='bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer'>
        Add Room
      </button>
    </form>
  );
};

export default AddRoom;
