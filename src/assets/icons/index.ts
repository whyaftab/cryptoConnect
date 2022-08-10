// misc
import { SvgProps } from 'react-native-svg';

// icons
import QrCodeLined from './qrcode-form-lined.svg';
import QRCodeMarkerLined from './qr-code-marker-lined.svg';
import CloseLined from './close-lined.svg';

// types
export type IconNames = 'qrCodeMarker' | 'qrCode' | 'close';

export type IconType = {
  lined?: React.FC<SvgProps>;
  full?: React.FC<SvgProps>;
};

type IconOptions = {
  [key in IconNames]: IconType;
};

export const Icons: IconOptions = {
  qrCode: {
    lined: QrCodeLined,
  },
  qrCodeMarker: {
    lined: QRCodeMarkerLined,
  },
  close: {
    lined: CloseLined,
  },
};
