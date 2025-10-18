import { Field, ErrorMessage } from "formik";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
  disabled?: boolean;
}

export default function InputField({
  label,
  name,
  type = "text",
  placeholder,
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-200 mb-1"
      >
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full bg-[#0D1321] border-[3px] border-white rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#C5D86D]"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
}
