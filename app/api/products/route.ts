import { fetchProperties } from "@/utils/actions/PropertyActions";
import { NextRequest, NextResponse } from "next/server";


export const GET = async(request: NextRequest)=>{
  const {searchParams}= new URL(request.url);

  const params = {
    category:searchParams.get('category') || undefined,
    amenities:searchParams.get('amenities') || undefined,
    search:searchParams.get('search') || undefined,
    price:searchParams.get('price') || undefined,
    rating:searchParams.get('rating') || undefined,
    page:searchParams.get('page') || undefined,
  }
  console.log(params);

  const products = await fetchProperties({searchParams: params});

  return NextResponse.json({data:products},{status:200})
} 