export const getOrdersList = async () => {
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

export const postOrderStatus = async (status) => {
  try {
    const response = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify({
        status,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("error", json.error);
      return { sucess: false };
    }

    if (response.ok) {
      console.log("success", json);
      return { sucess: true };
    }
  } catch (error) {
    console.log("error", error);
    return { sucess: false };
  }
};
