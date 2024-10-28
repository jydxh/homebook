import { fetchPropertyById } from "@/utils/actions/PropertyActions";

async function page({ params }: { params: { id: string } }) {
	const property = await fetchPropertyById(params.id);
	console.log(property);
	return <div>{params.id}</div>;
}
export default page;
