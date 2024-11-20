import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MovieForm from "../components/MovieForm";
import { fetchMovie, updateMovie } from "../redux/features/movieSlice";
import SessionLoading from "../components/SessionLoading";
import PageLayout from "../components/PageLayout";

export default function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const movie = useSelector((state) => state.movies.currentMovie);
  const status = useSelector((state) => state.movies.status);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovie(id));
    }
  }, [dispatch, id]);

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      await dispatch(updateMovie({ id, formData })).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to update movie:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading" && !movie) {
    return <SessionLoading />;
  }

  if (!movie) {
    return (
      <PageLayout title="Movie Not Found">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          Back to Movies
        </button>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Edit">
      <MovieForm
        initialData={movie}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitButtonText={isSubmitting ? "Updating..." : "Update"}
      />
    </PageLayout>
  );
}
