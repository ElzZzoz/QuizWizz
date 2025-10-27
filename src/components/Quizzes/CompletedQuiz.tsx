import { QuizTable } from "./QuizTable";
import type { Quiz as IQuiz } from "@/interfaces/QuizInterfaces/QuizInterfaces";

const CompletedQuizCard: React.FC<{ quiz: IQuiz }> = ({ quiz }) => {
  return (
    <div
      className="bg-white shadow-md flex items-center border w-full"
      style={{
        height: "auto", // Table needs flexible height
        borderWidth: "1px",
        borderRadius: "10px",
        borderColor: "#00000033",
        opacity: 1,
      }}
    >
      {/* Right content -> Replaced with Table */}
      <div className="flex-1 px-4 py-2">
        <QuizTable
          quizzes={[quiz]} // ✅ Pass single quiz as array
          onDelete={() => {}} // ✅ Placeholder (or connect your real handler)
          isDeleting={false}
        />
      </div>
    </div>
  );
};

export default CompletedQuizCard;
