interface EmailAddress {
	id: string;
	object: string;
	email_address: string;
	reserved: boolean;
	verification: any;
	linked_to: any[];
	matches_sso_connection: boolean;
	created_at: number;
	updated_at: number;
}

interface ExternalAccount {
	object: string;
	id: string;
	provider: string;
	identification_id: string;
	provider_user_id: string;
	approved_scopes: string;
	email_address: string;
	first_name: string;
	last_name: string;
	avatar_url: string;
	image_url: string;
	username: string;
	public_metadata: any;
	label: string | null;
	created_at: number;
	updated_at: number;
	verification: any;
	google_id: string;
	given_name: string;
	family_name: string;
	picture: string;
}

interface User {
	readonly id: string;
	readonly object: string;
	readonly username: string | null;
	readonly first_name: string | null;
	readonly last_name: string | null;
	readonly image_url: string;
	readonly has_image: boolean;
	readonly primary_email_address_id: string | null;
	readonly primary_phone_number_id: string | null;
	readonly primary_web3_wallet_id: string | null;
	readonly password_enabled: boolean;
	readonly two_factor_enabled: boolean;
	readonly totp_enabled: boolean;
	readonly backup_code_enabled: boolean;
	readonly email_addresses: EmailAddress[];
	readonly phone_numbers: any[];
	readonly web3_wallets: any[];
	readonly passkeys: any[];
	readonly external_accounts: ExternalAccount[];
	readonly saml_accounts: any[];
	readonly enterprise_accounts: any[];
	readonly public_metadata: any;
	readonly private_metadata: any;
	readonly unsafe_metadata: any;
	readonly external_id: string | null;
	readonly last_sign_in_at: number | null;
	readonly banned: boolean;
	readonly locked: boolean;
	readonly lockout_expires_in_seconds: number | null;
	readonly verification_attempts_remaining: number;
	readonly created_at: number;
	readonly updated_at: number;
	readonly delete_self_enabled: boolean;
	readonly create_organization_enabled: boolean;
	readonly last_active_at: number | null;
	readonly mfa_enabled_at: number | null;
	readonly mfa_disabled_at: number | null;
	readonly legal_accepted_at: number | null;
	readonly profile_image_url: string;
}

export default async function fetchUserInfo(
	userId: string
): Promise<User | null> {
	const serverUrl = `https://api.clerk.com/v1/users/${userId}`;
	try {
		const result = await fetch(serverUrl, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
				"Content-Type": "application/json",
			},
		});
		if (!result.ok) {
			throw new Error("failed to fetch user");
		}
		const user: User = await result.json();
		return user;
	} catch (error) {
		console.log("Error fetching user info:", error);
		return null;
	}
}
