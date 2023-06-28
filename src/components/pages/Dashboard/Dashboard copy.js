// Chakra imports
import { Box, Button, Flex, Grid, SimpleGrid, Table, Tbody, Td, Text, Th, Thead, Tr, useColorMode, 
  useColorModeValue, Switch, Menu, MenuButton, MenuList, MenuItem} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons"
// Custom components
import Card from "./components/card/Card";
import DonutChart from "./components/Charts/DonutChart";
import LineChart from "./components/Charts/LineChart";
import React, { useRef } from "react";
import { NavLink } from 'react-router-dom';
// Variables
import investments from "../../data/portfolio.json";
import {Data} from "../../data/portfolios"
import StatBox from "./components/statbox/statbox"
import './dashboard.css'
import { useParams } from 'react-router-dom';

export default function Dashboard() {
  // Chakra Color Mode
  const textColor = useColorModeValue("white", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.100", "gray.600");
  const { colorMode } = useColorMode();

  const { "*": userName } = useParams();
  const userRef = useRef(userName);
  // Toggle the user between userName and "OLOID"
  const handleToggle = () => {
    userRef.current = userRef.current === userName ? "OLOID" : userName;
    // Force re-render by calling a dummy setState
    setToggleState((prevState) => !prevState);
  };
  // This is a dummy state just to force a re-render when the toggle is clicked
  const [toggleState, setToggleState] = React.useState(false);

  const userPortfolio = Data[userRef.current];
  const commitment = userPortfolio.Commitment[userPortfolio.Commitment.length - 2].amount;
  const contributions = userPortfolio.Contributions.reduce((total, contribution) => total + contribution.amount, 0);
  const lastqcontributions = userPortfolio.Contributions
  .filter(contribution => contribution.date <= '2022-12-31') // Filter contributions before or on 31/12/2022
  .reduce((total, contribution) => total + contribution.amount, 0);
  const distributions = userPortfolio.Distributions.reduce((total, distribution) => total + distribution.amount, 0);
  const lastqdistributions = userPortfolio.Distributions
  .filter(distribution => distribution.date <= '2022-12-31') // Filter contributions before or on 31/12/2022
  .reduce((total, distribution) => total + distribution.amount, 0);
  const marketValueData = userPortfolio['Market Value'];
  const marketValue = marketValueData.reduce((total, value) => total + value.amount, 0);
  const lastqmarketValue = userPortfolio['Market Value']
  .filter(value => value.date <= '2022-12-31') // Filter market values before or on 31/12/2022
  .reduce((total, value) => total + value.amount, 0);
  const contributionspie = contributions/commitment
  const distributionspie = distributions/contributions
  const contributionsincrease = (((contributions-lastqcontributions)/lastqcontributions))
  const formattedcontribs = new Intl.NumberFormat('en-US', {style: 'percent', signDisplay: 'always',}).format(contributionsincrease);
  const distributionsincrease = (((distributions-lastqdistributions)/lastqdistributions))
  const formatteddistribs = new Intl.NumberFormat('en-US', {style: 'percent', signDisplay: 'always',}).format(distributionsincrease);
  const mktvalueincrease = (((marketValue-lastqmarketValue)/lastqmarketValue))
  const formattedmktvalue = new Intl.NumberFormat('en-US', {style: 'percent', signDisplay: 'always',}).format(mktvalueincrease);


  return (
    <Flex flexDirection='column' pt={{ base: "20px", md: "20px" }}>
      <Flex justify="space-between" align="center" mb="0px">
        <Text color="#fff" fontSize="xl" fontWeight="bold">
          Dashboard - {userRef.current}
        </Text>
        <Flex alignItems="center" ml="30px">
          <Text color="#fff" fontSize="lg" fontWeight="bold" mr="10px">
            Toggle for OLOID performance
          </Text>
          <Switch
            size="md"
            colorScheme="blue"
            isChecked={userRef.current === "OLOID"}
            onChange={handleToggle}
            mb='15px'
          />
        </Flex>
      </Flex>
      <Flex alignItems="center" justifyContent="flex-end" mt="0px" mb="15px">
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Download OLOIDs Quarterly Report
        </MenuButton>
        <MenuList>
          <MenuItem color="#333" maxH="25px"><NavLink to="/reports/Q1 23 Quarterly Update.pdf" target="_blank" download>Q1 '23 Report</NavLink></MenuItem>
        </MenuList>
      </Menu>
      </Flex>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px' mb='20px'>
        <StatBox
          title="Commitment"
          value={commitment}
          increase="+0%"
          progress={1}
          colour="green.400"
        />
        <StatBox
          title="Contributions"
          value={contributions}
          increase={formattedcontribs}
          progress={contributionspie}
          colour="green.400"
        />
        <StatBox
          title="Distributions"
          value={distributions}
          increase={formatteddistribs}
          progress={distributionspie}
          colour="green.400"
        />
        <StatBox
          title="Market Value"
          value={marketValue}
          increase={formattedmktvalue}
          progress={0}
          colour="red.400"
        />
      </SimpleGrid>
      <Grid
        templateColumns={{ sm: "1fr", lg: "2fr 1fr" }}
        templateRows={{ lg: "repeat(2, auto)" }}
        gap='20px'>
        <Card
          bg={
            colorMode === "dark"
              ? "navy.800"
              : "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
          }
          p='0px'
          maxW={{ sm: "90vw", md: "93vw" }}>
          <Flex direction='column' mb='0px' p='20px 0px 0px 28px'>
            <Text color='#fff' fontSize='lg' fontWeight='bold' mb='6px'>
              Value Overview
            </Text>
            <Text color='#fff' fontSize='sm'>
              to month end May 2023
            </Text>
          </Flex>
          <Box minH='400px'>
            <LineChart user={userRef.current} key={toggleState.toString()} />
          </Box>
        </Card>
        <Card p='0px' pt="12px" maxW={{ sm: "90vw", md: "93vw" }} minH={{sm: "300px"}} sx={{ border: "1px solid white", borderRadius: "5px" }}>
          <DonutChart />
        </Card>
        <Card p='0px' maxW={{ sm: "90vw", md: "93vw", lg: "152%" }} minW={{md: "93vw", lg: "152%" }} id="card">
          <Flex direction='column'>
            <Flex align='center' justify='space-between' p='22px'>
              <Text fontSize='lg' color={textColor} fontWeight='bold'>
                Investments
              </Text>
              {/* <Button variant='primary' maxH='30px'>
                Download Data
              </Button> */}
            </Flex>
            <Box overflow={{ sm: "scroll", lg: "hidden" }}>
              <Table>
                <Thead>
                  <Tr bg={tableRowColor}>
                    <Th color='gray.400' borderColor={borderColor}>
                      Company Name
                    </Th>
                    <Th color='gray.400' borderColor={borderColor}>
                      Investment Size
                    </Th>
                    <Th color='gray.400' borderColor={borderColor}>
                      DPI
                    </Th>
                    <Th color='gray.400' borderColor={borderColor}>
                      TVPI
                    </Th>
                    <Th color='gray.400' borderColor={borderColor}>
                      IRR
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {investments.map((investment, index) => {
                    const userAmount = investment.amount[userRef.current];
                    const amount = userAmount ? parseFloat(userAmount.replace(",", "")).toLocaleString("en-GB") : "";
                    const contribution = userAmount ? parseFloat(userAmount.replace(",", "")) : 0;

                    const userDist = investment.distributions[userRef.current];
                    const distributions = userDist ? parseFloat(userDist.replace(",", "")) : 0;

                    const userMktVal = investment.marketvalue[userRef.current];
                    const marketValue = userMktVal ? parseFloat(userMktVal.replace(",", "")) : 0;

                    const irr = investment.IRR[userRef.current];

                    const dpi = (distributions / contribution).toFixed(1)+"x";
                    const tvpi = ((distributions + marketValue) / contribution).toFixed(1)+"x";
                    return (
                      <Tr key={index}>
                        <Td
                          color={"#fff"}
                          fontSize="sm"
                          fontWeight="bold"
                          borderColor={borderColor}
                          border={index === investments.length - 1 ? "none" : null}
                        >
                          {investment.name}
                        </Td>
                        <Td
                          color={"#fff"}
                          fontSize="sm"
                          border={index === investments.length - 1 ? "none" : null}
                          borderColor={borderColor}
                        >
                          {`£${amount}`}
                        </Td>
                        <Td
                          color={"#fff"}
                          fontSize="sm"
                          border={index === investments.length - 1 ? "none" : null}
                          borderColor={borderColor}
                        >
                          {dpi}
                        </Td>
                        <Td
                          color={"#fff"}
                          fontSize="sm"
                          border={index === investments.length - 1 ? "none" : null}
                          borderColor={borderColor}
                        >
                          {tvpi}
                        </Td>
                        <Td
                          color={"#fff"}
                          fontSize="sm"
                          border={index === investments.length - 1 ? "none" : null}
                          borderColor={borderColor}
                        >
                          {irr}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </Card>
      </Grid>
    </Flex>
  );
}
