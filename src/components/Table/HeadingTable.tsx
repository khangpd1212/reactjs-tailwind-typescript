import { memo } from 'react';

function HeadingTable({ title }: { title: string[] }) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {title &&
          title.map((item, key) => (
            <th
              key={key}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {item}
            </th>
          ))}

        <th scope="col" className="relative px-6 py-3"></th>
      </tr>
    </thead>
  );
}
export default memo(HeadingTable);
