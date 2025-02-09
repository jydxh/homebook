"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ClientSideRedirect({ hasProfile }: { hasProfile: boolean }) {
	const router = useRouter();
	useEffect(() => {
		if (hasProfile) {
			router.back();
		}
	}, [router, hasProfile]);
	return null;
}
export default ClientSideRedirect;
