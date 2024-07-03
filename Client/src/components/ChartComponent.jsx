import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useDispatch } from "react-redux";
import { fetchRevenue } from "../store/action/actionCreator";

export default function ChartComponent() {
  const dispatch = useDispatch();
  const [selectedPeriod, setSelectedPeriod] = useState("Last 7 days");
  const [chartData, setChartData] = useState({
    series: [{ name: "Revenue", data: [] }],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" },
      xaxis: { categories: [] },
    },
  });
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    async function fetchRevenueData() {
      try {
        const response = await dispatch(fetchRevenue(startDate, endDate));
        const { invoices } = response;

        const categories = invoices.map((invoice) => formatDate(invoice.date));
        const dataPoints = invoices.map((invoice) => invoice.totalAmountPaid);

        setChartData((prevChartData) => ({
          ...prevChartData,
          series: [{ data: dataPoints }],
          options: {
            ...prevChartData.options,
            xaxis: { categories },
          },
        }));

        const total = invoices.reduce((acc, invoice) => acc + invoice.totalAmountPaid, 0);
        setTotalRevenue(total);
      } catch (error) {
        console.error("Failed to fetch revenue:", error);
      }
    }

    fetchRevenueData();
  }, [startDate, endDate, dispatch]);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    setDropdownVisible(false);

    // Set startDate and endDate based on selectedPeriod
    switch (period) {
      case "Daily":
        setStartDate(getFormattedDate(new Date()));
        setEndDate(getFormattedDate(new Date()));
        break;
      case "Weekly":
        setStartDate(getFormattedDate(getPastDate(7)));
        setEndDate(getFormattedDate(new Date()));
        break;
      case "Monthly":
        setStartDate(getFormattedDate(getPastDate(30)));
        setEndDate(getFormattedDate(new Date()));
        break;
      default:
        break;
    }
  };

  // Function to get past date based on number of days ago
  const getPastDate = (daysAgo) => {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - daysAgo);
    return pastDate;
  };

  // Function to format date to YYYY-MM-DD format
  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to format date from API response (example format)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
            {totalRevenue.toLocaleString()}
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Total Revenue
          </p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
          12%
          <svg
            className="w-3 h-3 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13V1m0 0L1 5m4-4 4 4"
            />
          </svg>
        </div>
      </div>

      <div id="area-chart">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>

      <div className="grid grid-cols-1 items-center border-t border-gray-200 dark:border-gray-700 justify-between pt-5">
        <div className="flex justify-between items-center relative">
          <button
            id="dropdownDefaultButton"
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
            type="button"
          >
            {selectedPeriod}
            <svg
              className="w-2.5 m-2.5 ms-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {dropdownVisible && (
            <div
              id="lastDaysdropdown"
              className="z-10 absolute top-full mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    onClick={() => handlePeriodChange("Daily")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Daily
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handlePeriodChange("Weekly")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Weekly
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handlePeriodChange("Monthly")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Monthly
                  </a>
                </li>
              </ul>
            </div>
          )}
          <a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
          >
            Users Report
            <svg
              className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
