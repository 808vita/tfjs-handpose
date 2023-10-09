import React, { useState, useEffect } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

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

  return (
    <div>
      <h2>Live Orders</h2>
      {ordersData?.order &&
        ordersData?.order.map((item) => (
          <div key={item?._id} className="p-5">
            <p className="pb-1">{`Status: ${item?.status}`}</p>
            <p className="pb-1">
              Placed Order:{" "}
              {formatDistanceToNow(new Date(item?.createdAt), {
                addSuffix: true,
              })}
            </p>
            <p className="pb-1">{`Order id: ${item?._id}`}</p>

            <p className=""> {`Timestamp: ${item?.createdAt}`}</p>
          </div>
        ))}
    </div>
  );
};

export default ListOrders;
