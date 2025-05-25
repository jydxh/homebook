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
    return NextResponse.json({data:result},{status:200})
} catch (error) {
  console.log(error);
} 
}

/* add/remove product to the user's favList */
export const  POST = async (request:NextRequest)=>{
	const {userId} =  getAuth(request);
	
	 if(!userId) return NextResponse.json({msg:'bad request'},{status:400})
	try {
		const body = await request.json();
		const {productId}= body
		console.log('productId:',productId);
	
		if(!productId ) return NextResponse.json({msg:'please provide a valid productId'},{status:400})
			const existFav = await db.favorite.findFirst({
			where: {
				propertyId:productId,
				userId,
			},
		});

		if (existFav) {
			await db.favorite.delete({
				where: {
					id: existFav.id,
				},
			});
			return NextResponse.json({msg:'Removed from my favorite list', status:'success'},{status:200})
		} else {
			await db.favorite.create({
				data: {
					propertyId:productId,
					userId,
				},
			});
			return NextResponse.json({msg:'Added to my favorite list', status:'success'},{status:200})
		}		
	} catch (error) {
		console.log(error);
		return NextResponse.json({msg:'failed', status:'failed'},{status:400})
	}
}