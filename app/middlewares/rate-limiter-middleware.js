import { RateLimiterMemory } from "rate-limiter-flexible";
import ApiError from "../utils/ApiError.js";

const rateLimiter = new RateLimiterMemory({
  points: 100,
  duration: 900,
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch((rateLimiterRes) => {
      if (typeof rateLimiterRes?.msBeforeNext === "number") {
        const retryAfter = Math.ceil(rateLimiterRes.msBeforeNext / 1000);
        res.set("Retry-After", String(retryAfter));
        return next(new ApiError("Too many requests", 429, "error"));
      }
      return next(rateLimiterRes);
    });
};

export default rateLimiterMiddleware;
