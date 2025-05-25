import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";

export const GET = async(request:NextRequest)=>{

const  {userId} = getAuth(request);

if(!userId) return NextResponse.json({msg:'bad request'},{status:400})
 
  try {
    	const properties = await db.favorite.findMany({
			where: {
				userId
			},
			select: {
				property: {
					select: {
						id: true,
						name: true,
						tagline: true,
						price: true,
						country: true,
						image: true,
						latLng: true,
					},
				},
			},
		});
		const data =  properties.map(item => item.property);
  return NextResponse.json({data},{status:200});
  } catch (error) {
    console.log(error);
  }
}