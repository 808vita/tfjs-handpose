import React, { useState, useEffect } from "react";

const getOrdersList = async () => {
  try {
    const response = await fetch("/api/order", {
      method: "GET",
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("error", json.error);
    }

    if (response.ok) {
      console.log("success", json);
      return json;
    }
  } catch (error) {
    console.log("error", error);
  }
};

const ListOrders = () => {
  const [ordersData, setOrdersData] = useState(null);

  useEffect(() => {
    console.log(ordersData);
  }, [ordersData]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const ordersDataFetched = await getOrdersList();

      setOrdersData(ordersDataFetched);
      console.log(ordersDataFetched);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return <div>oof</div>;
};

export default ListOrders;
