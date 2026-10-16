exports.handler = async function (event, context) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, API-KEY",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ status: false, message: "Method Not Allowed" })
    };
  }

  try {
    const DESHIPAY_API_KEY = "uSUtTuB2etidtkf3v0nhOl2JiEK9VpbpzPmlAo6pYAHJKxNk3X";
    let body = {};
    try {
      body = JSON.parse(event.body || "{}");
    } catch (e) {
      body = {};
    }

    const payload = {
      cus_name: body.cus_name || "Afsar's Quest Patron",
      cus_email: body.cus_email || "patron@example.com",
      amount: Number(body.amount) || 1000,
      success_url: body.success_url || "https://afsarsquest.netlify.app/success.html",
      cancel_url: body.cancel_url || "https://afsarsquest.netlify.app/cancel.html"
    };

    const res = await fetch("https://paydeshipay.themedokan.com/api/payment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-KEY": DESHIPAY_API_KEY
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("Netlify Function Payment Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ status: false, message: error.message || "Internal Server Error" })
    };
  }
};
