import upcomming from "@/assets/Dashboard/Quiz img.png";

export interface IQuiz {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  questions_number: number;
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  participants: number;
  group?: string;
}

const UpcomingQuizCard: React.FC<{ quiz: IQuiz }> = ({ quiz }) => {
  const { title, schadule, duration, questions_number } = quiz;

  return (
    <div
      className="bg-white shadow-md flex items-center border w-full"
      style={{
        height: "120px",
        borderWidth: "1px",
        borderRadius: "10px",
        borderColor: "#00000033", // border color as requested
        opacity: 1,
      }}
    >
      {/* Left image placeholder */}
      <div className="w-30 h-full bg-gray-200 rounded-l-lg flex items-center justify-center">
        <img src={upcomming} alt="Quiz Image" className="w-full h-full" />
      </div>

      {/* Right content */}
      <div className="flex flex-col justify-center px-4 flex-1">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-sm text-gray-600">
          📅 {new Date(schadule).toLocaleDateString()} — ⏳ {duration} mins
        </p>
        <p className="text-sm text-gray-500">Questions: {questions_number}</p>
      </div>
    </div>
  );
};

export default UpcomingQuizCard;
