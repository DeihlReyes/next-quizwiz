// useFetchQuiz.ts
// Assuming you're using NextAuth for authentication
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

// Import the new fetching function
import { fetchUserData } from "@/lib/quiz";

const useFetchQuiz = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<{
    totalQuizzes: number;
    totalQuizzesTaken: number;
    averageScore: number;
    highestScore: number;
    latestActivity: Date | null;
    averageTimeTaken: number;
  }>({
    totalQuizzes: 0,
    totalQuizzesTaken: 0,
    averageScore: 0,
    highestScore: 0,
    latestActivity: null,
    averageTimeTaken: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDataAsync = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching

      try {
        if (session) {
          const data = await fetchUserData();
          setUserData(data);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDataAsync();
  }, [session]);

  return { userData, loading, error };
};

export default useFetchQuiz;
