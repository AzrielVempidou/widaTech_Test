export default function TableComponent() {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <label htmlFor="checkbox-all-search" className="sr-only">
                  Select All
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
              <div className="flex items-center">
                <label htmlFor="checkbox-table-search-1" className="sr-only">
                  Select Item
                </label>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              Apple MacBook Pro 17"
            </td>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
              <div className="flex items-center">
                <label htmlFor="checkbox-table-search-1" className="sr-only">
                  Select Item
                </label>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              Apple MacBook Pro 17"
            </td>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
              <div className="flex items-center">
                <label htmlFor="checkbox-table-search-1" className="sr-only">
                  Select Item
                </label>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              Apple MacBook Pro 17"
            </td>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
              <div className="flex items-center">
                <label htmlFor="checkbox-table-search-1" className="sr-only">
                  Select Item
                </label>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              Apple MacBook Pro 17"
            </td>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
              <div className="flex items-center">
                <label htmlFor="checkbox-table-search-1" className="sr-only">
                  Select Item
                </label>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              Apple MacBook Pro 17"
            </td>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          {/* Tambahkan baris lain sesuai dengan kebutuhan Anda */}
        </tbody>
      </table>
      <nav
        className="flex items-center justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-semibold">1-10</span> of{" "}
          <span className="font-semibold">1000</span>
        </span>
        <ul className="flex space-x-2">
          <li>
            <a
              href="#"
              className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white px-3 py-1 rounded-lg"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white px-3 py-1 rounded-lg"
            >
              1
            </a>
          </li>
          {/* Tambahkan navigasi halaman lain sesuai dengan kebutuhan Anda */}
          <li>
            <a
              href="#"
              className="text-blue-600 dark:text-white bg-blue-50 px-3 py-1 rounded-lg"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white px-3 py-1 rounded-lg"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
