interface TextareaProps {
  title: string;
  placehoder: string;
  change?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value: string;
}
export function TextareaComponent({ title, placehoder, change, value }: TextareaProps) {
  return (
    <div className="mb-6">
      <label
        htmlFor="input-desc"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {title}
      </label>
      <textarea
        name={title.toLowerCase()}
        id={`input-${title.toLowerCase}`}
        rows={4}
        className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-blue-500"
        placeholder={placehoder}
        onChange={change}
        value={value}
      ></textarea>
    </div>
  );
}
