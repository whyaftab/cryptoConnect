// libraries
import React, { useEffect, useState } from 'react';

// components
import { CustomModal } from '@components/molecules';
import { BarCodeScanner, PermissionStatus, BarCodeScannerProps } from 'expo-barcode-scanner';
import { StyleSheet } from 'react-native';

// types
interface Props extends BarCodeScannerProps {
  visible: boolean;
  onClosePress: () => void;
}

export const QrCodeScanner = ({ visible, onClosePress, ...restProps }: Props) => {
  // variables
  const [cameraPermissionState, setCameraPermissionState] = useState<PermissionStatus>();

  // hooks
  useEffect(() => {
    if (visible) {
      checkCameraPermission();
    }
  }, [visible]);

  // functions
  const checkCameraPermission = async () => {
    if (cameraPermissionState === PermissionStatus.GRANTED) return;
    else {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setCameraPermissionState(status);
      if (status === PermissionStatus.GRANTED) return;
      onClosePress();
    }
  };

  if (cameraPermissionState !== PermissionStatus.GRANTED) {
    return null;
  }

  // returns
  return (
    <CustomModal isVisible={visible} onClose={onClosePress}>
      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        style={StyleSheet.absoluteFillObject}
        {...restProps}
      />
    </CustomModal>
  );
};
