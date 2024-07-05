import React, { useState, useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

const ProfilePicture = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && (selectedFile.type === 'image/png' || selectedFile.type === 'image/jpg')) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      alert("Please select a PNG or jpg image.");
    }
  };

  const getUser = async () => {
    try {
      let result = await fetch('http://localhost:5000/user', {
        method: "GET",
        credentials: 'include'
      });
      result = await result.json();
      setUserId(result.user._id);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await fetch(`http://localhost:5000/api/users/upload-photo/${userId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload photo");
      }

      const data = await response.json();
      setMessage(data.message);
      console.log(data);
    } catch (error) {
      setMessage("Error uploading photo");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleUpdateUser} className="m-[30px]">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Update profile Image
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Your information will be kept confidential.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                {fileName && <span className="text-sm text-gray-500">{fileName}</span>}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload-cover"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload-cover"
                        name="file-upload-cover"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
      >
        Upload
      </button>
      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </form>
  );
};

export default ProfilePicture;
