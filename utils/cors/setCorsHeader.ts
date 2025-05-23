import { NextResponse } from "next/server";


/**
 * set up the Header for CORS so when developing, front-end will have 
 * access
 * @param req a request from the from end
 * @returns null
 */
function setCorsHeader(req: Request) {
  const res = NextResponse.next();

  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

   if (req.method === "OPTIONS") {
   return new Response(null, { status: 200, headers: res.headers });
  }
}
export default setCorsHeader