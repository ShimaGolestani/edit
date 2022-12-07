import axios from "../../config/axios";
import RefreshToken from "../../Utils/RefreshToken";
export const SET_SYMBOLS = "SET_SYMBOLS";
export const SET_DATA_CHART_AREA = "SET_DATA_CHART_AREA";
export const SET_DATA_CHART_CANDLE = "SET_DATA_CHART_CANDLE";
export const SET_FAVORITE_SYMBOL = "SET_FAVORITE_SYMBOL";
export const SET_LAST_DEALS = "SET_LAST_DEALS";
export const SET_SEARCH = "SET_SEARCH";
export const SET_DATA_SIDE = "SET_DATA_SIDE";
export const SET_COMMENTS = "SET_COMMENTS";
export const SET_SHOW_MODAL_ADD_COMMENTS = "SET_SHOW_MODAL_ADD_COMMENTS";
export const SET_CURRENT_SYMBOL_COMMENT = "SET_CURRENT_SYMBOL_COMMENT";
export const SET_SHOW_MODAL_COMMENTS = "SET_SHOW_MODAL_COMMENTS";
export const SET_SHOW_PROFILE = "SET_SHOW_PROFILE";
export const SET_SHOW_MESSAGE = "SET_SHOW_MESSAGE";
export const SET_SHOW_APPS = "SET_SHOW_APPS";
export const SET_SHOW_STATS = "SET_SHOW_STATS";
export const SET_CANDLE_SELECTED = "SET_CANDLE_SELECTED";
export const SET_LIMIT_SELECTED = "SET_LIMIT_SELECTED";
export const SET_DATA_CHART_AREA_SYMBOL = "SET_DATA_CHART_AREA_SYMBOL";
export const SET_SHOW_CALENDER = "SET_SHOW_CALENDER";

export function setShowApps(value) {
  return (dispatch) => {
    dispatch({
      type: SET_SHOW_APPS,
      payload: value,
    });
  };
}

//symbol
export function getSymbol(enqueueSnackbar) {
  return async (dispatch) => {
    const response = await axios.get("/tse/stocks_info/").catch((err) => {
      if (err.response.status === 401) {
        RefreshToken();
      }
      enqueueSnackbar(" خطا در برقراری ارتباط ", { variant: "error" });
    });
    dispatch({
      type: SET_SYMBOLS,
      payload: response.data,
    });
  };
}

//area
export function getDataChartArea() {
  return async (dispatch) => {
    const response = await axios
      .get(`/tse/overall_index_chart_data/`)
      .catch((err) => {
        if (err.response.status === 401) {
          RefreshToken();
        }
      });
    dispatch({
      type: SET_DATA_CHART_AREA,
      payload: response.data,
    });
    return response.data;
  };
}

//area chart for symbol
export function getDataChartAreaSymbol(insCode) {
  return async (dispatch) => {
    const response = await axios.get(``).catch((err) => {
      if (err.response.status === 401) {
        RefreshToken();
      }
    });
    dispatch({
      type: SET_DATA_CHART_AREA_SYMBOL,
      payload: response.data,
    });
    return response.data;
  };
}

//candle
export function getDataChartCandle(insCode) {
  return async (dispatch) => {
    const response = await axios
      .get(`/tse/stock_chart_data/${insCode}`)
      .catch((err) => {
        if (err.response.status === 401) {
          RefreshToken();
        }
      });
    return response.data;
  };
}

export function getCandleSelected(insCode) {
  return async (dispatch) => {
    const response = await axios
      .get(`/tse/stock_chart_data/${insCode}`)
      .catch((err) => {
        if (err.response.status === 401) {
          RefreshToken();
        }
      });
    return response.data;
  };
}

export function lastDealssync(insCode, setPopUpAttribute) {
  return async (dispatch) => {
    try {
      setPopUpAttribute({ hidden: false });

      const { data } = await axios
        .get(`/tse/stock_limits/${insCode}`)
        .catch((err) => {
          if (err.response.status === 401) {
            RefreshToken();
          }
          setPopUpAttribute({ hidden: true });
        });
      setTimeout(() => {
        if (data.length > 0) {
          dispatch({
            type: SET_LAST_DEALS,
            payload: data,
          });
        }
        setPopUpAttribute({ hidden: true });
      }, 300);
    } catch (erorr) {
      setPopUpAttribute({ hidden: true });
      console.log("error");
    }
  };
}

