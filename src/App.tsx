import { useState, useRef } from 'react';
import { HiOutlineUpload, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';

// Define what an "Image Card" looks like in our data
interface GalleryItem {
  id: string;
  imageUrl: string;
  fileName: string;
}

export default function App() {
  // State to hold our list of gallery cards
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  // 1. Function to add a new card with default settings
  const addImageCard = () => {
    const newItem: GalleryItem = {
      id: crypto.randomUUID(), // Unique ID for each card
      imageUrl: './gallery.png', // Default image path
      fileName: 'No file selected'
    };
    setGallery([...gallery, newItem]);
  };

  // 2. Function to delete a specific card
  const deleteImageCard = (id: string) => {
    setGallery(gallery.filter(item => item.id !== id));
  };

  // 3. Function to handle image upload
  const handleUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a temporary URL to display the local file
      const localUrl = URL.createObjectURL(file);
      
      // Update the gallery state
      setGallery(prev => prev.map(item => 
        item.id === id 
          ? { ...item, imageUrl: localUrl, fileName: file.name } 
          : item
      ));

      // Print the file name and simulated path to console
      console.log(`Uploaded File: ${file.name}`);
      console.log(`Local Path Reference: ${file.webkitRelativePath || 'Standard Local Upload'}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-100 mb-4">
          Welcome to the image to-do gallery.
        </h1>
        <button
          onClick={addImageCard}
          className="flex items-center gap-2 mx-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
        >
          <HiOutlinePlus /> Add an image
        </button>
      </header>

      {/* Gallery Grid: Three-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {gallery.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-500 flex flex-col"
          >
            {/* Image Container */}
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <img 
                src={item.imageUrl} 
                alt="Gallery Item" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if ./gallery.png doesn't exist yet
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/300?text=Default+Image";
                }}
              />
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-lg font-semibold text-gray-900 my-4 truncate">
                {item.fileName}
              </p>

              <div className="mt-auto flex gap-2">
                {/* Upload Button */}
                <label className="flex-1 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded-full cursor-pointer transition-colors text-sm">
                  <HiOutlineUpload /> Upload
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleUpload(item.id, e)}
                  />
                </label>

                {/* Delete Button */}
                <button
                  onClick={() => deleteImageCard(item.id)}
                  className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full transition-colors text-sm"
                >
                  <HiOutlineTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {gallery.length === 0 && (
        <p className="text-center text-gray-500 mt-10">Your gallery is empty. Click "Add an image" to start.</p>
      )}
    </div>
  );
}