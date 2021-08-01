import axios from 'axios';
import { useEffect, useState } from 'react';
import { MessageProps } from './Message';

export interface IImageMessage {
	/** ImageMessage url */
	url?: string | null;

	/** ImageMessage mimetype */
	mimetype?: string | null;

	/** ImageMessage caption */
	caption?: string | null;

	/** ImageMessage fileSha256 */
	fileSha256?: Uint8Array | null;

	/** ImageMessage fileLength */
	fileLength?: number | Long | null;

	/** ImageMessage height */
	height?: number | null;

	/** ImageMessage width */
	width?: number | null;

	/** ImageMessage mediaKey */
	mediaKey?: Uint8Array | null;

	/** ImageMessage fileEncSha256 */
	fileEncSha256?: Uint8Array | null;

	/** ImageMessage interactiveAnnotations */
	// interactiveAnnotations?: proto.IInteractiveAnnotation[] | null;

	/** ImageMessage directPath */
	directPath?: string | null;

	/** ImageMessage mediaKeyTimestamp */
	mediaKeyTimestamp?: number | Long | null;

	/** ImageMessage jpegThumbnail */
	jpegThumbnail?: Uint8Array | null;

	/** ImageMessage contextInfo */
	// contextInfo?: proto.IContextInfo | null;

	/** ImageMessage firstScanSidecar */
	firstScanSidecar?: Uint8Array | null;

	/** ImageMessage firstScanLength */
	firstScanLength?: number | null;

	/** ImageMessage experimentGroupId */
	experimentGroupId?: number | null;

	/** ImageMessage scansSidecar */
	scansSidecar?: Uint8Array | null;

	/** ImageMessage scanLengths */
	scanLengths?: number[] | null;

	/** ImageMessage midQualityFileSha256 */
	midQualityFileSha256?: Uint8Array | null;

	/** ImageMessage midQualityFileEncSha256 */
	midQualityFileEncSha256?: Uint8Array | null;

	/** ImageMessage viewOnce */
	viewOnce?: boolean | null;

	/** ImageMessage thumbnailDirectPath */
	thumbnailDirectPath?: string | null;

	/** ImageMessage thumbnailSha256 */
	thumbnailSha256?: Uint8Array | null;

	/** ImageMessage thumbnailEncSha256 */
	thumbnailEncSha256?: Uint8Array | null;
}

const ImageMessage: React.FC<{ data: MessageProps }> = ({ data }) => {
	const [image, setImage] = useState<Uint8Array | undefined | null>();
	const [imageData, setImageData] = useState<IImageMessage | undefined>();
	useEffect(() => {
		console.log(data);
		if (!data.message) return;
		const [[, imageData]] = Object.entries(data.message);
		setImageData(imageData);
		setImage(imageData.jpegThumbnail);
		decodeImage();
	}, []);

	const decodeImage = async () => {
		axios
			.post('/api/decodeImage', { data })
			.then((res) => setImage(res.data.base64Image))
			.catch(() => console.log());
	};

	return (
		<span>
			<img className="image-message" src={`data:image/png;base64,${image}`} />
			<div className="caption">{imageData?.caption}</div>
		</span>
	);
};

export default ImageMessage;
