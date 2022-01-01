interface Props {
  title: string;
  typeInput: string;
  placehoder: string;
  min?: number;
  max?: number;
}
export default function ComponentInput({ title, typeInput, placehoder, min, max }: Props) {
  return (
    <div className="mb-6 w-full">
      <label
        htmlFor={`input-${title.toLowerCase}`}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {title}
      </label>
      <input
        min={min}
        max={max}
        placeholder={placehoder}
        type={typeInput}
        id={`input-${title.toLowerCase}`}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-offset-0 focus:ring-blue-500 focus:outline-blue-500 block w-full p-2.5"
      />
    </div>
  )
}