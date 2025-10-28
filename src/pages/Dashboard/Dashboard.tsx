import { useEffect, useState } from "react";
import api from "@/utils/api/AxiosInstance"; // your axios instance
import Card from "@/components/shared/Cards/Cards";
import quizImg from "@/assets/Dashboard/Quiz img.png";
import { PiStudentFill } from "react-icons/pi";

interface Quiz {
  _id: string;
  code: string;
  title: string;
  status: string;
  duration: number;
  schadule: string;
  participants: number;
}

interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
  group: {
    _id: string;
    name: string;
    status: string;
  };
}

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch incoming quizzes from API
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await api.get("/quiz/incomming"); // no domain needed

        setQuizzes(response.data || []); // depends on backend shape
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsResponse = await api.get("/student"); // ✅ base URL already in api instance
        const topFiveStudents = studentsResponse.data?.slice(0, 5) || [];

        setStudents(topFiveStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ✅ Upcoming Quizzes */}
        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-4">Upcoming Quizzes</h2>

          {loading ? (
            <div className="text-gray-500 text-sm">Loading...</div>
          ) : quizzes.length > 0 ? (
            <div className="flex flex-col gap-4">
              {quizzes.map((quiz) => (
                <Card key={quiz._id}>
                  <Card.Image imgSrc={quizImg} />
                  <Card.Body>
                    <Card.Info quiz={quiz} />
                  </Card.Body>
                  <Card.Status quiz={quiz} />
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-sm">
              No upcoming quizzes yet.
            </div>
          )}
        </div>

        {/* ✅ Top 5 Students (replace later with real students API) */}
        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-4">Top 5 Students</h2>

          <div className="flex flex-col gap-4">
            {students.length > 0 ? (
              students.map((student: Student) => (
                <Card key={student._id}>
                  {/* Use student.avatar if available, or fallback to quizImg */}
                  <Card.Image icon={<PiStudentFill size={48} />} />

                  <Card.Body>
                    {/* This correctly passes the 'student' object to your Card.Info component */}
                    <Card.Info student={student} />
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div className="text-gray-500 text-sm">Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
