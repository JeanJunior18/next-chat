import type { AppProps } from 'next/app';
import '../styles/global.sass';
import '../styles/grid/grid.sass';
import '../styles/grid/appBar.sass';
import '../styles/grid/sidebar.sass';
import '../styles/grid/appArea.sass';
import '../styles/grid/leftBar.sass';
import '../styles/grid/chatView.sass';
import '../styles/grid/rightBar.sass';
import '../styles/login.sass';
import Head from 'next/head';

import { AuthContextProvider } from '../context/authContext';
import { ChatContextProvider } from '../context/chatContext';
import Layout from '../layout/chat';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
	return (
		<AuthContextProvider>
			<ChatContextProvider>
				<Head>
					<link
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
						rel="stylesheet"
					/>
				</Head>

				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChatContextProvider>
		</AuthContextProvider>
	);
}
export default MyApp;
