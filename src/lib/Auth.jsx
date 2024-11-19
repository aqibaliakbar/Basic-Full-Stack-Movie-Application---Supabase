import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


import { setIsLoading, setSession } from "../redux/features/userSlice";
import SessionLoading from "../components/SessionLoading";
import { supabase } from "./supabase";

function Auth() {
  const dispatch = useDispatch();
  const isSessionLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    dispatch(setIsLoading(true));
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching session:", error.message);
          return;
        }
        if (data.session) {
          dispatch(setSession(data.session));
        } else {
          dispatch(setSession(null));
        }
        dispatch(setIsLoading(false));
      } catch (error) {
        console.error("Error fetching session:", error);
        dispatch(setIsLoading(false));
      }
    };
    fetchSession();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
          dispatch(setSession(session));
        }
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);

  if (isSessionLoading) {
    return <SessionLoading />;
  }

  return null;
}

export default Auth;
