import { Box } from '@mui/system';

export default function Page({ children, settings }) {
	return (
		<Box
			sx={{
				background: settings?.color || 'none',
				paddingTop: settings?.pt,
				paddingBottom: settings?.pb,
				// background:'blue',
				//	height:'100vh',
				zIndex: 0,
			}}>
			{children}
			{/* <Footer /> */}
		</Box>
	);
}