export function getLimitSelected(insCode) {
  return async (dispatch) => {
    try {
      const response = await axios
        .get(`/tse/stock_limits/${insCode}`)
        .catch((err) => {
          if (err.response.status === 401) {
            RefreshToken();
          }
        });
      dispatch({
        type: SET_LIMIT_SELECTED,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//overall-index-side
export function getDataSide() {
  return async (dispatch) => {
    try {
      const response = await axios
        .get("tse/market_activity_last")
        .catch((err) => {
          if (err.response.status === 401) {
            RefreshToken();
          }
        });
      dispatch({
        type: SET_DATA_SIDE,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//search
export function getSearch() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/tse/search").catch((err) => {
        if (err.response.status === 401) {
          RefreshToken();
        }
      });
      dispatch({
        type: SET_SEARCH,
        payload: response.data,
      });
    } catch (error) {}
  };
}

export function setShowStats(value) {
  return (dispatch) => {
    dispatch({
      type: SET_SHOW_STATS,
      payload: value,
    });
  };
}

export function setShowProfile(value) {
  return (dispatch) => {
    dispatch({
      type: SET_SHOW_PROFILE,
      payload: value,
    });
  };
}

export function setShowCalender(value) {
  return (dispatch) => {
    dispatch({
      type: SET_SHOW_CALENDER,
      payload: value,
    });
  };
}

export function setShowMessage(value) {
  return (dispatch) => {
    dispatch({
      type: SET_SHOW_MESSAGE,
      payload: value,
    });
  };
}

export function setShowModalComments(value) {
  return (dispatch) => {
    dispatch({
      type: SET_SHOW_MODAL_COMMENTS,
      payload: value,
    });
  };
}

export function setCurrentSymbolComment(value) {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_SYMBOL_COMMENT,
      payload: value,
    });
  };
}

export function setComments(value) {
  return (dispatch) => {
    dispatch({
      type: SET_COMMENTS,
      payload: value,
    });
  };
}

export function setShowModalAddComments(value) {
  return (dispatch) => {
    dispatch({
      type: SET_SHOW_MODAL_ADD_COMMENTS,
      payload: value,
    });
  };
}

export function setDataSide(value) {
  return (dispatch) => {
    dispatch({
      type: SET_DATA_SIDE,
      payload: value,
    });
  };
}

export function setSearch(value) {
  return (dispatch) => {
    dispatch({
      type: SET_SEARCH,
      payload: value,
    });
  };
}

export function setSymbols(value) {
  return async (dispatch) => {
    dispatch({
      type: SET_SYMBOLS,
      payload: value,
    });
  };
}

export function setDataChartCandle(value) {
  return async (dispatch) => {
    dispatch({
      type: SET_DATA_CHART_CANDLE,
      payload: value,
    });
  };
}

export function setDataChartArea(value) {
  return async (dispatch) => {
    dispatch({
      type: SET_DATA_CHART_AREA,
      payload: value,
    });
  };
}

export function setFavoriteSymbol(value) {
  return async (dispatch) => {
    dispatch({
      type: SET_FAVORITE_SYMBOL,
      payload: value,
    });
  };
}

export function setLastDeals(value) {
  return async (dispatch) => {
    dispatch({
      type: SET_LAST_DEALS,
      payload: value,
    });
  };
}

export function setCandleSelected(value) {
  return async (dispatch) => {
    dispatch({
      type: SET_CANDLE_SELECTED,
      payload: value,
    });
  };
}

export function setLimitSelected(value) {
  return async (dispatch) => {
    dispatch({
      type: SET_LIMIT_SELECTED,
      payload: value,
    });
  };
}

export function setDataChartAreaSymbol(value) {
  return async (dispatch) => {
    dispatch({
      type: SET_DATA_CHART_AREA_SYMBOL,
      payload: value,
    });
  };
}

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
