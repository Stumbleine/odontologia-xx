import { ReactComponent as PDF } from '../assets/icons/file-pdf-solid.svg';
import { ReactComponent as Excel } from '../assets/icons/file-excel-solid.svg';
import { ReactComponent as Image } from '../assets/icons/image-solid.svg';
import { ReactComponent as Word } from '../assets/icons/file-word-solid.svg';
import { ReactComponent as TextPlain } from '../assets/icons/file-text.svg';
import { ReactComponent as PowerPoint } from '../assets/icons/file-powerpoint-regular.svg';
import { ReactComponent as Html } from '../assets/icons/html5.svg';
import { ReactComponent as Js } from '../assets/icons/js.svg';
import { ReactComponent as Zipper } from '../assets/icons/file-zipper-regular.svg';
import { ReactComponent as File } from '../assets/icons/file-regular.svg';
import {
	amber,
	blue,
	blueGrey,
	brown,
	green,
	grey,
	orange,
	purple,
	red,
	yellow,
} from '@mui/material/colors';
import { SvgIcon } from '@mui/material';

export const FileIcon = () => {
	return (
		<SvgIcon sx={{ fontSize: 35 }}>
			<File style={{ color: grey[600] }} />;
		</SvgIcon>
	);
};
const PDFIcon = () => {
	return (
		<SvgIcon sx={{ fontSize: 35 }}>
			<PDF style={{ color: red[400] }} />;
		</SvgIcon>
	);
};
const Excelcon = () => {
	return (
		<SvgIcon sx={{ fontSize: 35 }}>
			<Excel style={{ color: green[400] }} />
		</SvgIcon>
	);
};
const ImageIcon = () => {
	return (
		<SvgIcon sx={{ fontSize: 35 }}>
			<Image style={{ color: purple[400] }} />;
		</SvgIcon>
	);
};
const WordIcon = () => {
	return (
		<SvgIcon sx={{ fontSize: 35 }}>
			<Word style={{ color: blue[400] }} />;
		</SvgIcon>
	);
};
const TextPlainIcon = () => {
	return (
		<SvgIcon sx={{ fontSize: 35 }}>
			<TextPlain style={{ color: blueGrey[400] }} />;
		</SvgIcon>
	);
};
const PowerPointIcon = () => {
	return (
		<SvgIcon sx={{ fontSize: 35 }}>
			<PowerPoint style={{ color: amber[700] }} />;
		</SvgIcon>
	);
};
const HtmlIcon = () => {
	return (
		<SvgIcon sx={{ fontSize: 35 }}>
			<Html style={{ color: orange[400] }} />;
		</SvgIcon>
	);
};
const JavaScriptIcon = () => {
	return (
		<SvgIcon sx={{ fontSize: 35 }}>
			<Js style={{ color: yellow[500] }} />;
		</SvgIcon>
	);
};
const ZipperIcon = () => {
	return (
		<SvgIcon sx={{ fontSize: 35 }}>
			<Zipper style={{ color: brown[400] }} />;
		</SvgIcon>
	);
};

export const extensions = {
	'application/pdf': <PDFIcon />,
	'application/vnd.ms-excel': <Excelcon />,
	'text/csv': <Excelcon />,
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': <Excelcon />,
	'application/msword': <WordIcon />,
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': <WordIcon />,
	'image/jpeg': <ImageIcon />,
	'image/png': <ImageIcon />,
	'image/svg+xml': <ImageIcon />,
	'text/plain': <TextPlainIcon />,
	'application/zip': <ZipperIcon />,
	'application/vnd.rar': <ZipperIcon />,
	'application/x-tar': <ZipperIcon />,
	'text/javascript': <JavaScriptIcon />,
	'application/xhtml+xml': <HtmlIcon />,
	'text/css': <TextPlain />,
	'application/vnd.ms-powerpoint': <PowerPointIcon />,
	'application/vnd.openxmlformats-officedocument.presentationml.presentation': (
		<PowerPointIcon />
	),
};
