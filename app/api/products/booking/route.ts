import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import { calculateTotals } from "@/utils/calculateTotals";
export const POST  = async (request: NextRequest) => {

  const {userId}  = getAuth(request);
  if(!userId) return NextResponse.json({msg:'Unauthorized'},{status:401})

    try {
      const body = await request.json() as {productId:string|undefined; checkIn:string|undefined; checkOut: string|undefined};
      
      if(!body.checkIn ||!body.checkOut || !body.productId) return NextResponse.json({msg:'please provide valid params'},{status:400})
        const {checkIn,checkOut,productId} = body
     
      const property = await db.property.findUnique({
			where: {
				id: productId,
			},
			select: {
				price: true,
			},
		});
		if (!property) {
			return NextResponse.json({msg:'bad request',},{status:400})
		}

    const { totalNights, orderTotal } = calculateTotals({
          checkIn: new Date(checkIn),
          checkOut: new Date(checkOut),
          price: property.price,
        });
        // insert into order table
		  const order = await db.order.create({
            data: {
              checkIn: new Date(checkIn).toISOString(),
              checkOut: new Date(checkOut).toISOString(),
              orderTotal,
              totalNight: totalNights,
              propertyId:productId,
              userId,
              paymentStatus:true,
             },
		  });
      const bookingId = order.id;
      return NextResponse.json({bookingId},{status:200})
    } catch (error) {
        console.log(error)
    return NextResponse.json({error:'internal error'},{status:500})
    }
}