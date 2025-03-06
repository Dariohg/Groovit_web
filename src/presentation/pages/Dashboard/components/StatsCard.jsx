import {
    Box,
    Flex,
    Stat,
    StatLabel,
    StatNumber,
    Icon,
} from '@chakra-ui/react';

const StatsCard = ({ title, value, icon, color }) => {
    return (
        <Box
            borderRadius="lg"
            bg="groovit.surface"
            p={5}
            boxShadow="md"
            borderWidth="1px"
            borderColor="whiteAlpha.100"
            transition="transform 0.3s, box-shadow 0.3s"
            _hover={{
                transform: 'translateY(-5px)',
                boxShadow: 'lg',
            }}
        >
            <Flex align="center" justify="space-between">
                <Stat>
                    <StatLabel fontSize="sm" color="gray.400">{title}</StatLabel>
                    <StatNumber fontSize="3xl" fontWeight="bold" mt={1}>{value}</StatNumber>
                </Stat>

                <Flex
                    w="48px"
                    h="48px"
                    align="center"
                    justify="center"
                    borderRadius="full"
                    bg={`${color}20`}
                >
                    <Icon as={icon} w={5} h={5} color={color} />
                </Flex>
            </Flex>
        </Box>
    );
};

export default StatsCard;