// libraries
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { BarCodeScannerResult } from 'expo-barcode-scanner';

// components
import {
  BigButton,
  CustomIcon,
  CustomText,
  Div,
  Input,
  Spacer,
  StickyBottom,
} from '@components/atoms';
import { Divider, FullScreenLoader } from '@components/molecules';
import { QrCodeScanner } from '@components/organisms';

// styles
import { genericStyles } from '@styles/genericStyles';

// misc
import { useBinanceConnectMutation } from './api';
import { useAuth } from '@hooks/useAuth';
import { BinanceConnectPayload } from './types';

export const BinanceConnectScreen = () => {
  // variables
  const [isScannerVisible, setIsScannerVisible] = useState<boolean>(false);
  const [binanceConnect, { data, isLoading }] = useBinanceConnectMutation();
  const { setUser } = useAuth();
  const { control, handleSubmit, setValue } = useForm<BinanceConnectPayload>();

  // hooks
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  // functions
  const onSubmit = (data: BinanceConnectPayload) => {
    binanceConnect(data);
  };

  const toggleScanner = () => setIsScannerVisible(!isScannerVisible);

  const onBarCodeScanned = (result: BarCodeScannerResult) => {
    try {
      const data = JSON.parse(result.data) as BinanceConnectPayload;
      setValue('api_key', data.api_key);
      setValue('secret_key', data.secret_key);
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Invalid QR code!',
        text2: "The QR code you have scanned doesn't look right.",
      });
    } finally {
      setIsScannerVisible(false);
    }
  };

  // returns
  return (
    <Container>
      <FullScreenLoader isLoading={isLoading} />
      <Input
        testID="api_key"
        control={control}
        name="api_key"
        label="Clé API"
        rules={{ required: true }}
      />
      <Input
        testID="secret_key"
        control={control}
        name="secret_key"
        label="Clé Secrète"
        rules={{ required: true }}
      />

      <Spacer.Column numberOfSpaces={1} />
      <Div.Row>
        <Divider />
        <Div.Row>
          <Spacer.Row numberOfSpaces={1} />
          <CustomText text="OU" />
          <Spacer.Row numberOfSpaces={1} />
        </Div.Row>
        <Divider />
      </Div.Row>
      <Spacer.Column numberOfSpaces={1.75} />

      <Div.Row jc="center">
        <BigButton
          text="Scanner QR Code"
          onPress={toggleScanner}
          leftIcon={<CustomIcon name="qrCode" type="lined" width={40} height={40} reverse />}
        />
      </Div.Row>

      <StickyBottom>
        <BigButton testID="submit" text="Submit" onPress={handleSubmit(onSubmit)} />
      </StickyBottom>

      <QrCodeScanner
        visible={isScannerVisible}
        onClosePress={toggleScanner}
        onBarCodeScanned={onBarCodeScanned}
      />
    </Container>
  );
};

const Container = styled(SafeAreaView)(({ theme: { layout } }) => ({
  ...genericStyles.fill,
  paddingHorizontal: layout.contentPadding / 2,
  paddingBottom: layout.contentPadding / 2,
}));
