import React from "react";
import ReactApexChart from "react-apexcharts";

const MainSideBarContent = ({ side, chartArea }) => {
  var fa = require("apexcharts/dist/locales/fa.json");
  const options = {
    chart: {
      type: "candlestick",
      height: 350,
      locales: [fa],
      defaultLocale: "fa",
    },
    bar: {
      dataLabels: {
        position: "top",
      },
    },
    title: {
      text: "",
      align: "center",
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (value) {
          const test = new Date(value);
          return test.toLocaleTimeString("fa-IR", {
            // en-US can be set to 'default' to use user's browser settings
            hour: "2-digit",
            minute: "2-digit",
          });
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return new Intl.NumberFormat("fa-IR").format(value);
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  return (
    <div className="bg-white text-black mt-6 w-full desktop:flex-1 rounded-2.5x p-3 ">
      <div className="font-bold text-center border-b py-3 mt-5">
        <div>شاخص کل</div>
        <div className="mt-2 text-sm">
          {side?.indexLastValue &&
            side?.indexLastValue.toLocaleString?.("fa-IR")}
        </div>
      </div>
      <div className="font-bold text-center border-b py-3">
        <div>ارزش بازار</div>
        <div className="mt-2 text-sm">
          {side?.marketValue && side?.marketValue.toLocaleString?.("fa-IR")}
        </div>
      </div>
      <div className="font-bold text-center border-b py-3">
        <div>تعداد معاملات</div>
        <div className="mt-2 text-sm">
          {side?.numberOfTrades &&
            side?.numberOfTrades.toLocaleString?.("fa-IR")}
        </div>
      </div>
      <div className="font-bold text-center border-b py-3">
        <div>ارزش معاملات</div>
        <div className="mt-2 text-sm">
          {side?.valueOfTrades && side?.valueOfTrades.toLocaleString?.("fa-IR")}
        </div>
      </div>
      <div className="font-bold text-center py-3">
        <div>حجم معاملات</div>
        <div className="mt-2 text-sm">
          {side?.volumeOfTrades &&
            side?.volumeOfTrades.toLocaleString?.("fa-IR")}
        </div>
      </div>
      <ReactApexChart
        options={options}
        series={chartArea}
        type="area"
        height={300}
      />
    </div>
  );
};

export default MainSideBarContent;
