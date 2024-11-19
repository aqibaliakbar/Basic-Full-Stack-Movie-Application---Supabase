import { useState } from "react";
import { Link } from "react-router-dom";
import { Upload } from "lucide-react";

export default function MovieForm({
  title,
  initialData,
  onSubmit,
  isSubmitting,
  submitButtonText,
}) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    publishing_year: initialData?.publishing_year || "",
    poster: null,
    poster_preview: initialData?.poster_url || null,
  });

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0] || e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        poster: file,
        poster_preview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("publishing_year", formData.publishing_year);
    if (formData.poster) {
      submitData.append("poster", formData.poster);
    }
    onSubmit(submitData);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-semibold text-white pt-20 mb-20">
          {title}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Image Upload Section */}
          <div className="md:order-1   ">
            <div
              className="border-2 border-dashed bg-input border-gray-300 rounded-lg p-4 text-center h-full max-w-[473px]   max-h-[504px] object-fit relative"
              onDrop={handleImageDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <input
                type="file"
                onChange={handleImageDrop}
                className="hidden"
                id="poster"
                accept="image/*"
              />
              {formData.poster_preview ? (
                <img
                  src={formData.poster_preview}
                  alt="Preview"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <label
                  htmlFor="poster"
                  className="cursor-pointer flex flex-col items-center justify-center  h-full min-h-[504px]"
                >
                  <Upload className="w-12 h-12 text-gray-300 mb-4" />
                  <span className="text-gray-300 text-lg">
                    Drop an image here
                  </span>
                  <span className="text-gray-400 text-sm mt-2">
                    or click to upload
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* Form Fields Section */}
          <div className="md:order-1 flex flex-col  space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Title"
                  className="w-full mt-1 p-3 md:max-w-[362px] rounded-md bg-input text-white placeholder-gray-400 border border-card focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </label>

              <label className="block text-sm font-medium text-gray-300">
                <input
                  type="number"
                  value={formData.publishing_year}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      publishing_year: e.target.value,
                    })
                  }
                  placeholder="Publishing Year"
                  className="w-full mt-1 p-3 md:max-w-[216px] rounded-md bg-input text-white placeholder-gray-400 border border-card focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </label>
            </div>

            <div className="flex space-x-4 mt-auto pt-6">
              <Link
                to="/"
                className="px-6 py-3 rounded-md border border-white text-white hover:bg-input md:max-w-[167px] transition-colors flex-1 text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-md bg-primary text-white md:max-w-[167px] hover:bg-primary/80 transition-colors flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitButtonText}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
