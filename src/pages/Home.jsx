import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import CommentsIcon from "../../src/assets/images/CommentIcon.svg";
import { StarIcon as StarFillIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/outline";
import ReactApexChart from "react-apexcharts";
import json_favorite from "../jsons/favorite.json";
import {
  getDataChartCandle,
  getDataChartArea,
  getSymbol,
  getDataSide,
  lastDealssync,
  setCurrentSymbolComment,
  setCandleSelected,
  setDataChartArea,
  setDataChartCandle,
  setFavoriteSymbol,
  setLastDeals,
  setShowModalAddComments,
  getDataChartAreaSymbol,
  setDataChartAreaSymbol,
} from "../redux/home/home-action";
import ModalAddComment from "../components/ModalAddComments";
import ModalComments from "../components/ModalComments";
import Sidebar from "../components/layout/sidebar/Sidebar";
import Search from "../components/layout/search/Search";
import DealCard from "../../src/components/DealCard/DealCard";
import usePopupp from "../../src/hooks/usePopup";
import usePopup from "../hooks/usePopup";
import styles from "./Home.module.css";

const Home = () => {
  const { enqueueSnackbar } = useSnackbar();
  // usePopupp;
  const { setPopUpAttributes } = usePopup();
  // enqueueSnackbar("خطا در برقراری ", { variant: "danger" });
  const dispatch = useDispatch();
  const {
    symbols,
    chartArea,
    chartAreaSymbol,
    chartCandle,
    favorite,
    lastDeals,
    search,
    candleSelected,
  } = useSelector((state) => state.home);

  //

  const [isLoading, setIsLoading] = useState(false);

  const addToFavorite = (item) => {
    const fav = [...favorite];
    const index = fav.findIndex((o) => o.insCode === item.insCode);
    if (index != -1) {
      fav.splice(index, 1);
    } else {
      fav.push(item);
    }
    dispatch(setFavoriteSymbol(fav));
  };

  const showModalAddComment = (item) => {
    dispatch(setCurrentSymbolComment(item));
    dispatch(setShowModalAddComments(true));
  };

  // initial state
  useEffect(() => {
    setPopUpAttributes({ hidden: false });
    dispatch(getSymbol(enqueueSnackbar));
    // dispatch(setFavoriteSymbol(json_favorite.favorites));
    dispatch(
      setFavoriteSymbol([
        {
          insCode: "67675656072510693",
          symbol: "پالايش",
          companyName: "صندوق پالايشي يکم-سهام",
          valid: 1,
          finalTradePrice: 94150,
          closePrice: 92840,
          tradesCount: 31535,
          tradesVolume: 42182680,
          tradesValue: 3916092472680,
        },
      ])
    );
    dispatch(getDataSide());
    dispatch(getDataChartCandle("")).then((res) => {
      const array = [];

      res.map((item) => {
        array.push({
          x: new Date(item.eventDate + item.eventClock),
          y: [
            item.finalTradePrice,
            item.maxPrice,
            item.minPrice,
            item.closePrice,
          ],
        });
      });

      dispatch(setDataChartCandle([{ data: array }]));
      // dispatch(setCandleSelected("1305902643160516"));
      // setSymbolName("تکیمیا");
    });

    //total index chartt
    dispatch(getDataChartArea()).then((res) => {
      const array = [];
      res.map((item) => {
        array.push({
          x: new Date(item.body.eventDate + item.body.eventClock),
          y: [item.body.lastValue],
        });
      });
      dispatch(setDataChartArea([{ data: array }]));
    });

    dispatch(getDataChartAreaSymbol()).then((res) => {
      const array = [];
      res.map((item) => {
        array.push({
          x: new Date(item.body.eventDate + item.body.eventClock),
          y: [item.body.maxPrice],
        });
      });
      dispatch(setDataChartAreaSymbol([{ data: array }]));
    });
    dispatch(setCandleSelected("67675656072510693"));
    setSymbolName("پالایش");
    setPopUpAttributes({ hidden: true });
  }, []);

  useEffect(() => {
    if (candleSelected != "") {
      setPopUpAttributes({ hidden: false });
      console.log(candleSelected);
      dispatch(getDataChartCandle(candleSelected)).then((res) => {
        const array = [];
        if (res.length > 0) {
          res.map((item) => {
            array.push({
              x: new Date(item.eventDate + item.eventClock),
              y: [
                item.finalTradePrice,
                item.maxPrice,
                item.minPrice,
                item.closePrice,
              ],
            });
          });
          dispatch(setDataChartCandle([{ data: array }]));
          dispatch(setLastDeals([]));
          dispatch(lastDealssync(candleSelected, setPopUpAttributes));
        } else {
          dispatch(setLastDeals([]));
          dispatch(setDataChartCandle([{ data: array }]));
          dispatch(lastDealssync([]));
        }
      });
      setPopUpAttributes({ hidden: true });
    } else {
      const defaultValue = {
        insCode: 0,
        numberOfDemand: 0,
        demandVolume: 0,
        demandPrice: 0,
        numberOfSupply: 0,
        supplyVolume: 0,
        supplyPrice: 0,
      };
      var defaultArray = [];
      for (let i = 0; i < 5; i++) {
        defaultArray.push(defaultValue);
      }

      dispatch(setLastDeals(defaultArray));
      setPopUpAttributes({ hidden: true });
    }
  }, [candleSelected]);

  // start
  useEffect(() => {
    const list = document.getElementsByClassName("apexcharts-yaxis-label");
    for (var index = 0; index < list.length; ++index) {
      list[index].setAttribute("text-anchor", "start");
    }
  }, [chartArea, chartCandle, chartAreaSymbol]);

  const [symbolName, setSymbolName] = useState();
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

  const options2 = {
    chart: {
      type: "area",
      height: 350,
    },
    title: {
      text: "",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };
  const renderDeals = () => {
    if (lastDeals.length > 0) {
      return (
        <>
          <div className={`flex-1 bg-green-tbl   `}>
            <div className="flex h-16 bg-green-h-tbl rounded-tr-2.5x items-center text-sm justify-between px-2 ">
              <div>تعداد</div>
              <div>حجم</div>
              <div>قیمت</div>
            </div>
            {lastDeals.length === 0
              ? null
              : lastDeals.map((item) => {
                  return (
                    <div
                      key={item.insCode}
                      className="flex justify-between px-2 text-sm h-12 border-t border-green-h-tbl items-center"
                    >
                      <div>{item.numberOfSupply.toLocaleString?.("fa-IR")}</div>
                      <div>{item.supplyVolume.toLocaleString?.("fa-IR")}</div>
                      <div>{item.supplyPrice.toLocaleString?.("fa-IR")}</div>
                    </div>
                  );
                })}
          </div>
          <div className="flex-1 bg-red-tbl red-h-tbl text-black">
            <div className="flex h-16 bg-red-h-tbl rounded-tl-2.5x items-center text-sm justify-between px-2">
              <div>تعداد</div>
              <div>حجم</div>
              <div>قیمت</div>
            </div>
            {lastDeals.length === 0
              ? null
              : lastDeals?.map((item) => {
                  return (
                    <div
                      key={item.insCode}
                      className="flex justify-between px-2 text-sm h-12 border-t border-red-h-tbl items-center"
                    >
                      <div>{item.numberOfDemand.toLocaleString?.("fa-IR")}</div>
                      <div>{item.demandVolume.toLocaleString?.("fa-IR")}</div>
                      <div>{item.demandPrice.toLocaleString?.("fa-IR")}</div>
                    </div>
                  );
                })}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex-1 bg-green-tbl rounded-tr-2.5x rounded-br-2.5x ">
            <div className="flex h-16 bg-green-h-tbl rounded-tr-2.5x items-center text-sm justify-between px-2 ">
              <div>تعداد</div>
              <div>حجم</div>
              <div>قیمت</div>
            </div>
            <div className="flex justify-between px-2 text-sm h-12 border-t border-green-h-tbl items-center">
              <div>0</div>
              <div>0</div>
              <div>0</div>
            </div>
            <div className="flex justify-between px-2 text-sm h-12 border-t border-green-h-tbl items-center">
              <div>0</div>
              <div>0</div>
              <div>0</div>
            </div>
            <div className="flex justify-between px-2 text-sm h-12 border-t border-green-h-tbl items-center">
              <div>0</div>
              <div>0</div>
              <div>0</div>
            </div>
            <div className="flex justify-between px-2 text-sm h-12 border-t border-green-h-tbl items-center">
              <div>0</div>
              <div>0</div>
              <div>0</div>
            </div>
            <div className="flex justify-between px-2 text-sm h-12 border-t border-green-h-tbl items-center">
              <div>0</div>
              <div>0</div>
              <div>0</div>
            </div>
          </div>
          <div className="flex-1 bg-red-tbl red-h-tbl rounded-tl-2.5x rounded-bl-2.5x text-black">
            <div className="flex h-16 bg-red-h-tbl red-h-tbl rounded-tl-2.5x items-center text-sm justify-between px-2">
              <div>تعداد</div>
              <div>حجم</div>
              <div>قیمت</div>
            </div>
            <div className="flex justify-between px-2 text-sm h-12 border-t border-red-h-tbl items-center">
              <div>0</div>
              <div>0</div>
              <div>0</div>
            </div>
            <div className="flex justify-between px-2 text-sm h-12 border-t border-red-h-tbl items-center">
              <div>0</div>
              <div>0</div>
              <div>0</div>
            </div>
            <div className="flex justify-between px-2 text-sm h-12 border-t border-red-h-tbl items-center">
              <div>0</div>
              <div>0</div>
              <div>0</div>
            </div>
            <div className="flex justify-between px-2 text-sm h-12 border-t border-red-h-tbl items-center">
              <div>0</div>
              <div>0</div>
              <div>0</div>
            </div>
            <div className="flex justify-between px-2 text-sm h-12 border-t border-red-h-tbl items-center">
              <div>0</div>
              <div>0</div>
              <div>0</div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="desktop:min-h-screen p-2 bg-back-color w-full flex  ">
      <Row className="flex w-full bg-back-color rounded-5xl nopadding ">
        <Col
          md={12}
          lg={3}
          className="bg-back-color flex flex-col desktop:h-full p-8 desktop:flex-1 desktop:rounded-5xl "
        >
          <Sidebar />
        </Col>
        <Col
          className="nopadding bg-rose-50 flex-1  desktop:h-full desktop:rounded-5xlc rounded-5xl"
          md={12}
          lg={9}
        >
          <div className="dektop:p-8 px-4 desktop:mt-0 mt-3 mb-1">
            <div className="flex bg-white rounded-full">
              <div className="w-1/5 ml-2 mt-2 mr-2">
                <label className="text-black bg-search-color rounded-full mb-2 h-10 w-full text-center relative">
                  {" "}
                  {symbolName}{" "}
                </label>
              </div>
              <div className="relative w-4/5 mt-2 ml-2">
                <Search />
              </div>
            </div>
            <div
              className={`mb-1 mt-1   h-48 border-2 rounded-3xl    overflow-y-scroll scrollbar scrollbar-thumb-rose-500 scrollbar-track-gray-100 scrollbar-medium   ${styles.homeShadow}`}
            >
              <Table className=" fixTableHead  px-1 bg-white rounded-xl ">
                <thead className="">
                  <tr className="text-sm ">
                    <th className="rounded-tr-2.5x py-3 text-center ">
                      لیست نماد
                    </th>
                    <th className="py-3 text-center">تعداد</th>
                    <th className="py-3 text-center">آخرین قیمت</th>
                    <th className="py-3 text-center">قیمت پایانی</th>
                    <th className="py-3 text-center">ارزش فعلی</th>
                    <th className="rounded-tl-2.5x  py-3 text-center">
                      عملیات
                    </th>
                  </tr>
                </thead>
                {isLoading ? (
                  loadingSvg
                ) : (
                  <tbody className=" tbody text-sm ">
                    {symbols.map((item) => {
                      var regex = new RegExp(["w*" + search + "w*"]);
                      if (search == "" || regex.test(item.symbol))
                        return (
                          <tr key={item.insCode}>
                            <td
                              onClick={(e) => {
                                dispatch(setCandleSelected(item.insCode));
                                console.log("candle selected here");
                                setSymbolName(e.target.innerHTML);
                              }}
                              className="text-center"
                              style={{ cursor: "pointer" }}
                            >
                              {item.symbol}
                            </td>
                            <td className="text-center">
                              {item.tradesCount.toLocaleString?.("fa-IR")}
                            </td>
                            <td className="text-center">
                              {item.finalTradePrice.toLocaleString?.("fa-IR")}
                            </td>
                            <td className="text-center">
                              {item.closePrice.toLocaleString?.("fa-IR")}
                            </td>
                            <td className="text-center">
                              {item.tradesVolume.toLocaleString?.("fa-IR")}
                            </td>
                            <td className="text-center flex justify-center">
                              {favorite?.find(
                                (o) => o.insCode === item.insCode
                              ) ? (
                                <StarFillIcon
                                  onClick={addToFavorite.bind(this, item)}
                                  className="w-5"
                                />
                              ) : (
                                <StarIcon
                                  onClick={addToFavorite.bind(this, item)}
                                  className="w-5"
                                />
                              )}
                              <img
                                onClick={showModalAddComment.bind(this, item)}
                                className="w-4 mr-2"
                                src={CommentsIcon}
                              />
                            </td>
                          </tr>
                        );
                      else return null;
                    })}
                  </tbody>
                )}
              </Table>
            </div>
            <Row className="nopadding mt-4 justify-between gap-1 text-black space-evenly bg-white rounded-xl">
              <Col
                md={12}
                lg={5}
                className={`overflow-y-auto flex  h-auto mt-1 mr-1 mb-1 p-0 ${styles.homeShadow}`}
              >
                {renderDeals()}
                {/* <DealCard /> */}
              </Col>
              <Col
                className={`overflow-y-hidden dekstop:h-auto ml-1 px-0 mt-1 mb-1 candlechartmargin ${styles.homeShadow}`}
                md={12}
                lg={6}
              >
                <div className="bg-candle flex-1 rounded-2xl pt-2">
                  <ReactApexChart
                    options={options}
                    series={chartCandle}
                    type="candlestick"
                    height={300}
                  />
                </div>
              </Col>
            </Row>

            <div className=" mt-3  flex flex-col desktop:flex-row gap-2 justify-center">
              <Col
                className={`bg-candle flex-1 rounded-2xl pt-3 `}
                md={12}
                lg={6}
              >
                <ReactApexChart
                  options={options}
                  series={chartArea}
                  type="area"
                  height={300}
                />
              </Col>
              <Col className={styles.homeShadow} md={12} lg={6}>
                <div className="max-h-[400px]  h-full border-2 rounded-3xl   overflow-y-scroll scrollbar scrollbar-thumb-rose-500 scrollbar-track-gray-100 scrollbar-medium bg-white ">
                  <Table className="fixTableHead">
                    <thead className="bg-table-header">
                      <tr className="text-sm">
                        <th className="rounded-tr-2.5x py-3 text-center">
                          نمادهای منتخب
                        </th>
                        <th className="py-3 text-center">تعداد</th>
                        <th className="py-3 text-center">آخرین قیمت</th>
                        <th className="py-3 text-center">قیمت پایانی</th>
                        <th className="rounded-tl-2.5x  py-3 text-center">
                          ارزش فعلی
                        </th>
                      </tr>
                    </thead>
                    <tbody className="tbody text-sm">
                      {favorite.map((item) => {
                        return (
                          <tr key={item.insCode} style={{ cursor: "pointer" }}>
                            <td className="text-center">{item.symbol}</td>
                            <td className="text-center">
                              {item.tradesCount.toLocaleString?.("fa-IR")}
                            </td>
                            <td className="text-center">
                              {item.finalTradePrice.toLocaleString?.("fa-IR")}
                            </td>
                            <td className="text-center">
                              {item.closePrice.toLocaleString?.("fa-IR")}
                            </td>
                            <td className="text-center">
                              {item.tradesVolume.toLocaleString?.("fa-IR")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </div>
          </div>
        </Col>
      </Row>

      {/* <ModalAddComment />
      <ModalComments /> */}
    </div>
  );
};

export default Home;

const loadingSvg = (
  <svg
    role="status"
    className="ml-1 inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);
