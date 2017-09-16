import { gql } from 'react-apollo';

export const LoginMutation = gql`
	mutation (
		$username: String!,
		$password: String!,
	) {
		loginUser (
			username: $username,
			password: $password,
		)
	}
`;