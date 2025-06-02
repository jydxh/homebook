import { fetchPropertyById, fetchPropertyRating } from "@/utils/actions/PropertyActions";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request:NextRequest)=>{

 const productId = request.nextUrl.searchParams.get('productId')

 if(!productId) return NextResponse.json({msg:'bad request'},{status:400})

 const fetchedResult = await  fetchPropertyById(productId);
 const ratingResult = await fetchPropertyRating(productId);
 
 if(!fetchedResult) return NextResponse.json({msg:'none property found'},{status:400});
 const result = {...fetchedResult, rating:ratingResult}

  return NextResponse.json({data: result},{status:200})
}