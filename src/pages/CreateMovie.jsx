import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import MovieForm from "../components/MovieForm";

import PageLayout from "../components/PageLayout";
import { addMovie } from "../redux/features/movieSlice";

export default function CreateMovie() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      await dispatch(addMovie(formData)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to create movie:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout title="Create a new movie">
      <MovieForm
        initialData={null}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitButtonText={isSubmitting ? "Submitting..." : "Submit"}
      />
    </PageLayout>
  );
}
