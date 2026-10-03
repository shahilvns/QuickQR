import QRCode from "qrcode";

export const generateQRData = async ({
  data,
  size = 500,
  margin = 2,
  foreground = "#000000",
  background = "#ffffff",
  errorCorrection = "H",
}) => {
  return await QRCode.toDataURL(data, {
    width: size,
    margin,
    errorCorrectionLevel: errorCorrection,
    color: {
      dark: foreground,
      light: background,
    },
  });
};

export const generateQRWithLogo = ({
  qrDataUrl,
  logo,
  size = 500,
  background = "#ffffff",
  logoSize = 80,
}) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");

    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");

    const qrImage = new Image();

    qrImage.onload = () => {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, size, size);

      ctx.drawImage(qrImage, 0, 0, size, size);

      if (!logo) {
        resolve(canvas.toDataURL("image/png"));
        return;
      }

      const logoImage = new Image();

      logoImage.onload = () => {
        const x = (size - logoSize) / 2;
        const y = (size - logoSize) / 2;

        const padding = 10;

        ctx.fillStyle = "#ffffff";

        ctx.beginPath();
        ctx.roundRect(
          x - padding,
          y - padding,
          logoSize + padding * 2,
          logoSize + padding * 2,
          12,
        );
        ctx.fill();

        ctx.save();

        ctx.beginPath();

        ctx.roundRect(x, y, logoSize, logoSize, 10);

        ctx.clip();

        ctx.drawImage(logoImage, x, y, logoSize, logoSize);

        ctx.restore();

        resolve(canvas.toDataURL("image/png"));
      };

      logoImage.onerror = reject;
      logoImage.src = logo;
    };

    qrImage.onerror = reject;
    qrImage.src = qrDataUrl;
  });
};
