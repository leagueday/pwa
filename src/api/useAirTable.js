
/*
RATE LIMITS
The API is limited to 5 requests per second per base. If you exceed this rate, you will receive a 429 status code and
will need to wait 30 seconds before subsequent requests will succeed.

The official JavaScript client has built-in retry logic.

If you anticipate a higher read volume, we recommend using a caching proxy. This rate limit is the same for all plans
and increased limits are not currently available.
*/
