import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Button } from 'react-bootstrap';

const BarcodeScanner = ({ onDetected }) => {
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  const startScanner = async () => {
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      onDetected(decodedText);
      html5QrCodeRef.current.stop().then(() => {
        html5QrCodeRef.current.clear();
      });
    };

    html5QrCodeRef.current = new Html5Qrcode(scannerRef.current.id);
    await html5QrCodeRef.current.start(
      { facingMode: 'environment' },
      config,
      qrCodeSuccessCallback
    );
  };

  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().then(() => {
          html5QrCodeRef.current.clear();
        });
      }
    };
  }, []);

  return (
    <div>
      <div id="reader" ref={scannerRef} style={{ width: '100%' }}></div>
      <Button variant="secondary" className="mt-2" onClick={startScanner}>
        Scan Barcode with Camera
      </Button>
    </div>
  );
};

export default BarcodeScanner;
