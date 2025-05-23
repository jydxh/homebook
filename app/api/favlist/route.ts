import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";

// get user fav List
export const GET = async(request:NextRequest)=>{
  const {userId} =  getAuth(request);
  if(!userId) return NextResponse.json({msg:'bad request'},{status:400})
try {
  const userFavList = await db.favorite.findMany({
			where: {
				userId: userId,
			},
			select: {
				propertyId: true,
			},
		});
		const result=  userFavList.map(list => list.propertyId);
    return NextResponse.json({data:result})
} catch (error) {
  console.log(error);
}

  
}