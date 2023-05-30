import { Box, styled } from "@mui/system";

const StyledProgressCircle = styled(Box)`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
`;

const Progress = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ progress }) =>
    `conic-gradient(transparent 0deg ${progress * 360}deg, #000 ${progress * 360}deg 360deg), #3652ba`};
  border-radius: 50%;
`;

const IconBoxWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${({ sizeicon }) => sizeicon}px;
  height: ${({ sizeicon }) => sizeicon}px;
  transform: translate(-50%, -50%);
`;

const IconBox = ({ children, sizeicon }) => {
  return <IconBoxWrapper sizeicon={sizeicon}>{children}</IconBoxWrapper>;
};

const ProgressCircle = ({ progress, size = 80, children }) => {
    const sizeicon = size - 20
  return (
    <StyledProgressCircle size={size}>
      <Progress progress={progress} />
      <IconBox sizeicon={sizeicon}>{children}</IconBox>
    </StyledProgressCircle>
  );
};

export default ProgressCircle;

