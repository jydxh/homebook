import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
	<section className="grid place-content-center pt-16">
		<UserProfile path="/user-profile" />
	</section>
);

export default UserProfilePage;
