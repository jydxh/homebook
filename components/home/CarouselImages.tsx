import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

function CarouselImages({ images, name }: { images: string[]; name: string }) {
	return (
		<Carousel className="w-full ">
			<div className="relative">
				<CarouselContent>
					{images.map(image => {
						return (
							<CarouselItem key={image}>
								<div>
									<Card>
										<CardContent className="w-full relative h-[250px] rounded-t">
											<Image
												fill
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
												src={image}
												alt={name}
												className="object-cover rounded-t"
											/>
										</CardContent>
										{/* <CardContent className="flex aspect-square items-center justify-center p-6">
											<div className="w-full relative h-[250px] rounded">
												<Image
													fill
													src={image}
													alt={name}
													className="object-cover rounded"
												/>
											</div>
										</CardContent> */}
									</Card>
								</div>
							</CarouselItem>
						);
					})}
				</CarouselContent>
				<CarouselPrevious className="absolute left-2 z-50" />
				<CarouselNext className="absolute right-2 z-50" />
			</div>
		</Carousel>
	);
}
export default CarouselImages;
