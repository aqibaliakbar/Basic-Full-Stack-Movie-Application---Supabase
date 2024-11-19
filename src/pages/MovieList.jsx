import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, LogOut } from "lucide-react";
import { fetchMovies } from "../redux/features/movieSlice";
import { signOut } from "../redux/features/userSlice";
import EmptyState from "../components/EmptyState";
import SessionLoading from "../components/SessionLoading";

export default function MovieList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { movies, status, currentPage, totalPages } = useSelector(
    (state) => state.movies
  );
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1");
    dispatch(fetchMovies({ page, limit: ITEMS_PER_PAGE }));
  }, [dispatch, searchParams]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString() });
  };

  const handleLogout = async () => {
    try {
      await dispatch(signOut()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);

    // Adjust start if we're near the end
    if (totalPages - start < maxButtons - 1) {
      start = Math.max(1, totalPages - maxButtons + 1);
    }

    // Previous button
    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 rounded-md text-white hover:bg-teal-800/50"
        >
          Previous
        </button>
      );
    }

    // First page
    if (start > 1) {
      buttons.push(
        <button
          key="1"
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 rounded-md text-white hover:bg-teal-800/50"
        >
          1
        </button>
      );
      if (start > 2) {
        buttons.push(
          <span key="ellipsis1" className="text-white px-2">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded-md ${
            currentPage === i
              ? "bg-emerald-400 text-white"
              : "text-white hover:bg-teal-800/50"
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (end < totalPages) {
      if (end < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="text-white px-2">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 rounded-md text-white hover:bg-teal-800/50"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 rounded-md text-white hover:bg-teal-800/50"
        >
          Next
        </button>
      );
    }

    return buttons;
  };

  if (status === "loading") {
    return <SessionLoading />;
  }

  if (movies.length === 0 && currentPage === 1) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl pt-10 pb-60 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <h1 className="text-5xl font-semibold text-white ">My movies</h1>
            <Link to="/create" className="text-white">
              <div className="w-6 h-6 rounded-full bg-white text-teal-900 flex items-center justify-center">
                +
              </div>
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="text-white hover:text-emerald-400 transition-colors flex gap-2"
          >
            <p>Logout</p> <LogOut className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/edit/${movie.id}`}
              className="bg-[#092C39] rounded-lg overflow-hidden group hover:ring-2 hover:ring-emerald-400 transition-all"
            >
              <div className="aspect-[3/4] relative">
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="w-full h-full object-fit"
                />
              </div>
              <div className="p-4">
                <h2 className="text-white font-semibold">{movie.title}</h2>
                <p className="text-gray-400">{movie.publishing_year}</p>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center space-x-4">
            {renderPaginationButtons()}
          </div>
        )}
      </div>
    </div>
  );
}
