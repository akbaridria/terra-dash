
const headers = { "Accept": "application/json", "Content-Type": "application/json", "x-api-key": process.env.SHROOM_KEY }

export const getToken = async (sql_query, axios) => {
  const data = {
    sql: sql_query,
    ttlMinutes: 2,
  };
  const result = await axios.post(
    "https://node-api.flipsidecrypto.com/queries",
    data,
    { headers }
  );
  if (result && result.status === 200)
    return {
      status: 200,
      result: result.data.token,
    };
  else
    return getToken(sql_query, axios);
};

export const getData = async (token, axios) => {
  const result = await axios.get(
    `https://node-api.flipsidecrypto.com/queries/${token}?pageNumber=1&pageSize=100000`,
    { headers }
  );
  if (result && result.status === 200) {
    if (result.data.status === "running") {
      return getData(token, axios);
    } else {
      return {
        status: 200,
        result: result.data,
      };
    }
  } else {
    getData(token, axios);
  }
};