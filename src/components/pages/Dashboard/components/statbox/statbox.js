import ProgressCircle from "./progresscircle"
import { Flex, Stat, StatLabel, StatNumber, Text, useColorModeValue} from "@chakra-ui/react";
import Card from "../card/Card";
import IconBox from "../Icons/IconBox";
import {WalletIcon} from "../Icons/Icons";
import React from "react";

const StatBox = ({title,value,increase,progress,colour}) => {

      // Chakra Color Mode
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("white", "white");

  const formattedValue = value.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: "0"
  });

    return(
        <Card minH='125px' id="card" px="10" sx={{ border: "1px solid white", borderRadius: "5px" }}>
          <Flex direction='column'>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              mb='15px'>
              <Stat me='auto'>
                <StatLabel
                  fontSize='xs'
                  color='gray.400'
                  fontWeight='bold'
                  textTransform='uppercase'>
                  {title}
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                  {formattedValue}
                  </StatNumber>
                </Flex>
              </Stat>
              <ProgressCircle progress={progress}>
                <Flex
                justifyContent="center"
                alignItems="center"
                w="100%"
                h="100%"
                position="absolute"
                top="0"
                left="0"
                >
                <IconBox
                    borderRadius='50%'
                    as='box'
                    h={"45px"}
                    w={"45px"}
                    bg={"#3652ba"}
                >
                    <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
                </Flex>
              </ProgressCircle>
            </Flex>
            <Text color='gray.400' fontSize='sm'>
              <Text as='span' color={colour} fontWeight='bold'>
                {increase}{" "}
              </Text>
              In the Last Quarter
            </Text>
          </Flex>
        </Card>
    )
}

export default StatBox
