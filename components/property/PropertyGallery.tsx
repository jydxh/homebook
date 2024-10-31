import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
function PropertyGallery({ images }: { images: string[] }) {
	return (
		<Carousel className="w-[95%] mx-auto">
			<CarouselContent>
				{images.map(image => (
					<CarouselItem key={image} className="md:basis-1/2 lg:basis-1/3">
						<div className="p-1">
							<Card className="relative w-full h-[400px]">
								<Image
									src={image}
									fill
									alt="propertyImage"
									className="object-cover"
								/>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
export default PropertyGallery;
