"use strict";
const getTimestamp = () => {
  const date = /* @__PURE__ */ new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};
const logger = {
  info(...val) {
    console.log(getTimestamp(), ...val);
  },
  warn(...val) {
    console.warn(getTimestamp(), ...val);
  },
  error(...val) {
    console.error(getTimestamp(), ...val);
  }
};
const logWaitingTime = ({
  metric,
  response,
  messageType
}) => {
  const responseTimeThreshold = 5e3;
  let correlationId = "";
  let responseTime = response.timings.waiting;
  try {
    let json = response.json();
    correlationId = json.correlationId;
  } catch (err) {
  }
  if (responseTime > responseTimeThreshold) {
    logger.warn(
      `${messageType} with correlationId '${correlationId}' took longer than ${responseTimeThreshold}`
    );
  }
  metric.add(responseTime);
};
const reqResUrl = "http://91.185.85.213";
const headerHost = "weather-app.api";
exports.headerHost = headerHost;
exports.logWaitingTime = logWaitingTime;
exports.reqResUrl = reqResUrl;
