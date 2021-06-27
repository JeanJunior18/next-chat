import type { AppProps } from 'next/app';
import '../styles/global.sass';
import '../styles/page.sass';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
	return <Component {...pageProps} />;
}
export default MyApp;
