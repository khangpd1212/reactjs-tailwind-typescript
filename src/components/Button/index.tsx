import { memo } from "react";
interface ButtonProps {
  label: string;
  nameStyle: string;
  click?: React.MouseEventHandler<HTMLButtonElement>;
}
let style: string;

function Button({ label, nameStyle, click }: ButtonProps) {
  
  if (nameStyle === "primary") {
    style =
      "border-transparent bg-blue-700 text-white hover:bg-blue-800 focus-visible:outline-blue-500";
  } else if (nameStyle === "secondary") {
    style =
      "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus-visible:outline";
  }

  return (
    <button
      type="button"
      className={`w-full inline-flex justify-center rounded-md border  shadow-sm px-4 py-2 text-base font-medium sm:ml-3 sm:w-auto sm:text-sm ${style}`}
      onClick={click}
    >
      {label}
    </button>
  );
}
export default memo(Button)