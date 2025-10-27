import React from "react";

// --- TYPES (Unchanged) ---
type CardProps = QuizCardProps | StudentCardProps;

// ✅ Quiz Props
interface QuizCardProps {
  quiz: {
    _id: string;
    code: string;
    title: string;
    status: string;
    duration: number;
    schadule: string; // Note: 'schedule' is the correct spelling
    participants: number;
  };
}

// ✅ Student Props
interface StudentCardProps {
  student: {
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
  };
}

type CardImageProps = {
  imgSrc?: string;
  icon?: React.ReactNode;
};

// --- RESPONSIVE COMPONENTS ---

// ✅ Root Component
function CardRoot({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center 
                 border border-gray-300 rounded-lg bg-white shadow-sm 
                 w-full max-w-lg overflow-hidden"
      // Removed fixed style={{ width: "520px", height: "120px" }}
    >
      {children}
    </div>
  );
}

// ✅ Left Image
export function CardImage({ imgSrc, icon }: CardImageProps) {
  return (
    <div
      className="flex h-48 w-full sm:h-[120px] sm:w-[120px] 
                 flex-shrink-0 items-center justify-center 
                 bg-slate-100 text-slate-500"
    >
      {icon ? (
        icon
      ) : imgSrc ? (
        <img
          src={imgSrc}
          alt="Card Visual"
          width={120}
          height={120}
          // The parent's `overflow-hidden` will handle rounding
          className="h-full w-full object-cover"
        />
      ) : null}
    </div>
  );
}

// ✅ Body Wrapper
function CardBody({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col justify-center flex-1 
                 p-4 sm:p-0 sm:ml-4"
    >
      {children}
    </div>
  );
}

// ✅ Middle Info Section
function CardInfo(props: CardProps) {
  if ("quiz" in props) {
    const { quiz } = props;
    return (
      <>
        <h3 className="text-lg font-bold text-gray-900">{quiz.title}</h3>
        {/* Added flex-wrap for the date/time container */}
        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 gap-y-1 mt-1">
          <span>{new Date(quiz.schadule).toLocaleDateString()}</span>
          <span className="w-[1px] h-4 bg-gray-400" aria-hidden="true"></span>
          <span>
            {new Date(quiz.schadule).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <p className="text-sm text-gray-700 mt-2 font-medium">
          No. of student’s enrolled:{" "}
          <span className="font-bold">{quiz.participants}</span>
        </p>
      </>
    );
  }

  // ✅ Student UI
  const { student } = props;
  return (
    <>
      <h3 className="text-lg font-bold text-gray-900">
        {student.first_name} {student.last_name}
      </h3>
      <p className="text-sm text-gray-600">{student.email}</p>
      <p className="text-sm font-medium mt-1">
        Group: <span className="font-bold">{student.group.name}</span>
      </p>
    </>
  );
}

// ✅ Right Side (Status Button / Student Status)
function CardStatus(props: CardProps) {
  if ("quiz" in props) {
    return (
      <div
        className="flex flex-col items-start sm:items-end justify-center 
                   p-4 pt-0 sm:p-0 sm:pr-4"
      >
        <button className="flex items-center text-green-600 font-semibold text-sm gap-1">
          <span>{props.quiz.status === "open" ? "Open" : "Closed"}</span>
          <span className="text-lg">➜</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-start sm:items-end justify-center 
                 p-4 pt-0 sm:p-0 sm:pr-4"
    >
      <span
        className={`text-sm font-semibold ${
          props.student.status === "active" ? "text-green-600" : "text-red-500"
        }`}
      >
        {props.student.status}
      </span>
    </div>
  );
}

// ✅ Combine Subcomponents
const Card = Object.assign(CardRoot, {
  Image: CardImage,
  Body: CardBody,
  Info: CardInfo,
  Status: CardStatus,
});

export default Card;
